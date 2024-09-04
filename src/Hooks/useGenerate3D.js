import { useState } from 'react';
import axios from 'axios';


const useGenerate3D = (genUrl) => {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [loader,setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setLoader(true);
    
    // ---file that to be send to model generation api -----------------------------------------//
      const formData = new FormData();
      formData.append('img_id',file.name.split('.').slice(0, -1).join('.'));
      formData.append('file', file); // key is file

      try {
        const response = await axios.post(`${genUrl}/generate_3d`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        console.log(response.data);
        console.log("...........");
        setFilePath(response.data.img_id);
      } 
      catch (error)
      {
        console.error('Error uploading file:', error);
      }
      finally{
        setLoader(false)
      }
  
  };

  return { setFile, file, handleSubmit, filePath ,loader};
};

export default useGenerate3D;
