import {createContext, useEffect, useState} from 'react';
import {getAllBooks} from '../api/books.api';

const SearchContext = createContext();

const SearchProvider = ({children}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const handleSearch = value => {
    setSearchTerm(value);
  };

  const handleSearchResults = async () => {
    getBooks();
    setSearchClicked(true);
  };

  const getBooks = async () => {
    const response = await getAllBooks();

    const books = response.data.filter(
      book =>
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof book.author === 'string' &&
          book.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        book.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const grouped = books.reduce((result, book) => {
      (result[book.category] = result[book.category] || []).push(book);
      return result;
    }, {});

    setSearchResults(grouped);
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        handleSearch,
        searchResults,
        handleSearchResults,
        searchClicked,
        setSearchClicked,
        setSearchTerm
      }}>
      {children}
    </SearchContext.Provider>
  );
};

export {SearchContext, SearchProvider};
