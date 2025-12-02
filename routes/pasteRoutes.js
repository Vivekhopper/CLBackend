// server/routes/pasteRoutes.js
const express = require("express");
const router = express.Router();
const Paste = require("../models/Paste");

// Helper to generate a random 6-digit code
const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/**
 * POST /api/paste
 * Body: { content: string }
 * Returns: { code, expiresInSeconds }
 */
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content is required" });
    }

    // Generate a unique random code
    let code;
    let existing;
    do {
      code = generateCode();
      existing = await Paste.exists({ code });
    } while (existing);

    const paste = await Paste.create({ code, content });

    return res.json({
      message: "Paste created",
      code: paste.code,
      expiresInSeconds: 300, // just for UI info
    });
  } catch (error) {
    console.error("Error creating paste:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/paste/:code
 * Returns: { content, createdAt, expiresInSecondsRemaining? }
 */
router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    const paste = await Paste.findOne({ code });
    if (!paste) {
      return res.status(404).json({ message: "No text found for this ID" });
    }

    // Optional: calculate remaining time (approx)
    const createdAtMs = new Date(paste.createdAt).getTime();
    const nowMs = Date.now();
    const elapsedSeconds = Math.floor((nowMs - createdAtMs) / 1000);
    const remaining = Math.max(300 - elapsedSeconds, 0);

    return res.json({
      content: paste.content,
      createdAt: paste.createdAt,
      expiresInSecondsRemaining: remaining,
    });
  } catch (error) {
    console.error("Error fetching paste:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
