import { createTicket } from "../controllers/ticket.controller.js";
import ticket from "../models/ticket.model.js";

import generateTicketNumber from "../utils/ticketGenerator.js";

const ticketService = {
  async createTicket(data) {
    const ticketNumber = generateTicketNumber();

    return await ticket.create({ ...data, ticket_number: ticketNumber });
  },
  async getTickets(userId) {
    return await Ticket.findTicketById(userId);
  },
  async getTicket(id) {
    return await Ticket.findTicketById(id);
  },
};

export default ticketService;
