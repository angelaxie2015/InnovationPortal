import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true, minlength: 8},
	userName: {type: String, required: true},
	role: {type: String, required: true},
	events: [],

});

export default userSchema;