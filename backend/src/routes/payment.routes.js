import express from "express";
import multer from "multer";

import {
  createPayment,
  getPayments,
  uploadPaymentProof,
} from "../controllers/payment.controller.js";

import authenticate from "../middlewares/authenticate.middleware.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/payment-proofs",
});

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Payment created
 */
router.post("/", authenticate, createPayment);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payments
 */
router.get("/", authenticate, getPayments);

/**
 * @swagger
 * /api/payments/{id}/proof:
 *   post:
 *     summary: Upload payment proof
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Proof uploaded
 */
router.post(
  "/:id/proof",
  authenticate,
  upload.single("proof"),
  uploadPaymentProof,
);
export default router;
