import express from "express"
import Event from "./eventdb.js"

const router = express.Router();

//post an event  events/
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



export default router;