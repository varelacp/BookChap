// import {useContext} from 'react';
// import {useNavigate} from 'react-router-dom';
// import {CartContext} from '../context/CartContext';

// const Cart = () => {
//   const {cartItems, handleRemoveFromCart} = useContext(CartContext);
//   const navigate = useNavigate();

//   const handleCheckout = () => {
//     navigate('/rentals');
//   };

//   return (
//     <div>
//       <h1>Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul>
//             {cartItems.map((book, index) => (
//               <li key={index}>
//                 {book.imgUrl && <img src={book.imgUrl} alt={book.title} />}
//                 <h3>{book.title}</h3>
//                 <p>Author: {book.author[0]}</p>
//                 <button onClick={() => handleRemoveFromCart(index)}>
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <button onClick={handleCheckout}>Proceed to Rent</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;

import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {CartContext} from '../context/CartContext';
import {AuthContext} from '../context/auth.context';

const Cart = () => {
  const {cartItems, removeFromCart, clearCart, itemCount} =
    useContext(CartContext);
  const {user} = useContext(AuthContext);

  const handleRemoveFromCart = (userId, bookId) => {
    removeFromCart(userId, bookId);
  };

  const handleClearCart = () => {
    // Ensure that user and user._id exist before calling clearCart.
    if (user && user._id) {
      clearCart(user._id);
    } else {
      // Handle the situation where user._id is undefined.
      console.log('User is not defined or user._id is not available.');
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(book => (
              <li key={book._id}>
                {book.imgUrl && <img src={book.imgUrl} alt={book.title} />}
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <button
                  onClick={() => handleRemoveFromCart(user._id, book._id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleClearCart}>Clear Cart</button>
          <Link to='/rentals'>Proceed to Rent</Link>
        </>
      )}
      <p>Item Count: {itemCount}</p>
    </div>
  );
};

export default Cart;
