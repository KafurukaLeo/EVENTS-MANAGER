import Registration from "../models/registration.model.js";
import Event from "../models/Event.model.js";
import ticketService from "../services/ticket.service.js";
import qrService from "../services/qr.service.js";

export const registerForEvent = async (req, res, next) => {
  try {
    const { event_id, user_id } = req.body;

    // Verify that event exists first
    const event = await Event.findById(event_id);
    if (!event) {
      const error = new Error(`Event with ID ${event_id} not found`);
      error.statusCode = 404;
      throw error;
    }

    // 1. Create registration
    const registration = await Registration.create({
      event_id,
      user_id: user_id || req.user?.id || null,
    });

    // 2. Automatically generate ticket
    const ticket = await ticketService.createTicket({
      event_id,
      registration_id: registration.id,
      user_id: registration.user_id,
    });

    // 3. Automatically generate QR Code for the ticket
    const { qrCode } = await qrService.generateQR(ticket.id);

    res.status(201).json({
      success: true,
      message: "Registered successfully and ticket generated",
      data: {
        registration,
        ticket,
        qrCode,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRegistrations = async (req, res, next) => {
  try {
    const userId = req.query.user_id || req.user?.id || null;
    const registrations = await Registration.findByUser(userId);

    res.json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelRegistration = async (req, res, next) => {
  try {
    const id = req.params.id || req.body.id || req.query.id;
    const registration = await Registration.cancel(id);

    res.json({
      success: true,
      message: "Registration cancelled",
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};
