import express from "express"
import mongoose from "mongoose"
import connectionFactory from "./db.js"
import dotenv from "dotenv"
import crypto from "crypto"
import path from "path"
import multer from "multer"
import GridFsStorage from "multer-gridfs-storage"

const conn = connectionFactory();
const router = express.Router();

// init gfs
let gfs;
conn.once("open", () => {
    // init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});

dotenv.config();
// DB
const mongoURI = process.env.MONGODB_CONNECTION;

// Storage
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            console.log("uploading file")
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString("hex") + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads"
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({
    storage
});

router.post("/", upload.single("file"), (req, res) => {
    console.log("in post")
});

router.get("/image/:filename", (req, res) => {
    const file = gfs
    .find({
      filename: req.params.filename
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist"
        });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
});



export default router;