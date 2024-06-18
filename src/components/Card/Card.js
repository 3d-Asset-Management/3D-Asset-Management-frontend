
import './Card.css';
// import { useState } from 'react';


export default function Card({ title, description, srcLink}) {

  
  const handleOpen = () =>{
    window.open(srcLink, '_blank');
  }
 

  const handleMouseMove = (e, card) => {
    const x = e.pageX - card.offsetLeft;
    const y = e.pageY - card.offsetTop;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  return (
    <>
    <div class="card" style={{ '--clr': '#0f0' }} onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}>
    <div class="ModelCard" >
    <div class="ModelCard_container-image" onClick={handleOpen}>
         <div class="ModelCard_container-image-sub">
               <div class="lazyload-wrapper ">
                  <img src={srcLink} alt='img' loading="lazy"/>
              </div>
         </div>
     </div>
      <div class="ModelCard__contents__container ">
            <h3 class="text-medium">{title}</h3>
            <p class="text-small modelBox__p">{description}</p>
            
     </div>
    </div>
    </div>
    </>
  );
}
