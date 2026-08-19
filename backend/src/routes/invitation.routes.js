import express from "express";

import {
  createInvitation,
  getInvitations,
  acceptInvitation,
  acceptInvitationGet,
} from "../controllers/invitation.controller.js";

import authenticate from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/invitations/accept:
 *   get:
 *     summary: Accept invitation and generate ticket
 *     tags: [Invitations]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket page rendered
 */
router.get("/accept", acceptInvitationGet);

/**
 * @swagger
 * /api/invitations:
 *   post:
 *     summary: Create an invitation
 *     tags: [Invitations]
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
 *         description: Invitation created
 */
router.post(
  "/",
  authenticate,
  authorize("admin", "eventmanager"),
  createInvitation,
);

/**
 * @swagger
 * /api/invitations:
 *   get:
 *     summary: Get all invitations
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of invitations
 */
router.get("/", authenticate, authorize("admin", "eventmanager"), getInvitations);

/**
 * @swagger
 * /api/invitations/token/accept:
 *   post:
 *     summary: Accept an invitation
 *     tags: [Invitations]
 *     responses:
 *       200:
 *         description: Invitation accepted
 */
router.post("/token/accept", acceptInvitation);

export default router;
