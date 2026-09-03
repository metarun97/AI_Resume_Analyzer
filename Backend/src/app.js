/* Import elements⬇️ */
import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import authRoutes from './routes/auth.routes.js';
import resumeRoutes from './routes/resume.routes.js';

/* Server created⬇️ */
const app = express();

/* Cors error handler */
app.use(cors());

/* Middleware to read req.body data */
app.use(express.json());

/* Middleware to read cookie data */
app.use(cookieParser());


/* Auth Routes defined */
app.use("/api/auth", authRoutes);

/* Resume Routes defined */
app.use("/api/resumes", resumeRoutes);


/* Export element⬇️ */
export default app;
