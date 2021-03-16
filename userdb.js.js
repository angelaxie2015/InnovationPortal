import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
	email: {type: String, required: true},
	password: {type: String, required: true, minlength: 8},
	userName: {type: String},
});

export default mongoose.model('user', userSchema);