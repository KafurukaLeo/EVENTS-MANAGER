import express from "express";
import { generateQR } from "../controllers/qr.controller.js";

import authenticate from "../middlewares/authenticate.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/qr/{ticketId}:
 *   get:
 *     summary: Generate QR code for a ticket
 *     tags: [QR]
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: QR Code generated
 */
router.get("/:ticketId", authenticate, generateQR);
export default router;
