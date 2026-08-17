import Ticket from "../models/ticket.model.js";

import generateQRCode from "../utils/qrGenerator.js";

const qrService = {
  async genearteQR(ticketId) {
    const ticket = await ticket.findById(ticketId);
    if (!ticket) {
      throw new error("Ticket not found");
    }
    const qrData = JSON.stringify({
      ticket: ticket.id,
      ticketNumber: ticket.ticket_number,
      eventId: ticket.event_id,
    });
    const rqCode = await generateQRCode(qrData);

    return { ticket, qrCode };
  },
};
export default qrService;
