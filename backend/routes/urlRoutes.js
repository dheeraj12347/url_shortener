// routes/urlRoutes.js
const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const urlModel = require("../models/urlModel");

// helper: validate URL
function isValidUrl(url) {
  try {
    // new URL will throw if invalid
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

// POST /api/shorten
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: "originalUrl is required" });

  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  try {
    // return existing if already shortened
    const existing = await urlModel.findByOriginalUrl(originalUrl);
    if (existing) {
      return res.json({ shortUrl: `${process.env.BASE_URL}/${existing.short_code}`, shortCode: existing.short_code });
    }

    // generate short code (6-8 chars)
    const shortCode = nanoid(7);
    await urlModel.insertUrl(originalUrl, shortCode);
    return res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}`, shortCode });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /api/admin/all
// Note: This endpoint is not protected by auth. For production add authentication.
router.get("/admin/all", async (req, res) => {
  try {
    const rows = await urlModel.getAllUrls();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
