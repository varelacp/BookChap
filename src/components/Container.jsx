import {Box} from '@chakra-ui/react';

const Container = props => {
  return (
    <Box maxW='1200px' m='0 auto'>
      {props.children}
    </Box>
  );
};

export default Container;
