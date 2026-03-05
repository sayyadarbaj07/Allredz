const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local
      "https://spices-frontend-beta.vercel.app", // live frontend Vercel
    ],
    credentials: true,
  })
);

// ✅ Serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/products", require("./Routes/productRoutes"));
app.use("/api/order", require("./Routes/orderRoutes"));
app.use("/api/auth", require("./Routes/authRoutes"));

// MongoDB Connection
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI) // sirf URI, options nahi chahiye
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
