import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, handleRemoveFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/rentals');
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((book, index) => (
              <li key={index}>
                <h3>{book.title}</h3>
                <p>Author: {book.author[0]}</p>
                <button onClick={() => handleRemoveFromCart(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Proceed to Rent</button>
        </>
      )}
    </div>
  );
};

export default Cart;