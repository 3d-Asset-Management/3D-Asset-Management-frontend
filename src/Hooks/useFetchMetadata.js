import { useState,useEffect ,setError} from "react";

const useFetchMetadata = (id)=>{
    const [fetchedData, setFetchedData] = useState('-');
  
    useEffect(() => {
        if(!id) return; 
        const fetchData = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_MASTER_URL_BACKEND}/metadataDisplay/${id}`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setFetchedData(result[0]);
          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchData();
      }, [id]);
     
  return {fetchedData};

}
export default useFetchMetadata;