import {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Link as ChakraLink
} from '@chakra-ui/react';
import {getBook, updateBook} from '../api/books.api';

const EditBook = () => {
  const [book, setBook] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBook(id);
        // Check if the rentalPrice exists and convert it to a number
        if (response.data.rentalPrice) {
          response.data.rentalPrice = Number(response.data.rentalPrice);
        }
        setBook(response.data);
      } catch (error) {
        console.log('Error fetching the book:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleInputChange = e => {
    let value = e.target.value;

    // If the input field is for rentalPrice, convert the value to a number.
    if (e.target.name === 'rentalPrice') {
      value = value ? Number(value) : '';
    }

    setBook(prevBook => ({
      ...prevBook,
      [e.target.name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateBook(book);
      navigate('/books');
    } catch (error) {
      console.log('Error updating the book:', error);
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
              Description: {book.description}
            </Text>

            <FormControl id='rentalPrice' mt='4'>
              <FormLabel>Rental Price:</FormLabel>
              <Input
                type='number'
                name='rentalPrice'
                value={book.rentalPrice}
                onChange={handleInputChange}
              />
            </FormControl>

            <Button
              fontSize='md'
              colorScheme='orange'
              bg={'orange.400'}
              marginTop='20px'
              _hover={{bg: 'orange.500'}}
              mt='4'
              onClick={handleUpdate}>
              UPDATE BOOK
            </Button>
            <ChakraLink as={Link} to='/books' mt='4' color={'orange'}>
              Back to Books Page
            </ChakraLink>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default EditBook;
