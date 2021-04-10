import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
	title: { type: String, required: true, unique: true },
	date: { type: Date, required: true },
	description: { type: String, required: true },
	filename: { type: String, required: false, unique: true },

});

export default eventSchema;