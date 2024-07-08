import { useEffect, useState } from "react";
import AWS from 'aws-sdk';

// Configure AWS credentials
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION
});

const s3 = new AWS.S3();

const getFileFromS3 = async (bucket_name, key) => {
  const params = {
    Bucket: bucket_name,
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

export default function useModelFiles(key) {
  const bucket_name = 'model-store-capstone';
  const [objUrl, setObjUrl] = useState(null);
  const [mtlUrl, setMtlUrl] = useState(null);
  const [textureUrl, setTextureUrl] = useState(null);
  const [imgUrl, setimgUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!key) return; // Return early if key is empty or undefined

    const loadModelFiles = async () => {
      setLoading(true); // Set loading to true when starting to load files

      const imagePath = await getFileFromS3(bucket_name, `${key}/image.png`);
      setimgUrl(imagePath);
      const objPath = await getFileFromS3(bucket_name, `${key}/model.obj`);
      const mtlPath = await getFileFromS3(bucket_name, `${key}/model.mtl`);
      const texturePath = await getFileFromS3(bucket_name, `${key}/texture_kd.jpg`);
      setObjUrl(objPath);
      setMtlUrl(mtlPath);
      setTextureUrl(texturePath);

    };

    loadModelFiles();
  }, [key]);

  return { objUrl, mtlUrl, textureUrl, imgUrl, loading, setLoading };
}
