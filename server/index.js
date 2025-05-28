import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import NodeCache from "node-cache";

import Route from "./routes/route.js";
import Connection from "./database/db.js";
// import { initStorage } from "./utils/upload.js";

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "https://chat-app-ten-alpha-25.vercel.app"], // ✅ Allow both dev & production
  credentials: true
}));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Route);

const imageCache = new NodeCache({ stdTTL: 3600 }); // cache for 1 hour

app.get("/profile-image", async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).send("Missing url param");
  }

  try {
    // Check if cached
    const cachedImage = imageCache.get(imageUrl);
    if (cachedImage) {
      res.set("Content-Type", cachedImage.contentType);
      return res.send(cachedImage.data);
    }

    // Fetch image with axios
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0 (Node.js Proxy Server)",
        Referer: "https://google.com", // sometimes helps
      },
      timeout: 10000,
    });

    const contentType = response.headers["content-type"] || "image/jpeg"; // default fallback
    const imageBuffer = Buffer.from(response.data, "binary");

    // Cache the response
    imageCache.set(imageUrl, { data: imageBuffer, contentType });

    // Set correct headers and send image
    res.set("Content-Type", contentType);
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error fetching image:", error.message);
    res.status(500).send("Failed to fetch image");
  }
});

const PORT = 8000;

Connection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
