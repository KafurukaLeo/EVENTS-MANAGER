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
 *     responses:
 *       201:
 *         description: Ticket created
 */
router.post("/", authenticate, createTicket);

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
router.get("/", authenticate, getTickets);

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
router.get("/:id", authenticate, getTicket);
export default router;
