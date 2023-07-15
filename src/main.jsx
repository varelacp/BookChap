import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProviderWrapper } from './context/auth.context.jsx'
import { CartProvider } from './context/CartContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> 
      <CartProvider>

      <AuthProviderWrapper>
    <App />
      </AuthProviderWrapper>
      </CartProvider>
    </Router>
  </React.StrictMode>,
)
