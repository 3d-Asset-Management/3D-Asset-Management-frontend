import Button from '../Button/Button';
import { SiGriddotai } from "react-icons/si";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar({button}){
    return(
        <>
        <nav className="navbar__box" >
        <Link to="/" className='link_tag'>
            <div className="navbar__logo">
                <SiGriddotai />
                <h3>3D Assets</h3>
            </div>
         </Link>   
            <div className='navbar__right'>
                 <ul className="navbar__list">
                    <li className="navbar__item active-class">3D store</li>
                    <li className="navbar__item">Model View</li>
                </ul>
               
                <Link to="/generate3D" className='link_tag'>   
                <div className="navbar__buttons">
                    <Button 
                    button_name={"Generate3D"}
                    iconLeft={true} 
                    IconNameLeft={IoMdAdd}
                    />
                </div>
                </Link>
            </div>
        </nav>
        </>
    );
}

export default Navbar;