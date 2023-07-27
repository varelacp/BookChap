import {useEffect, useState} from 'react';
import {getActiveRentals} from '../api/rentals.api';
import {toast} from 'react-toastify';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue as mode
} from '@chakra-ui/react';
import _ from 'lodash'; // lodash is a utility library that provides helpful methods for manipulating arrays and objects

const ActiveRentals = () => {
  const [activeRentals, setActiveRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveRentals = async () => {
      try {
        const response = await getActiveRentals();
        setActiveRentals(_.groupBy(response.data, 'user._id'));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching active rentals:', error);
        setLoading(false);
        toast.error('Error fetching active rentals');
      }
    };

    fetchActiveRentals();
  }, []);

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
            Active Rentals
          </Heading>
          {Object.keys(activeRentals).map((userId, userIndex) => (
            <Stack spacing='6' key={userId}>
              <Text fontSize='lg' fontWeight='semibold'>
                User: {activeRentals[userId][0].user?.name}
              </Text>
              {activeRentals[userId].map((rental, index) => (
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
                        <Text>Rental Date: {rental.rentalDate}</Text>
                        <Text>Return Date: {rental.returnDate}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                  {index < activeRentals[userId].length - 1 && (
                    <Divider
                      mt={6}
                      mb={2}
                      borderColor={mode('gray.400')}
                      borderWidth={1}
                    />
                  )}
                </Box>
              ))}
              {userIndex < Object.keys(activeRentals).length - 1 && (
                <Divider
                  mt={6}
                  mb={2}
                  borderColor={mode('orange.400')}
                  borderWidth={1}
                />
              )}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ActiveRentals;
