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
  }
};

export default function useModelFiles(key) {
  const bucket_name = '3d-asset-store';
  const [glbUrl, setGlbUrl] = useState(null);
  const [imgUrl, setimgUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!key) return; 
    const loadModelFiles = async () => {
      setLoading(true);  // loader start --->
      const imagePath = await getFileFromS3(bucket_name, `${key}/model/input.png`);
      setimgUrl(imagePath);
      const glbPath = await getFileFromS3(bucket_name, `${key}/model/mesh.glb`);
      setGlbUrl(glbPath);
 
    };

    loadModelFiles();
    // setLoading(false);  // loader end --->
  }, [key]);
 
  return { glbUrl, imgUrl, loading ,setLoading};
}
