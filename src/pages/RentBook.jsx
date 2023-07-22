import {useContext, useState} from 'react';
import {AuthContext} from '../context/auth.context';
import {CartContext} from '../context/CartContext';
import {rentBook} from '../api/rentals.api';
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RentBook = () => {
  const {user} = useContext(AuthContext);
  const {cartItems, clearCart} = useContext(CartContext);
  const [rentalDuration, setRentalDuration] = useState(30); // Set the default rental duration to 30 days
  const navigate = useNavigate();

  const handleRentBook = async () => {
    try {
      for (const book of cartItems) {
        const rentalDate = new Date(Date.now());
        const returnDate = new Date();
        const copy = returnDate;
        copy.setDate(rentalDate.getDate() + rentalDuration);
        console.log(returnDate);
        // const rentalDate = new Date(); // Current date
        // let rentalDurationInMilliseconds = rentalDuration * 24 * 60 * 60 * 1000; // Conversion of days to milliseconds
        // let returnDateInMilliseconds =
        //   rentalDate.getTime() + rentalDurationInMilliseconds; // Adding rental duration to the current time
        // let returnDate = new Date(returnDateInMilliseconds);
        // let returnDateUTC = new Date(
        //   Date.UTC(
        //     returnDate.getFullYear(),
        //     returnDate.getMonth(),
        //     returnDate.getDate()
        //   )
        // );

        await rentBook(
          book._id,
          user._id,
          rentalDate,
          copy
          // returnDateUTC.toISOString()
        );

        // show success message for each book rented successfully
        toast.success(`Successfully rented ${book.title}`);
      }

      // Clear cart after successfully renting all books
      clearCart(user._id);

      // Reset rental duration
      setRentalDuration(30);

      // Navigate to user dashboard after successful rental
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Failed to rent books:', error);
      // show error message
      toast.error(`Failed to rent books: ${error.message}`);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1>Rent Books</h1>
      {cartItems.map((book, index) => (
        <div key={index}>
          <img src={book.imgUrl} alt={book.title} />
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
        </div>
      ))}
      <button onClick={handleRentBook}>Rent Book</button>
      <Link to='/payment'>Proceed to Payment</Link>
    </div>
  );
};

export default RentBook;
