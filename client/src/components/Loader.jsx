const Loader = ({ fullScreen = false, text = "Loading..." }) => {
  const loaderContent = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div className="spinner"></div>
      <p style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(10, 10, 10, 0.7)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999
      }}>
        {loaderContent}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
      {loaderContent}
    </div>
  );
};

export default Loader;
