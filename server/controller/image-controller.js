import grid from "gridfs-stream";
import mongoose from "mongoose";

const url = "http://localhost:8000";

let gfs, gridFsBucket;

const conn = mongoose.connection;
conn.once("open", () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ error: "File not found" });
    }

    const imageUrl = `${url}/file/${req.file.filename}`;
    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Upload failed" });
  }
};

export const getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });
    if (!request.params.filename) {
      return response.status(400).json({ error: "Filename not provided" });
    }

    if (!file) return response.status(404).json({ error: "File not found" });

    const readstream = gridfsBucket.openDownloadStreamByName(file.filename);
    response.set("Content-Type", file.contentType);
    response.set(
      "Content-Disposition",
      `attachment; filename="${file.filename}"`
    );
    readstream.pipe(response);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
