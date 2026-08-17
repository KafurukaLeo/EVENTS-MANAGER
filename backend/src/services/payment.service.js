import { createPayment } from "../controllers/payment.controller";
import payment from "../models/payment.model.js";

const paymentService = {
  async createPayment(data) {
    return await payment.create(data);
  },

  async getUserPayments(userId) {
    return await payment.findUserId(userId);
  },

  async updateStatus(id, status) {
    return await payment.updateStatus(id, status);
  },
};

export default paymentService;
