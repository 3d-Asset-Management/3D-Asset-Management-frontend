import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (initialUrl, searchUrl, initialQuery = '') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const fetchData = async () => {
      try {

        setLoading(true);
        const response = await axios.get(query ? searchUrl : initialUrl,{
          params:{query}
        })
        setData(Array.isArray(response.data) ? response.data : [response.data]);

      } catch (err) 
      {
        setError(err);
      }
       finally 
       {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialUrl, searchUrl, query]);

  return { data, loading, error, setQuery };
};

export default useFetchData;
