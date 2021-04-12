import { React, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardContent } from "@material-ui/core";
import UserContext from "../context/userContext.js";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import Axios from "axios";

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

export default function Dashboard(props) {
  const { user, setUser } = useContext(UserContext);
  const classes = useStyles();

  const history = useHistory();

  const [eventsAttended, setEventsAttended] = useState([]);
  const addEvent = () => history.push("/addEvent");
  const logOut = () => {
    setUser({ token: undefined, user: undefined });
    history.push("/events");
  };

  const list = async () => {
    console.log("in user profile user is");
    console.log(user);

    const eventList = await Axios.post(
      "http://localhost:8001/users/getEvents",
      user
    ).catch((error) => {
      console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    });

    console.log("in list user:");
    console.log(eventList);

    setEventsAttended({
      eventsAttended: eventList.data.events,
    });
  };

  var listItems = [];

  if (eventsAttended.length !== 0)
    listItems = eventsAttended.eventsAttended.map((event) => (
      <li key={event.title}>
        {event.title} {event.date.substring(0, 10)}
      </li>
    ));

  if (user.user) {
    return (
      <>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <Button onClick={addEvent} variant="contained">
              Add Event
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={logOut} variant="contained">
              Log Out
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div className="profile">
              <Card variant="outlined" className={classes.root}>
                <CardContent>
                  <h1>Events Attended</h1>

                  <button onClick={list}>View</button>
                  <ul>{listItems}</ul>
                </CardContent>
              </Card>
            </div>
          </Grid>
        </Grid>
      </>
    );
  } else {
    return (
      <div style={{ margin: "auto", textAlign: "center" }}>
        Error: User not logged in!
      </div>
    );
  }
}
