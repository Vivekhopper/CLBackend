// server/models/Clipboard.js
const mongoose = require("mongoose");

const clipboardSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
      default: "default",
      unique: true,
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clipboard", clipboardSchema);
