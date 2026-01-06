import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Core middlewares
app.use(cors());
app.use(express.json());

// Simple health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend is running" });
});

export default app;
