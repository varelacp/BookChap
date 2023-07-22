import {useEffect, useState, useContext} from 'react';
import {AuthContext} from '../context/auth.context';
import {getUserRentals, returnBook} from '../api/rentals.api';
import {toast} from 'react-toastify';

const UserRentals = () => {
  const {user} = useContext(AuthContext);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchUserRentals = async () => {
      try {
        if (user) {
          const response = await getUserRentals(user._id);
          setRentals(response.data);
        }
        console.log('Invalid userId:', user._id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserRentals();
  }, [user]);

  const handleReturnBook = async rentalId => {
    try {
      await returnBook(rentalId);
      // Filter out the returned book from the rentals state
      setRentals(prevRentals =>
        prevRentals.filter(rental => rental._id !== rentalId)
      );
      toast.success('Book returned successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>User Rentals</h1>
      {rentals.length === 0 ? (
        <p>No rentals found.</p>
      ) : (
        <ul>
          {rentals.map(rental => (
            <li key={rental._id}>
              {rental.book ? (
                <>
                  <img src={rental.book.imgUrl} alt='Book Thumbnail' />
                  <p>Title: {rental.book.title}</p>
                  <p>Author: {rental.book.author}</p>
                </>
              ) : (
                <p>Book information not available.</p>
              )}
              <p>Return Date: {rental.returnDate}</p>
              <button onClick={() => handleReturnBook(rental._id)}>
                Return Book
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserRentals;
