// server/models/Paste.js
const mongoose = require("mongoose");

const pasteSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true, // each code should be unique
    },
    content: {
      type: String,
      required: true,
    },
    // This field will be used for TTL (auto delete)
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // 300 seconds = 5 minutes
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Paste", pasteSchema);
