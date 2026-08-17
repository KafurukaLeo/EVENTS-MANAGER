import express from "express";

import {
  createInvitation,
  getInvitations,
  acceptInvitation,
} from "../controllers/invitation.controller.js";

import authenticate from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/invitations:
 *   post:
 *     summary: Create an invitation
 *     tags: [Invitations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Invitation created
 */
router.post(
  "/",
  authenticate,
  authorize("Admin", "Organizer"),
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
router.get("/", authenticate, getInvitations);

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
