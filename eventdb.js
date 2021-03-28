import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
	title: {type: String, required: true, unique: true},
	time: {type: Date, required: true},
	description: {type: String, required: true},
	image: { data: Buffer, contentType: String },
	passcode: {type: String},

});

export default mongoose.model("Event", eventSchema);