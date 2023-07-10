import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBook, updateBook } from '../api/books.api';

const EditBook = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBook(id);
        setBook(response.data);
      } catch (error) {
        console.log('Error fetching the book:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleInputChange = e => {
    setBook(prevBook => ({
      ...prevBook,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateBook(book);
      navigate('/books');
    } catch (error) {
      console.log('Error updating the book:', error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Book</h1>
      <div>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          name='title'
          value={book.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor='author'>Author:</label>
        <input
          type='text'
          name='author'
          value={book.author}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor='description'>Description:</label>
        <textarea
          name='description'
          value={book.description}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleUpdate}>Update Book</button>
    </div>
  );
};

export default EditBook;