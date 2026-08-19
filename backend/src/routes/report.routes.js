import express from "express";
import { getReportSummary } from "../controllers/report.controller.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Get dashboard reports summary
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Dashboard report statistics
 */
router.get("/", authenticate, authorize("admin", "eventmanager"), getReportSummary);

/**
 * @swagger
 * /api/reports:
 *   post:
 *     summary: Generate dashboard reports summary
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Dashboard report statistics
 */
router.post("/", authenticate, authorize("admin", "eventmanager"), getReportSummary);

export default router;
