/* 
import axios from 'axios';

const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

const axiosInstance = axios.create({
  baseURL,
});

export const searchBooks = async (searchQuery) => {
  try {
    const response = await axiosInstance.get('/books/search', {
      params: {
        query: searchQuery,
      },
    });

    const books = response.data;
    return books;
  } catch (error) {
    console.log('An error occurred while searching for books:', error);
    throw error;
  }
};

export const addBook = async (book) => {
  try {
    const response = await axiosInstance.post('/books', book);
    return response.data;
  } catch (error) {
    console.log('An error occurred while adding the book:', error);
    throw error;
  }
};


 */

import axios from 'axios';

const baseURL = `${import.meta.env.VITE_PROJECTS_API}/api`;

const axiosInstance = axios.create({
  baseURL,
});

export const searchBooks = async (searchQuery) => {
  try {
    const response = await axiosInstance.get('/books/search', {
      params: {
        query: searchQuery,
      },
    });

    const books = response.data;
    return books;
  } catch (error) {
    console.log('An error occurred while searching for books:', error);
    throw error;
  }
};

export const addBook = async (book) => {
  try {
    const response = await axiosInstance.post('/books', book);
    return response.data;
  } catch (error) {
    console.log('An error occurred while adding the book:', error);
    throw error;
  }
};

export default axiosInstance;
