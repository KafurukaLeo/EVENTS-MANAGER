import qrService from "../services/qr.service.js";

export const generateQR = async (req, res, next) => {
  try {
    const { ticketId } = req.params;
    const { ticket, qrCode } = await qrService.generateQR(ticketId);

    res.json({
      success: true,
      data: {
        ticket,
        qrCode, // base64 data URL
      },
    });
  } catch (error) {
    next(error);
  }
};
