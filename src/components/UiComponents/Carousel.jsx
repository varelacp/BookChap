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
      img: 'https://res.cloudinary.com/dd3f3lrg3/image/upload/v1689954530/books_carousel_mvu8ck.jpg',
      title: 'Welcome to BookChap!',
      subtitle: 'Your online destination for renting books'
    },
    {
      img: 'https://res.cloudinary.com/dd3f3lrg3/image/upload/v1690159022/carousel_02_neulm3.jpg',
      title: 'Explore Our Collections',
      subtitle: 'Find your next favorite book from our vast collection'
    },
    {
      img: 'https://res.cloudinary.com/dd3f3lrg3/image/upload/v1689955930/Carousel3_kbfusq.jpg',
      title: 'Awesome Bargains!',
      subtitle: 'Lots of books at great prices'
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
            <Box
              key={`slide-${sid}`}
              boxSize='full'
              shadow='md'
              flex='none'
              pos='relative'>
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
              <Box
                pos='absolute'
                top='0'
                left='0'
                h='100%'
                w='100%'
                bg='blackAlpha.600'
                display='flex'
                alignItems='center'
                justifyContent='center'>
                <Box textAlign='center'>
                  <Text color='white' fontSize='6xl'>
                    {slide.title}
                  </Text>
                  <Text color='white' fontSize='xl'>
                    {slide.subtitle}
                  </Text>
                </Box>
              </Box>
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
