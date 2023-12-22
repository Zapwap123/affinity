const express = require("express");
const conferenceService = require("../services/conferenceService");
const uploadMiddleware = require("../middleware/uploadMiddleware");
const router = express.Router();

// API endpoint to schedule conference talks from CSV file
router.post("/schedule", uploadMiddleware.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const fileContent = req.file.buffer.toString();
  const talks = fileContent.split("\n");

  try {
    if (!talks || talks.length === 0) {
      return res
        .status(400)
        .json({ error: "No valid talks found in the CSV file." });
    }

    const schedules = await conferenceService.scheduleConferenceTalks(talks);
    console.log(schedules);
    return res.json({ schedules });
  } catch (error) {
    console.error("Error scheduling conference talks:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
