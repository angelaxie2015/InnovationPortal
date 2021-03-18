import express from "express"
import bcrypt from "bcryptjs" //for hashing password
import User from "./userdb.js"

const router = express.Router();

//register
router.post("/register", async (req, res) => {
	try{
		const {email, pass, checkPassword, userName} = req.body;

		//validating all fields
		if(!email || !pass || !checkPassword || !userName){
			return res
				.status(400)
				.json({ msg: "Please enter all fields."});
		}
		//check if the user is unique
		const existUser = await User.findOne({email});
		if(existUser){
			return res
				.status(400)
				.json({msg: "User already exists."});
		}

		//making sure password is at least 8 characters
		if(pass.length < 8){
			return res
				.status(400)
				.json({ msg: "Password needs to contain at least 8 characters."});
		}

		//password need to match confirmation password
		if(pass !== checkPassword){
			return res
				.status(400)
				.json({ msg: "Passwords need to match."});
		}

		//secure password
		const salt = await bcrypt.genSalt();
		const password = await bcrypt.hash(pass, salt);

		//store to db
		const newUser = new User({
			email, password, userName
		});
		
		const saveUser = await newUser.save();


	}catch(err){
		console.log(err);
		res.status(500).send();
	}
});

//login
router.post("/login", async (req, res) => {
	try{
		const {email, pass} = req.body;

		if(!email || !pass){
			return res
				.status(400)
				.json({ msg: "Please enter all fields."});
		}

		//find if the user exists
		const findUser = await User.findOne({email});

		if(!findUser)
			return res.status(400).json({msg: "Wrong email address"});

		//check if the user password is correct 
		const correctPass = await bcrypt.compare(pass, findUser.password);
		if(!correctPass)
			return res.status(400).json({msg: "Incorrect password."});

	}catch(err){
		console.err(err);
	}
});

export default router;