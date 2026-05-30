/* Import elements */
import express from 'express';
import { registerUser } from '../controllers/auth.controller.js';
import { registerValidationRules } from '../middlewares/validators.middleware.js';

/* Router created */
const router = express.Router();


/* Register API end point */
router.post("/register", registerValidationRules, registerUser);


/* Export elements */
export default router;
