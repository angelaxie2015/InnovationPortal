import express from "express"

const router = express.Router();

router.post("/register", (req, res) => {
	try{
		const {email, password, checkPassword, userName} = req.body;

		console.log(email);
	}catch(err){
		console.log("error was here");
	}

	// if(!email || !password || !checkPassword || !userName){
	// 	return res.status(400).json( {msg: "Please fill out all fields"} );
	// }


});

export default router;