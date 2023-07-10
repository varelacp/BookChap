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

const googleBooksAPI = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/'
});

export const searchBooks = async searchQuery => {
  try {
    const response = await googleBooksAPI.get('volumes', {
      params: {
        q: searchQuery
      }
    });
    console.log(response.data.items)
    // Process the response data from the Google Books API
    const books = response.data.items.map(item => {
      console.log(item)
      const { title, authors, description, imageLinks, industryIdentifiers, categories  } = item.volumeInfo;
      const thumbnail = imageLinks?.thumbnail || '';
      const category = categories ? categories[0] : undefined
      const isbn = getISBN13(industryIdentifiers).identifier
      return {
        title,
        author: authors.join(', '),
        description,
        thumbnail,
        category,
        id: item.id,
        isbn
      };
    });

    return books;
  } catch (error) {
    console.log('An error occurred while searching for books:', error);
    throw error;
  }
};


const getISBN13 = (industryIdentifiers) => {
  return industryIdentifiers.find(identifier => identifier.type === 'ISBN_13')
}

export const getBookById = async bookId => {
  try {
    const response = await googleBooksAPI.get(`volumes/${bookId}`);
    const bookData = response.data.volumeInfo;
    const { thumbnail } = bookData.imageLinks ?? {};

    const book = {
      title: bookData.title,
      author: bookData.authors?.join(', '),
      description: bookData.description,
      thumbnail
    };
    return book;
  } catch (error) {
    console.log('An error occurred while retrieving the book:', error);
    throw error;
  }
};