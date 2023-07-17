import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { getUserRentals } from '../api/rentals.api';

const UserRentals = () => {
  const { user } = useContext(AuthContext);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchUserRentals = async () => {
      try {
        if (user) {
          const response = await getUserRentals(user._id);
          setRentals(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserRentals();
  }, [user]);

  console.log(rentals);

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserRentals;
