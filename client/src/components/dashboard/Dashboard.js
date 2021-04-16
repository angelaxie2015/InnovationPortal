import { React, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardContent } from "@material-ui/core";
import UserContext from "../context/userContext.js";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from "@material-ui/core";
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
    setUser({
      token: undefined,
      user: undefined,
      role: undefined,
    });
    localStorage.setItem("auth-token", undefined);
    history.push("/");
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

    handleClickOpen();
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
      xs={12}
      alignContent="center"
      justify="center"
      style={{ width: "50vw", margin: "auto" }}
      >
      <Grid container xs={12} alignContent="center" justify="center">
        <img
          className="login-image"
          src="../../ia_logo.png"
          alt="ia-logo"
        ></img>
      </Grid>
      <Paper elevation={3} style={{ padding: 20 }}>
          <h1 style={{textAlign: "center"}}>{user.user.userName}</h1>
          <Grid container xs={12} alignItems="center">
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Button onClick={addEvent} variant="contained" style={{ backgroundColor: "#62d98a", color: "black" }}>
                Add Event
              </Button>
            </Grid>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <Button onClick={list} variant="contained" color="primary">
                Events Attended
              </Button>
            </Grid>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={logOut} variant="contained" color="secondary">
                Log Out
              </Button>
            </Grid>
          </Grid>
        </Paper>
        </Grid>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Events Attended"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ul>{listItems}</ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
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
