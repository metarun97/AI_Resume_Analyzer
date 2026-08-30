import express from "express";
import { authenticationExcess } from "../middlewares/auth.middleware.js";
import { uploadResumeValidation } from "../middlewares/validators.middleware.js";
import { uploadResume } from "../services/storage.service.js";
import { uploadResumeController } from "../controllers/resume.controller.js";

/* Router created */
const router = express.Router();



router.post("/upload", authenticationExcess, uploadResume,uploadResumeController);





export default router;
