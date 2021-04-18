import { React, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button, Paper, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import UserContext from "../context/userContext.js";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import AddIcon from "../../addicon.png";

const useStyles = makeStyles({
  container: {
    padding: 16,
    margin: "auto",
    maxWidth: 600,
    backgroundColor: "#dadada",
    marginTop: 50,
    borderRadius: "15px",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export default function AddEvent(props) {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(Date.now());
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(AddIcon);
  const [imageFile, setImageFile] = useState(null);

  const onFileUpload = (e) => {
    const fileReader = new FileReader();

    setImageFile(e.target.files[0]);

    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (e) => {
      setImage(e.target.result);
    };
  };

  const onSubmit = async () => {
    // the file name generatedfrom multer-gridfs-storage
    let filename = null;

    if (imageFile != null) {
      // need to store image in form data because multer wants it that way
      const formData = new FormData();
      formData.append("file", imageFile);

      const imageFileRes = await Axios.post(
        "https://ufia.herokuapp.com/uploads",
        formData
      ).catch((error) => {
        console.log(error.message);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });

      filename = imageFileRes.data.filename;
    }

    const newEvent = {
      title,
      date,
      description,
      password,
      filename,
    };

    Axios.post("https://ufia.herokuapp.com/events", newEvent).catch((error) => {
      console.log(error.message);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    });

    history.push("/events");
  };

  if (user.user) {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className={classes.container}>
          <form onSubmit={onSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Paper
                    style={{
                      width: "100%",
                      height: "30vh",
                    }}
                    variant="outlined"
                  >
                    <input
                      style={{ display: "none" }}
                      id="contained-button-file"
                      type="file"
                      accept="image/*"
                      onChange={onFileUpload}
                    />
                    <label htmlFor="contained-button-file">
                      <img
                        src={image}
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </label>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="event-title"
                    label="Event Title"
                    variant="outlined"
                    fullWidth
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <KeyboardDatePicker
                    id="date"
                    label="Date"
                    format="MM/dd/yyyy"
                    disableToolbar
                    variant="outlined"
                    inputVariant="outlined"
                    fullWidth
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    value={date}
                    onChange={setDate}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TimePicker
                    id="time"
                    label="Time"
                    inputVariant="outlined"
                    fullWidth
                    value={date}
                    onChange={setDate}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    required
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#62d98a", color: "black" }}
                    onClick={onSubmit}
                  >
                    Publish
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </div>
      </MuiPickersUtilsProvider>
    );
  } else {
    return (
      <div style={{ margin: "auto", textAlign: "center" }}>
        Error: User not logged in!
      </div>
    );
  }
}
