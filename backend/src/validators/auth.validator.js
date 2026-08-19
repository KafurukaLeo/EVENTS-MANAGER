import { body } from "express-validator";

export const registerValidator = [
  body("names").custom((value, { req }) => {
    const val = value || req.body.name;
    if (!val || val.trim().length === 0) {
      throw new Error("Names is required");
    }
    return true;
  }),

  body("email").isEmail().withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Valid email is required"),

  body("password").notEmpty().withMessage("Password is required"),
];
