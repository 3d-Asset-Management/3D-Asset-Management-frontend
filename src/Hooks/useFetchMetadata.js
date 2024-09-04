import { useState,useEffect} from "react";

const useFetchMetadata = (id)=>{
    const [fetchedData, setFetchedData] = useState('-');
    const backendUrl = JSON.parse(localStorage.getItem('sharedData'));
    useEffect(() => {
        if(!id) return; 
        const fetchData = async () => {
          try {
            const response = await fetch(`${backendUrl}/metadataDisplay/${id}`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setFetchedData(result[0]);
          } catch (error) {
            // setError(error.message);
            console.error(error)
          }
        };
    
        fetchData();
      }, [id,backendUrl]);
     
  return {fetchedData};

}
export default useFetchMetadata;