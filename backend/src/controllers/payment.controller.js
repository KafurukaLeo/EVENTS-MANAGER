import Payment from "../models/Payment.model.js";
import PaymentProof from "../models/PaymentProof.model.js";

export const createPayment = async (req, res, next) => {
  try {
    const payment = await Payment.create({
      ...req.body,
      user_id: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

export const getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.findByUser(req.user.id);

    res.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadPaymentProof = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Payment proof is required",
      });
    }

    const proof = await PaymentProof.create({
      payment_id: req.params.id,
      file_path: req.file.path,
    });

    res.status(201).json({
      success: true,
      message: "Payment proof uploaded",
      data: proof,
    });
  } catch (error) {
    next(error);
  }
};
