import { useEffect, useState, useContext } from 'react';
import { getUserDashboard } from '../api/users.api';
import { AuthContext } from '../context/auth.context';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { logOutUser } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserDashboard();
        setDashboardData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logOutUser();
  };

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {dashboardData.name}!</h1>
      <p>Email: {dashboardData.email}</p>
      <p>Profile Image: {dashboardData.profileImage}</p>
      <p>Address: {dashboardData.address}</p>
      <p>Phone Number: {dashboardData.phoneNumber}</p>

      <Link to='/users/:userId/rentals'>My rentals</Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserDashboard;
