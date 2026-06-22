import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'rgba(26, 26, 26, 0.8)',
            color: '#fff',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(16px)',
          },
          success: {
            iconTheme: {
              primary: '#52c41a',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4d4f',
              secondary: '#fff',
            },
          },
        }} 
      />
    </AuthProvider>
  </StrictMode>,
)
