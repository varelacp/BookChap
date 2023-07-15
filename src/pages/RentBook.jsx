import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/auth.context';
import { rentBook } from '../api/rentals.api';
import { Link } from 'react-router-dom';

const RentBook = () => {
  const { user } = useContext(AuthContext);
  const userId = user ? user._id : null;
  const { selectedRentalBooks, clearCart } = useContext(CartContext);
  const [rentalData, setRentalData] = useState({
    rentalDuration: 15 // Set the default rental duration to 15 days
  });

  // const handleRentalSubmit = async e => {
  //   e.preventDefault();
  //   try {
  //     console.log('User:', user);
  //     console.log('User ID:', user._id);
  //     // Perform the rental process for each selected book
  //     for (const book of selectedRentalBooks) {
  //       const rentalData = {
  //         book: book._id,
  //         user: userId,
  //         rentalDate: new Date().toISOString(),
  //         returnDate: calculateReturnDate()
  //       };

  //       console.log('Rental Data:', rentalData);

  //       // Call the rental function or API to perform the rental
  //       await rentBook(
  //         rentalData.bookId,
  //         rentalData.userId,
  //         rentalData.rentalDate,
  //         rentalData.returnDate
  //       );
  //       console.log('Rental created successfully for book:', book.title);
  //     }

  //     // Clear the selected rental books and rental data
  //     setRentalData({ rentalDuration: 15 });
  //   } catch (error) {
  //     console.log('Error during rental:', error);
  //   }
  // };

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
      setRentalData({ rentalDuration: 15 });
    } catch (error) {
      console.log('Error during rental:', error);
    }
  };

  const calculateReturnDate = () => {
    const rentalDuration = rentalData.rentalDuration;
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + rentalDuration);
    return returnDate.toISOString();
  };

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
        {/* Display book information, including thumbnail */}
        {selectedRentalBooks.map((book, index) => (
          <div key={index}>
            {book.imgUrl && <img src={book.imgUrl} alt={book.title} />}
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
          </div>
        ))}

        <button type='submit'>Rent</button>
      </form>
      <p>Return Date: {new Date().toLocaleDateString()}</p>
      <Link to='/payment'>Proceed to Payment</Link>
    </div>
  );
};

export default RentBook;
