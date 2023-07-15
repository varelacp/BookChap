import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { handleGoogleAuthentication } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleName = e => {
    setName(e.target.value);
  };

  const handleAddress = e => {
    setAddress(e.target.value);
  };

  const handleRole = e => {
    setRole(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const user = { email, password, name, address, role };
      await signup(user);
      navigate('/login');
    } catch (error) {
      console.log('Error signup up', error);
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className='SignupPage'>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type='email' name='email' value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input type='text' name='name' value={name} onChange={handleName} />

        <button type='submit'>Sign Up</button>
      </form>

      <label>Address:</label>
      <input
        type='text'
        name='address'
        value={address}
        onChange={handleAddress}
      />

      <label>Role</label>
      <select name='role' value={role} onChange={handleRole}>
        <option value='user'>User</option>
        <option value='admin'>Admin</option>
      </select>

      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      <button onClick={handleGoogleAuthentication}>Signup With Google</button>

      <p>Already have account?</p>
      <Link to={'/login'}> Login</Link>
    </div>
  );
};

export default Signup;
