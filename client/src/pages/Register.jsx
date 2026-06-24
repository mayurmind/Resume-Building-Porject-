import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { Sparkles, Mail, Lock, User, ArrowRight } from "lucide-react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await API.post("/auth/register", { name, email, password });
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-orb-1"></div>
      <div className="auth-bg-orb-2"></div>
      
      <div className="auth-card-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <Sparkles size={24} style={{ color: "var(--color-primary)" }} />
              ResumeForge
            </Link>
            <h2 className="auth-title">Create an account</h2>
            <p className="auth-subtitle">Start building your professional resume today.</p>
          </div>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <label className="auth-label">Full Name</label>
              <div style={{ position: "relative" }}>
                <User size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                <input 
                  type="text" 
                  className="auth-input"
                  placeholder="John Doe"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  style={{ paddingLeft: "44px" }}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                <input 
                  type="email" 
                  className="auth-input"
                  placeholder="you@example.com"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  style={{ paddingLeft: "44px" }}
                />
              </div>
            </div>
            
            <div className="auth-input-group">
              <label className="auth-label">Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                <input 
                  type="password" 
                  className="auth-input"
                  placeholder="Create a strong password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  minLength="6"
                  style={{ paddingLeft: "44px" }}
                />
              </div>
            </div>
            
            <button type="submit" className="auth-submit-btn" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? "Creating account..." : "Create account"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>
          
          <div className="auth-footer">
            Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
