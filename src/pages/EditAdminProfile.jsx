import {useState, useEffect} from 'react';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack
} from '@chakra-ui/react';
import {
  getAdminDashboard,
  updateAdminProfile,
  uploadImage
} from '../api/users.api';

const EditAdminProfile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleName = e => setName(e.target.value);
  const handleAddress = e => setAddress(e.target.value);
  const handlePhoneNumber = e => setPhoneNumber(e.target.value);

  const handleProfileImage = async event => {
    try {
      const file = event.target.files[0];
      const uploadedImage = await uploadImage(file);
      setProfileImage(uploadedImage.data.fileUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await getAdminDashboard();
        const {name, email, address, phoneNumber, profileImage} = response.data;
        setName(name);
        setEmail(email);
        setAddress(address);
        setPhoneNumber(phoneNumber);
        setProfileImage(profileImage);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    fetchAdminData();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const admin = {name, address, phoneNumber, profileImage};
      await updateAdminProfile(admin);
      alert('Profile updated!');
    } catch (error) {
      console.log('Error updating profile', error);
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <Box
      boxShadow='2xl'
      p='6'
      rounded='md'
      bg='white'
      maxW='800px'
      mx='auto'
      marginTop='5%'>
      <Flex
        direction={{base: 'column', md: 'row'}}
        align='center'
        justify='center'
        p={'8'}
        bg='white'
        h={{base: 'auto', md: '700px'}}
        w={{base: 'auto', md: '750px'}}
        px={{base: '4', md: '12'}} // Add horizontal padding
      >
        <Stack spacing={4} w={{base: '100%', md: '80%'}}>
          <Heading marginBottom={'40px'} fontSize='2xl'>
            Admin Profile
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id='name'>
              <FormLabel>Name</FormLabel>
              <Input type='text' value={name} onChange={handleName} />
            </FormControl>
            <FormControl id='email'>
              <FormLabel>Email</FormLabel>
              <Input type='email' value={email} disabled />
            </FormControl>
            <FormControl id='address'>
              <FormLabel>Address</FormLabel>
              <Input type='text' value={address} onChange={handleAddress} />
            </FormControl>
            <FormControl id='phoneNumber'>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type='text'
                value={phoneNumber}
                onChange={handlePhoneNumber}
              />
            </FormControl>
            <FormControl id='profileImage'>
              <FormLabel>Profile Image</FormLabel>
              <Input type='file' onChange={handleProfileImage} />
            </FormControl>
            <Stack spacing={6}>
              <Button
                marginTop={'20px'}
                type='submit'
                colorScheme={'orange'}
                bg='orange.400'
                _hover={{bg: 'orange.500'}}
                variant={'solid'}>
                Update Profile
              </Button>
            </Stack>
          </form>
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </Stack>
      </Flex>
    </Box>
  );
};

export default EditAdminProfile;
