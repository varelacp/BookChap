import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProviderWrapper} from './context/auth.context.jsx';
import {CartProvider} from './context/CartContext.jsx';
import {ChakraProvider} from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <CartProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </CartProvider>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);
