// models/urlModel.js
const pool = require("../db");

async function findByOriginalUrl(originalUrl) {
  const [rows] = await pool.query("SELECT * FROM urls WHERE original_url = ? LIMIT 1", [originalUrl]);
  return rows[0] || null;
}

async function findByShortCode(shortCode) {
  const [rows] = await pool.query("SELECT * FROM urls WHERE short_code = ? LIMIT 1", [shortCode]);
  return rows[0] || null;
}

async function insertUrl(originalUrl, shortCode) {
  const [result] = await pool.query(
    "INSERT INTO urls (original_url, short_code) VALUES (?, ?)",
    [originalUrl, shortCode]
  );
  return result.insertId;
}

async function incrementVisitCount(shortCode) {
  await pool.query("UPDATE urls SET visit_count = visit_count + 1 WHERE short_code = ?", [shortCode]);
}

async function getAllUrls() {
  const [rows] = await pool.query("SELECT id, original_url, short_code, visit_count, created_at FROM urls ORDER BY created_at DESC");
  return rows;
}

module.exports = {
  findByOriginalUrl,
  findByShortCode,
  insertUrl,
  incrementVisitCount,
  getAllUrls
};
