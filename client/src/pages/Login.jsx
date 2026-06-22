import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token, res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '40px', borderRadius: '16px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--color-primary)' }}>Login</h2>
        {error && <div style={{ color: '#ff4d4f', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)' }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: '#fff' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: '#fff' }}
            />
          </div>
          <button type="submit" className="create-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
            Login
          </button>
        </form>
        <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
