import express from "express";
import bcrypt from "bcryptjs"; //for hashing password
import jwt from "jsonwebtoken";
import connectionFactory from "./db.js";

const router = express.Router();
const User = connectionFactory().model("User");

//register
router.post("/register", async (req, res) => {
  try {
    const { email, pass, checkPassword, userName } = req.body;

    const role = "normal";

    //validating all fields
    if (!email || !pass || !checkPassword || !userName) {
      return res.status(400).json({ msg: "Please enter all fields." });
    }
    //check if the user is unique
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ msg: "User already exists." });
    }

    //making sure password is at least 8 characters
    if (pass.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password needs to contain at least 8 characters." });
    }

    //password need to match confirmation password
    if (pass !== checkPassword) {
      return res.status(400).json({ msg: "Passwords need to match." });
    }

    //secure password
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(pass, salt);

    //store to db
    const newUser = new User({
      email,
      password,
      userName,
      role,
    });

    const saveUser = await newUser.save();

    return res.json({ msg: "registered" });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;

    if (!email || !pass) {
      return res.status(400).json({ msg: "Please enter all fields." });
    }

    //find if the user exists
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return (
        res
          .status(400)
          .json({ msg: "Wrong email address" })
      );
    }

    //check if the user password is correct
    const correctPass = await bcrypt.compare(pass, findUser.password);

    if (!correctPass) {
      return res.status(400).json({ msg: "Incorrect password." });
    }

    const token = jwt.sign({ id: findUser._id }, process.env.JWT_CODE);

    res.json({
      token,
      user: {
        id: findUser._id,
        name: findUser.userName,
        role: findUser.role,
      },
    });
  } catch (err) {
    console.log("Log in error");
    console.log(err.response);
  }
});

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ msg: "No authentication found" });
    }

    const acc = jwt.verify(token, process.env.JWT_CODE);
    if (!acc) {
      return res.status(401).json({ msg: "None found" });
    }

    res.user = acc.id;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

//deleting a user
router.delete("/delete", auth, async (req, res) => {
  try {
    const userToLogOut = await User.findByIdAndDelete(res.user);

    res.json(userToLogOut);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

//checking if a user is logged in
router.post("/checkToken", async (req, res) => {
  console.log("in /checkToken post");
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_CODE);
    if (!verified) return res.json(false);

    //make sure user is in the database
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

//find the user who's currently logged in
router.get("/", auth, async (req, res) => {
  const user = await User.findById(res.user);
  console.log("get / method, user is + ");
  console.log(user);
  res.json({
    //if user is found, display its name and email
    email: user.email,
    id: user._id,
    userName: user.userName,
    role: user.role,
  });
});

router.post("/checkin", async (req, res) => {
  const user = await User.findById(req.body.user.user.id);

  const eventExist = await User.findOne({
    _id: req.body.user.user.id,
    events: req.body.event,
  });

  if (eventExist) {
    console.log("event already exist");
  } else {
    user.update(user.events.push(req.body.event));
    const saveUser = await user.save();

    return res.json(true);
  }

  res.json(false);
});

//get a user
router.post("/getEvents", async (req, res) => {
  const user = await User.findById(req.body.user.id);

  return res.json(user);
});

export default router;
