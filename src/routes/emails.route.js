const express = require("express");
const router = express.Router();
const Email = require("../models/emails");

// Save a new email
router.post("/save", async (req, res) => {
  const { to, from, subject, body } = req.body;
  if (!to || !from) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  try {
    const newEmail = new Email({
      to,
      from,
      subject,
      body,
    });

    const savedEmail = await newEmail.save();
    return res.status(201).json(savedEmail);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ msg: "Failed to save email" });
  }
});

// Get all emails
router.get("/all", async (req, res) => {
  try {
    const emails = await Email.find({});
    return res.status(200).json(emails);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ msg: "Failed to retrieve emails" });
  }
});

// Get a single email by ID
router.get("/:id", async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) {
      return res.status(404).json({ msg: "Email not found" });
    }
    return res.status(200).json(email);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ msg: "Failed to retrieve email" });
  }
});

// Delete an email by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmail = await Email.findByIdAndDelete(req.params.id);
    if (!deletedEmail) {
      return res.status(404).json({ msg: "Email not found" });
    }
    return res.status(200).json({ msg: "Email deleted successfully" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ msg: "Failed to delete email" });
  }
});

module.exports = router;
