import {
  Box,
  Container,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';

// Define your data
const sections = [
  {
    title: 'Renting Books',
    content: [
      'Renting books with bookChap is easy and convenient. Simply browse our collection of books, select the ones you want to rent, and add them to your cart.',
      'Once you have chosen your books, proceed to the checkout page where you can review your selections and provide your rental details.'
    ]
  }
];

const accordionSection = {
  title: 'How to Rent a Book?',
  content: [
    'Browse our collection and find the book you want to rent.',
    'Add the book to your cart by clicking the "Add to Cart" button.',
    'Review the items in your cart and proceed to the checkout page.',
    'Provide your rental details, including your name, contact information, and rental duration.',
    'Confirm your rental and make the payment.',
    'Once your rental is confirmed, you can pick up the book or have it delivered to your preferred location.'
  ]
};

const enjoyReading = {
  title: 'Happy reading!',
  content:
    'Enjoy the knowledge, imagination, and inspiration that each book brings!'
};

// Define your About component
const About = () => (
  <Box p={4}>
    <Container maxW='container.md'>
      <Heading as='h1' mb={4} mt='60px'>
        About BookChap
      </Heading>

      {sections.map((section, id) => (
        <Box key={id} mb={6}>
          <Heading size='md' mb={2}>
            {section.title}
          </Heading>
          <Text color='gray.600' fontSize='lg'>
            {section.content.join(' ')}
          </Text>
        </Box>
      ))}

      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              <Heading size='md'>{accordionSection.title}</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Box align='left'>
              <UnorderedList spacing={2}>
                {accordionSection.content.map((text, idx) => (
                  <ListItem key={idx}>{text}</ListItem>
                ))}
              </UnorderedList>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Heading as='h1' mt={10} mb={4}>
        {enjoyReading.title}
      </Heading>
      <Text color='gray.600' fontSize='lg'>
        {enjoyReading.content}
      </Text>
    </Container>
  </Box>
);

export default About;
