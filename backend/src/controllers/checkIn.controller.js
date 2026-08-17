import CheckIn from "../models/CheckIn.model.js";
import Ticket from "../models/Ticket.model.js";

export const checkIn = async (req, res, next) => {
  try {
    const { ticket_id } = req.body || {};

    if (!ticket_id) {
      return res.status(400).json({
        success: false,
        message: "ticket_id is required",
      });
    }

    const ticket = await Ticket.findById(ticket_id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    const checkin = await CheckIn.create({
      ticket_id,
      checked_in_by: req.user?.id || null,
    });

    res.status(201).json({
      success: true,
      message: "Guest checked in successfully",
      data: checkin,
    });
  } catch (error) {
    next(error);
  }
};

export const getCheckIns = async (req, res, next) => {
  try {
    const checkins = await CheckIn.findAll();

    res.json({
      success: true,
      data: checkins,
    });
  } catch (error) {
    next(error);
  }
};
