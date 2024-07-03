import './CardContainer.css'
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import useFetchData from '../../Hooks/useFetchData';

 
export default function CardContainer() {
   const initialUrl='https://mocki.io/v1/a2318a2b-f314-4b6d-9edf-4d5eefcc895a';
   const searchUrl = 'https://fakestoreapi.com/products/';
   
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
                    key={item.id} 
                    title={item.title.slice(0,15)}
                    description={item.description.slice(0,90)} 
                    srcLink={item.image}
                 />
              ))}
           </div>
       </div>
   );
}