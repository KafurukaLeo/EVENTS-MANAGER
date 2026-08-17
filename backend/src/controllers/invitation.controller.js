import Invitation from "../models/Invitation.model.js";
import invitationService from "../services/invitation.service.js";

export const createInvitation = async (req, res, next) => {
  try {
    const invitation = await invitationService.createInvitation({
      ...req.body,
      sender_id: req.user?.id || null,
    });

    res.status(201).json({
      success: true,
      data: invitation,
    });
  } catch (error) {
    next(error);
  }
};

export const getInvitations = async (req, res, next) => {
  try {
    const invitations = await Invitation.findByUser(req.user?.id || null);

    res.json({
      success: true,
      data: invitations,
    });
  } catch (error) {
    next(error);
  }
};

export const acceptInvitation = async (req, res, next) => {
  try {
    const invitation = await invitationService.acceptInvitation(
      req.params.token || req.body.token || req.query.token,
    );

    res.json({
      success: true,
      message: "Invitation accepted",
      data: invitation,
    });
  } catch (error) {
    next(error);
  }
};

export const acceptInvitationGet = async (req, res, next) => {
  try {
    const token = req.query.token || req.params.token;
    if (!token) {
      return res.status(400).send("<h1>Error: Invitation token is required</h1>");
    }

    const { event, ticket, qrCode } = await invitationService.acceptInvitation(token);

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Your Event Ticket</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
        <style>
          body {
            background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
            color: #fff;
            font-family: 'Outfit', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
          }
          .ticket-container {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 30px;
            width: 400px;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
            text-align: center;
          }
          h1 { margin-top: 0; font-size: 24px; font-weight: 800; color: #4facfe; }
          .event-title { font-size: 28px; font-weight: 600; margin: 15px 0; color: #00f2fe; }
          .details { font-size: 14px; color: #a5b4fc; margin-bottom: 20px; }
          .qr-img { width: 180px; height: 180px; margin: 20px auto; border-radius: 10px; background: white; padding: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
          .badge { display: inline-block; padding: 5px 15px; border-radius: 50px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
          .badge-paid { background: #10b981; color: white; }
          .badge-attend { background: #3b82f6; color: white; margin-left: 10px; }
          .ticket-number { font-family: monospace; font-size: 18px; color: #fbbf24; margin: 15px 0; }
          .footer { font-size: 12px; color: #64748b; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="ticket-container">
          <h1>CONGRATULATIONS!</h1>
          <p>You have successfully registered & paid</p>
          <div class="event-title">${event.name}</div>
          <div class="details">
            Date: ${event.event_date ? new Date(event.event_date).toLocaleDateString() : 'N/A'}<br/>
            Time: ${event.start_time} - ${event.end_time}
          </div>
          <div>
            <span class="badge badge-paid">Payment: Successful</span>
            <span class="badge badge-attend">Status: Attending</span>
          </div>
          <img src="${qrCode}" class="qr-img" alt="Ticket QR Code" />
          <div class="ticket-number">${ticket.ticket_number}</div>
          <div class="footer">Show this QR code at the entrance to check in.</div>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(error.statusCode || 500).send(`<h1>Error: ${error.message}</h1>`);
  }
};
