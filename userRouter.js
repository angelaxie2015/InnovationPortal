import express from "express"
import bcrypt from "bcryptjs" //for hashing password
import jwt from "jsonwebtoken"
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

		if(!findUser){
			return res
				.status(400)
				.json({msg: "Wrong email address"});
		}

		//check if the user password is correct 
		const correctPass = await bcrypt.compare(pass, findUser.password);
		if(!correctPass){
			return res
				.status(400)
				.json({msg: "Incorrect password."});
		}

		const token = jwt.sign({id: findUser._id}, process.env.JWT_CODE);
		res.json({
			token, 
			user:{
				id: findUser._id,
				name: findUser.userName
			}
		});

	}catch(err){
		console.log("Log in error");
		console.log(err.response);
	}
});


const auth = (req, res, next) => {
	try{
		const token = req.header("x-auth-token");
		if(!token){
			return res
				.status(401)
				.json({msg: "No authentication found"});
		}

		const acc = jwt.verify(token, process.env.JWT_CODE);
		if(!acc){
			return res
				.status(401)
				.json({msg: "None found"});
		}

		res.user = acc.id;
		console.log("here");
		next();

	}catch(err){
		console.log(err);
		res.status(500).send();
	}
};


//deleting a user
router.delete("/delete", auth, async (req, res) => {
	try{
		const userToLogOut = await User.findByIdAndDelete(res.user);

		res.json(userToLogOut);
	}catch(err){
		console.log(err);
		res.status(500).send();
	}
});

//checking if a user is logged in
router.post("/checkToken", async (req, res) => {
	try{
		const token = req.header("x-auth-token");
		if(!token)
			return res.json(false);

		const verified = jwt.verify(token, process.env.JWT_CODE);
		if(!verified)
			return res.json(false);

		//make sure user is in the database
		const user = await User.findById(verified.id);
		if(!user)
			return res.json(false);

		return res.json(true);
	}catch(err){
		console.log(err);
		res.status(500).send();
	}
});

//find the user who's currently logged in
router.get("/", auth, async (req, res) => {
	console.log("heererere");
	const user = await User.findById(res.user);
	res.json({ //if user is found, display its name and email
		email: user.email,
		id: user._id,
		userName: user.userName
	});
});

export default router;