import {useEffect, useState, useContext} from 'react';
import {AuthContext} from '../context/auth.context';
import {getUserRentals, returnBook} from '../api/rentals.api';
import {toast} from 'react-toastify';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue as mode
} from '@chakra-ui/react';

const UserRentals = () => {
  const {user} = useContext(AuthContext);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchUserRentals = async () => {
      try {
        if (user) {
          const response = await getUserRentals(user._id);
          setRentals(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserRentals();
  }, [user]);

  const handleReturnBook = async rentalId => {
    try {
      await returnBook(rentalId);
      // Filter out the returned book from the rentals state
      setRentals(prevRentals =>
        prevRentals.filter(rental => rental._id !== rentalId)
      );
      toast.success('Book returned successfully!');
    } catch (error) {
      console.log(error);
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
            base: '8'
          }}
          flex='2'>
          <Heading fontSize='2xl' fontWeight='extrabold'>
            My Rentals
          </Heading>
          <Stack spacing='6'>
            {rentals.length > 0 ? (
              rentals.map((rental, index) => (
                <Box key={rental._id}>
                  <Flex align='center'>
                    {rental.book?.imgUrl && (
                      <Image
                        src={rental.book.imgUrl}
                        alt={rental.book.title}
                        boxSize={['100px', '125px', '150px']}
                        objectFit='contain'
                      />
                    )}
                    <Box ml={3}>
                      <Flex flexDirection='column' align='flex-start'>
                        <Text>Title: {rental.book?.title}</Text>
                        <Text>Author: {rental.book?.author}</Text>
                        <Text>Return Date: {rental.returnDate}</Text>
                        <Button
                          colorScheme='orange'
                          bg={'orange.400'}
                          _hover={{bg: 'orange.500'}}
                          mt={2}
                          onClick={() => handleReturnBook(rental._id)}>
                          Return Book
                        </Button>
                      </Flex>
                    </Box>
                  </Flex>
                  {index < rentals.length - 1 && (
                    <Divider
                      mt={6}
                      mb={2}
                      borderColor={mode('gray.400')}
                      borderWidth={1}
                    />
                  )}
                </Box>
              ))
            ) : (
              <Text>No rentals found.</Text>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserRentals;
