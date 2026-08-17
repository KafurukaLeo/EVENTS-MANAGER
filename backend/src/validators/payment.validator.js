import { body } from "../express_validator";

export const paymentValidator = [
  body("amount")
    .isFloat({ min: 0 })
    .withMessage("Amount must be a valid number"),

  body("methode").notEmpty().withMessage(),
];
