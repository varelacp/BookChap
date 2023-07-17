import { NavLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const Navbar = () => {
  const { itemCount } = useContext(CartContext);
  const { isLoggedIn, logOutUser, isAdmin } = useContext(AuthContext);

  return (
    <nav className='Navbar'>
      <div>
        <NavLink className='navbar-brand' to='/'>
          Logo
        </NavLink>
      </div>
      <ul>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          Home
        </NavLink>

        <NavLink
          to='/about'
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          About
        </NavLink>

        <NavLink
          to='/books'
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          Books
        </NavLink>

        {isLoggedIn && (
          <>
            <NavLink
              to='/cart'
              className={({ isActive }) => (isActive ? 'selected' : '')}
            >
              Cart ({itemCount})
            </NavLink>
            {isAdmin ? (
              <NavLink
                to='/admin-dashboard'
                className={({ isActive }) => (isActive ? 'selected' : '')}
              >
                Admin Dashboard
              </NavLink>
            ) : (
              <NavLink
                to='/user-dashboard'
                className={({ isActive }) => (isActive ? 'selected' : '')}
              >
                User Dashboard
              </NavLink>
            )}

            <button onClick={logOutUser}>Logout</button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <NavLink
              to='/signup'
              className={({ isActive }) => (isActive ? 'selected' : '')}
            >
              Signup
            </NavLink>
            <NavLink
              to='/login'
              className={({ isActive }) => (isActive ? 'selected' : '')}
            >
              Login
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
