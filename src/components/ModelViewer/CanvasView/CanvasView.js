import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Grid } from '@react-three/drei';
import Model from '../../Model/Model';
import useModelFiles from '../../../Hooks/useModelFiles';

export default function CanvasView({ modelRef, wireframe, axes, grid, autoRotate, bgOptions, BgOnModel, setLoading,s3FilePath }) {
  const {objUrl,mtlUrl,textureUrl} = useModelFiles();
  const gridSize = 8;
  return (
    <>
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

        {objUrl && mtlUrl && textureUrl && (
          <Model
            ref={modelRef}
            objPath={objUrl}  //for trails
            mtlPath={mtlUrl}  //for trails
            texturePath={textureUrl}  //for trails
            gridSize={9}
            position={[0, 0, 0]}
            wireframe={wireframe}
            setLoading={setLoading}
          />
        )}

        {axes && <axesHelper args={[100]} position={[0, 0, 0]} />}
        <OrbitControls autoRotate={autoRotate} />
        <ContactShadows rotation-x={Math.PI / 2} opacity={0.9} width={9} height={9} blur={100} />
        <Environment preset={bgOptions} background={BgOnModel} />
      </Canvas>
    </>
  );
}
