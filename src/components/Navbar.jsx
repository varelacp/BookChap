import { NavLink } from 'react-router-dom';



const Navbar = () => {


  return (
    <nav className='Navbar'>
    
        <div>
        <NavLink className="navbar-brand" to="/">
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
          to='/books'
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
            
             Books
            </NavLink>
          
       
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
     
    
      </ul>
    
     
  
    </nav>
  );
};

export default Navbar;
