
import { returnBook } from '../api/rentals.api';
import { toast } from 'react-toastify';

const ReturnBookButton = ({ rentalId }) => {
  const handleReturnBook = async () => {
    try {
      // Call the API to return the book
      await returnBook(rentalId);

      // Handle any post-return logic or UI updates
      // For example, display a success message or update the rental status in the UI

      toast.success('Book returned successfully');
    } catch (error) {
      toast.error('An error occurred while returning the book.');
    }
  };

  return (
    <button onClick={handleReturnBook}>Return Book</button>
  );
};

export default ReturnBookButton;
