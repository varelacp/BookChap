import { createContext, useState, useEffect } from 'react';
import {
  auth,
  getAdditionalInfo,
  signInWithGoogle
} from '../config/firebase.config';
import { signupGoogle } from '../api/auth.api';
import { CartProvider } from '../context/CartContext';

const AuthContext = createContext();

const AuthProviderWrapper = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const verifyUser = () => {
    auth.onAuthStateChanged(async user => {
      if (!user) {
        setUser(null);
        setIsLoggedIn(false);
      } else if (
        user.providerData.length &&
        user.providerData[0].providerId === 'google.com'
      ) {
        setUser({
          _id: user.uid,
          name: user.displayName,
          email: user.email,
          role: 'user',
          idToken: null
        });

        setIsLoggedIn(true);
        const authToken = await user.getIdToken();
        localStorage.setItem('authToken', authToken);
      } else {
        const { claims } = await user.getIdTokenResult();
        console.log('Claims', claims);
        setUser({
          _id: user.uid,
          name: claims.name,
          email: claims.email,
          role: claims.role,
          idToken: null
        });
        if (claims.role === 'admin') {
          setIsAdmin(true);
        }
        setIsLoggedIn(true);
        const authToken = await user.getIdToken();
        localStorage.setItem('authToken', authToken);
        setUser(prevUser => ({ ...prevUser, idToken: authToken }));
      }

      console.log('User', user);

      setIsLoading(false);
    });
  };

  const handleGoogleAuthentication = async () => {
    try {
      const userCredential = await signInWithGoogle();
      const additionalInfo = getAdditionalInfo(userCredential);
      if (additionalInfo.isNewUser) {
        await signupGoogle({
          name: userCredential.user.displayName,
          email: userCredential.user.email
        });
      }
    } catch (error) {
      console.log('Error authenticating with Google', error);
    }
  };

  const removeToken = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('authToken');
    } catch (error) {
      console.log('Error logging out', error);
    }
    // Upon logout, remove the token from the localStorage
  };

  const logOutUser = () => {
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    verifyUser();
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        logOutUser,
        handleGoogleAuthentication,
        isAdmin
      }}
    >
      <CartProvider>{props.children}</CartProvider>
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProviderWrapper };