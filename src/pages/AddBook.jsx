/* import { useState } from 'react';
import { addBook } from '../api/books.api';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState(false);
  const [category, setCategory] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [isbn, setIsbn] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  


  const handleAddBook = async (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      description,
      availability,
      category,
      imgUrl,
      isbn,
      reviews,
      rating,
    };



    try {
      await addBook(newBook);
      // Handle success or redirect to a different page
      console.log('Book added successfully');
    } catch (error) {
      console.log('An error occurred while adding the book:', error);
    }
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form onSubmit={handleAddBook}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Availability:
          <input
            type="checkbox"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
          />
        </label>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Image URL:
          <input type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
        </label>
        <label>
          ISBN:
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        </label>
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
        </label>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
 */





import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { addBook } from '../api/books.api';
import { searchBooks } from '../api/googleBooksToDB.api';


const AddBook = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);


  const handleSearch = async (searchQuery, category) => {
    try {
      const books = await searchBooks(searchQuery, category);
      setSearchResults(books);
    } catch (error) {
      console.log('An error occurred while searching for books:', error);
    }
  };



  const handleBookSelect = book => {
    const selectedBook = {
      ...book,
      availability: false,
      rentedBy: null,
      imgUrl: book.thumbnail,
    
    };
    setSelectedBooks(prevSelectedBooks => [...prevSelectedBooks, selectedBook]);
  };

  const handleSaveBooks = async () => {
    try {
      for (const book of selectedBooks) {
        // Add the book to the database
        await addBook(book);
      }

      console.log('Books saved successfully');

      setSelectedBooks([]);
    } catch (error) {
      console.log('An error occurred while saving the books:', error);
    }
  };

  return (
    <div>
      <h1>Add Book</h1>

      <SearchBar onSearch={handleSearch} />

      <h2>Search Results</h2>
      {searchResults.map((book, index) => (
        <div key={`googleapi-${book.id}-${index}`}>
          <h3>{book.title}</h3>
          {book.author && <p>Author: {book.author}</p>}
          {book.description && <p>Description: {book.description}</p>}
          {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
          <button onClick={() => handleBookSelect(book)}>Select</button>
        </div>
      ))}
      {/* <h3>{book.title}</h3>
          <p>Author: {book.authors?.join(', ')}</p>
          <p>Description: {book.description}</p>
          {book.imgUrl && <img src={book.imgUrl} alt={book.title} />}
          <button onClick={() => handleBookSelect(book)}>Select</button>
        </div>
      ))} */}

      {selectedBooks.map((book, index) => (
        <div key={index}>
          <h3>{book.title}</h3>
          <p>Author: {book.authors?.join(', ')}</p>
          <p>Description: {book.description}</p>
          {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
        </div>
      ))}

      <button onClick={handleSaveBooks}>Save Books</button>
    </div>
  );
};

export default AddBook;