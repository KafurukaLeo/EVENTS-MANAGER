import express from "express";
import { checkIn, getCheckIns } from "../controllers/checkin.controller.js";

import authenticate from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/reports:
 *   post:
 *     summary: Generate a report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Report generated
 */
router.post(
  "/",
  authenticate,
  authorize("admin", "organizer", "staff"),
  checkIn,
);

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Get all reports
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reports
 */
router.get("/", authenticate, getCheckIns);

export default router;
