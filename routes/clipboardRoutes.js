// server/routes/clipboardRoutes.js
const express = require("express");
const router = express.Router();
const Clipboard = require("../models/Clipboard");

// GET /api/clipboard - get current clipboard text
router.get("/", async (req, res) => {
  try {
    let clip = await Clipboard.findOne({ owner: "default" });
    if (!clip) {
      clip = await Clipboard.create({ owner: "default", content: "" });
    }

    res.json({
      content: clip.content,
      updatedAt: clip.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching clipboard:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/clipboard - update clipboard text
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;

    let clip = await Clipboard.findOne({ owner: "default" });
    if (!clip) {
      clip = await Clipboard.create({ owner: "default", content: content || "" });
    } else {
      clip.content = content || "";
      await clip.save();
    }

    res.json({
      message: "Clipboard updated",
      content: clip.content,
      updatedAt: clip.updatedAt,
    });
  } catch (error) {
    console.error("Error updating clipboard:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
