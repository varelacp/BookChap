import {useEffect, useState, useContext} from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  SimpleGrid,
  VStack,
  Container,
  Flex
} from '@chakra-ui/react';
import {getAllBooks} from '../api/books.api';
import {CartContext} from '../context/CartContext';
import {FormattedNumber} from 'react-intl';
import {toast} from 'react-toastify';
import {AuthContext} from '../context/auth.context';
import {useNavigate} from 'react-router-dom';

import Carousel from '../components/UiComponents/Carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // import carousel styles

const Home = () => {
  const {addToCart} = useContext(CartContext);
  const [books, setBooks] = useState([]);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBooks().then(results => {
      setBooks(results.data);
    });
  }, []);

  const handleAddToCart = (e, book) => {
    e.preventDefault();

    if (user) {
      addToCart(user._id, book._id);
    } else {
      toast.warn('You need to log in to add books to the cart.');
      navigate('/login');
    }
  };

  // Randomize books
  const randomizeBooks = books => books.sort(() => Math.random() - 0.5);

  const renderCategory = (title, books) => (
    <Box key={title}>
      <Text fontSize='4xl' fontWeight='bold' mb='4' marginTop='50px'>
        {title}
      </Text>
      <SimpleGrid columns={{base: 1, md: 2, lg: 6}} spacing='5'>
        {books && books.length > 0 ? (
          books.slice(0, 6).map(book => (
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
                      value={book.rentalPrice}
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
          <Text>No books available.</Text>
        )}
      </SimpleGrid>
    </Box>
  );

  const renderMarketingMessage = (imgUrl, message) => (
    <Box position='relative' h='200px' my='20'>
      <Image src={imgUrl} alt='book marketing' fit='cover' w='100%' h='100%' />
      <Box
        position='absolute'
        top='0'
        bottom='0'
        left='0'
        right='0'
        bg='blackAlpha.400'>
        <Box
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'>
          <Text
            fontSize='4xl'
            color='white'
            fontWeight='bold'
            textAlign='center'
            // bg='rgba(0, 0, 0, 0.1)'
            p='6'>
            {message}
          </Text>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box px='5' pt='5'>
      <Carousel />
      {renderCategory('Trending Books', randomizeBooks(books))}
      {renderMarketingMessage(
        'https://res.cloudinary.com/dd3f3lrg3/image/upload/v1690331386/home_page2_bketaz.jpg',
        'Travel Without Moving'
      )}
      {renderCategory('Best Bargain Books', randomizeBooks(books))}
      {renderMarketingMessage(
        'https://res.cloudinary.com/dd3f3lrg3/image/upload/v1690332597/home_page4_catafd.jpg',
        'Discover the Unexplored'
      )}
      {renderCategory("Books Everyone's Talking About", randomizeBooks(books))}
    </Box>
  );
};

export default Home;
