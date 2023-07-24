// import {Link} from 'react-router-dom';
// import {useContext, useEffect, useState} from 'react';
// import {getAllBooks} from '../api/books.api';
// import {FormattedNumber, IntlProvider} from 'react-intl';
// import {CartContext, CartProvider} from '../context/CartContext';
// import {AuthContext} from '../context/auth.context';

// import SearchBar from '../components/SearchBar';

// const Books = () => {
//   const [mongodbBooks, setMongodbBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const {addToCart} = useContext(CartContext);
//   const {user} = useContext(AuthContext);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await getAllBooks();
//         const data = response.data;
//         setMongodbBooks(data);
//         setFilteredBooks(data);
//       } catch (error) {
//         console.log('An error occurred while fetching books:', error);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const handleSearch = term => {
//     setSearchTerm(term);
//     const filtered = mongodbBooks.filter(book =>
//       book.title.toLowerCase().includes(term.toLowerCase())
//     );
//     setFilteredBooks(filtered);
//   };

//   const handleAddToCart = (e, book) => {
//     e.preventDefault();
//     addToCart(user._id, book._id);
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

//   return (
//     <CartProvider>
//       <IntlProvider locale='en'>
//         <div>
//           <Link to='/book'>Add Book</Link>
//           <SearchBar onSearch={handleSearch} />
//           {/* Render books from MongoDB */}
//           {(searchTerm === '' ? mongodbBooks : filteredBooks).map(book => (
//             <div key={book._id}>
//               {book.imgUrl && <img src={book.imgUrl} alt={book.title} />}
//               <h3>{book.title}</h3>
//               <button onClick={e => handleAddToCart(e, book)}>
//                 Add to Cart
//               </button>
//               <p>Author: {book.author}</p>
//               <p>
//                 Rental Price:{' '}
//                 <FormattedNumber
//                   style='currency'
//                   currency='EUR'
//                   value={getRentalPrice(book.category)}
//                 />
//               </p>
//               <Link to={`/books/${book._id}`}>Details</Link>
//             </div>
//           ))}
//         </div>
//       </IntlProvider>
//     </CartProvider>
//   );
// };

// export default Books;
import {useEffect, useState, useContext} from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  SimpleGrid,
  VStack,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement
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

  const {searchTerm} = useSearch(); // Add this line

  useEffect(() => {
    getAllBooks().then(results => {
      const books = results.data.filter(
        book =>
          book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (typeof book.author === 'string' &&
            book.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
          book.isbn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const grouped = books.reduce((result, book) => {
        (result[book.category] = result[book.category] || []).push(book);
        return result;
      }, {});
      setGroupedBooks(grouped);
    });
  }, [searchTerm]);

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
        <Button colorScheme='orange' mt={5} onClick={() => navigate('/book')}>
          Add Book
        </Button>
      </Box>
      {/* <InputGroup mb='4'>
        <InputLeftElement pointerEvents='none'>
          <Search2Icon color='gray.300' />
        </InputLeftElement>
        <Input
          placeholder='Search books...'
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup> */}
      {Object.entries(groupedBooks).map(([category, books]) => (
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
        </Box>
      ))}
    </Box>
  );
};

export default Books;
