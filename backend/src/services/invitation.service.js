import crypto from "crypto";
import db from "../config/database.js";
import Invitation from "../models/Invitation.model.js";
import Event from "../models/Event.model.js";
import Registration from "../models/registration.model.js";
import ticketService from "./ticket.service.js";
import qrService from "./qr.service.js";
import { sendInvitationEmail } from "../utils/mailer.js";

const invitationService = {
  async createInvitation(data) {
    // Verify that event exists first
    const event = await Event.findById(data.event_id);
    if (!event) {
      const error = new Error(`Event with ID ${data.event_id} not found`);
      error.statusCode = 404;
      throw error;
    }

    const token = crypto.randomBytes(32).toString("hex");

    const invitation = await Invitation.create({
      ...data,
      token,
    });

    // Send the email in the background without blocking the API response
    sendInvitationEmail(data.email, event.name, token);

    return invitation;
  },

  async getInvitations(userId) {
    return await Invitation.findByUser(userId);
  },

  async acceptInvitation(token) {
    // 1. Verify token exists
    const existing = await Invitation.findByToken(token);
    if (!existing) {
      const error = new Error("Invalid invitation token");
      error.statusCode = 404;
      throw error;
    }

    // If it's already accepted, return the existing ticket info
    if (existing.status === 'accepted') {
      const event = await Event.findById(existing.event_id);
      const registrationResult = await db.query(
        "SELECT * FROM registrations WHERE event_id = $1 AND user_id IS NULL LIMIT 1",
        [existing.event_id]
      );
      const registration = registrationResult.rows[0];
      const ticket = await ticketService.getTickets(registration?.user_id || null);
      const { qrCode } = await qrService.generateQR(ticket[0]?.id);

      return {
        invitation: existing,
        event,
        registration,
        ticket: ticket[0],
        qrCode,
      };
    }

    // 2. Accept the invitation
    const invitation = await Invitation.accept(token);

    // 3. Fetch event info
    const event = await Event.findById(invitation.event_id);

    // 4. Create event registration
    const registration = await Registration.create({
      event_id: invitation.event_id,
      user_id: null, // guest registration
    });

    // 5. Create ticket
    const ticket = await ticketService.createTicket({
      event_id: invitation.event_id,
      registration_id: registration.id,
      user_id: null,
    });

    // 6. Create successful payment
    await db.query(
      `
      INSERT INTO payments (registration_id, user_id, amount, method, status)
      VALUES ($1, $2, $3, 'Online Credit Card', 'Paid')
      `,
      [registration.id, null, 50.00]
    );

    // 7. Generate QR Code
    const { qrCode } = await qrService.generateQR(ticket.id);

    return {
      invitation,
      event,
      registration,
      ticket,
      qrCode,
    };
  },
};

export default invitationService;
