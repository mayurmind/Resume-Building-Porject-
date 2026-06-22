import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import API from "../services/api";
import toast from "react-hot-toast";

function Profile() {
  const { user, login, logout } = useContext(AuthContext);

  // Profile Edit State
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  // Password Change State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setName(user.name);
      setEmail(user.email);
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/auth/profile", { name, email });
      login(res.data.token, res.data);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await API.put("/auth/change-password", { oldPassword, newPassword });
      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ color: 'var(--color-primary)', marginBottom: '32px' }}>User Profile</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
        {/* Profile Update Section */}
        <div className="glass-card" style={{ padding: '32px', borderRadius: '16px' }}>
          <h3 style={{ marginBottom: '24px', color: '#fff' }}>Edit Profile</h3>
          
          <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)' }}>Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: '#fff' }}
              />
            </div>
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
            <button type="submit" className="create-btn" style={{ marginTop: '8px' }}>
              Update Profile
            </button>
          </form>
        </div>

        {/* Password Change Section */}
        <div className="glass-card" style={{ padding: '32px', borderRadius: '16px' }}>
          <h3 style={{ marginBottom: '24px', color: '#fff' }}>Change Password</h3>
          
          <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)' }}>Old Password</label>
              <input 
                type="password" 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)} 
                required 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: '#fff' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-muted)' }}>New Password</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: '#fff' }}
              />
            </div>
            <button type="submit" className="create-btn" style={{ marginTop: '8px' }}>
              Change Password
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={logout} 
            style={{ padding: '12px 32px', background: 'transparent', border: '1px solid #ff4d4f', color: '#ff4d4f', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
            onMouseOver={(e) => { e.target.style.background = '#ff4d4f'; e.target.style.color = '#fff'; }}
            onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#ff4d4f'; }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
