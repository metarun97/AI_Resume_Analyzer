/* Import elements */
import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller.js';
import { registerValidationRules, loginValidationRules } from '../middlewares/validators.middleware.js';

/* Router created */
const router = express.Router();


/* Register API end point */
router.post("/register", registerValidationRules, registerUser);

/* Login API end point */
router.post("/login", loginValidationRules, loginUser)



/* Export elements */
export default router;
