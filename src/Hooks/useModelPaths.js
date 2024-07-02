import { useState, useEffect } from 'react';
// import getS3SignedUrl from './getS3SignedUrl';

const useModelPaths = (s3FilePath) => {
  const [paths, setPaths] = useState({
    objPath: '',
    mtlPath: '',
    texturePath: '',
  });

  useEffect(() => {
    if (s3FilePath) {
      const basePath = s3FilePath.endsWith('/') ? s3FilePath : `${s3FilePath}/`;
      const bucketName = 'your-bucket-name'; // Update with your bucket name
      setPaths({
        objPath: getS3SignedUrl(bucketName, `${basePath}model.obj`),
        mtlPath: getS3SignedUrl(bucketName, `${basePath}model.mtl`),
        texturePath: getS3SignedUrl(bucketName, `${basePath}texture.jpg`),
      });
    }
  }, [s3FilePath]);

  return paths;
};

export default useModelPaths;
