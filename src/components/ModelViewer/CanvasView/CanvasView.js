import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Grid } from '@react-three/drei';
import Model from '../../Model/Model';
import useModelFiles from '../../../Hooks/useModelFiles';
import Loader from '../../Loader/Loader';
import imgs from '../../../assets/Scarecrow.png'
import './CanvasView.css'

export default function CanvasView({ modelRef, wireframe, axes, grid, autoRotate, bgOptions, BgOnModel, s3FilePath }) {
  const { objUrl, mtlUrl, textureUrl, loading, setLoading } = useModelFiles(s3FilePath);
  const gridSize = 8;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {!objUrl && !mtlUrl && !textureUrl && !loading && (
        <>
        <div className="welcome-message">
        <h1>🚀 Welcome to the 3D Fun Zone! 🎉</h1>
        <h5>Transform your flat images into awesome 3D models!</h5>
      
       <img src={imgs} alt='3dimg' className='canvas-img'/></div>
       </>
      )}
      <Canvas camera={{ position: [-9, 5, 3], fov: 90  }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 50]} intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        {grid && (
          <Grid
            args={[gridSize * 3, gridSize * 3]}
            cellSize={1}
            cellThickness={1} 
            sectionSize={1}
            sectionThickness={0.7} // Adjust for boldness
            sectionColor="white"
            infiniteGrid={false}
          />
        )}
  
        {objUrl && mtlUrl && textureUrl && (
          <Model
            ref={modelRef}
            objPath={objUrl}
            mtlPath={mtlUrl}
            texturePath={textureUrl}
            gridSize={9}
            position={[0, 0, 0]}
            wireframe={wireframe}
            setLoading={setLoading}
          />
        )}

        {axes && <axesHelper args={[100]} position={[0, 0, 0]} />}
        
        <OrbitControls 
          autoRotate={autoRotate} 
          enableZoom={!isMobile} 
          touchRotate={!isMobile}
          touchZoom={!isMobile}
          touchPan={!isMobile}
        />
        
        <ContactShadows rotation-x={Math.PI / 2} opacity={0.9} width={9} height={9} blur={100} />
        {BgOnModel && <Environment preset={bgOptions} background />}
      </Canvas>
    </>
  );
}
