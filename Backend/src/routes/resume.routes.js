import express from "express";
import { authenticationExcess } from "../middlewares/auth.middleware.js";
// import { uploadResumeValidation } from "../middlewares/validators.middleware.js";
import { uploadResumeController } from "../controllers/resume.controller.js";
import { upload } from './../middlewares/upload.middleware.js';

/* Router created */
const router = express.Router();



router.post("/upload", authenticationExcess, upload.single("resume"), uploadResumeController);


export default router;
