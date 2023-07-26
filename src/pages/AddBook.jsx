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
