// import { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';

// import { deleteBook, getBook } from '../api/books.api';

// const BookDetails = () => {
//   const [book, setBook] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const fetchBook = async () => {
//     try {
//       const response = await getBook(id);
//       setBook(response.data);
//     } catch (error) {
//       console.log('Error fetching project', error);
//     }
//   };

//   useEffect(() => {
//     fetchBook(id);
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       await deleteBook(id);
//       navigate('/books');
//     } catch (error) {
//       console.log('Error deleting the project', error);
//     }
//   };
//   return (
//     <div className='bookDetails'>
//       {book && (
//         <div>
//           <h1>{book.title}</h1>
//           {book.imgUrl && <img src={book.imgUrl} alt={book.title} />}
//           <p>{book.author}</p>
//           <p>{book.description}</p>

//           <Link to={`/books/edit/${id}`}>
//             <button>Edit Book</button>
//           </Link>
//           <button onClick={handleDelete}>Delete Book</button>
//         </div>
//       )}

//       <Link to={`/books`}>Back to Books Page</Link>
//     </div>
//   );
// };

// export default BookDetails;

import {useState, useEffect} from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Link as ChakraLink
} from '@chakra-ui/react';
import {Link, useParams, useNavigate} from 'react-router-dom';

import {deleteBook, getBook} from '../api/books.api';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();

  const fetchBook = async () => {
    try {
      const response = await getBook(id);
      setBook(response.data);
    } catch (error) {
      console.log('Error fetching book', error);
    }
  };

  useEffect(() => {
    fetchBook(id);
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteBook(id);
      navigate('/books');
    } catch (error) {
      console.log('Error deleting the book', error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <Box px='5' pt='5'>
      <Flex direction='row' justify='space-around'>
        <Box width='30%' mx='3'>
          <Image
            boxSize='200px'
            w='full'
            h='400px'
            objectFit='contain'
            marginTop={'45%'}
            src={book.imgUrl}
            alt={book.title}
          />
        </Box>
        <Box width='70%' mx='3'>
          <Flex direction='column' align='flex-start' marginTop={'40px'}>
            <Text fontSize='4xl' fontWeight='bold' mt='4'>
              {book.title}
            </Text>
            <Text fontSize='md' color='gray.500'>
              {book.author}
            </Text>
            <Text fontSize='md' mt='4' textAlign={'left'}>
              {book.description}
            </Text>

            <Flex
              direction='column'
              justifyContent='space-between'
              alignItems={'flex-start'}
              mt='4'>
              <ChakraLink as={Link} to={`/books/edit/${id}`} mt='4'>
                <Button
                  fontSize='md'
                  colorScheme='orange'
                  bg={'orange.400'}
                  _hover={{bg: 'orange.500'}}
                  mt='4'>
                  EDIT BOOK
                </Button>
              </ChakraLink>
              <Button
                fontSize='md'
                colorScheme='red'
                mt='4'
                onClick={handleDelete}>
                DELETE BOOK
              </Button>
            </Flex>
            <ChakraLink as={Link} to='/books' mt='4'>
              Back to Books Page
            </ChakraLink>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default BookDetails;
