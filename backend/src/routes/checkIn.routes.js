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
 *     responses:
 *       200:
 *         description: Checked in successfully
 */
router.post(
  "/",
  authenticate,
  authorize("admin", "organizer", "staff"),
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
router.get("/", authenticate, getCheckIns);

export default router;
