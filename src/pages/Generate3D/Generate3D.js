
import ModelViewer from '../../components/ModelViewer/ModelViewer';
import Right3DGeneratePannel from '../../components/Right3DGeneratePannel/Right3DGeneratePannel';
import './Generate3D.css';
function Generate3D() {
  
  return (
    <div className='generate3D__box'>
      <ModelViewer PannelRightDisplay={false}/>
      <Right3DGeneratePannel />
    </div>
  );
}
export default Generate3D;
