import { Link } from "react-router-dom";
import useModelFiles from '../../Hooks/useModelFiles'
import './Card.css';
import Loader from '../Loader/Loader'


export default function Card({ id,title, description, img_id}) {

  const {imgUrl} = useModelFiles(img_id);
  const handleMouseMove = (e, card) => {
    const x = e.pageX - card.offsetLeft;
    const y = e.pageY - card.offsetTop;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };
  const data = img_id;
 
  return (
    <>
    <div class="card" style={{ '--clr': '#0f0' }} onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}>
    <div class="ModelCard" >
    <Link 
       to={`/modelviewer/${data}/${id}`}
      state={{ fromHome: { data } }}
      target='_blank'
      className='link_tag'
    >
        <div className="ModelCard_container-image">
          <div className="ModelCard_container-image-sub">
            <div className="lazyload-wrapper">
              <img src={imgUrl} alt='img' loading="lazy"/>
            </div>
          </div>
        </div>
      </Link>
      <div class="ModelCard__contents__container ">
            <h3 class="text-medium">{title}</h3>
            <p class="text-small modelBox__p">{description}</p>   
     </div>
    </div>
    </div>
    
    </>
  );
}
