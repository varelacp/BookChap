// import { NavLink } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';
// import { useContext } from 'react';
// import { AuthContext } from '../context/auth.context';

// const Navbar = () => {
//   const { itemCount } = useContext(CartContext);
//   const { isLoggedIn, logOutUser, isAdmin } = useContext(AuthContext);

//   return (
//     <nav className='Navbar'>
//       <div>
//         <NavLink className='navbar-brand' to='/'>
//           Logo
//         </NavLink>
//       </div>
//       <ul>
//         <NavLink
//           to='/'
//           className={({ isActive }) => (isActive ? 'selected' : '')}
//         >
//           Home
//         </NavLink>

//         <NavLink
//           to='/about'
//           className={({ isActive }) => (isActive ? 'selected' : '')}
//         >
//           About
//         </NavLink>

//         <NavLink
//           to='/books'
//           className={({ isActive }) => (isActive ? 'selected' : '')}
//         >
//           Books
//         </NavLink>

//         {isLoggedIn && !isAdmin && (
//   <>
//     <NavLink
//       to='/cart'
//       className={({ isActive }) => (isActive ? 'selected' : '')}
//     >
//       Cart ({itemCount})
//     </NavLink>
//     <NavLink
//       to='/user-dashboard'
//       className={({ isActive }) => (isActive ? 'selected' : '')}
//     >
//       User Dashboard
//     </NavLink>
//     <button onClick={logOutUser}>Logout</button>
//   </>
// )}

// {isLoggedIn && isAdmin && (
//   <>
//     <NavLink
//       to='/admin-dashboard'
//       className={({ isActive }) => (isActive ? 'selected' : '')}
//     >
//       Admin Dashboard
//     </NavLink>
//     <button onClick={logOutUser}>Logout</button>
//   </>
// )}

//         {!isLoggedIn && (
//           <>
//             <NavLink
//               to='/signup'
//               className={({ isActive }) => (isActive ? 'selected' : '')}
//             >
//               Signup
//             </NavLink>
//             <NavLink
//               to='/login'
//               className={({ isActive }) => (isActive ? 'selected' : '')}
//             >
//               Login
//             </NavLink>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
import {useContext, useState} from 'react';
import {searchBookByISBN, searchBooksByCategory} from '../api/books.api';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon
} from '@chakra-ui/icons';
import {NavLink} from 'react-router-dom';
import {CartContext} from '../context/CartContext';
import {AuthContext} from '../context/auth.context';

const Navbar = () => {
  const {itemCount} = useContext(CartContext);
  const {isLoggedIn, logOutUser, isAdmin} = useContext(AuthContext);
  const {isOpen, onToggle} = useDisclosure();
  const [searchQuery, setSearchQuery] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const isISBN = input => {
    return /^(?:\d{10}|\d{13})$/.test(input);
  };

  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async event => {
    event.preventDefault();
    let results;

    if (isISBN(searchQuery)) {
      results = await searchBookByISBN(searchQuery);
    } else {
      results = await searchBooksByCategory(searchQuery);
    }

    setSearchResults(results.data);
  };

  const NAV_ITEMS = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'About',
      href: '/about'
    },
    {
      label: 'Books',
      href: '/books'
    }
    // Add more navigation items as needed
  ];

  const DesktopNav = () => {
    return (
      <form onSubmit={handleSearchSubmit}>
        <Stack direction={'row'} spacing={4}>
          {NAV_ITEMS.map(navItem => (
            <Box key={navItem.label}>
              <Popover trigger={'hover'} placement={'bottom-start'}>
                <PopoverTrigger>
                  <Link
                    as={NavLink}
                    to={navItem.href}
                    p={2}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor
                    }}
                    activeClassName={'selected'}>
                    {navItem.label}
                  </Link>
                </PopoverTrigger>
              </Popover>
            </Box>
          ))}
          <Box>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <InputGroup>
                  <Input
                    placeholder='Search by ISBN or Category'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    size='sm'
                    fontSize={{base: 'xs'}}
                    width={{base: '100%', md: '300px'}}
                  />
                  <InputRightElement>
                    <button type='submit'>
                      <SearchIcon color='gray.400' />
                    </button>
                  </InputRightElement>
                </InputGroup>
              </PopoverTrigger>
              {/* Add your search functionality here */}
            </Popover>
          </Box>
        </Stack>
      </form>
    );
  };

  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{md: 'none'}}>
        {NAV_ITEMS.map(navItem => (
          <Link
            key={navItem.label}
            as={NavLink}
            to={navItem.href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{bg: ('pink.50', 'gray.900')}}
            activeClassName={'selected'}>
            {navItem.label}
          </Link>
        ))}
      </Stack>
    );
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{base: 2}}
        px={{base: 4}}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{base: 1, md: 'auto'}}
          ml={{base: -2}}
          display={{base: 'flex', md: 'none'}}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{base: 1}} justify={{base: 'center', md: 'start'}}>
          <Text
            textAlign={useBreakpointValue({base: 'center', md: 'left'})}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            Logo
          </Text>

          <Flex display={{base: 'none', md: 'flex'}} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{base: 1, md: 0}}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          {isLoggedIn && !isAdmin && (
            <>
              <Link
                as={NavLink}
                to='/cart'
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
                activeClassName={'selected'}>
                Cart ({itemCount})
              </Link>
              <Link
                as={NavLink}
                to='/user-dashboard'
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
                activeClassName={'selected'}>
                User Dashboard
              </Link>
              <Button
                fontSize={'sm'}
                fontWeight={600}
                variant={'link'}
                onClick={logOutUser}>
                Logout
              </Button>
            </>
          )}

          {isLoggedIn && isAdmin && (
            <>
              <Link
                as={NavLink}
                to='/admin-dashboard'
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
                activeClassName={'selected'}>
                Admin Dashboard
              </Link>
              <Button
                fontSize={'sm'}
                fontWeight={600}
                variant={'link'}
                onClick={logOutUser}>
                Logout
              </Button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Stack
                flex={{base: 1, md: 0}}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}>
                <Button
                  as={'a'}
                  fontSize={'sm'}
                  fontWeight={400}
                  variant={'link'}
                  href={'/login'}>
                  Login
                </Button>
                <Button
                  as={'a'}
                  display={{base: 'none', md: 'inline-flex'}}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'orange.400'}
                  href={'/signup'}
                  _hover={{
                    bg: 'pink.300'
                  }}>
                  Signup
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

export default Navbar;
