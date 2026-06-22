import { useState, useEffect, useContext } from "react";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navbar-wrapper ${isScrolled ? "scrolled" : ""}`}>
      <nav className="navbar">
        <a href="/" className="logo">
          <Sparkles size={20} className="logo-icon" style={{ color: "var(--color-primary)" }} />
          ResumeForge
          <span className="logo-dot"></span>
        </a>

        <div className="nav-links">
          <a href="/" className={window.location.pathname === "/" ? "active" : ""}>Home</a>
          <a href="/templates" className={window.location.pathname === "/templates" ? "active" : ""}>Templates</a>
          {token && <a href="/dashboard" className={window.location.pathname === "/dashboard" ? "active" : ""}>Dashboard</a>}
          {token && <a href="/profile" className={window.location.pathname === "/profile" ? "active" : ""}>Profile</a>}
        </div>

        <div className="nav-actions">
          {token ? (
            <>
              <button className="create-btn" onClick={() => navigate("/templates")}>
                Create Resume
                <ArrowRight size={16} />
              </button>
              <button 
                onClick={handleLogout}
                style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--color-text-muted)', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                onMouseOver={(e) => { e.target.style.color = '#fff'; e.target.style.borderColor = '#fff'; }}
                onMouseOut={(e) => { e.target.style.color = 'var(--color-text-muted)'; e.target.style.borderColor = 'var(--glass-border)'; }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontWeight: '500' }}>Login</a>
              <button className="create-btn" onClick={() => navigate("/register")}>
                Register
                <ArrowRight size={16} />
              </button>
            </>
          )}
        </div>

        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer (optional/responsive fallback layout) */}
      {mobileMenuOpen && (
        <div style={{
          position: "absolute",
          top: "80px",
          left: 0,
          width: "100%",
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--glass-border)",
          padding: "20px 8%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          zIndex: 999,
          backdropFilter: "blur(16px)"
        }}>
          <a href="/" style={{ color: "white", textDecoration: "none", fontSize: "16px", fontWeight: "600" }}>Home</a>
          <a href="/templates" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontSize: "16px" }}>Templates</a>
          {token && <a href="/dashboard" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontSize: "16px" }}>Dashboard</a>}
          {token && <a href="/profile" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontSize: "16px" }}>Profile</a>}
          {token ? (
            <>
              <button className="create-btn" style={{ width: "100%", justifyContent: "center" }} onClick={() => { navigate("/templates"); setMobileMenuOpen(false); }}>
                Create Resume
                <ArrowRight size={16} />
              </button>
              <button onClick={handleLogout} style={{ width: "100%", background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--color-text-muted)', padding: '12px', borderRadius: '8px', cursor: 'pointer' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontSize: "16px" }}>Login</a>
              <button className="create-btn" style={{ width: "100%", justifyContent: "center" }} onClick={() => { navigate("/register"); setMobileMenuOpen(false); }}>
                Register
                <ArrowRight size={16} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;