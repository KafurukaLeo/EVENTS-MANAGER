import crypto from "crypto";
import db from "../config/database.js";
import Invitation from "../models/Invitation.model.js";
import Event from "../models/Event.model.js";
import Registration from "../models/registration.model.js";
import Guest from "../models/guest.model.js";
import Payment from "../models/Payment.model.js";
import gatewayService from "./gateway.service.js";
import { sendInvitationEmail } from "../utils/mailer.js";

const invitationService = {
  async createInvitation(data) {
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

    sendInvitationEmail(data.email, event.name, token);

    return invitation;
  },

  async getInvitations(userId) {
    return await Invitation.findByUser(userId);
  },

  async acceptInvitation(token) {
    const existing = await Invitation.findByToken(token);
    if (!existing) {
      const error = new Error("Invalid invitation token");
      error.statusCode = 404;
      throw error;
    }

    if (existing.status === 'accepted') {
      const registrationResult = await db.query(
        "SELECT * FROM registrations WHERE event_id = $1 AND user_id IS NULL ORDER BY created_at DESC LIMIT 1",
        [existing.event_id]
      );
      const registration = registrationResult.rows[0];
      
      if (registration) {
        const payResult = await db.query(
          "SELECT * FROM payments WHERE registration_id = $1 ORDER BY created_at DESC LIMIT 1",
          [registration.id]
        );
        const payment = payResult.rows[0];
        
        if (payment && (payment.status === 'Paid' || payment.status === 'Approved' || payment.status === 'Completed')) {
          return {
            status: 'paid',
            registration,
            payment
          };
        } else if (payment) {
          const callbackUrl = `http://localhost:5000/api/payments/webhook`;
          const { checkoutUrl } = await gatewayService.initializePayment(payment.id, payment.amount, callbackUrl);
          return {
            status: 'pending',
            checkoutUrl
          };
        }
      }
    }

    const invitation = await Invitation.accept(token);

    const registration = await Registration.create({
      event_id: invitation.event_id,
      user_id: null,
    });

    await Guest.create({
      event_id: invitation.event_id,
      user_id: null,
      name: invitation.email.split('@')[0],
      email: invitation.email,
      registration_id: registration.id
    });

    const payment = await Payment.create({
      registration_id: registration.id,
      user_id: null,
      amount: 50.00,
      method: "Gateway"
    });

    const callbackUrl = `http://localhost:5000/api/payments/webhook`;
    const { checkoutUrl, gatewayReference } = await gatewayService.initializePayment(payment.id, payment.amount, callbackUrl);

    await db.query(
      "UPDATE payments SET gateway_reference = $1 WHERE id = $2",
      [gatewayReference, payment.id]
    );

    return {
      status: 'initialized',
      checkoutUrl
    };
  },
};

export default invitationService;
