const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const resumeRoutes = require("./routes/resumeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Basic Route
app.get("/", (req, res) => {
  res.send("ResumeForge API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
