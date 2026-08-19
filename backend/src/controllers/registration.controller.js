import Registration from "../models/registration.model.js";
import Event from "../models/Event.model.js";
import Guest from "../models/guest.model.js";

export const registerForEvent = async (req, res, next) => {
  try {
    const { event_id, user_id } = req.body;

    const event = await Event.findById(event_id);
    
    if (!event) {
      const error = new Error(`Event with ID ${event_id} not found`);
      error.statusCode = 404;
      throw error;
    }

    const registration = await Registration.create({
      event_id,
      user_id: user_id || req.user?.id || null,
    });

    let guestName = req.body.names || req.body.name || "Anonymous Guest";
    
    let guestEmail = req.body.email || "guest@example.com";
    
    if (req.user) {
      guestName = req.user.name;
      guestEmail = req.user.email;
    } else if (req.body.email) {
      if (!req.body.names && !req.body.name) {
        guestName = req.body.email.split('@')[0];
      }
      guestEmail = req.body.email;
    }

    await Guest.create({
      event_id,
      user_id: registration.user_id,
      name: guestName,
      email: guestEmail,
      phone: req.body.phone || null,
      registration_id: registration.id
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully. Please complete payment to generate your ticket.",
      data: {
        registration,
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
