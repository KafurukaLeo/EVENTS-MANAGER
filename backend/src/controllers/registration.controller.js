import Registration from "../models/registration.model.js";
import Event from "../models/Event.model.js";

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
