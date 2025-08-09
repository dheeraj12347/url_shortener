import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUrls() {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/all");
      setUrls(res.data);
    } catch (err) {
      console.error(err);
      alert("Could not fetch admin data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUrls();
  }, []);

  if (loading) return <p>Loading admin data...</p>;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>All Shortened URLs</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Short Code</th>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Visits</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((u) => (
            <tr key={u.id}>
              <td>{u.short_code}</td>
              <td>
                <a href={`${window.location.origin}/${u.short_code}`} target="_blank" rel="noreferrer">
                  {`${window.location.origin}/${u.short_code}`}
                </a>
              </td>
              <td style={{ maxWidth: 320 }}>{u.original_url}</td>
              <td>{u.visit_count}</td>
              <td>{new Date(u.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
