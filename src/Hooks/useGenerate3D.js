import { useState } from 'react';
import axios from 'axios';

const useGenerate3D = (genUrl) => {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [loader,setLoader] = useState(false);
  let answer;

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    setLoader(true);
    //-- background remover ------------------------------------------------------------//
    const api_key = process.env.REACT_APP_API_BG;
    const apiUrl = "https://api.remove.bg/v1.0/removebg";
    const formData = new FormData();
    formData.append("image_file", file, file.name);
    formData.append("size", 'auto');
   
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'X-Api-Key': api_key,
        },
        body: formData,
      });

      const blobFile = await res.blob();
      // const imageUrl = URL.createObjectURL(blobFile);
      console.log(blobFile);

      // ---file that to be send to model generation api -----------------------------------------//
      const formData1 = new FormData();
      formData1.append('img_id',file.name.split('.').slice(0, -1).join('.'));
      formData1.append('file', file); // key is file

      try {
        const response = await axios.post(`${genUrl}/generate_3d`, formData1, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(response.data);
        answer = response.data.img_id;
        const bucketName = response.data.bucket_name;
        const imgId = response.data.img_id;

        const formData2 = new FormData();
        formData2.append('bucket_name', bucketName);
        formData2.append('img_id', imgId); // key is file
        setTimeout(() => checkStatus(formData2), 6000); // Start checking status after 6 sec
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to check whether model is prepared or not
  const checkStatus = async (formData2) => {
    try {
      const response = await axios.post(`${genUrl}/frontend_recursive`,formData2,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log(response);
      if (response.data.status === '1') {
        //sucessfull 
        setLoader(false);
        console.log("preparation done-");
        setFilePath(answer);
        
        // do something
      } else {
        console.log("preparation chal raha he ....");
        setTimeout(() => checkStatus(formData2), 30 * 1000); // Check again in 30 seconds
      }
    } catch (error) {
      console.error('Error checking status:', error);
      setTimeout(() => checkStatus(formData2), 30 * 1000);
    }
  };

  return { setFile, file, handleSubmit, filePath ,loader};
};

export default useGenerate3D;
