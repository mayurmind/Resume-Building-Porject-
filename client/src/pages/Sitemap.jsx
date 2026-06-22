import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Sitemap() {
  return (
    <div className="legal-page">
      <Navbar />
      <div className="container" style={{ padding: "100px 20px", maxWidth: "800px", margin: "0 auto", color: "var(--color-text-main)", minHeight: "70vh" }}>
        <h1 style={{ marginBottom: "20px", color: "var(--color-primary)" }}>Sitemap</h1>
        <p style={{ marginBottom: "30px", color: "var(--color-text-muted)" }}>Directory of all pages on ResumeForge.</p>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <h2 style={{ marginBottom: "15px", fontSize: "1.2rem", borderBottom: "1px solid var(--glass-border)", paddingBottom: "10px" }}>Main Pages</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ margin: "10px 0" }}><Link to="/" style={{ color: "var(--color-text-main)", textDecoration: "none" }}>Home</Link></li>
              <li style={{ margin: "10px 0" }}><Link to="/templates" style={{ color: "var(--color-text-main)", textDecoration: "none" }}>Resume Templates</Link></li>
            </ul>
          </div>

          <div>
            <h2 style={{ marginBottom: "15px", fontSize: "1.2rem", borderBottom: "1px solid var(--glass-border)", paddingBottom: "10px" }}>User Portal</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ margin: "10px 0" }}><Link to="/login" style={{ color: "var(--color-text-main)", textDecoration: "none" }}>Login</Link></li>
              <li style={{ margin: "10px 0" }}><Link to="/register" style={{ color: "var(--color-text-main)", textDecoration: "none" }}>Register</Link></li>
              <li style={{ margin: "10px 0" }}><Link to="/dashboard" style={{ color: "var(--color-text-main)", textDecoration: "none" }}>Dashboard</Link></li>
              <li style={{ margin: "10px 0" }}><Link to="/editor" style={{ color: "var(--color-text-main)", textDecoration: "none" }}>Resume Editor</Link></li>
              <li style={{ margin: "10px 0" }}><Link to="/profile" style={{ color: "var(--color-text-main)", textDecoration: "none" }}>Profile Settings</Link></li>
            </ul>
          </div>

          <div>
            <h2 style={{ marginBottom: "15px", fontSize: "1.2rem", borderBottom: "1px solid var(--glass-border)", paddingBottom: "10px" }}>Legal</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ margin: "10px 0" }}><Link to="/terms" style={{ color: "var(--color-text-main)", textDecoration: "none" }}>Terms of Service</Link></li>
              <li style={{ margin: "10px 0" }}><Link to="/privacy" style={{ color: "var(--color-text-main)", textDecoration: "none" }}>Privacy Policy</Link></li>
              <li style={{ margin: "10px 0" }}><Link to="/sitemap" style={{ color: "var(--color-text-main)", textDecoration: "none" }}>Sitemap</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Sitemap;
