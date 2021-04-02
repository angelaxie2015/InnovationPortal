import express from "express"
import Event from "./eventdb.js"

const router = express.Router();

// @route POST /events
// @desc Create an Event
// @access public
router.post("/", async (req, res) => {
	try{
		const {title, time, description, image} = req.body;

		if(!title || !time || !description){
			return res
					.status(400)
					.json({msg: "Enter all fields"});
		}

		const newEvent = new Event({
			title, time, description, image
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