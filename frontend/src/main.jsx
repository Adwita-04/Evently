import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { FavoriteProvider } from './context/FavoriteContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
       <FavoriteProvider>
                <App />
            </FavoriteProvider>
      </AuthProvider>
  </React.StrictMode>,
)