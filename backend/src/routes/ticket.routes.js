import express from "express";

import {
  createTicket,
  getTicket,
  getTickets,
} from "../controllers/ticket.controller.js";

import authenticate from "../middlewares/authenticate.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a ticket
 *     tags: [Tickets]
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
 *               - registration_id
 *             properties:
 *               event_id:
 *                 type: integer
 *               registration_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Ticket created
 */
router.post("/", createTicket);

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tickets
 */
router.get("/", getTickets);

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags: [Tickets]
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
 *         description: Ticket details
 */
router.get("/:id", getTicket);
export default router;
