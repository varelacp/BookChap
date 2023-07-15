import { useEffect, useState, useContext } from 'react';
import { getAdminDashboard } from '../api/users.api';
import { AuthContext } from '../context/auth.context';

const AdminDashboard = () => {
  const { logOutUser } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdminDashboard();
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
      <h1>Welcome, {dashboardData.name} (Admin)!</h1>
      <p>Email: {dashboardData.email}</p>
      <p>Profile Image: {dashboardData.profileImage}</p>
      <p>Address: {dashboardData.address}</p>
      <p>Phone Number: {dashboardData.phoneNumber}</p>
      <p>Role: {dashboardData.role}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
