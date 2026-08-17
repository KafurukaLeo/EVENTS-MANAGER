import { body } from "../express_validator";

export const guestValidator = [
  body("name").trim().notEmpty().withMeggae("Guest name is required"),
  body("email").trim().isEmail().withMeggae("Invalid email  address"),
];
