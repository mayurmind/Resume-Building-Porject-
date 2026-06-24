import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import API from "../services/api";
import toast from "react-hot-toast";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token, res.data);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
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
            <h2 className="auth-title">Welcome back</h2>
            <p className="auth-subtitle">Enter your details to access your account.</p>
          </div>
          
          <form className="auth-form" onSubmit={handleSubmit}>
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
                  placeholder="••••••••"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  style={{ paddingLeft: "44px" }}
                />
              </div>
            </div>
            
            <button type="submit" className="auth-submit-btn" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? "Signing in..." : "Sign in"}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
          </form>
          
          <div className="auth-footer">
            Don't have an account? <Link to="/register" className="auth-link">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
