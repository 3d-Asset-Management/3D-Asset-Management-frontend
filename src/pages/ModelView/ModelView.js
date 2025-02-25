import ModelViewer from "../../components/ModelViewer/ModelViewer";
import { useParams } from 'react-router-dom';


export default function ModelView() {
  const { data } = useParams();  
  return (
    <div>
      <ModelViewer 
      PannelRightDisplay={true} 
       s3FilePath={data}
      /> 
    </div>
  );
}