import {useEffect, useState} from 'react';
import {getUserDashboard} from '../api/users.api';
import {Box, Flex, Text, VStack, Icon, Button, Avatar} from '@chakra-ui/react';
import {FaEnvelope, FaMapMarkerAlt, FaPhoneAlt} from 'react-icons/fa';

import {Link} from 'react-router-dom';

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserDashboard();
        setDashboardData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!dashboardData) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box
      mt={20}
      px={8}
      py={6}
      boxShadow='lg'
      rounded='md'
      bg='white'
      maxWidth='2xl'
      mx='auto'>
      <VStack spacing={4} alignItems='center' mt={10} mb={10}>
        <Text fontSize='2xl' fontWeight='bold'>
          Welcome, {dashboardData.name}!
        </Text>
        <Avatar size='2xl' src={dashboardData.profileImage} alt='Profile' />
        <Flex align='center'>
          <Icon as={FaEnvelope} mr={2} />
          <Text>{dashboardData.email}</Text>
        </Flex>
        <Flex align='center'>
          <Icon as={FaMapMarkerAlt} mr={2} />
          <Text>{dashboardData.address}</Text>
        </Flex>
        <Flex align='center'>
          <Icon as={FaPhoneAlt} mr={2} />
          <Text>{dashboardData.phoneNumber}</Text>
        </Flex>
        <Flex mt={4}>
          <Button
            colorScheme='orange'
            bg={'orange.400'}
            _hover={{bg: 'orange.500'}}
            as={Link}
            to='/users/:userId/rentals'
            mr={2}>
            My Rentals
          </Button>
          <Button
            colorScheme='green'
            bg={'green.400'}
            _hover={{bg: 'green.500'}}
            as={Link}
            to='/user-dashboard-edit'>
            Edit Profile
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default UserDashboard;
