import './App.css';
import {IntlProvider} from 'react-intl'; // provide functionality for string comparison, number formatting, date and time formatting, and so on.
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';
import Books from './pages/Books';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import BookDetails from './pages/BookDetails';
import EditBook from './pages/EditBook';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import {CartProvider} from './context/CartContext';
import Cart from './components/Cart';
import RentBook from './pages/RentBook';
import UserAuthPrivate from './components/UserAuthPrivate';
import AdminAuthPrivate from './components/AdminAuthPrivate';
import IsAnon from './components/IsAnon';
import About from './pages/About';
import UserRentals from './pages/UserRentals';
import {ToastContainer} from 'react-toastify';
import ActiveRentals from './pages/ActiveRentals';
import Container from './components/Container';

function App() {
  return (
    <IntlProvider locale='en'>
      <Container>
        <CartProvider>
          <div className='App'>
            <Navbar />

            <ToastContainer />

            <Routes>
              <Route>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/books' element={<Books />} />
                <Route
                  path='/book'
                  element={
                    <AdminAuthPrivate>
                      <AddBook />{' '}
                    </AdminAuthPrivate>
                  }
                />
                <Route path='/books/:id' element={<BookDetails />} />
                <Route
                  path='/books/edit/:id'
                  element={
                    <AdminAuthPrivate>
                      <EditBook />{' '}
                    </AdminAuthPrivate>
                  }
                />
                <Route
                  path='/login'
                  element={
                    <IsAnon>
                      <Login />
                    </IsAnon>
                  }
                />
                <Route
                  path='/signup'
                  element={
                    <IsAnon>
                      <Signup />
                    </IsAnon>
                  }
                />
                <Route
                  path='/user-dashboard'
                  element={
                    <UserAuthPrivate>
                      <UserDashboard />{' '}
                    </UserAuthPrivate>
                  }
                />
                <Route
                  path='/admin-dashboard'
                  element={
                    <AdminAuthPrivate>
                      <AdminDashboard />
                    </AdminAuthPrivate>
                  }
                />
                <Route
                  path='/rentals/active'
                  element={
                    <AdminAuthPrivate>
                      <ActiveRentals />
                    </AdminAuthPrivate>
                  }></Route>
                <Route
                  path='/rentals'
                  element={
                    <UserAuthPrivate>
                      <RentBook />
                    </UserAuthPrivate>
                  }
                />
                <Route
                  path='/users/:userId/rentals'
                  element={
                    <UserAuthPrivate>
                      {' '}
                      <UserRentals />{' '}
                    </UserAuthPrivate>
                  }
                />

                <Route
                  path='/cart'
                  element={
                    <UserAuthPrivate>
                      <Cart />
                    </UserAuthPrivate>
                  }
                />
              </Route>
            </Routes>
          </div>
        </CartProvider>
      </Container>
    </IntlProvider>
  );
}

export default App;
