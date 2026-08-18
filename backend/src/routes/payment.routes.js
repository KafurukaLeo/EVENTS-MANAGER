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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - registration_id
 *               - amount
 *             properties:
 *               registration_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *               method:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment created
 */
router.post("/", createPayment);

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
router.get("/", getPayments);

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
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - proof
 *             properties:
 *               proof:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Proof uploaded
 */
router.post(
  "/:id/proof",
  upload.single("proof"),
  uploadPaymentProof,
);
export default router;
