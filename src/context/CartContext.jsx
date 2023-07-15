// import { createContext, useState } from 'react';

// export const CartContext = createContext();

// export const CartProvider = props => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = item => {
//     setCartItems(prevItems => [...prevItems, item]);
//   };

//   const removeFromCart = itemId => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
//       {props.children}
//     </CartContext.Provider>
//   );
// };

// import { createContext, useState } from 'react';

// export const CartContext = createContext();

// export const CartProvider = props => {
//   const [cartItems, setCartItems] = useState([]);
//   const [itemCount, setItemCount] = useState(0);
//   const [rentals, setRentals] = useState([]);

//   const addToCart = item => {
//     setCartItems(prevItems => [...prevItems, item]);
//     setItemCount(prevCount => prevCount + 1); // Increment item count
//   };

//   const removeFromCart = itemId => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
//     setItemCount(prevCount => prevCount - 1); // Decrement item count
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, itemCount }}
//     >
//       {props.children}
//     </CartContext.Provider>
//   );
// };

// import { createContext, useState } from 'react';
// import { rentBook, returnBook } from '../api/rentals.api';

// export const CartContext = createContext();

// export const CartProvider = props => {
//   const [cart, setCart] = useState([]);
//   const [rentals, setRentals] = useState([]);

//   // Function to add a book to the cart and perform the rental process
//   const handleAddToCart = async book => {
//     // Check if the book is available
//     if (!book.availability) {
//       console.log('This book is currently unavailable.');
//       return;
//     }

//     try {
//       // Rent the book
//       const rentalResponse = await rentBook(
//         book.id,
//         userId,
//         rentalDate,
//         returnDate
//       );
//       const rental = rentalResponse.data;

//       // Update the book's availability
//       book.availability = false;

//       // Add the rental to the rentals state
//       setRentals(prevRentals => [...prevRentals, rental]);

//       // Add the book to the cart
//       setCart(prevCart => [...prevCart, book]);

//       console.log('Book added to cart:', book);
//     } catch (error) {
//       console.log('Error renting the book:', error);
//     }
//   };

//   // Function to handle the checkout process and return the rented books
//   const handleCheckout = async () => {
//     try {
//       // Return the rented books
//       for (const rental of rentals) {
//         await returnBook(rental.id);
//       }

//       // Clear the rentals and cart
//       setRentals([]);
//       setCart([]);

//       console.log('Checkout successful');
//     } catch (error) {
//       console.log('Error during checkout:', error);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, rentals, handleAddToCart, handleCheckout }}
//     >
//       {props.children}
//     </CartContext.Provider>
//   );
// };

// import { createContext, useState } from 'react';
// import { rentBook, returnBook } from '../api/rentals.api';

// export const CartContext = createContext();

// export const CartProvider = props => {
//   const [cart, setCart] = useState([]);
//   const [rentals, setRentals] = useState([]);

//   const rentalDate = new Date().toISOString();

//   // Calculate return date (15 days from the rental date)
//   const returnDate = new Date();
//   returnDate.setDate(returnDate.getDate() + 15);
//   const formattedReturnDate = returnDate.toISOString();

//   const handleAddToCart = async (book, user) => {
//     console.log('Adding book to cart:', book);
//     // Check if the book is available
//     if (!book.availability) {
//       console.log('This book is currently unavailable.');
//       return;
//     }

//     try {
//       // Rent the book
//       const rentalResponse = await rentBook(
//         book.id,
//         user ? user.userId : null,
//         rentalDate,
//         formattedReturnDate
//       );
//       const rental = rentalResponse.data;

//       // Update the book's availability
//       book.availability = false;

//       // Add the rental to the rentals state
//       setRentals(prevRentals => [...prevRentals, rental]);

//       // Add the book to the cart
//       setCart(prevCart => [...prevCart, book]);

//       console.log('Book added to cart:', book);
//     } catch (error) {
//       console.log('Error renting the book:', error);
//     }
//   };

//   const handleRemoveFromCart = index => {
//     setCart(prevCart => {
//       // Remove the book at the specified index from the cart
//       const updatedCart = [...prevCart];
//       updatedCart.splice(index, 1);
//       return updatedCart;
//     });
//   };

//   const handleCheckout = async () => {
//     try {
//       // Return the rented books
//       for (const rental of rentals) {
//         await returnBook(rental.id);
//       }

//       // Clear the rentals and cart
//       setRentals([]);
//       setCart([]);

//       console.log('Checkout successful');
//     } catch (error) {
//       console.log('Error during checkout:', error);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         rentals,
//         handleAddToCart,
//         handleRemoveFromCart,
//         handleCheckout
//       }}
//     >
//       {props.children}
//     </CartContext.Provider>
//   );
// };

// import { createContext, useState } from 'react';
// import { rentBook, returnBook } from '../api/rentals.api';

// export const CartContext = createContext();

// export const CartProvider = props => {
//   const [cart, setCart] = useState([]);
//   const [rentals, setRentals] = useState([]);

//   const rentalDate = new Date().toISOString();

//   // Calculate return date (15 days from the rental date)
//   const returnDate = new Date();
//   returnDate.setDate(returnDate.getDate() + 15);
//   const formattedReturnDate = returnDate.toISOString();

//   const addToCart = book => {
//     setCart(prevCart => [...prevCart, book]);
//   };

//   const removeFromCart = bookId => {
//     setCart(prevCart => prevCart.filter(book => book.id !== bookId));
//   };

//   const handleRentBook = async (bookId, userId) => {
//     try {
//       // Rent the book
//       const rentalResponse = await rentBook(
//         bookId,
//         userId,
//         rentalDate,
//         formattedReturnDate
//       );
//       const rental = rentalResponse.data;

//       // Update the book's availability
//       // ...

//       // Add the rental to the rentals state
//       setRentals(prevRentals => [...prevRentals, rental]);

//       console.log('Book rented:', bookId);
//     } catch (error) {
//       console.log('Error renting the book:', error);
//     }
//   };

//   const handleReturnBook = async rentalId => {
//     try {
//       // Return the book
//       await returnBook(rentalId);

//       // Update the rental status
//       // ...

//       console.log('Book returned:', rentalId);
//     } catch (error) {
//       console.log('Error returning the book:', error);
//     }
//   };

//   const handleCheckout = async () => {
//     try {
//       // Return the rented books
//       for (const rental of rentals) {
//         await handleReturnBook(rental.id);
//       }

//       setCart([]);
//       setRentals([]);

//       console.log('Checkout successful');
//     } catch (error) {
//       console.log('Error during checkout:', error);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         rentals,
//         addToCart,
//         removeFromCart,
//         handleRentBook,
//         handleReturnBook,
//         handleCheckout
//       }}
//     >
//       {props.children}
//     </CartContext.Provider>
//   );
// };

import { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = props => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedRentalBooks, setSelectedRentalBooks] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  const addToCart = book => {
    // Add the book to the cart
    setCartItems(prevCart => [...prevCart, book]);
    setItemCount(prevCount => prevCount + 1); // Increment item count

    // Add the book to the selectedRentalBooks
    setSelectedRentalBooks(prevBooks => [...prevBooks, book]);
  };

  const handleRemoveFromCart = index => {
    setCartItems(prevCart => {
      // Remove the book at the specified index from the cart
      const updatedCart = [...prevCart];
      updatedCart.splice(index, 1);
      return updatedCart;
    });

    setSelectedRentalBooks(prevBooks => {
      // Remove the book at the specified index from the selectedRentalBooks
      const updatedBooks = [...prevBooks];
      updatedBooks.splice(index, 1);
      return updatedBooks;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setSelectedRentalBooks([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        selectedRentalBooks,
        addToCart,
        handleRemoveFromCart,
        itemCount,
        clearCart
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
