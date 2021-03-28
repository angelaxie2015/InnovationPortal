import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
	title: {type: String, required: true, unique: true},
	date: {type: Date, required: true},
	desc: {type: String, required: true},
	image: { data: Buffer, contentType: String },
	passcode: {type: String},
	interestedCount: 0,
	attendee: [],

});

export default mongoose.model("Event", eventSchema);