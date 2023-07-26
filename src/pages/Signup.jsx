import {useState, useContext} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {signup} from '../api/auth.api';
import {FaGoogle} from 'react-icons/fa';
import {AuthContext} from '../context/auth.context';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Image
} from '@chakra-ui/react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const {handleGoogleAuthentication} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handleName = e => setName(e.target.value);
  const handleAddress = e => setAddress(e.target.value);
  const handleRole = e => setRole(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const user = {email, password, name, address, role};
      await signup(user);
      navigate('/login');
    } catch (error) {
      console.log('Error signup up', error);
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
      maxW='1080px'
      mx='auto'
      marginTop='5%'>
      <Flex direction={{base: 'column', md: 'row'}}>
        <Flex
          flex={1}
          align='center'
          justify='center'
          p={'8'}
          bg='white'
          h={{base: 'auto', md: '700px'}}
          w={{base: 'auto', md: '700px'}}>
          <Stack spacing={4} w='full'>
            <Heading marginBottom={'40px'} fontSize='2xl'>
              Sign Up
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl id='name'>
                <FormLabel>Name</FormLabel>
                <Input type='text' value={name} onChange={handleName} />
              </FormControl>
              <FormControl id='email'>
                <FormLabel>Email</FormLabel>
                <Input type='email' value={email} onChange={handleEmail} />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  value={password}
                  onChange={handlePassword}
                />
              </FormControl>
              <FormControl id='address'>
                <FormLabel>Address</FormLabel>
                <Input type='text' value={address} onChange={handleAddress} />
              </FormControl>
              <FormControl id='role'>
                <FormLabel>Role</FormLabel>
                <Select
                  placeholder='Select role'
                  value={role}
                  onChange={handleRole}>
                  <option value='user'>User</option>
                  <option value='isAdmin'>Admin</option>
                </Select>
              </FormControl>
              <Stack spacing={6}>
                <Button
                  marginTop={'20px'}
                  type='submit'
                  colorScheme={'orange'}
                  bg='orange.400'
                  _hover={{bg: 'orange.500'}}
                  variant={'solid'}>
                  Signup
                </Button>
              </Stack>
            </form>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <Button
              leftIcon={<FaGoogle />}
              onClick={handleGoogleAuthentication}
              colorScheme='gray'
              // bg='gray.300'
              borderWidth='2px'
              textColor={'gray'}
              variant={'outline'}>
              Login With Google
            </Button>
            <p>Already have an account?</p>
            <RouterLink className='loginLink' to='/login'>
              Login
            </RouterLink>
          </Stack>
        </Flex>
        <Flex
          flex={1}
          align='center'
          justify='center'
          bg='white'
          h={{base: 'auto', md: '700px'}}
          w={{base: 'auto', md: '500px'}}>
          <Box w='full' h='full' overflow='hidden'>
            <Image
              alt={'Signup Image'}
              objectFit={'cover'}
              src={
                'https://res.cloudinary.com/dd3f3lrg3/image/upload/v1690134306/signup2-image_aqvseh.jpg'
              }
              w='full'
              h='full'
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Signup;
