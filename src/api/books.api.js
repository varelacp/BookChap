import axios from 'axios';
const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

// const setAuthorizationHeaders = () => {
//   // set the JWT token in the headers for every request in this file
//   axios.interceptors.request.use(config => {
//     // retrieve the JWT token from the local storage
//     const storedToken = localStorage.getItem('authToken');

//     if (storedToken) {
//       config.headers = { Authorization: `Bearer ${storedToken}` };
//     }
//     return config;
//   });
// };

// setAuthorizationHeaders();

// self calling function
// (() => {
//   // set JWT token in the headers for every request in this file
//   axios.interceptors.request.use(config => {
//     // retrieve the JWT token from the local storage
//     const storedToken = localStorage.getItem('authToken');

//     if (storedToken) {
//       config.headers = { Authorization: `Bearer ${storedToken}` };
//     }

//     return config;
//   });
// })();

export const getAllBooks = () => {
  return axios.get(`${baseURL}/books`);
};

export const getBook = id => {
  return axios.get(`${baseURL}/book/${id}`);
};

export const addBook = book => {
  return axios.post(`${baseURL}/books/`, book);
};

export const updateBook = updatedbook => {
  return axios.put(`${baseURL}/books/${updatedbook._id}`, updatedbook);
};

export const deleteBook = id => {
  return axios.delete(`${baseURL}/books/${id}`);
};

export const searchBookByISBN = (isbn) => {
    return axios.get(`${baseURL}/books/search/isbn/${isbn}`);
  };
  
  export const searchBooksByCategory = (category) => {
    return axios.get(`${baseURL}/books/search/category/${category}`);
  };
  