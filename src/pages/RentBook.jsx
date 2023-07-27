import {useContext, useState} from 'react';
import {AuthContext} from '../context/auth.context';
import {CartContext} from '../context/CartContext';
import {rentBook} from '../api/rentals.api';
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Grid,
  Heading,
  Image,
  Button,
  Text,
  Flex,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Divider,
  Box
} from '@chakra-ui/react';

const RentBook = () => {
  const {user} = useContext(AuthContext);
  const {cartItems, clearCart} = useContext(CartContext);
  const [rentalDuration, setRentalDuration] = useState(30);
  const navigate = useNavigate();

  const handleRentBook = async () => {
    try {
      for (const book of cartItems) {
        const rentalDate = new Date(Date.now());
        const returnDate = new Date();
        const copy = returnDate;
        copy.setDate(rentalDate.getDate() + rentalDuration);

        await rentBook(
          book._id,
          user._id,
          rentalDate,
          copy
          // returnDateUTC.toISOString()
        );

        // show success message for each book rented successfully
        toast.success(`Successfully rented ${book.title}`);
      }

      // Clear cart after successfully renting all books
      clearCart(user._id);

      // Reset rental duration
      setRentalDuration(30);

      // Navigate to user dashboard after successful rental
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Failed to rent books:', error);
      // show error message
      toast.error(`Failed to rent books: ${error.message}`);
    }
  };

  return (
    <Box justify='center' align='center' h='100vh' p={5}>
      <ToastContainer />
      <Heading mb={10}>Checkout</Heading>
      <Grid templateColumns='repeat(2, 1fr)' gap={10}>
        <VStack align='start' spacing={5}>
          <Heading fontSize={'2xl'}>Rental Summary</Heading>
          {cartItems.length === 0 ? (
            <Text>Your cart is empty.</Text>
          ) : (
            cartItems.map((book, index) => (
              <Box key={book._id}>
                <Flex align='center'>
                  <Image
                    src={book.imgUrl}
                    alt={book.title}
                    boxSize={['100px', '125px', '150px']}
                    objectFit='contain'
                  />
                  <Box ml={3}>
                    <Flex flexDirection='column' align='flex-start'>
                      <Heading size='md'>{book.title}</Heading>
                      <Text>Author: {book.author}</Text>
                      <Text>Price: €{book.rentalPrice}</Text>
                    </Flex>
                  </Box>
                </Flex>
                {index < cartItems.length - 1 && (
                  <Divider
                    mt={6}
                    mb={2}
                    borderColor='gray.400'
                    borderWidth={1}
                  />
                )}
              </Box>
            ))
          )}
        </VStack>
        <Box>
          <Heading fontSize={'2xl'} mb={5}>
            Shipping Information
          </Heading>
          <FormControl id='name'>
            <FormLabel>Name</FormLabel>
            <Input type='text' />
          </FormControl>
          <FormControl id='address' mt={4}>
            <FormLabel>Address</FormLabel>
            <Input type='text' />
          </FormControl>
          <FormControl id='email' mt={4}>
            <FormLabel>Email</FormLabel>
            <Input type='email' />
          </FormControl>
          <Text mt={5}>Rental Duration (days): </Text>
          <Input
            placeholder='Rental Duration'
            value={rentalDuration}
            disabled
          />
          <Button
            colorScheme='orange'
            bg={'orange.400'}
            _hover={{bg: 'orange.500'}}
            mt='10'
            onClick={handleRentBook}>
            Rent Book
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default RentBook;
