import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import { Router } from "express";
dotenv.config();

const uploadRouter = Router();

const BUCKET_NAME = process.env.BUCKET_NAME || "100xdev-jobs";
const AWS_REGION = process.env.AWS_REGION || "ap-south-1";
const AWS_ACCESS_KEY_ID = process.env.AWS_KEY_ID || "";
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_KEY || "";

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  console.error("AWS Credentials not set in env");
}

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

async function getObjectURL(objectKey: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: objectKey,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function putObjectURL(objectKey: string) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: objectKey,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

uploadRouter.post("/file", async (req, res) => {
  const fileName = req.body.fileName;
  const folder = req.body.folder;

  if (!fileName) {
    return res.status(400).json({
      error: {
        message: "Invalid data",
      },
    });
  }

  const objectKey = `${folder}/${fileName}`;

  const url = await putObjectURL(objectKey);

  return res.json({ url, objectKey });
});

export default uploadRouter;
