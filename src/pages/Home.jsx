// import {useEffect, useState} from 'react';
// import {
//   Box,
//   Image,
//   Badge,
//   Button,
//   VStack,
//   Heading,
//   Text,
//   Flex,
//   Center
// } from '@chakra-ui/react';
// import {getAllBooks} from '../api/books.api'; // replace with your actual API path

// const Home = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await getAllBooks();
//         setBooks(response.data);
//       } catch (error) {
//         console.error('Failed to fetch books:', error);
//       }
//     };

//     fetchBooks();
//   }, []);

//   return (
//     <div>
//       <h1>Welcome to BookChap</h1>

//       {books.map(book => (
//         <Box
//           key={book._id}
//           maxW='sm'
//           borderWidth='1px'
//           borderRadius='lg'
//           overflow='hidden'
//           boxShadow='lg'
//           p='6'
//           m='4'>
//           <Image src={book.imgUrl} alt={book.title} />

//           <VStack align='start' spacing={2} mt='5'>
//             <Heading size='md'>{book.title}</Heading>
//             <Text>Author: {book.author}</Text>
//             <Badge borderRadius='full' px='2' colorScheme='teal'>
//               ${book.price}
//             </Badge>
//             <Button colorScheme='teal' variant='outline' width='full'>
//               Add to Cart
//             </Button>
//           </VStack>
//         </Box>
//       ))}
//     </div>
//   );
// };

// export default Home;

// import {useEffect, useState} from 'react';
// import {
//   Box,
//   Image,
//   Badge,
//   Button,
//   VStack,
//   Heading,
//   Text,
//   Flex,
//   Center
// } from '@chakra-ui/react';
// import {getAllBooks} from '../api/books.api'; // replace with your actual API path

// const Home = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await getAllBooks();
//         setBooks(response.data);
//       } catch (error) {
//         console.error('Failed to fetch books:', error);
//       }
//     };

//     fetchBooks();
//   }, []);

//   return (
//     <div>
//       <h1>Welcome to BookChap</h1>

//       <Flex wrap='wrap' justifyContent='center'>
//         {books.map(book => (
//           <Center key={book._id} w='24%' m='1'>
//             <Box
//               maxW='sm'
//               borderWidth='1px'
//               borderRadius='lg'
//               overflow='hidden'
//               boxShadow='lg'
//               p='6'
//               h='450px' // Static height for the box
//             >
//               <Box h='200px' overflow='hidden'>
//                 <Image
//                   src={book.imgUrl}
//                   alt={book.title}
//                   objectFit='cover'
//                   h='100%'
//                 />
//               </Box>

//               <VStack align='start' spacing={2} mt='5'>
//                 <Heading size='md' noOfLines={2}>
//                   {book.title}
//                 </Heading>
//                 <Text noOfLines={1}>Author: {book.author}</Text>
//                 <Badge borderRadius='full' px='2' colorScheme='teal'>
//                   ${book.price}
//                 </Badge>
//                 <Button colorScheme='teal' variant='outline' width='full'>
//                   Add to Cart
//                 </Button>
//               </VStack>
//             </Box>
//           </Center>
//         ))}
//       </Flex>
//     </div>
//   );
// };

// export default Home;

// import {useEffect, useState, useContext} from 'react';
// import {Box, SimpleGrid} from '@chakra-ui/react';
// import {getAllBooks} from '../api/books.api';
// import BookCard from '../components/BookCard';
// import {CartContext, CartProvider} from '../context/CartContext';

// const Home = () => {
//   const {addToCart} = useContext(CartContext);
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     getAllBooks().then(results => {
//       // For example, to get books in the 'Fiction' category
//       const fictionBooks = results.data.filter(
//         book => book.category === 'Fiction'
//       );
//       setBooks(fictionBooks);
//     });
//   }, []);

//   const handleAddToCart = (e, book) => {
//     e.preventDefault();
//     addToCart(book);
//   };

//   return (
//     <Box px='5' pt='5'>
//       <SimpleGrid columns={{base: 1, md: 2, lg: 4}} spacing='5'>
//         {books.map(book => (
//           <BookCard
//             key={book._id}
//             title={book.title}
//             author={book.author}
//             price={book.price}
//             thumbnail={book.imgUrl}
//             onAddToCart={e => handleAddToCart(e, book)}
//           />
//         ))}
//       </SimpleGrid>
//     </Box>
//   );
// };

// export default Home;

// import {useEffect, useState, useContext} from 'react';
// import {
//   Box,
//   Image,
//   Text,
//   Button,
//   SimpleGrid,
//   VStack,
//   Container,
//   Flex
// } from '@chakra-ui/react';
// import {getAllBooks} from '../api/books.api';
// import {CartContext, CartProvider} from '../context/CartContext';
// import {FormattedNumber} from 'react-intl';

// const Home = () => {
//   const {addToCart} = useContext(CartContext);
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     getAllBooks().then(results => {
//       // For example, to get books in the 'Fiction' category
//       const fictionBooks = results.data.filter(
//         book => book.category === 'Fiction'
//       );
//       setBooks(fictionBooks);
//     });
//   }, []);

//   const handleAddToCart = (e, book) => {
//     e.preventDefault();
//     addToCart(book);
//   };

//   return (
//     <Box px='5' pt='5'>
//       <SimpleGrid columns={{base: 1, md: 2, lg: 6}} spacing='5'>
//         {books.map(book => (
//           <VStack key={book._id} spacing={2} align='stretch'>
//             <Container centerContent>
//               <Flex direction='column' align='center' justify='center'>
//                 <Image
//                   boxSize='200px'
//                   objectFit='scale-down'
//                   marginTop='40px'
//                   src={book.imgUrl}
//                   alt={book.title}
//                 />

//                 <Text
//                   fontSize='md'
//                   fontWeight='bold'
//                   textAlign='center'
//                   marginTop='10px'
//                   isTruncated
//                   noOfLines={2}
//                   w='100%'>
//                   {book.title}
//                 </Text>
//                 <Text fontSize='sm' textAlign='center'>
//                   {book.author}
//                 </Text>
//                 <Text fontWeight='bold'>
//                   Rental Price:
//                   <FormattedNumber
//                     style='currency'
//                     currency='EUR'
//                     value={getRentalPrice(category)}
//                   />
//                 </Text>
//                 <Button
//                   fontSize='xs'
//                   colorScheme='orange'
//                   marginTop='20px'
//                   onClick={() => handleAddToCart(book)}>
//                   ADD TO CART
//                 </Button>
//               </Flex>
//             </Container>
//           </VStack>
//         ))}
//       </SimpleGrid>
//     </Box>
//   );
// };

// export default Home;

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

import Carousel from '../components/UiComponents/Carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // import carousel styles

const Home = () => {
  const {addToCart} = useContext(CartContext);
  const [groupedBooks, setGroupedBooks] = useState({});

  useEffect(() => {
    getAllBooks().then(results => {
      // Group books by category
      const books = results.data;
      const grouped = books.reduce((result, book) => {
        (result[book.category] = result[book.category] || []).push(book);
        return result;
      }, {});
      setGroupedBooks(grouped);
    });
  }, []);

  const handleAddToCart = (e, book) => {
    e.preventDefault();
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
    <Box px='5' pt='5'>
      <Carousel />
      {Object.entries(groupedBooks).map(([category, books]) => (
        <Box key={category}>
          <Text fontSize='4xl' fontWeight='bold' mb='4' marginTop='50px'>
            {category}
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
                          value={getRentalPrice(book.category)}
                        />
                      </Text>
                      <Button
                        fontSize='xs'
                        colorScheme='orange'
                        marginTop='20px'
                        onClick={() => handleAddToCart(book)}>
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

          {
            // add a conditional to avoid rendering a separator after the last category
            Object.keys(groupedBooks).length - 1 && (
              <Box my='4' bg='gray.600' h='1px' marginTop='60px' />
            )
          }
        </Box>
      ))}
    </Box>
  );
};

export default Home;
