 import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`
        );
        const data = await response.json();
        setBooks(data.items);
      } catch (error) {
        console.log('An error occurred while fetching books:', error);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {books && books.map((book) => (
        <div key={book.id}>
          <h3>{book.volumeInfo.title}</h3>
          <p>Author: {book.volumeInfo.authors?.join(', ')}</p>
          <p>Description: {book.volumeInfo.description}</p>
        </div>
      ))}
      {/* 
        books ? display da api externa : booksLocais && books to mongodb
      */}
    </div>
  );
};

export default Books;
 
