import express from "express"
import connectionFactory from "./db.js"

const router = express.Router();
const Event = connectionFactory().model("Event")

// @route POST /events
// @desc Create an Event
// @access public
router.post("/", async (req, res) => {
	try {
		const { title, date, description, filename } = req.body;

		if(!title || !date || !description){
			return res
					.status(400)
					.json({msg: "Enter all fields"});
		}

		const newEvent = new Event({
			title, date, description, filename
		});

		const saveEvent = await newEvent.save();

		const events = await Event.find({});
		res.json(events);

	}catch(error){
		console.log(error.message);
		res.status(500).send();
		
	}
});

// @route get /events
// @desc get All Events
// @access Public
router.get("/", (req, res) => {
	Event.find()
		.sort({ date: -1 })
		.then(events => res.json(events));
});

export default router;