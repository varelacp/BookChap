/* 
const AboutPage = () => {
  return (
    <div>
      <h1>About bookChap</h1>
      <p>Welcome to bookChap, your online destination for renting books!</p>

      <h2>Renting Books</h2>
      <p>Renting books with bookChap is easy and convenient. Simply browse our collection of books, select the ones you want to rent, and add them to your cart.</p>
      <p>Once you have chosen your books, proceed to the checkout page where you can review your selections and provide your rental details.</p>

      <h2>Searching for Books</h2>
      <p>Looking for a specific book? Use our powerful search functionality to find exactly what you're looking for. Enter the book title, author, or any relevant keywords in the search bar, and we'll display the matching results.</p>
      <p>Feel free to explore different categories and genres to discover new books that match your interests.</p>

      <h2>How to Rent a Book</h2>
      <p>To rent a book, follow these simple steps:</p>
      <ol>
        <li>Browse our collection and find the book you want to rent.</li>
        <li>Add the book to your cart by clicking the "Add to Cart" button.</li>
        <li>Review the items in your cart and proceed to the checkout page.</li>
        <li>Provide your rental details, including your name, contact information, and rental duration.</li>
        <li>Confirm your rental and make the payment.</li>
        <li>Once your rental is confirmed, you can pick up the book or have it delivered to your preferred location.</li>
      </ol>

      <h2>Enjoy Your Reading!</h2>
      <p>Now that you have rented your books, it's time to dive into your reading adventures. Enjoy the knowledge, imagination, and inspiration that each book brings.</p>
      <p>If you have any questions or need assistance, feel free to reach out to our support team. Happy reading!</p>
    </div>
  );
};

export default AboutPage;
 */

// const About = () => {
//   return (
//     <div>
//       <h1>About bookChap</h1>
//       <p>Welcome to bookChap, your online destination for renting books!</p>

//       <h2>Renting Books</h2>
//       <p>
//         Renting books with bookChap is easy and convenient. Simply browse our
//         collection of books, select the ones you want to rent, and add them to
//         your cart.
//       </p>
//       <p>
//         Once you have chosen your books, proceed to the checkout page where you
//         can review your selections and provide your rental details.
//       </p>

//       <h2>Searching for Books</h2>
//       <p>
//         Looking for a specific book? Use our powerful search functionality to
//         find exactly what you&apos;re looking for. Enter the book title, author,
//         or any relevant keywords in the search bar, and we&apos;ll display the
//         matching results.
//       </p>
//       <p>
//         Feel free to explore different categories and genres to discover new
//         books that match your interests.
//       </p>

//       <h2>How to Rent a Book</h2>
//       <p>To rent a book, follow these simple steps:</p>
//       <ul>
//         <li>Browse our collection and find the book you want to rent.</li>
//         <li>
//           Add the book to your cart by clicking the &quot;Add to Cart&quot;
//           button.
//         </li>
//         <li>Review the items in your cart and proceed to the checkout page.</li>
//         <li>
//           Provide your rental details, including your name, contact information,
//           and rental duration.
//         </li>
//         <li>Confirm your rental and make the payment.</li>
//         <li>
//           Once your rental is confirmed, you can pick up the book or have it
//           delivered to your preferred location.
//         </li>
//       </ul>

//       <h2>Enjoy Your Reading!</h2>
//       <p>
//         Now that you have rented your books, it&apos;s time to dive into your
//         reading adventures. Enjoy the knowledge, imagination, and inspiration
//         that each book brings.
//       </p>
//       <p>
//         If you have any questions or need assistance, feel free to reach out to
//         our support team. Happy reading!
//       </p>
//     </div>
//   );
// };

// export default About;

// import {
//   Box,
//   Container,
//   Heading,
//   Text,
//   Stack,
//   List,
//   ListItem,
//   Icon
// } from '@chakra-ui/react';
// import {CheckIcon} from '@chakra-ui/icons';

// const About = () => {
//   return (
//     <Container maxW='container.md' py={5}>
//       <Heading as='h1' size='xl' mb={5}>
//         About bookChap
//       </Heading>
//       <Text mb={5}>
//         Welcome to bookChap, your online destination for renting books!
//       </Text>

//       <Heading as='h2' size='lg' mb={3}>
//         Renting Books
//       </Heading>
//       <Text mb={3}>
//         Renting books with bookChap is easy and convenient. Simply browse our
//         collection of books, select the ones you want to rent, and add them to
//         your cart.
//       </Text>
//       <Text mb={5}>
//         Once you have chosen your books, proceed to the checkout page where you
//         can review your selections and provide your rental details.
//       </Text>

//       <Heading as='h2' size='lg' mb={3}>
//         Searching for Books
//       </Heading>
//       <Text mb={3}>
//         Looking for a specific book? Use our powerful search functionality to
//         find exactly what you&apos;re looking for. Enter the book title, author,
//         or any relevant keywords in the search bar, and we&apos;ll display the
//         matching results.
//       </Text>
//       <Text mb={5}>
//         Feel free to explore different categories and genres to discover new
//         books that match your interests.
//       </Text>

//       <Heading as='h2' size='lg' mb={3}>
//         How to Rent a Book
//       </Heading>
//       <Text mb={3}>To rent a book, follow these simple steps:</Text>
//       <List spacing={3} mb={5}>
//         {[
//           'Browse our collection and find the book you want to rent.',
//           'Add the book to your cart by clicking the "Add to Cart" button.',
//           'Review the items in your cart and proceed to the checkout page.',
//           'Provide your rental details, including your name, contact information, and rental duration.',
//           'Confirm your rental and make the payment.',
//           'Once your rental is confirmed, you can pick up the book or have it delivered to your preferred location.'
//         ].map((step, idx) => (
//           <ListItem key={idx}>
//             <Stack direction='row' align='center'>
//               <Box color='green.400'>
//                 <Icon as={CheckIcon} />
//               </Box>
//               <Text>{step}</Text>
//             </Stack>
//           </ListItem>
//         ))}
//       </List>

//       <Heading as='h2' size='lg' mb={3}>
//         Enjoy Your Reading!
//       </Heading>
//       <Text mb={3}>
//         Now that you have rented your books, it&apos;s time to dive into your
//         reading adventures. Enjoy the knowledge, imagination, and inspiration
//         that each book brings.
//       </Text>
//       <Text mb={5}>
//         If you have any questions or need assistance, feel free to reach out to
//         our support team. Happy reading!
//       </Text>
//     </Container>
//   );
// };

// export default About;
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
