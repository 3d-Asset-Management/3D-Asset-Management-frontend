import './Right3DGeneratePannel.css';
import { useState } from 'react';
import { MdFileUpload } from "react-icons/md";
import Buttons from '../Button/Button';
import InputPromptBar from '../InputPromptBar/InputPromptBar';

function Right3DGeneratePannel({setFile, file,handleSubmit}) {

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
   
  };

  return (
    <div className='right3DpannelContainer'>
      <div className="container">
        <h2>Generation Attributes</h2>
        <div className="dropdown">
          <div value="Cato">3D Generation</div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="file-upload">
          <label htmlFor="fileInput" className="file-drop">
            <h1><MdFileUpload /></h1>
            Choose a file or drag & drop it here
            <p>JPG and PNG formats, up to 5MB</p>
            <input 
              id="fileInput" 
              type="file" 
              accept=".jpg,.png,.jpeg" 
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
             <p className="browse-btn">Browse file</p>
             <p >{file ? file.name : 'No file Choosen'}</p>
          </label>
        </div>
        <p className='OR_txt'>or</p>
         <div className='generate__input__bar'>
            <InputPromptBar />
         </div>
        <div className="GenerateRightPannel__bottom__bar">
         <Buttons button_name={"Generate 3D Model"} type="submit"/>
         <span className="estimate-time">Estimated: 20 Sec | 30</span>
         </div>
         </form>
      </div>
     
    </div> 
  );
}
export default Right3DGeneratePannel;

  


