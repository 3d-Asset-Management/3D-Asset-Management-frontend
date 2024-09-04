import ModelViewer from '../../components/ModelViewer/ModelViewer';
import Right3DGeneratePannel from '../../components/Right3DGeneratePannel/Right3DGeneratePannel';
import './Generate3D.css';
import useGenerate3D from '../../Hooks/useGenerate3D';


function Generate3D({backendUrl}) {
  // const genUrl = process.env.REACT_APP_MASTER_URL;
  const genUrl=backendUrl;
  console.log(genUrl);
  const {setFile,file,handleSubmit,filePath,loader} = useGenerate3D(genUrl)

  return (
    <div className='generate3D__box'>
       <ModelViewer 
        PannelRightDisplay={false} 
        s3FilePath={filePath}
        loader={loader}
         className='model-viewer-down1'
         />
      <Right3DGeneratePannel
       setFile={setFile}
       file={file}
       handleSubmit={handleSubmit}
       loader={loader}
       />
    </div>
  );
}
export default Generate3D;

