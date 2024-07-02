import React from 'react';
import useGenerate3D from '../../Hooks/useGenerate3D';
import ModelViewer from '../../components/ModelViewer/ModelViewer';
import Right3DGeneratePannel from '../../components/Right3DGeneratePannel/Right3DGeneratePannel';
import './Generate3D.css';

function Generate3D() {
  const { file, setFile, filePath, loading, handleSubmit } = useGenerate3D();

  return (
    <div className='generate3D__box'>
      <ModelViewer PannelRightDisplay={false} className='generate3D__box-left' />
      <Right3DGeneratePannel
        setFile={setFile}
        file={file}
        handleSubmit={() => handleSubmit(file)}
      />
    </div>
  );
}

export default Generate3D;
