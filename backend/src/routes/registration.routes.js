import express from "express";
import {
  registerForEvent,
  getRegistrations,
  cancelRegistration,
} from "../controllers/registration.controller.js";

import authenticate from "../middlewares/authenticate.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/registrations:
 *   post:
 *     summary: Register for an event
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event_id
 *               - email
 *             properties:
 *               event_id:
 *                 type: integer
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration successful
 */
router.post("/", registerForEvent);

/**
 * @swagger
 * /api/registrations:
 *   get:
 *     summary: Get all registrations
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of registrations
 */
router.get("/", getRegistrations);

/**
 * @swagger
 * /api/registrations:
 *   delete:
 *     summary: Cancel a registration
 *     tags: [Registrations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Registration cancelled
 */
router.delete("/", cancelRegistration);

export default router;
