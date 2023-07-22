import axios from 'axios';
const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

// Add an item to the cart
export const addToCart = (userId, bookId) => {
  return axios.post(`${baseURL}/cart`, {userId, bookId});
};

// Remove an item from the cart
export const removeFromCart = (userId, bookId) => {
  return axios.delete(`${baseURL}/cart/${userId}/items/${bookId}`);
};

// Get cart items for a user
export const getCartItems = userId => {
  return axios.get(`${baseURL}/cart/${userId}/items`);
};

// Clear the cart
export const clearCart = userId => {
  return axios.delete(`${baseURL}/cart/${userId}`);
};
