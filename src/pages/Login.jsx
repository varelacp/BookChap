import {useState, useContext} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {login} from '../api/auth.api';
import {AuthContext} from '../context/auth.context';
import {toast} from 'react-toastify';
import {FaGoogle} from 'react-icons/fa';
import {signInEmailPassword} from '../config/firebase.config';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const {handleGoogleAuthentication} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const user = {email, password};
      const response = await toast.promise(login(user), {
        pending: 'We are hard at work, please wait!',
        success: 'Welcome!',
        error: 'Something went wrong, try again later'
      });

      await signInEmailPassword(response.data.authToken);

      navigate('/');
    } catch (error) {
      console.log('Error login in', error);
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
      maxW='960px'
      mx='auto'
      marginTop='10%'>
      <Flex direction={{base: 'column', md: 'row'}}>
        <Flex
          flex={1}
          align='center'
          justify='center'
          p={8}
          bg='white'
          h={{base: 'auto', md: '600px'}}
          w={{base: 'auto', md: '600px'}}>
          <Stack spacing={4} w='full'>
            <Heading marginBottom={'40px'} fontSize='2xl'>
              Login to your account
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl id='email'>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  name='email'
                  value={email}
                  onChange={handleEmail}
                />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  name='password'
                  value={password}
                  onChange={handlePassword}
                />
              </FormControl>
              <Stack spacing={6}>
                <Button
                  marginTop={'20px'}
                  type='submit'
                  colorScheme={'orange'}
                  bg='orange.400'
                  _hover={{bg: 'orange.500'}}
                  variant={'solid'}>
                  Login
                </Button>
              </Stack>
            </form>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            {/* <button onClick={handleGoogleAuthentication}>
              Login With Google
            </button> */}
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
            <p>Don&apos;t have an account yet?</p>
            <RouterLink className='signUpLink' to='/signup'>
              Sign Up
            </RouterLink>
          </Stack>
        </Flex>
        <Flex
          flex={1}
          align='center'
          justify='center'
          bg='white'
          h={{base: 'auto', md: '600px'}}
          w={{base: 'auto', md: '400px'}}>
          <Box w='full' h='full' overflow='hidden'>
            <Image
              alt={'Login Image'}
              objectFit={'cover'}
              src={
                'https://res.cloudinary.com/dd3f3lrg3/image/upload/v1690132200/login-image_kagvnd.jpg'
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
export default Login;
