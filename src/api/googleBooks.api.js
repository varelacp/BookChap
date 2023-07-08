import axios from 'axios';

const googleBooksAPI = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/',
});

export const searchBooks = async (searchQuery) => {
  try {
    const response = await googleBooksAPI.get('volumes', {
      params: {
        q: searchQuery,
      },
    });

    // Process the response data from the Google Books API
    const books = response.data.items.map((item) => {
      const { title, authors, description } = item.volumeInfo;
      return {
        title,
        author: authors.join(', '),
        description,
      };
    });

    return books;
  } catch (error) {
    console.log('An error occurred while searching for books:', error);
    throw error;
  }
};

export const getBookById = async (bookId) => {
  try {
    const response = await googleBooksAPI.get(`volumes/${bookId}`);
    const bookData = response.data.volumeInfo;
    const book = {
      title: bookData.title,
      author: bookData.authors.join(', '),
      description: bookData.description,
    };
    return book;
  } catch (error) {
    console.log('An error occurred while retrieving the book:', error);
    throw error;
  }
};
 



