import {useState} from 'react';

const SearchBar = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = event => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{display: 'flex', gap: '1em', justifyContent: 'center'}}>
      <input
        type='text'
        placeholder='Search your books...'
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        style={{
          padding: '0.5em',
          borderRadius: '4px',
          border: '1px solid #718096'
        }}
      />

      <button
        type='submit'
        style={{
          padding: '0.5em 1em',
          borderRadius: '4px',
          border: '1px solid',
          color: '#718096',
          cursor: 'pointer'
        }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
