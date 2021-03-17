import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
	title: {type: String, required: true, unique: true},
	time: {type: String, required: true},
	description: {type: String, required: true},

});

export default mongoose.model("Event", eventSchema);