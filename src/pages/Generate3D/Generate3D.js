import ModelViewer from '../../components/ModelViewer/ModelViewer';
import Right3DGeneratePannel from '../../components/Right3DGeneratePannel/Right3DGeneratePannel';
import './Generate3D.css';
import useGenerate3D from '../../Hooks/useGenerate3D';

function Generate3D() {
  // const genUrl = process.env.REACT_APP_MASTER_URL;
  const genUrl='http://127.0.0.1:8000';
 
  const {setFile,file,handleSubmit,filePath,loading} = useGenerate3D(genUrl)
  console.log(filePath);
  return (
    <div className='generate3D__box'>
       <ModelViewer 
        PannelRightDisplay={false} 
        s3FilePath={filePath}
        loading={loading}
        />
      <Right3DGeneratePannel
       setFile={setFile}
       file={file}
       handleSubmit={handleSubmit}
       />
    </div>
  );
}
export default Generate3D;

