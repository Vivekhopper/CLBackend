// server/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
const pasteRoutes = require("./routes/pasteRoutes");
app.use("/api/paste", pasteRoutes);

// (Optional) previous clipboard routes – you can remove if not needed
// const clipboardRoutes = require("./routes/clipboardRoutes");
// app.use("/api/clipboard", clipboardRoutes);

// Root test
app.get("/", (req, res) => {
  res.send("Online Clipboard API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
