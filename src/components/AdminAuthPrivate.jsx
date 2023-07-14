import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';

const AdminAuthPrivate = props => {
  const { isLoggedIn, user } = useContext(AuthContext);

  // Check if the user is logged in and has the admin role
  if (isLoggedIn && user && user.role === 'admin') {
    return props.children;
  } else {
    return <Navigate to='/login' />;
  }
};

export default AdminAuthPrivate;