import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Grid } from '@react-three/drei';
import Model from '../Model/Model';
import PannelRight from './ModelViewerPannel/PannelRight';
import './ModelViewer.css';
import { MdZoomOutMap, MdZoomInMap } from 'react-icons/md';
import { useState, useRef } from 'react';
import AccountMenu from './settingMenu';


export default function ModelViewer({PannelRightDisplay=true}) {
  const [zoom, setZoom] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [axes, setAxes] = useState(false);
  const [grid, setGrid] = useState(false);
  const [bgOptions, set3dBgOptions] = useState('sunset');
  const [BgOnModel, setBgOnModel] = useState(false);
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

  

  const gridSize = 8;
  return (
    <div className="Model-container">
      <div className="viewer">
        <div className="top-left" onClick={handleZoomClick}>
          {zoom ? <MdZoomInMap />:<MdZoomOutMap />}
        </div>
        <div className="top-right">
           <AccountMenu setBgOnModel={setBgOnModel} set3dBgOptions={set3dBgOptions} />
        </div>
        <Canvas camera={{ position: [-9, 5, 3], fov: 90 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 50]} intensity={1.5} />
          <pointLight position={[10, 10, 10]} />
          {grid && (
            <Grid
              args={[gridSize * 3, gridSize * 3]}
              cellSize={1}
              cellThickness={1} // Adjust for boldness
              sectionSize={1}
              sectionThickness={0.7} // Adjust for boldness
              sectionColor="white"
              infiniteGrid={false}
            />
          )}
          
          <Model
            ref={modelRef}
            objPath="/coke_can/model.obj"
            mtlPath="/coke_can/model.mtl"
            texturePath="/coke_can/texture.jpg"
            gridSize={9}
            position={[0, 0, 0]}
            wireframe={wireframe}
          />
  
          {axes && <axesHelper args={[100]} position={[0, 0, 0]} />}
          <OrbitControls autoRotate={autoRotate} />
          <ContactShadows rotation-x={Math.PI / 2} opacity={0.9} width={9} height={9} blur={100} />
          <Environment preset={bgOptions} background={BgOnModel}/>
          {/* apartment, city, dawn, forest, lobby, night, park, studio, sunset, warehouse */}
        </Canvas>
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
