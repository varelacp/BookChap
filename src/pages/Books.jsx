import {useEffect, useState, useContext, useRef} from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  SimpleGrid,
  VStack,
  Container,
  Flex,
  Divider
} from '@chakra-ui/react';
import {Search2Icon} from '@chakra-ui/icons';
import {getAllBooks} from '../api/books.api';
import {CartContext} from '../context/CartContext';
import {FormattedNumber} from 'react-intl';
import {toast} from 'react-toastify';
import {AuthContext} from '../context/auth.context';
import {useNavigate} from 'react-router-dom';
import {useSearch} from '../context/search.context';

const Books = () => {
  const {addToCart} = useContext(CartContext);
  const [groupedBooks, setGroupedBooks] = useState({});
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const {searchTerm} = useSearch();
  const [searchClicked, setSearchClicked] = useState(false);

  const resultsRef = useRef(null);

  useEffect(() => {
    getAllBooks().then(results => {
      const books = results.data.filter(
        book =>
          book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (typeof book.author === 'string' &&
            book.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
          book.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.isbn?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const grouped = books.reduce((result, book) => {
        (result[book.category] = result[book.category] || []).push(book);
        return result;
      }, {});
      setGroupedBooks(grouped);
    });
  }, [searchTerm]);

  useEffect(() => {
    if (resultsRef.current && searchTerm && searchClicked) {
      resultsRef.current.scrollIntoView({behavior: 'smooth'});
      setSearchClicked(false);
    }
  }, [groupedBooks]);

  const handleAddToCart = (e, book) => {
    e.preventDefault();
    if (user) {
      addToCart(user._id, book._id);
    } else {
      toast.warn('You need to log in to add books to the cart.');
      navigate('/login');
    }
  };

  const getRentalPrice = book => {
    // If the rentalPrice field is set and not 0, use it
    if (book.rentalPrice && book.rentalPrice !== 0) {
      return Number(book.rentalPrice);
    }
    switch (book.category) {
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
    <Box px='5' pt='5'>
      <Box position='relative'>
        <Image
          src='https://res.cloudinary.com/dd3f3lrg3/image/upload/v1690196414/image_header-bookspage03_fsxicz.jpg'
          alt='Background Image'
          h='400px'
          w='full'
          objectFit='cover'
          marginBottom='40px'
        />
        <Text
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
          fontSize='4xl'
          fontWeight='bold'
          color='white'>
          Find your next extraordinary journey in our captivating Books.
        </Text>
      </Box>
      <Box>
        {user && user.role === 'admin' && (
          <Box mt={20}>
            <Text fontSize={'xl'} fontWeight={'bold'}>
              Click the button below to add a New Book
            </Text>
            <Button
              colorScheme='orange'
              mt={5}
              onClick={() => navigate('/book')}>
              Add Book
            </Button>
          </Box>
        )}
      </Box>
      <Box ref={resultsRef}>
        {Object.entries(groupedBooks).map(([category, books], index) => (
          <Box key={category}>
            <Text fontSize='4xl' fontWeight='bold' mb='4' marginTop='50px'>
              {category}
            </Text>
            <SimpleGrid columns={{base: 1, md: 2, lg: 6}} spacing='5'>
              {books && books.length > 0 ? (
                books.map(book => (
                  <VStack key={book._id} spacing={2} align='stretch'>
                    <Container centerContent>
                      <Flex direction='column' align='center' justify='center'>
                        <Image
                          boxSize='200px'
                          objectFit='scale-down'
                          marginTop='40px'
                          src={book.imgUrl}
                          alt={book.title}
                          onClick={() => navigate(`/books/${book._id}`)}
                          cursor='pointer'
                        />
                        <Text
                          fontSize='md'
                          fontWeight='bold'
                          textAlign='center'
                          marginTop='10px'
                          isTruncated
                          noOfLines={1}
                          w='100%'>
                          {book.title}
                        </Text>
                        <Text fontSize='sm' textAlign='center'>
                          {book.author}
                        </Text>
                        <Text fontWeight='bold' marginTop='20px'>
                          <FormattedNumber
                            style='currency'
                            currency='EUR'
                            value={getRentalPrice(book)}
                          />
                        </Text>
                        <Button
                          fontSize='xs'
                          colorScheme='orange'
                          bg={'orange.400'}
                          marginTop='20px'
                          onClick={e => handleAddToCart(e, book)}
                          _hover={{bg: 'orange.500'}}>
                          ADD TO CART
                        </Button>
                      </Flex>
                    </Container>
                  </VStack>
                ))
              ) : (
                <Text>No books available in this category.</Text>
              )}
            </SimpleGrid>
            {index < Object.entries(groupedBooks).length - 1 && (
              <Divider
                my={6}
                mt={20}
                colorScheme='gray'
                borderColor='gray.200'
                borderWidth={1}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Books;
