
import ModelViewer from '../../components/ModelViewer/ModelViewer';
import Right3DGeneratePannel from '../../components/Right3DGeneratePannel/Right3DGeneratePannel';
import Loader from '../../components/Loader/Loader';
import './Generate3D.css';
import {useState} from 'react';
import axios from 'axios';

function Generate3D() {
  const [file, setFile] = useState(null);
  const [filePath, setFilePath] = useState('');
  const [loading, setLoading] = useState(false);
  const url = 'http://localhost:5000/upload';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', file);
    setLoading(true);
    console.log('formData', formData);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFilePath(response.data.filePath);
     
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    setLoading(false);
  };
  return (
    <div className='generate3D__box'>
      {/* { loading && <Loader/>} */}
       <ModelViewer  PannelRightDisplay={false} className='generate3D__box-left'/>
      <Right3DGeneratePannel 
       setFile={setFile}
       file={file}
       handleSubmit={handleSubmit}
       />
       
    </div>
  );
}
export default Generate3D;
