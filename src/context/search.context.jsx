import {createContext, useState, useContext} from 'react';

const SearchContext = createContext();

export const SearchProvider = ({children}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <SearchContext.Provider value={{searchTerm, handleSearch}}>
      {children}
    </SearchContext.Provider>
  );
};
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
