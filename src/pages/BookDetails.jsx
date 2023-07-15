import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { deleteBook, getBook } from '../api/books.api';

const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchBook = async () => {
    try {
      const response = await getBook(id);
      setBook(response.data);
    } catch (error) {
      console.log('Error fetching project', error);
    }
  };

  useEffect(() => {
    fetchBook(id);
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteBook(id);
      navigate('/books');
    } catch (error) {
      console.log('Error deleting the project', error);
    }
  };
  return (
    <div className='bookDetails'>
      {book && (
        <div>
          <h1>{book.title}</h1>
          {book.imgUrl && <img src={book.imgUrl} alt={book.title} />}
          <p>{book.author}</p>
          <p>{book.description}</p>
          <Link to={`/books/edit/${id}`}>
            <button>Edit Book</button>
          </Link>
          <button onClick={handleDelete}>Delete Book</button>
        </div>
      )}

      <Link to={`/books`}>Back to Books Page</Link>
    </div>
  );
};

export default BookDetails;
