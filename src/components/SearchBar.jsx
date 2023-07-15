import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = event => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
      <button type='submit'>Search</button>
    </form>
  );
};

export default SearchBar;
