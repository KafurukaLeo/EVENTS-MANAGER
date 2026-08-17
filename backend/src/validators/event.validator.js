import { body } from "express-validator";

export const createEventValidator = [
  body("name").trim().notEmpty().withMessage("Event name  is required"),
  body("capacity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Capacity must be postive message"),
];
