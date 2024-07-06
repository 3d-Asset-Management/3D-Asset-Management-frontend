import { useEffect,useState } from "react";
import AWS from 'aws-sdk';
export default function useModelFiles(img__id){
  const bucket = 'model-store-capstone';
  const key = 'student'
  const s3FilePath={
    bucket_name : 'model-store-capstone',
    img_id : 'student'
  }

  const [objUrl, setObjUrl] = useState(null);
  const [mtlUrl, setMtlUrl] = useState(null);
  const [textureUrl, setTextureUrl] = useState(null);
  const [imgUrl, setimgUrl] = useState(null);

  const gridSize = 8;
  
  // Configure AWS credentials
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env. REACT_APP_AWS_SECRET_ACCESS_KEY,
    region:  process.env.REACT_APP_AWS_REGION
  });

  const s3 = new AWS.S3();

  const getFileFromS3 = async (bucket, key) => {
    const params = {
      Bucket: bucket,
      Key: key,
    };

    try {
      const data = await s3.getObject(params).promise();
      const url = URL.createObjectURL(new Blob([data.Body]));
      return url;
    } catch (error) {
      console.error('Error fetching the file from S3', error);
      return null;
    }
  };

  useEffect(() => {
    const loadModelFiles = async () => {
      const imagePath = await getFileFromS3(`${s3FilePath.bucket_name}`, `${img__id}/<built-in function id>.png`);
      const objPath = await getFileFromS3(`${s3FilePath.bucket_name}`, `${s3FilePath.img_id}/model.obj`);
      const mtlPath = await getFileFromS3(`${s3FilePath.bucket_name}`, `${s3FilePath.img_id}/model.mtl`);
      const texturePath = await getFileFromS3(`${s3FilePath.bucket_name}`, `${s3FilePath.img_id}/texture_kd.jpg`);
      setimgUrl(imagePath);
      setObjUrl(objPath);
      setMtlUrl(mtlPath);
      setTextureUrl(texturePath);
    };

    loadModelFiles();
  }, []);

  return {objUrl,mtlUrl,textureUrl,imgUrl};
};