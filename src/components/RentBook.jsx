import { useState } from 'react';
import { rentBook } from '../api/rentals.api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RentBook = ({ bookId, userId }) => {
  const [rentalDate, setRentalDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleRentBook = async () => {
    try {
      if (!rentalDate || !returnDate) {
        toast.error('Please provide both rental and return dates.');
        return;
      }

      // Call the API to rent the book
      await rentBook(bookId, userId, rentalDate, returnDate);

      // Handle any post-rental logic or UI updates
      // For example, display a success message or update the rental status in the UI

      toast.success('Book rented successfully');

      // Reset the form
      setRentalDate('');
      setReturnDate('');
    } catch (error) {
      toast.error('An error occurred while renting the book.');
    }
  };

  return (
    <div>
      <h3>Rent Book</h3>
      <p>Book ID: {bookId}</p>
      <p>User ID: {userId}</p>
      <div>
        <label>Rental Date:</label>
        <input
          type="date"
          value={rentalDate}
          onChange={(e) => setRentalDate(e.target.value)}
        />
      </div>
      <div>
        <label>Return Date:</label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>
      <button onClick={handleRentBook}>Rent Book</button>
    </div>
  );
};

export default RentBook;
