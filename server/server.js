const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const app = express();

// ✅ CORS - Updated to allow all frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://allredz.vercel.app",
  "https://spices-frontend-beta.vercel.app",
  "https://allredz.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith("http://localhost")) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: ${origin} not allowed`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

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
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    family: 4, // Force IPv4 to avoid IPv6 DNS issues
  })
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    // Start server anyway so we can see the error clearly
    app.listen(PORT, () => {
      console.log(`⚠️ Server running on port ${PORT} (MongoDB disconnected)`);
    });
  });
