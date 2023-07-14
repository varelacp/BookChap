/* 
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { getAllBooks } from '../api/books.api';
import { getBookById } from '../api/googleBooksToDB.api';
import { FormattedNumber, IntlProvider } from 'react-intl';
import { rentBook } from '../api/rentals.api';
import {toast} from 'react-toastify'



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
        return 10;
      case 'Non-fiction':
        return 12; 
      case 'Science Fiction':
        return 15; 
      case 'Mystery':
        return 11; 
      case 'Romance':
        return 9; 
      case 'Fantasy':
        return 14; 
      case 'Thriller':
        return 13; 
      case 'Travel':
        return 8; 
      default:
        return 0; 
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

  const handleRentBook = async bookId => {
    try {
      // Call the API to rent the book
      await rentBook(bookId);
      // Handle any post-rental logic or UI updates

      toast.success('Book rented successfully');
    } catch (error) {
      toast.error('An error occurred while renting the book.');
    }
  };

  return (

    <IntlProvider locale='en'>
      <div>

      <Link to="/book">Add Book</Link>

   
        <SearchBar onSearch={handleSearch} /> */
/* 

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
              <button onClick={() => handleRentBook(book._id)}>
                Add to Cart
              </button>
              <Link to={`/books/${book._id}`}>Details</Link>
            </div>
          ))}

      
        {searchTerm !== '' &&
          books.map(book => (
            <div key={`googleapi-${book.id}`}>
              <h3>{book.volumeInfo?.title}</h3>
              <p>Author: {book.volumeInfo?.authors?.join(', ')}</p>
              <Thumbnail bookId={book.id} />
           
            </div>
          ))}

        {searchTerm !== '' &&
          books.map(book => {
            if (isBookInMongoDB(book._id)) {
              return (
                <div key={`mongodb-${book.id}`}>
                  <h3>{book.volumeInfo?.title}</h3>
                  <p>Author: {book.volumeInfo?.authors?.join(', ')}</p>
                
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

export default Books; */


import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getAllBooks } from '../api/books.api';
import { FormattedNumber, IntlProvider } from 'react-intl';
import { CartContext, CartProvider } from '../context/CartContext';
import SearchBar from '../components/SearchBar';

const Books = () => {
  const [mongodbBooks, setMongodbBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getAllBooks();
        const data = response.data;
        setMongodbBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.log('An error occurred while fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = term => {
    setSearchTerm(term);
    const filtered = mongodbBooks.filter(book =>
      book.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleAddToCart = book => {
    addToCart(book);
  };

  const getRentalPrice = category => {
    switch (category) {
      case 'Fiction':
        return 10;
      case 'Non-fiction':
        return 12;
      case 'Science Fiction':
        return 15;
      case 'Mystery':
        return 11;
      case 'Romance':
        return 9;
      case 'Fantasy':
        return 14;
      case 'Thriller':
        return 13;
      case 'Travel':
        return 8;
      default:
        return 0;
    }
  };

  return (
    <CartProvider>
      <IntlProvider locale='en'>
        <div>
          <Link to='/book'>Add Book</Link>
          <SearchBar onSearch={handleSearch} />
          {/* Render books from MongoDB */}
          {(searchTerm === '' ? mongodbBooks : filteredBooks).map(book => (
            <div key={book._id}>
              {book.imgUrl && <img src={book.imgUrl} alt={book.title} />}
              <h3>{book.title}</h3>
              <button onClick={() => handleAddToCart(book)}>Add to Cart</button>
              <p>Author: {book.author}</p>
              <p>
                Rental Price:{' '}
                <FormattedNumber
                  style='currency'
                  currency='EUR'
                  value={getRentalPrice(book.category)}
                />
              </p>
              <Link to={`/books/${book._id}`}>Details</Link>
            </div>
          ))}
        </div>
      </IntlProvider>
    </CartProvider>
  );
};

export default Books;