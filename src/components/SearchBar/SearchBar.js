import './SearchBar.css';
import { CiSearch } from "react-icons/ci";
import { useState } from 'react';
function Searchbar({setSearchTerm }) {
  const [inputValue,setInputValue] = useState('');
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setSearchTerm(event.target.value);
    }
  };
 const handleInputChange =(e)=>{
      setInputValue(e.target.value)
 }
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
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}
export default Searchbar;