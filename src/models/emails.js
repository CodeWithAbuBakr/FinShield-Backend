const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    default: "No Subject", 
  },
  body: {
    type: String,
    default: "No Content", 
  },
  receivedAt: {
    type: Date,
    default: Date.now,
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
