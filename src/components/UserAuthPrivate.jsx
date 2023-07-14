import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';

const UserAuthPrivate = props => {
  const { isLoggedIn, user } = useContext(AuthContext);

  // Check if the user is logged in and has the user role
  if (isLoggedIn && user && user.role === 'user') {
    return props.children;
  } else {
    return <Navigate to='/login' />;
  }
};

export default UserAuthPrivate;