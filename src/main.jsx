import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProviderWrapper} from './context/auth.context.jsx';
import {CartProvider} from './context/CartContext.jsx';
import {ChakraProvider} from '@chakra-ui/react';
import {SearchProvider} from './context/search.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <SearchProvider>
          <CartProvider>
            <ChakraProvider>
              <App />
            </ChakraProvider>
          </CartProvider>
        </SearchProvider>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);
