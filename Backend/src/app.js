/* Import elements⬇️ */
import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import authRoutes from './routes/auth.routes.js';


/* Server created⬇️ */
const app = express();

/* Cors error handler */
app.use(cors());

/* Middleware to read req.body data */
app.use(express.json());

/* Middleware to read cookie data */
app.use(cookieParser());


/* Routes defined */
app.use("/api/auth", authRoutes);


/* Export element⬇️ */
export default app;
