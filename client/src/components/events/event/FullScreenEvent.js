import { React, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import placeholder from "../../../placeholder.png";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import UserContext from "../../context/userContext.js";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Axios from "axios";
import PopUp from "./PopUp.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { InputBase } from "@material-ui/core";
import "./event.css";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minheight: "100vh",
  },
  img: {
    width: "100%",
    height: "50vh",
    objectFit: "cover",
  },
  content: {
    width: "100%",
    minheight: "50vh",
  },
  input: {
    backgroundColor: blue,
    marginLeft: 3,
  },
});

export default function FullEvent(props) {
  const location = useLocation();
  console.log("location state is " + location.state.title);

  const event = location.state;

  const [image, setImage] = useState(placeholder);

  useEffect(() => {
    if (event.filename) {
      Axios.get(`https://ufia.herokuapp.com/uploads/${event.filename}`)
        .then((res) => {
          setImage(res.config.url);
        })
        .catch((e) => {
          console.log(e);
          console.log("https://ufia.herokuapp.com/uploads/${event.filename}");
        });
    }
  }, []);

  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);

  const [buttonPopup, setButtonPopup] = useState(false);
  const [passcode, setPasscode] = useState("");

  const handleChange = (event) => {
    setPasscode(event.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [attendee, setAttendee] = useState([]);

  const checkIn = async () => {
    //check if the passcode is correct
    const correctPassword = await Axios.post(
      "https://ufia.herokuapp.com/events/passcode",
      { event, passcode }
    ).catch((error) => {
      console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    });

    if (correctPassword.data) {
      //if password input is correct
      const checkIn = await Axios.post(
        "hhttps://ufia.herokuapp.com/users/checkin",
        {
          user,
          event,
        }
      ).catch((error) => {
        console.log(error.message);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });

      const addAttendee = await Axios.post(
        "https://ufia.herokuapp.com/events/attend",
        { user, event }
      ).catch((error) => {
        console.log(error.message);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });

      alert("Checked in");
      setButtonPopup(false);
    } else {
      alert("Wrong password");
    }
  };

  const addPasscode = async () => {};

  //list all the attendee
  const list = async () => {
    console.log("in full screen event is");
    console.log(event);

    const attendeeRes = await Axios.post(
      "hhttps://ufia.herokuapp.com/events/getAttendee",
      event
    ).catch((error) => {
      console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    });

    console.log("in list in full screen event, attendee:");
    console.log(attendeeRes.data);

    setAttendee({
      attendee: attendeeRes.data,
    });
  };
  console.log("Attkajflkajsdlkfj");
  console.log(attendee);

  var listItems = [];

  if (attendee.length !== 0)
    listItems = attendee.attendee.map((att) => (
      <li key="{att.name}">
        {att.name} {att.userName}{" "}
      </li>
    ));

  return (
    <div className="fullevent">
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Container>
            <Card variant="outlined" className={classes.root}>
              <img src={image} className={classes.img} />
              <CardContent>
                <Grid className={classes.content}>
                  <Grid item xs={12}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {event.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" component="p">
                      {new Date(event.date).toDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" component="p">
                      {event.description}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        </Grid>

        <Grid item xs={2}>
          {user.user ? (
            <>
              <Button
                variant="contained"
                onClick={handleClickOpen}
                color="primary"
                startIcon={<CheckIcon />}
              >
                Check In
              </Button>
              <br />
              <br />

              {user.user.role === "admin" ? (
                <>
                  <h1>Admin</h1>
                  <Button
                    onClick={list}
                    variant="contained"
                    startIcon={<EqualizerIcon />}
                  >
                    Statistics
                  </Button>
                  <br />
                  <br />

                  <ul>{listItems}</ul>

                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                  <br />
                  <br />
                </>
              ) : (
                <>
                  {user.user.role === "ambassador" && (
                    <>
                      <h1>Ambassador</h1>
                      <Button variant="contained" startIcon={<EditIcon />}>
                        Edit
                      </Button>
                      <br />
                      <br />
                    </>
                  )}
                </>
              )}

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogContent>
                  <TextField
                    required
                    variant="filled"
                    name="meeting-code"
                    type="text"
                    label="Meeting Code"
                    autoFocus
                    margin="dense"
                    fullWidth
                    onChange={handleChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={() => checkIn(event, user)} color="primary">
                    Check In
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            <>
              <h1>not logged in </h1>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
