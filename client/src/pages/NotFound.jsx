import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div className="glass-card" style={{ padding: '60px 40px', borderRadius: '24px', maxWidth: '500px', width: '100%' }}>
        <h1 style={{ fontSize: '100px', fontWeight: 800, margin: 0, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          404
        </h1>
        <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '16px' }}>Page Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button 
          className="create-btn" 
          onClick={() => navigate('/')}
          style={{ margin: '0 auto' }}
        >
          <ArrowLeft size={18} style={{ marginRight: '8px' }} />
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
