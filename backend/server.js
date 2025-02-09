import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from "./routes/categoryRoutes.js";
import Admin from "./models/Admin.js";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();  
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "https://point-tracker-gray.vercel.app", // Change this to your frontend URL
  credentials: true, // ✅ Allows cookies to be sent
}));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/categories", categoryRoutes);

// Export handler for Vercel
export default app;


