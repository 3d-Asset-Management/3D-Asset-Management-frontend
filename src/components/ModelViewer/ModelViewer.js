
import PannelRight from './ModelViewerPannel/PannelRight';
import './ModelViewer.css';
import CanvasView from './CanvasView/CanvasView';
import { MdZoomOutMap, MdZoomInMap } from 'react-icons/md';
import { useState, useRef } from 'react';
import AccountMenu from './settingMenu';
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader/Loader';


export default function ModelViewer({PannelRightDisplay=true}) {
  const [zoom, setZoom] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [axes, setAxes] = useState(false);
  const [grid, setGrid] = useState(false);
  const [bgOptions, set3dBgOptions] = useState('sunset');
  const [BgOnModel, setBgOnModel] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // const [reset, setReset] = useState(false);

  const handleZoomClick = () => {
    setZoom((zoom) => !zoom);
  };

  const modelRef = useRef();

  const handleDownloadClick = () => {
    if (modelRef.current) {
      modelRef.current.handleDownload();
    }
  };

 
  return (
    <div className="Model-container">
      <div className="viewer">
        {PannelRightDisplay && <div className="top-left" onClick={handleZoomClick}>
          {zoom ? <MdZoomInMap />:<MdZoomOutMap />}
        </div>}

        {!PannelRightDisplay && <div className="top-left" onClick={() => { navigate("/")}}>
          {<AiFillHome />}
        </div>}
        <div className="top-right">
           <AccountMenu setBgOnModel={setBgOnModel} set3dBgOptions={set3dBgOptions} />
        </div>
          {loading && <Loader />}
        <CanvasView 
            modelRef={modelRef} 
            wireframe={wireframe}
            axes={axes} 
            grid={grid} 
            autoRotate={autoRotate} 
            bgOptions={bgOptions} 
            BgOnModel={BgOnModel}
            setLoading={setLoading}
         />
         
      </div>
      {PannelRightDisplay && !zoom && (
        <div className="right__modal">
          <PannelRight
            autoRotate={autoRotate}
            setAutoRotate={setAutoRotate}
            wireframe={wireframe}
            setWireframe={setWireframe}
            axes={axes}
            setAxes={setAxes}
            grid={grid}
            setGrid={setGrid}
            handleDownloadClick={handleDownloadClick}
          />
        </div>
      )}
    </div>
  );
}
