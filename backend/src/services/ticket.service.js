import ticket from "../models/ticket.model.js";
import Registration from "../models/registration.model.js";
import Event from "../models/Event.model.js";
import generateTicketNumber from "../utils/ticketGenerator.js";

const ticketService = {
  async createTicket(data) {
    // 1. Verify event exists
    const event = await Event.findById(data.event_id);
    if (!event) {
      const error = new Error(`Event with ID ${data.event_id} not found`);
      error.statusCode = 404;
      throw error;
    }

    // 2. Verify registration exists
    const registration = await Registration.findById(data.registration_id);
    if (!registration) {
      const error = new Error(`Registration with ID ${data.registration_id} not found`);
      error.statusCode = 404;
      throw error;
    }

    const ticketNumber = generateTicketNumber();

    return await ticket.create({ ...data, ticket_number: ticketNumber });
  },

  async getTickets(userId) {
    return await ticket.findByUser(userId);
  },

  async getTicket(id) {
    return await ticket.findById(id);
  },
};

export default ticketService;
