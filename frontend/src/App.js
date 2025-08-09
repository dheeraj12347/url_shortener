import React from "react";
import UrlForm from "./components/UrlForm";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <p>Enter a long URL and get a short one. Visiting the short URL redirects to the original.</p>

      <UrlForm />

      <hr style={{ margin: "20px 0" }} />

      <AdminDashboard />
    </div>
  );
}

export default App;

