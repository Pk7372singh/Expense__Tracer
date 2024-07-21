const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
require("dotenv").config(); // Import dotenv to load the variables
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// health check
app.get("/", (req, res) => {
  res.send("Server is running.......");
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await connectDB;
    console.log(`Server running on port ${PORT} and also connected to db`);
  } catch (error) {
    console.log(`Server is not connected ${error}`);
  }
});
