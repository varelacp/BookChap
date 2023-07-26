import {useContext} from 'react';
import {CartContext} from '../context/CartContext';
import {AuthContext} from '../context/auth.context';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Image,
  Text,
  Button,
  Divider,
  useColorModeValue as mode
} from '@chakra-ui/react';
import {Link as RouterLink} from 'react-router-dom';

const Cart = () => {
  const {cartItems, removeFromCart, clearCart, itemCount} =
    useContext(CartContext);
  const {user} = useContext(AuthContext);

  const handleRemoveFromCart = (userId, bookId) => {
    removeFromCart(userId, bookId);
  };

  const handleClearCart = () => {
    if (user && user._id) {
      clearCart(user._id);
    } else {
      console.log('User is not defined or user._id is not available.');
    }
  };

  return (
    <Box
      maxW={{
        base: '3xl',
        lg: '7xl'
      }}
      mx='auto'
      px={{
        base: '4',
        md: '8',
        lg: '12'
      }}
      py={{
        base: '6',
        md: '8',
        lg: '12'
      }}>
      <Stack
        direction={{
          base: 'column',
          lg: 'row'
        }}
        align={{
          lg: 'flex-start'
        }}
        spacing={{
          base: '8',
          md: '16'
        }}>
        <Stack
          spacing={{
            base: '8',
            md: '10'
          }}
          flex='2'>
          <Heading fontSize='2xl' fontWeight='extrabold'>
            My Cart ({itemCount} items)
          </Heading>

          <Stack spacing='6'>
            {cartItems.map((book, index) => (
              <Box key={book._id}>
                <Flex align='center'>
                  {book.imgUrl && (
                    <Image
                      src={book.imgUrl}
                      alt={book.title}
                      boxSize={['100px', '125px', '150px']}
                      objectFit='contain'
                    />
                  )}
                  <Box ml={3}>
                    <Flex flexDirection='column' align='flex-start'>
                      <Heading size='md'>{book.title}</Heading>
                      <Text>Author: {book.author}</Text>
                      <Text>Price: €{book.rentalPrice}</Text>
                      <Button
                        colorScheme='red'
                        mt={2}
                        onClick={() =>
                          handleRemoveFromCart(user._id, book._id)
                        }>
                        Remove
                      </Button>
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
            ))}
            <HStack mt='6' fontWeight='semibold'>
              <p>or</p>
              <Link
                as={RouterLink}
                to='/'
                color={mode('orange.400')}
                onClick={handleClearCart}>
                Clear Cart
              </Link>
            </HStack>
            <Flex justifyContent='center'>
              <Button
                as={RouterLink}
                to='/rentals'
                colorScheme='orange'
                bg={'orange.400'}
                _hover={{bg: 'orange.500'}}
                mt='10'
                maxWidth='200px'>
                Proceed to Rent
              </Button>
            </Flex>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Cart;
