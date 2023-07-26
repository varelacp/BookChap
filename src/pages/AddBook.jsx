/* import { useState } from 'react';
import { addBook } from '../api/books.api';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState(false);
  const [category, setCategory] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [isbn, setIsbn] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  


  const handleAddBook = async (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      description,
      availability,
      category,
      imgUrl,
      isbn,
      reviews,
      rating,
    };



    try {
      await addBook(newBook);
      // Handle success or redirect to a different page
      console.log('Book added successfully');
    } catch (error) {
      console.log('An error occurred while adding the book:', error);
    }
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form onSubmit={handleAddBook}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Availability:
          <input
            type="checkbox"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
          />
        </label>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Image URL:
          <input type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
        </label>
        <label>
          ISBN:
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        </label>
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
        </label>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
 */

// import {useState} from 'react';
// import SearchBar from '../components/SearchBar';
// import {addBook} from '../api/books.api';
// import {searchBooks} from '../api/googleBooksToDB.api';
// import {FormattedNumber} from 'react-intl';

// const AddBook = () => {
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedBooks, setSelectedBooks] = useState([]);

//   const handleSearch = async (searchQuery, category) => {
//     try {
//       const books = await searchBooks(searchQuery, category);
//       setSearchResults(books);
//     } catch (error) {
//       console.log('An error occurred while searching for books:', error);
//     }
//   };

//   const handleBookSelect = book => {
//     const rentalPrice = getRentalPrice(book.category);
//     const selectedBook = {
//       ...book,
//       availability: false,
//       rentedBy: null,
//       rentalPrice: rentalPrice,
//       imgUrl: book.thumbnail
//     };
//     setSelectedBooks(prevSelectedBooks => [...prevSelectedBooks, selectedBook]);
//   };

//   const getRentalPrice = category => {
//     switch (category) {
//       case 'Fiction':
//         return 10;
//       case 'Non-fiction':
//         return 12;
//       case 'Science Fiction':
//         return 15;
//       case 'Mystery':
//         return 11;
//       case 'Romance':
//         return 9;
//       case 'Fantasy':
//         return 14;
//       case 'Thriller':
//         return 13;
//       case 'Travel':
//         return 8;
//       default:
//         return 0;
//     }
//   };

//   const handleSaveBooks = async () => {
//     try {
//       for (const book of selectedBooks) {
//         // Add the book to the database
//         await addBook(book);
//       }

//       console.log('Books saved successfully');

//       setSelectedBooks([]);
//     } catch (error) {
//       console.log('An error occurred while saving the books:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Add Book</h1>

//       <SearchBar onSearch={handleSearch} />
//       <button onClick={handleSaveBooks}>Save Books</button>

//       <h2>Search Results</h2>
//       {searchResults.map((book, index) => (
//         <div key={`googleapi-${book.id}-${index}`}>
//           <h3>{book.title}</h3>
//           {book.author && <p>Author: {book.author}</p>}
//           {book.description && <p>Description: {book.description}</p>}
//           {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
//           <button onClick={() => handleBookSelect(book)}>Select</button>
//         </div>
//       ))}
//       {/* <h3>{book.title}</h3>
//           <p>Author: {book.authors?.join(', ')}</p>
//           <p>Description: {book.description}</p>
//           {book.imgUrl && <img src={book.imgUrl} alt={book.title} />}
//           <button onClick={() => handleBookSelect(book)}>Select</button>
//         </div>
//       ))} */}

//       {selectedBooks.map((book, index) => (
//         <div key={index}>
//           <h3>{book.title}</h3>
//           <p>Author: {book.authors?.join(', ')}</p>
//           <p>Description: {book.description}</p>
//           {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
//           <p>
//             Rental Price:{' '}
//             <FormattedNumber
//               style='currency'
//               currency='EUR'
//               value={getRentalPrice(book.category)}
//             />
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AddBook;

import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  Flex,
  Divider
} from '@chakra-ui/react';
import {useState} from 'react';
import SearchBar from '../components/SearchBar';
import {addBook} from '../api/books.api';
import {searchBooks} from '../api/googleBooksToDB.api';
import {FormattedNumber} from 'react-intl';
import {toast} from 'react-toastify';

const AddBook = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);

  const handleSearch = async (searchQuery, category) => {
    try {
      const books = await searchBooks(searchQuery, category);
      setSearchResults(books);
    } catch (error) {
      console.log('An error occurred while searching for books:', error);
    }
  };

  const handleBookSelect = book => {
    const rentalPrice = getRentalPrice(book.category);
    const selectedBook = {
      ...book,
      availability: false,
      rentedBy: null,
      rentalPrice: rentalPrice,
      imgUrl: book.thumbnail
    };
    setSelectedBooks(prevSelectedBooks => [...prevSelectedBooks, selectedBook]);
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

  const handleSaveBooks = async () => {
    try {
      for (const book of selectedBooks) {
        toast.success('Book saved successfully');
        await addBook(book);
      }

      setSelectedBooks([]);
    } catch (error) {
      console.log('An error occurred while saving the books:', error);
    }
  };

  return (
    <Box p={5}>
      <Heading mb={5} mt={10}>
        Add Book
      </Heading>

      <SearchBar onSearch={handleSearch} />
      <Button
        colorScheme='green'
        bg={'green.400'}
        _hover={{bg: 'green.500'}}
        onClick={handleSaveBooks}
        my={5}>
        Save Books
      </Button>

      <Heading size='md' my={5} mt={10}>
        Results for books
      </Heading>
      {searchResults.map((book, index) => (
        <Box key={`googleapi-${book.id}-${index}`}>
          <Flex align='center'>
            {book.thumbnail && (
              <Image
                src={book.thumbnail}
                alt={book.title}
                boxSize={['100px', '125px', '150px']}
                objectFit='contain'
              />
            )}
            <Box ml={3}>
              <Flex
                flexDirection='column'
                align='start'
                marginTop={'40px'}
                marginLeft={'20px'}>
                <Heading size='md'>{book.title}</Heading>
                {book.author && (
                  <Text marginBottom={'10px'}>Author: {book.author}</Text>
                )}
                {book.description && (
                  <Text textAlign={'left'}>
                    Description: {book.description}
                  </Text>
                )}
                <Text marginTop={'10px'}>
                  Rental Price:
                  <FormattedNumber
                    style='currency'
                    currency='EUR'
                    value={getRentalPrice(book.category)}
                  />
                </Text>
                <Button
                  colorScheme='orange'
                  bg={'orange.400'}
                  _hover={{bg: 'orange.500'}}
                  mt={2}
                  onClick={() => handleBookSelect(book)}>
                  Select
                </Button>
              </Flex>
            </Box>
          </Flex>
          {index < searchResults.length - 1 && (
            <Divider mt={6} mb={2} borderColor='gray.400' borderWidth={1} />
          )}
        </Box>
      ))}

      {selectedBooks.map((book, index) => (
        <VStack key={index} spacing={4} align='start' my={5}>
          <Heading size='sm'>{book.title}</Heading>
          <Text>Author: {book.authors?.join(', ')}</Text>
          <Text>Description: {book.description}</Text>
          {book.thumbnail && (
            <Image boxSize='100px' src={book.thumbnail} alt={book.title} />
          )}
          <Text>
            Rental Price:{' '}
            <FormattedNumber
              style='currency'
              currency='EUR'
              value={getRentalPrice(book.category)}
            />
          </Text>
        </VStack>
      ))}
    </Box>
  );
};

export default AddBook;
