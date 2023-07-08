import './App.css'
import Navbar from './components/Navbar'
import {Routes, Route } from 'react-router-dom'
import Books from './pages/Books'
import Home from './pages/Home'
import AddBook from './pages/AddBook'




function App() {


  return (
    <div className='App'>
   <Navbar />
     
     <Routes>
     <Route path='/' element={<Home />} />
   <Route path='/books' element={<Books />} />
   <Route path='/book' element={<AddBook />} />
     </Routes>
    </div>
  )
}

export default App
