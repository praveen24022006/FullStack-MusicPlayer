import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

import connectDB from "./config/connectDB.js";
import router from "./routes/authRoutes.js";
import imagekit from "./config/imagekit.js";
import songRouter from "./routes/songRoutes.js";

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());

// MongoDB Events
mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
    console.log("❌ MongoDB Error:", err);
});

// Connect DB
connectDB();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use("/api/songs", songRouter);
app.use("/api/auth", router);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "BeatStream Backend is Live 🚀"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});