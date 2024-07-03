import { useState } from 'react';
import axios from 'axios';

const useGenerate3D = () => {
  // States    
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  // URLs of server
  const url = 'http://localhost:5000/upload';
  const statusUrl = 'http://localhost:5000/status';

  const handleSubmit = async (file) => {
    setLoading(true);
    const api_key = process.env.REACT_APP_API_BG;
    try {
      const formData = new FormData();
      formData.append('image', file);

      // Background remover
      const res = await axios.post("https://api.remove.bg/v1.0/removebg", formData, {
        headers: {
          "X-Api-Key": api_key,
        },
        responseType: 'blob', // Specify the response type as blob
      });

      const processedFormData = new FormData();
      processedFormData.append('image', res.data);

      const response = await axios.post(url, processedFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        setFilePath(response.data.filePath);
        setTimeout(checkStatus, 8 * 60 * 1000); // Start checking status after 8 minutes
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    setLoading(false);
  };

  const checkStatus = async () => {
    try {
      const response = await axios.get(`${statusUrl}?filePath=${filePath}`);

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

  return { file, setFile, filePath, loading, handleSubmit, status };
};

export default useGenerate3D;
