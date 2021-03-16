import express from "express"

const router = express.Router();

router.post("/register", (req, res) => {
	try{
		const {email, password, checkPassword, userName} = req.body;

		//validating all fields
		if(!email || !password || !checkPassword || !userName){
			return res
				.status(400)
				.json({ msg: "Please enter all fields."});
		}

		//making sure password is at least 8 characters
		if(password.length < 8){
			return res
				.status(400)
				.json({ msg: "Password needs to contain at least 8 characters."});
		}

		//password need to match confirmation password
		if(password !== checkPassword){
			return res
				.status(400)
				.json({ msg: "Passwords need to match."});
		}

	}catch(err){
		console.log(err);
		res.status(500).send();
	}

	// if(!email || !password || !checkPassword || !userName){
	// 	return res.status(400).json( {msg: "Please fill out all fields"} );
	// }


});

export default router;