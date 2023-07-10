/*  import { useEffect, useState } from 'react';
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
      */
  /*   </div>
  );
};

export default Books;
  */


import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { getAllBooks } from '../api/books.api';
import { getBookById } from '../api/googleBooksToDB.api';
import { FormattedNumber, IntlProvider } from 'react-intl';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mongodbBooks, setMongodbBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (searchTerm === '') {
          const response = await getAllBooks();
          const data = response.data;
          setMongodbBooks(data);
        } else {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`
          );
          const data = await response.json();
          setBooks(data.items || []);
        }
      } catch (error) {
        console.log('An error occurred while fetching books:', error);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const handleSearch = term => {
    setSearchTerm(term);
  };

  const isBookInMongoDB = bookId => {
    return mongodbBooks.some(book => book.id === bookId);
  };

  const getRentalPrice = category => {
    switch (category) {
      case 'Fiction':
        return 10; // Set the rental price for Fiction category
      case 'Non-fiction':
        return 12; // Set the rental price for Non-fiction category
      case 'Science Fiction':
        return 15; // Set the rental price for Science Fiction category
      case 'Mystery':
        return 11; // Set the rental price for Mystery category
      case 'Romance':
        return 9; // Set the rental price for Romance category
      case 'Fantasy':
        return 14; // Set the rental price for Fantasy category
      case 'Thriller':
        return 13; // Set the rental price for Thriller category
      case 'Travel':
        return 8; // Set the rental price for Travel category
      default:
        return 0; // Return 0 as the default rental price for unknown categories
    }
  };

  const Thumbnail = ({ bookId }) => {
    const [thumbnail, setThumbnail] = useState('');

    useEffect(() => {
      const fetchThumbnail = async () => {
        try {
          const book = await getBookById(bookId);
          setThumbnail(book.thumbnail || '');
        } catch (error) {
          console.log('An error occurred while retrieving the book:', error);
        }
      };

      fetchThumbnail();
    }, [bookId]);

    return <img src={thumbnail} alt='' />;
  };

  const handleAddToCart = bookId => {
    // Implement your logic to add the book to the cart
    console.log(`Book ${bookId} added to cart.`);
  };

  return (
    <IntlProvider locale='en'>
      <div>
        <SearchBar onSearch={handleSearch} />

        {/* Display books from MongoDB if no search has been performed */}
        {searchTerm === '' &&
          mongodbBooks.map(book => (
            <div key={`mongodb-${book._id}`}>
              {book.imgUrl && <img src={book.imgUrl} alt={book.title} />}
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>
                Rental Price:{' '}
                <FormattedNumber
                  style='currency'
                  currency='EUR'
                  value={getRentalPrice(book.category)}
                />
              </p>
              <button onClick={() => handleAddToCart(book._id)}>
                Add to Cart
              </button>
              <Link to={`/books/${book._id}`}>Details</Link>
            </div>
          ))}

        {/* Display books from Google Books API if search has been performed */}
        {searchTerm !== '' &&
          books.map(book => (
            <div key={`googleapi-${book.id}`}>
              <h3>{book.volumeInfo?.title}</h3>
              <p>Author: {book.volumeInfo?.authors?.join(', ')}</p>
              <Thumbnail bookId={book.id} />
              {/* <p>Description: {book.volumeInfo?.description}</p> */}
            </div>
          ))}

        {/* Display books from MongoDB that are also in the Google Books API */}
        {searchTerm !== '' &&
          books.map(book => {
            if (isBookInMongoDB(book._id)) {
              return (
                <div key={`mongodb-${book.id}`}>
                  <h3>{book.volumeInfo?.title}</h3>
                  <p>Author: {book.volumeInfo?.authors?.join(', ')}</p>
                  {/* <p>Description: {book.volumeInfo?.description}</p> */}
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
    </IntlProvider>
  );
};

export default Books;