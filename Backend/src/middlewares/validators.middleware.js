/* Import elements */
import { body, validationResult } from 'express-validator';

/* User validation result array */
const respondWithValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

/* User validations for register user */
export const registerValidationRules = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isString()
    .withMessage("username must be String"),
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 character"),
  body("fullName.firstName")
    .trim()
    .notEmpty()
    .withMessage("firstName is required")
    .isString()
    .withMessage("firstName must be String"),
  body("fullName.lastName")
    .trim()
    .notEmpty()
    .withMessage("lastName is required")
    .isString()
    .withMessage("lastName must be String"),
  respondWithValidationErrors,
]

