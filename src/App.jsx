import './App.css'
import Navbar from './components/Navbar'
import {Routes, Route } from 'react-router-dom'
import Books from './pages/Books'
import Home from './pages/Home'
import AddBook from './pages/AddBook'
import BookDetails from './pages/BookDetails'
import EditBook from './pages/EditBook'




function App() {


  return (
    <div className='App'>
   <Navbar />
     
     <Routes>
     <Route path='/' element={<Home />} />
   <Route path='/books' element={<Books />} />
   <Route path='/book' element={<AddBook />} />
   <Route path='/books/:id' element={<BookDetails />} />
   <Route path='/books/edit/:id' element={<EditBook />} />
     </Routes>
    </div>
  )
}

export default App
