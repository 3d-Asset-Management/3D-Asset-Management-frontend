import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Grid, Loader } from '@react-three/drei';
import Model from '../../Model/Model';

export default function CanvasView({modelRef, wireframe, axes, grid, autoRotate, bgOptions, BgOnModel,setLoading}) {
    let gridSize = 8;
    // const { objPath, mtlPath, texturePath } = useModelPaths(s3FilePath);
     return(
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
      
        <Model
          ref={modelRef}
          // objPath={objPath}
          // mtlPath={mtlPath}
          // texturePath={texturePath}
          objPath="/coke_can/model.obj"   //for trails
          mtlPath="/coke_can/model.mtl"   //for trails
          texturePath="/coke_can/texture.jpg"  //for trails
          gridSize={9}
          position={[0, 0, 0]}
          wireframe={wireframe}
          setLoading={setLoading}
        />
  
        {axes && <axesHelper args={[100]} position={[0, 0, 0]} />}
        <OrbitControls autoRotate={autoRotate} />
        <ContactShadows rotation-x={Math.PI / 2}  opacity={0.9} width={9} height={9} blur={100}  />
        <Environment preset={bgOptions} background={BgOnModel}/>
      </Canvas>
      </>
     );
}