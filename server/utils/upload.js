// upload.js
import multer from 'multer';
import dotenv from "dotenv";
import { GridFsStorage } from 'multer-gridfs-storage';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.safweje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return null; // or throw error to reject file
    }
    return {
      bucketName: 'photos',
      filename: `${Date.now()}-file-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

export default upload;
