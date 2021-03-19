import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./userRouter.js"

const app = express();
const PORT = process.env.PORT || 8001;
dotenv.config();

app.use(express.json());
app.use(cors());

//Database configuration 
mongoose.connect(process.env.MONGODB_CONNECTION, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
}, (err) => {
	if (err) throw err;
	console.log("MongoDB Connection made");
});

app.get("/", (req, res) => res.status(200).send("hello world"));

app.listen(PORT, () => console.log(`The server started on port: ${ PORT }`));

app.use("/users", userRouter)



// // Specification for http server
// var http = require('http'), 
// 	fs = require('fs'), 
//  	url = require('url'),
//   	port = 8080;