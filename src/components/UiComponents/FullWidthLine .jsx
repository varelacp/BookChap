import {Box} from '@chakra-ui/react';

const FullWidthLine = () => {
  return (
    <Box
      borderBottom={2}
      borderStyle={'solid'}
      borderColor={'orange.400'}
      width='100vw'
      position='relative'
      left='50%'
      right='50%'
      marginLeft='-50vw'
      marginRight='-50vw'
      marginTop='20px'
      marginBottom='15px'
    />
  );
};

export default FullWidthLine;
