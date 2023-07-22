// import { createContext, useState } from 'react';

// const CartContext = createContext();

// const CartProvider = props => {
//   const [cartItems, setCartItems] = useState([]);
//   const [selectedRentalBooks, setSelectedRentalBooks] = useState([]);
//   const [itemCount, setItemCount] = useState(0);

//   const addToCart = book => {
//     // Add the book to the cart
//     setCartItems(prevCart => [...prevCart, book]);
//     setItemCount(prevCount => prevCount + 1); // Increment item count

//     // Add the book to the selectedRentalBooks
//     setSelectedRentalBooks(prevBooks => [...prevBooks, book]);
//   };

//   const handleRemoveFromCart = index => {
//     setCartItems(prevCart => {
//       const updatedCart = [...prevCart];
//       const removedBook = updatedCart.splice(index, 1)[0]; // Remove the book at the specified index
//       if (removedBook) {
//         setItemCount(prevCount => prevCount - (removedBook.quantity || 1));
//       }

//       return updatedCart;
//     });

//     setSelectedRentalBooks(prevBooks => {
//       // Remove the book at the specified index from the selectedRentalBooks
//       const updatedBooks = [...prevBooks];
//       updatedBooks.splice(index, 1);
//       return updatedBooks;
//     });
//   };

//   const clearCart = () => {
//     setCartItems([]);
//     setSelectedRentalBooks([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         selectedRentalBooks,
//         addToCart,
//         handleRemoveFromCart,
//         itemCount,
//         clearCart
//       }}
//     >
//       {props.children}
//     </CartContext.Provider>
//   );
// };

// export { CartContext, CartProvider };

import {createContext, useState, useEffect, useContext} from 'react';
import {
  addToCart as addToCartApi,
  getCartItems as getCartItemsApi,
  removeFromCart as removeFromCartApi,
  clearCart as clearCartApi
} from '../api/cart.api';
import {AuthContext} from './auth.context';

const CartContext = createContext();

const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    user && fetchCartItems(user._id);
  }, [user]);

  const fetchCartItems = async userId => {
    try {
      const response = await getCartItemsApi(userId);
      setCartItems(response.data.cartItems);
      setItemCount(response.data.cartItems.length);
    } catch (error) {
      console.log('Error fetching cart items:', error);
    }
  };

  const addToCart = async (userId, bookId) => {
    try {
      await addToCartApi(userId, bookId);
      setItemCount(prevCount => prevCount + 1);
      fetchCartItems(user._id);
    } catch (error) {
      console.log('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (userId, bookId) => {
    try {
      await removeFromCartApi(userId, bookId);
      setItemCount(prevCount => prevCount - 1);
      fetchCartItems(user._id);
    } catch (error) {
      console.log('Error removing from cart:', error);
    }
  };

  const clearCart = async userId => {
    try {
      await clearCartApi(userId);
      setCartItems([]);
      setItemCount(0);
    } catch (error) {
      console.log('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        itemCount
      }}>
      {children}
    </CartContext.Provider>
  );
};

export {CartContext, CartProvider};
