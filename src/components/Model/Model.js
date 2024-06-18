import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TextureLoader, Box3, Vector3 } from 'three';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';
import { saveAs } from 'file-saver';

const Model = forwardRef(({ objPath, mtlPath, texturePath, gridSize, wireframe }, ref) => {
  const { scene } = useThree();

  // Load materials first
  const materials = useLoader(MTLLoader, mtlPath);
  materials.preload();

  // Load the object
  const obj = useLoader(OBJLoader, objPath, (loader) => {
    loader.setMaterials(materials);
  });

  // Load the texture
  const texture = useLoader(TextureLoader, texturePath);

  const mesh = useRef();

  useEffect(() => {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.needsUpdate = true;
        child.material.wireframe = wireframe;
      }
    });
    if (mesh.current) {
      scene.add(mesh.current);
    }
  }, [obj, texture, wireframe, scene]);

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
      const exporter = new OBJExporter();
      const result = exporter.parse(mesh.current, { includeMaterials: true });
      const blob = new Blob([result], { type: 'text/plain' });
      saveAs(blob, 'model.obj');
    }
  }));

  return <primitive ref={mesh} object={obj} />;
});

export default Model;
