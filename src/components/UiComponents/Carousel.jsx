// import {useState} from 'react';
// import {Flex, Box, Text, Image} from '@chakra-ui/react';

// const Carousel = () => {
//   const arrowStyles = {
//     cursor: 'pointer',
//     pos: 'absolute',
//     top: '50%',
//     w: 'auto',
//     mt: '-22px',
//     p: '16px',
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: '18px',
//     transition: '0.6s ease',
//     borderRadius: '0 3px 3px 0',
//     userSelect: 'none',
//     _hover: {
//       opacity: 0.8,
//       bg: 'black'
//     }
//   };

//   const slides = [
//     {
//       img: 'https://res.cloudinary.com/dd3f3lrg3/image/upload/v1689954530/books_carousel_mvu8ck.jpg'
//     },
//     {
//       img: 'https://res.cloudinary.com/dd3f3lrg3/image/upload/v1689955825/Carousel2_ub2mlp.jpg'
//     },
//     {
//       img: 'https://res.cloudinary.com/dd3f3lrg3/image/upload/v1689955930/Carousel3_kbfusq.jpg'
//     }
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slidesCount = slides.length;

//   const prevSlide = () => {
//     setCurrentSlide(s => (s === 0 ? slidesCount - 1 : s - 1));
//   };

//   const nextSlide = () => {
//     setCurrentSlide(s => (s === slidesCount - 1 ? 0 : s + 1));
//   };

//   const carouselStyle = {
//     transition: 'all .5s',
//     ml: `-${currentSlide * 100}%`
//   };

//   return (
//     <Flex
//       w='full'
//       bg='white'
//       _dark={{
//         bg: '#3e3e3e'
//       }}
//       p={10}
//       alignItems='center'
//       justifyContent='center'>
//       <Flex w='full' overflow='hidden' pos='relative'>
//         <Flex h='400px' w='full' {...carouselStyle}>
//           {slides.map((slide, sid) => (
//             <Box key={`slide-${sid}`} boxSize='full' shadow='md' flex='none'>
//               <Text
//                 color='white'
//                 fontSize='xs'
//                 p='8px 12px'
//                 pos='absolute'
//                 top='0'>
//                 {sid + 1} / {slidesCount}
//               </Text>
//               <Image
//                 src={slide.img}
//                 alt='carousel image'
//                 boxSize='full'
//                 backgroundSize='cover'
//               />
//             </Box>
//           ))}
//         </Flex>
//         <Text {...arrowStyles} left='0' onClick={prevSlide}>
//           &#10094;
//         </Text>
//         <Text {...arrowStyles} right='0' onClick={nextSlide}>
//           &#10095;
//         </Text>
//       </Flex>
//     </Flex>
//   );
// };

// export default Carousel;

import {useState} from 'react';
import {Flex, Box, Text, Image} from '@chakra-ui/react';

const Carousel = () => {
  const arrowStyles = {
    cursor: 'pointer',
    pos: 'absolute',
    top: '50%',
    w: 'auto',
    mt: '-22px',
    p: '16px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px',
    transition: '0.6s ease',
    borderRadius: '0 3px 3px 0',
    userSelect: 'none',
    _hover: {
      opacity: 0.8,
      bg: 'black'
    }
  };

  const slides = [
    {
      img: 'https://res.cloudinary.com/dd3f3lrg3/image/upload/v1689954530/books_carousel_mvu8ck.jpg'
    },
    {
      img: 'https://res.cloudinary.com/dd3f3lrg3/image/upload/v1689955825/Carousel2_ub2mlp.jpg'
    },
    {
      img: 'https://res.cloudinary.com/dd3f3lrg3/image/upload/v1689955930/Carousel3_kbfusq.jpg'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide(s => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(s => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const carouselStyle = {
    transition: 'all .5s',
    ml: `-${currentSlide * 100}%`
  };

  return (
    <Flex w='full' p={0} alignItems='center' justifyContent='center'>
      <Flex w='full' overflow='hidden' pos='relative'>
        <Flex h='400px' w='full' {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} boxSize='full' shadow='md' flex='none'>
              <Text
                color='white'
                fontSize='xs'
                p='8px 12px'
                pos='absolute'
                top='0'>
                {sid + 1} / {slidesCount}
              </Text>
              <Image
                src={slide.img}
                alt='carousel image'
                boxSize='full'
                objectFit='cover'
              />
            </Box>
          ))}
        </Flex>
        <Text {...arrowStyles} left='0' onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right='0' onClick={nextSlide}>
          &#10095;
        </Text>
      </Flex>
    </Flex>
  );
};

export default Carousel;
