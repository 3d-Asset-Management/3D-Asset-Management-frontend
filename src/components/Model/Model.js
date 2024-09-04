import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Box3, Vector3 } from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { saveAs } from 'file-saver';

const Model = forwardRef(({ glbPath, gridSize, wireframe ,setLoading}, ref) => {
  const { scene } = useThree();

  // Load the GLB model
  const gltf = useLoader(GLTFLoader, glbPath);

  const mesh = useRef();
 
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material.wireframe = wireframe;
        child.material.needsUpdate = true;
      }
    });

    if (mesh.current) {
      scene.add(mesh.current);
    }
    setLoading(false)
  }, [gltf, wireframe, scene,setLoading]);

  useEffect(() => {
    if (mesh.current) {
      const box = new Box3().setFromObject(mesh.current);
      const size = box.getSize(new Vector3());
      const scaleX = gridSize / size.x;
      const scaleY = gridSize / size.y;
      const scaleZ = gridSize / size.z;
      const scale = Math.min(scaleX, scaleY, scaleZ);
      mesh.current.scale.set(scale, scale, scale);
    }
  }, [gridSize]);

  useImperativeHandle(ref, () => ({
    handleDownload() {
      const exporter = new GLTFExporter();
      exporter.parse(
        mesh.current,
        (gltf) => {
          const blob = new Blob([gltf], { type: 'model/gltf-binary' });
          saveAs(blob, 'model.glb');
        },
        { binary: true }
      );
    }
  }));

  return <primitive ref={mesh} object={gltf.scene} />;
});

export default Model;
