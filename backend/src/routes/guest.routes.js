import express from "express";

import {
  createGuest,
  getGuests,
  getGuest,
  updateGuest,
  deleteGuest,
} from "../controllers/guest.controller.js";

import authenticate from "../middlewares/authenticate.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/guests:
 *   post:
 *     summary: Create a guest
 *     tags: [Guests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Guest created
 */
router.post("/", authenticate, createGuest);

/**
 * @swagger
 * /api/guests:
 *   get:
 *     summary: Get all guests
 *     tags: [Guests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of guests
 */
router.get("/", authenticate, getGuests);

/**
 * @swagger
 * /api/guests/{id}:
 *   get:
 *     summary: Get guest by ID
 *     tags: [Guests]
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
 *         description: Guest details
 */
router.get("/:id", authenticate, getGuest);

/**
 * @swagger
 * /api/guests/{id}:
 *   put:
 *     summary: Update guest
 *     tags: [Guests]
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
 *         description: Guest updated
 */
router.put("/:id", authenticate, updateGuest);

/**
 * @swagger
 * /api/guests/{id}:
 *   delete:
 *     summary: Delete guest
 *     tags: [Guests]
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
 *         description: Guest deleted
 */
router.delete("/:id", authenticate, deleteGuest);
export default router;
