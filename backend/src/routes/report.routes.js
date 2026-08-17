import express from "express";
import { getReportSummary } from "../controllers/report.controller.js";

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
router.get("/", getReportSummary);

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
router.post("/", getReportSummary);

export default router;
