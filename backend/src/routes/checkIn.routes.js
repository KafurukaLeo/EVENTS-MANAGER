import express from "express";

import { checkIn, getCheckIns } from "../controllers/checkin.controller.js";

import authenticate from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/checkin:
 *   post:
 *     summary: Perform a check-in
 *     tags: [Check-In]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ticket_id
 *             properties:
 *               ticket_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Checked in successfully
 */
router.post(
  "/",
  authenticate,
  authorize("admin", "eventmanager"),
  checkIn,
);

/**
 * @swagger
 * /api/checkin:
 *   get:
 *     summary: Get all check-ins
 *     tags: [Check-In]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of check-ins
 */
router.get("/", authenticate, authorize("admin", "eventmanager"), getCheckIns);

export default router;
