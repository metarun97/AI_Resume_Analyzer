/* Import elements */
import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.controller.js';
import { registerValidationRules, loginValidationRules } from '../middlewares/validators.middleware.js';
import { authenticationExcess } from '../middlewares/auth.middleware.js';
import { meUser } from '../controllers/auth.controller.js';

/* Router created */
const router = express.Router();


/* Register API end [ /api/auth/register ] */
router.post("/register", registerValidationRules, registerUser);

/* Login API end [ /api/auth/login ] */
router.post("/login", loginValidationRules, loginUser);

/* Me API end point [ /api/auth/me ] */
router.get("/me", authenticationExcess, meUser);

/* Me API end point [ /api/auth/logout ] */
router.get("/logout", logoutUser);

/* Export elements */
export default router;
