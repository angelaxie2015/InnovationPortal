import React, {useContext, useState} from 'react';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from "../context/userContext.js";
import Axios from "axios";
import "./user.css";

const useStyles = makeStyles({
    root: {
      width: "100%",
      height: "100%",
      align: "center",
    },
    img: {
        width: 350,
        height: 300, 
        objectFit: "cover",
    },
});

export default function UserProfile(props) {
    const classes = useStyles();
    
    const { user } = useContext(UserContext);

    const [eventsAttended, setEventsAttended] = useState([]);
    
    const list = async () => {
        console.log("in user profile user is");
        console.log(user);

        const eventList = await Axios.post("http://localhost:8001/users/getEvents", user)
                                            .catch((error) => {
                                                console.log(error.message);
                                                console.log(error.response.data);  
                                                console.log(error.response.status);  
                                                console.log(error.response.headers);
                                        });

        console.log("in list user:");
        console.log(eventList);

        setEventsAttended({
            eventsAttended: eventList.data.events
        });

    }

    console.log(eventsAttended);

    var listItems = [];

    if(eventsAttended.length !== 0)
        listItems = eventsAttended.eventsAttended.map((event) => <li key={event.title} >{event.title}   {event.date}</li>);

    return (
       <div className="profile">

           <Card variant="outlined"className={classes.root}>
                <CardContent>
                     <h1>Events Attended</h1>

                     <button onClick={list}>View</button>
                     <ul>{listItems}</ul>
                   
                </CardContent>
            </Card>

          
       </div>
    );
};