import React, { useState } from "react";
import axios from "axios";

export default function UrlForm() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShortUrl(null);
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/shorten", { originalUrl });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Error shortening URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-row">
        <input
          type="url"
          placeholder="Enter long URL (include https://)"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {shortUrl && (
        <div className="url-card">
          <p><strong>Short URL:</strong></p>
          <p><a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a></p>
        </div>
      )}
    </div>
  );
}
