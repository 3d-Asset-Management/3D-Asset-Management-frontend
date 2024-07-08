import './PageNotFound.css'
import imgs from '../../assets/Scarecrow.png'
import { Link } from "react-router-dom";

export default function PageNotFound(){
    return(
        <>
        <div className='pageNotFound'>
        <h1 className="pageNotFound_nav">404 Not found</h1>;
        <div className="display">
                <div className="display__img">
                <img src={imgs} alt="404-Scarecrow" />
            </div>
            <div className="display__content">
                <h2 className="display__content--info">I have bad news for you</h2>
                <p className="display__content--text">
                The page you are looking for might be removed or is temporarily
                unavailable
                </p>
                <Link to='/' className='link_tag'>
                <button className="btn">Back to homepage</button>
                </Link> 
      </div>
      </div>
    </div>
        </>
    );
}