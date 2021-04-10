import mongoose from "mongoose"
import dotenv from "dotenv"
import eventSchema from "./eventSchema.js"
import userSchema from "./userSchema.js"

// todo add comment
export default function connectionFactory() {
    dotenv.config();
    // DB
    const mongoURI = process.env.MONGODB_CONNECTION;

    //Database configuration 
    const conn = mongoose.createConnection(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });

    conn.model('Event', eventSchema);
    conn.model('User', userSchema);

    // // init gfs
    // let gfs;
    // connection.once("open", () => {
    // 	// init stream
    // 	gfs = new mongoose.mongo.GridFSBucket(connection.db, {
    // 		bucketName: "uploads"
    // 	});
    // });

    // // Storage
    // const storage = new GridFsStorage({
    // 	url: mongoURI,
    // 	file: (req, file) => {
    // 		return new Promise((resolve, reject) => {
    // 			crypto.randomBytes(16, (err, buf) => {
    // 				if (err) {
    // 					return reject(err);
    // 				}
    // 				const filename = buf.toString("hex") + path.extname(file.originalname);
    // 				const fileInfo = {
    // 					filename: filename,
    // 					bucketName: "uploads"
    // 				};
    // 				resolve(fileInfo);
    // 			});
    // 		});
    // 	}
    // });

    // const upload = multer({
    // 	storage
    // });
    
    return conn;
}