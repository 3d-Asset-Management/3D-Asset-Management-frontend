import './SearchBar.css';
import { CiSearch } from "react-icons/ci";
function Searchbar() {
  return (
    <div className="search-container">
    <CiSearch className='search__icon'/>
    <input 
      type="text" 
      className="search-container-box middle" 
      placeholder="Search for 3D models" 
      tabIndex="1"
    />
  </div>
  );
}
export default Searchbar;