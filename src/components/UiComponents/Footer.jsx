import {
  Box,
  Container,
  Stack,
  Text,
  VisuallyHidden,
  Icon
} from '@chakra-ui/react';
import {FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa';

const SocialButton = ({label, href, children}) => {
  return (
    <Box
      as='a'
      href={href}
      cursor='pointer'
      p={2}
      color='white'
      _hover={{
        color: 'gray.500'
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Box>
  );
};

export default function SmallWithSocial() {
  return (
    <Box bg='black' color='white' mt={'80px'}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={8}
        direction={{base: 'column', md: 'row'}}
        spacing={4}
        justify={{base: 'center', md: 'space-between'}}
        align={{base: 'center', md: 'center'}}>
        <Text>© 2023 BoopkChap. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Twitter'} href={'#'}>
            <Icon as={FaTwitter} w={6} h={6} />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'#'}>
            <Icon as={FaYoutube} w={6} h={6} />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <Icon as={FaInstagram} w={6} h={6} />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
