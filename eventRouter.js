import express from "express"
import connectionFactory from "./db.js"

const router = express.Router();
const Event = connectionFactory().model("Event")

// @route POST /events
// @desc Create an Event
// @access public
router.post("/", async (req, res) => {
	try {
		const { title, date, description, filename, password } = req.body;
		let passcode = password;

		if(!title || !date || !description){
			return res
					.status(400)
					.json({msg: "Enter all fields"});
		}

		const newEvent = new Event({
			title, date, description, filename, passcode
		});

		const saveEvent = await newEvent.save();

		const events = await Event.find({});
		res.json(events);

	}catch(error){
		console.log(error.message);
		res.status(500).send();
		
	}
});


//checking correct passcode
router.post("/passcode", async (req, res) => {
	try{
		//1. find event in the database
		const event = await Event.findOne({title: req.body.event.title});

		if(event){
			if(event.passcode === req.body.passcode){
				return res.json(true);
			}else
				return res.json(false);
		}

		return res.json(false);
	}catch(error){
		console.log(error.message);
		res.status(500).send();
		
	}
});

//add attendee
router.post("/attend", async (req, res) => {
	try{
		//1. find event in the database
		const event = await Event.findOne({title: req.body.event.title});

		console.log("event is");
		console.log(event);

		const duplicate = await Event.findOne({title: req.body.event.title, 'attendee.id' : req.body.user.user.id } );

		console.log("printing duplicate");
		console.log(req.body);
		console.log(duplicate);
					
		if(!duplicate && event){
			console.log("no duplicates");
			event.update(event.attendee.push(req.body.user.user));
			const saveEvent = await event.save();
		}
	

		return res.json(false);
	}catch(error){
		console.log(error.message);
		res.status(500).send();
		
	}

});


//get attendee
router.post("/getAttendee", async (req, res) => {
	try{
		console.log("/getAttendee req boday");
		console.log(req.body);


		//1. find event in the database
		const event = await Event.findOne({title: req.body.title});

		console.log("event attendee is");
		console.log(event.attendee);

		return res.json(event.attendee);
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