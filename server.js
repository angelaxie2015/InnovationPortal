import express from "express"
import mongoose from "mongoose"

const app = express();
const port = process.env.PORT || 8001;
const connection_url = "mongodb+srv://admin:@cluster0.lb7ej.mongodb.net/ufia-db?retryWrites=true&w=majority"


//Database configuration 
mongoose.connect(connection_url, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

app.get("/", (req, res) => res.status(200).send("hello world"));

app.listen(port, () => console.log('Listening on port ${port}'));



// // Specification for http server
// var http = require('http'), 
// 	fs = require('fs'), 
//  	url = require('url'),
//   	port = 8080;