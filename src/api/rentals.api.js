import axios from 'axios';
const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;


export const getActiveRentals = () => {
    return axios.get(`${baseURL}/rentals/active`);
  };
  
  export const getUserRentals = (userId) => {
    return axios.get(`${baseURL}/users/${userId}/rentals`);
  };
  
  export const rentBook = (bookId, userId, rentalDate, returnDate) => {
    const rentalData = {
      bookId,
      userId,
      rentalDate,
      returnDate
    };
    return axios.post(`${baseURL}/rentals`, rentalData);
  };
  
  export const returnBook = (rentalId) => {
    return axios.put(`${baseURL}/rentals/${rentalId}/return`);
  };
  