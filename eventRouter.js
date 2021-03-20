import express from "express"
import Event from "./eventdb.js"

const router = express.Router();

//post an event
router.post("/", async (req, res) => {
	try{
		const {title, time, description, image} = req.body;

		if(!title || !time || !description){
			return res
					.status(400)
					.json({msg: "Enter all fields"});
		}

		// //make sure no duplicate event
		// const event = await Event.find( {title: title} );
		// if(event){
		// 	return res
		// 			.status(400)
		// 			.json({msg: "Already have this event"});
		// }

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

export default router;