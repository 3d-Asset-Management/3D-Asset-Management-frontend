import { useState } from 'react';
import axios from 'axios';

const useGenerate3D = () => {
 // states    
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  //urls of server
  const url = 'http://localhost:5000/upload';
  const statusUrl = 'http://localhost:5000/status';

  const handleSubmit = async (file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response) {
        setFilePath(response.data.filePath);
      }
        
      setTimeout(checkStatus, 8 * 60 * 1000);
    
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    setLoading(false);
  };

  const checkStatus = async () => {
    try {
       const response = await axios.get(`${statusUrl}?filePath=${filePath}`); //confusions he idhar ki response me kya aayegaa

      if (response.data.status === 'prepared') {
        setStatus('Model is prepared');
        setLoading(false);
      } else {
        // Check again in 30 seconds
        setTimeout(checkStatus, 30 * 1000);
      }
    } catch (error) {
      console.error('Error checking status:', error);
      setTimeout(checkStatus, 30 * 1000); 
    }
  };

  return { file, setFile, filePath, loading, handleSubmit };
};

export default useGenerate3D;
