import './CardContainer.css'
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import useFetchData from '../../Hooks/useFetchData';


 
export default function CardContainer() {
   // const initialUrl='https://mocki.io/v1/a2318a2b-f314-4b6d-9edf-4d5eefcc895a';
   const initialUrl='https://p5y7fy0lak0xjp-8000.proxy.runpod.net/getallitems';
   const searchUrl = 'https://p5y7fy0lak0xjp-8000.proxy.runpod.net/search';
   const { data, loading, error, setQuery } = useFetchData(initialUrl, searchUrl);
   return (
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
                    title={item.id.slice(0,15)}
                    description={item.description.slice(0,90)} 
                    img_id={item.img_id}
                 />
              ))}
           </div>
       </div>
   );
}