import { body } from "../express-validator";

export const ticketValidator = [
  body("registration_id")
    .isInt()
    .withMessage("Registration ID must be an integer"),

  body("event_id").isInt().withMessage("Event ID must be an integer"),
];
