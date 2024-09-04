import './SearchBar.css';
import { CiSearch } from "react-icons/ci";
import { useState, useMemo, useEffect } from 'react';
import _ from 'lodash';

function Searchbar({ setQuery }) {
  const [inputValue, setInputValue] = useState('');

  // Memoize the debounced function to ensure it is stable
  const debouncedSearch = useMemo(
    () =>
      _.debounce((query) => {
        setQuery(query.trim());
        console.log('Searching for:', query);
      }, 1000),
    [setQuery]
  );

  // Use effect to trigger the debounced function when inputValue changes
  useEffect(() => {
    debouncedSearch(inputValue);
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, debouncedSearch]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <div className="search-container">
      <CiSearch className='search__icon' />
      <input
        type="text"
        className="search-container-box middle"
        placeholder="Search for 3D models"
        tabIndex="1"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Searchbar;
