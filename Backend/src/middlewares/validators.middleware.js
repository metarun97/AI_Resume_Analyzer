/* Import elements */
import { body, oneOf, validationResult } from 'express-validator';

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
];

/* User validations for login user */
export const loginValidationRules = [
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 character"),
  respondWithValidationErrors,
];


/* Resume validations for user */
export const uploadResumeValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Resume title is required")
    .isLength({ max: 100 })
    .withMessage("Resume title cannot exceed 100 characters"),

  body("originalFileName")
    .trim()
    .notEmpty()
    .withMessage("Original file name is required")
    .isLength({ max: 255 })
    .withMessage("Original file name cannot exceed 255 characters"),

  body("fileUrl")
    .trim()
    .notEmpty()
    .withMessage("File URL is required")
    .isURL()
    .withMessage("Invalid file URL"),

  body("fileKey")
    .trim()
    .notEmpty()
    .withMessage("File key is required")
    .isLength({ max: 255 })
    .withMessage("File key cannot exceed 255 characters"),

  body("fileSize")
    .notEmpty()
    .withMessage("File size is required")
    .isInt({ min: 1 })
    .withMessage("File size must be a positive number"),

  body("mimeType")
    .trim()
    .notEmpty()
    .withMessage("Mime type is required")
    .equals("application/pdf")
    .withMessage("Only PDF files are allowed"),
  respondWithValidationErrors,
];
