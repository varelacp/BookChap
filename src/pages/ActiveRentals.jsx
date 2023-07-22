import {useEffect, useState} from 'react';
import {getActiveRentals} from '../api/rentals.api';
import {toast} from 'react-toastify';

const ActiveRentals = () => {
  const [activeRentals, setActiveRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveRentals = async () => {
      try {
        const response = await getActiveRentals();
        setActiveRentals(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching active rentals:', error);
        setLoading(false);
        toast.error('Error fetching active rentals');
      }
    };

    fetchActiveRentals();
  }, []);

  console.log('Active rentals:', activeRentals);

  return (
    <div>
      <h1>Active Rentals</h1>
      {loading ? (
        <div>Loading... </div>
      ) : activeRentals.length === 0 ? (
        <p>No active rentals found.</p>
      ) : (
        <ul>
          {activeRentals.map(rental => (
            <li key={rental._id}>
              {rental.book && rental.user ? (
                <>
                  <img src={rental.book.imgUrl} alt='Book Thumbnail' />
                  <p>Title: {rental.book.title}</p>
                  <p>Author: {rental.book.author}</p>
                  <p>User: {rental.user.name}</p>
                  <p>Rental Date: {rental.rentalDate}</p>
                  <p>Return Date: {rental.returnDate}</p>
                </>
              ) : (
                <p>Book or User information not available.</p>
              )}
            </li>
          ))}
        </ul>
        // <ul>
        //   {activeRentals.map(rental => (
        //     <li key={rental._id}>
        //       {rental.book && rental.user ? (
        //         <>
        //           <p>
        //             Book Title:{' '}
        //             {rental.book?.title || 'Book information not available'}
        //           </p>
        //           <p>
        //             User:{' '}
        //             {rental.user?.name || 'User information not available'}
        //           </p>
        //           <p>Rental Date: {rental.rentalDate}</p>
        //           <p>Return Date: {rental.returnDate}</p>
        //         </>
        //       ) : (
        //         <p>Book or User information not available.</p>
        //       )}
        //     </li>
        //   ))}
        // </ul>
      )}
    </div>
  );
};

export default ActiveRentals;
