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