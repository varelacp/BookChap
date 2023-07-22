import {Box, Image, Text, Button, Flex} from '@chakra-ui/react';

const BookCard = ({title, author, rentalPrice, thumbnail, onAddToCart}) => {
  return (
    <Box boxShadow='md' p='6' rounded='md' bg='white' h='100%' w='70%'>
      <Flex justify='center' align='center'>
        <Image
          boxSize='100px'
          objectFit='scale-down'
          src={thumbnail}
          alt={title}
          mb='4'
        />
      </Flex>
      <Text fontWeight='bold' mb='2'>
        {title}
      </Text>
      <Text mb='2'>{author}</Text>
      <Flex justify='space-between' align='center'>
        <Text fontWeight='bold'>${rentalPrice}</Text>
        <Button onClick={onAddToCart} colorScheme='blue' size='xs'>
          Add to Cart
        </Button>
      </Flex>
    </Box>
  );
};

export default BookCard;
