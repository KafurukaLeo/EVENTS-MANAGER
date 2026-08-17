import Ticket from "../models/Ticket.model.js";
import ticketService from "../services/ticket.service.js";

export const generateQR = async (req, res, next) => {
  try {
    const ticket = await ticketService.createTicket({
      ...req.body,
      user_id: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};

export const getTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.findByUser(req.user.id);

    res.json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
};

export const getTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};
