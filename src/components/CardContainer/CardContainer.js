import './CardContainer.css'
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';

 
export default function CardContainer({data, setQuery}) {
   return (
      <>
       <div className='container'>
           <div className='card__btns'>
               <div className='card__btns-left'>
                3D Designs
               </div>
             <SearchBar setQuery={setQuery}/>
           </div>
           <div className='card__container'>
              { data.map((item) => (
                 <Card 
                    key={item.unique_id} 
                    id={item.unique_id}
                    title={item.img_id.slice(0,15).toUpperCase()}
                    description={item.description.slice(0,85)+'....'} 
                    img_id={item.img_id}
                 />
              ))}
           </div>
       </div>
       </>
   );
}