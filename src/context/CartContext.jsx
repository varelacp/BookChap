/* import { createContext, useState } from 'react';

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

 */

// here the first working option
/* import { createContext, useState } from 'react';

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
 */

/* 
import { createContext, useState } from 'react';
import { cart } from '../api/rentals.api';

const CartContext = createContext();

const CartProvider = props => {
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  const addToCart = book => {
    // Add the book to the cart
    setCartItems(prevCart => [...prevCart, book]);
    setItemCount(prevCount => prevCount + 1); // Increment item count
  };

  const handleRemoveFromCart = index => {
    setCartItems(prevCart => {
      // Remove the book at the specified index from the cart
      const updatedCart = [...prevCart];
      updatedCart.splice(index, 1);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = async () => {
    try {
      // Perform the checkout process
      await cart(cartItems);

      // Clear the cart items after successful checkout
      clearCart();

      // Perform any additional actions after checkout, such as navigation or showing a success message
    } catch (error) {
      console.log('Error during checkout:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        handleRemoveFromCart,
        itemCount,
        clearCart,
        handleCheckout
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
 */
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
      const removedBook = updatedCart.splice(index, 1)[0];
      if (removedBook) {
        setItemCount(prevCount => prevCount - (removedBook.quantity || 1));
      }
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
