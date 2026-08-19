import db from "../config/database.js";
import generateQRCode from "../utils/qrGenerator.js";

const qrService = {
  async generateQR(ticketId) {
    // Query ticket details along with event name and payment status
    const result = await db.query(
      `
      SELECT 
        t.id AS ticket_id,
        t.ticket_number,
        t.registration_id,
        t.user_id,
        t.event_id,
        t.created_at,
        e.name AS event_name,
        p.status AS payment_status
      FROM tickets t
      JOIN events e ON e.id = t.event_id
      LEFT JOIN payments p ON p.registration_id = t.registration_id
      WHERE t.id = $1
      `,
      [ticketId]
    );

    const ticketRow = result.rows[0];
    if (!ticketRow) {
      const error = new Error("Ticket not found");
      error.statusCode = 404;
      throw error;
    }

    // Determine if payment is successful
    const isPaid = ticketRow.payment_status === 'Paid' || 
                   ticketRow.payment_status === 'Approved' || 
                   ticketRow.payment_status === 'Completed';

    if (!isPaid) {
      const error = new Error("Payment is required before generating the QR Code");
      error.statusCode = 402;
      throw error;
    }

    const qrData = JSON.stringify({
      ticketId: ticketRow.ticket_id,
      ticketNumber: ticketRow.ticket_number,
      eventName: ticketRow.event_name
    });

    const qrCode = await generateQRCode(qrData);

    return {
      ticket: {
        id: ticketRow.ticket_id,
        registration_id: ticketRow.registration_id,
        user_id: ticketRow.user_id,
        event_id: ticketRow.event_id,
        ticket_number: ticketRow.ticket_number,
        event_name: ticketRow.event_name,
        payment_status: ticketRow.payment_status || 'Unpaid',
        is_paid: isPaid,
        created_at: ticketRow.created_at,
      },
      qrCode
    };
  },
};

export default qrService;
