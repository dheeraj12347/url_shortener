// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const urlRoutes = require("./routes/urlRoutes");
const urlModel = require("./models/urlModel");

const app = express();
app.use(cors());
app.use(express.json());

// Mount API routes under /api
app.use("/api", urlRoutes);

// Redirect route: GET /:shortcode
app.get("/:shortcode", async (req, res) => {
  const { shortcode } = req.params;
  if (!shortcode) return res.status(400).send("Bad Request");

  try {
    const urlRow = await urlModel.findByShortCode(shortcode);
    if (!urlRow) return res.status(404).send("Short URL not found");

    // Increment visits (fire and forget is okay but we'll await)
    await urlModel.incrementVisitCount(shortcode);

    // Redirect
    return res.redirect(urlRow.original_url);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend: Server running on port ${PORT}`);
});
