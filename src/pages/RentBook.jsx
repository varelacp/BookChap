import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/auth.context';
import { rentBook } from '../api/rentals.api';
import { Link } from 'react-router-dom';
import moment from 'moment';

const RentBook = () => {
  const { user } = useContext(AuthContext);
  const userId = user ? user._id : null;
  const { selectedRentalBooks, clearCart } = useContext(CartContext);
  const [rentalData, setRentalData] = useState({
    rentalDuration: 30
  });

  const handleRentalSubmit = async e => {
    e.preventDefault();
    try {
      console.log('User:', user);
      console.log('User ID:', user._id);
      // Perform the rental process for each selected book
      for (const book of selectedRentalBooks) {
        const rentalData = {
          book: book._id,
          user: userId,
          rentalDate: new Date().toISOString(),
          returnDate: calculateReturnDate()
        };

        console.log('Rental Data:', rentalData);

        // Call the rental function or API to perform the rental
        const response = await rentBook(
          rentalData.book,
          rentalData.user,
          rentalData.rentalDate,
          rentalData.returnDate
        );

        // Access the newly created rental from the server response
        const newRental = response.data;

        console.log('Rental created successfully for book:', book.title);
        console.log('New Rental:', newRental);
      }
      // Clear the selected rental books and rental data
      clearCart();
      setRentalData({ rentalDuration: 30 });
      // Check if the cart is empty
      // if (selectedRentalBooks.length === 0) {
      //   setItemCount(0);
      // }
    } catch (error) {
      console.log('Error during rental:', error);
    }
  };

  const calculateReturnDate = rentalDuration => {
    const rentalDate = new Date();
    const returnDate = new Date();
    rentalDate.getTime() + rentalDuration * 24 * 60 * 60 * 1000;
    return moment(returnDate).format('YYYY-MM-DD');
  };

  // const calculateReturnDate = rentalDuration => {
  //   const rentalDate = new Date();
  //   const returnDate = new Date();
  //   returnDate.setTime(
  //     rentalDate.getTime() + rentalDuration * 24 * 60 * 60 * 1000
  //   );
  //   return moment(returnDate).format('YYYY-MM-DD');
  // };

  // Check if the cart is empty
  if (selectedRentalBooks.length === 0) {
    return <p>The cart is empty.</p>;
  }

  return (
    <div>
      <h1>Rent Book</h1>
      <h2>Selected Books:</h2>
      <ul>
        {selectedRentalBooks.map((book, index) => (
          <li key={index}>{book.title}</li>
        ))}
      </ul>
      <h2>Rental Form:</h2>
      <form onSubmit={handleRentalSubmit}>
        {selectedRentalBooks.map((book, index) => (
          <div key={index}>
            {book.imgUrl && <img src={book.imgUrl} alt={book.title} />}
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
          </div>
        ))}

        <button type='submit'>Rent</button>
      </form>
      <p>Return Date: {calculateReturnDate(rentalData.rentalDuration)}</p>
      <Link to='/payment'>Proceed to Payment</Link>
    </div>
  );
};

export default RentBook;
