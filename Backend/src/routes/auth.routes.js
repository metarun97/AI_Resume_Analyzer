/* Import elements */
import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller.js';
import { registerValidationRules, loginValidationRules } from '../middlewares/validators.middleware.js';
import { authenticationExcess } from '../middlewares/auth.middleware.js';
import { meUser } from '../controllers/auth.controller.js';

/* Router created */
const router = express.Router();


/* Register API end point */
router.post("/register", registerValidationRules, registerUser);

/* Login API end point */
router.post("/login", loginValidationRules, loginUser)

/* Me API end point */
router.get("/me", authenticationExcess, meUser)

/* Export elements */
export default router;
