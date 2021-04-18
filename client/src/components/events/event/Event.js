import { React, useState, useEffect } from "react";
import placeholder from "../../../placeholder.png";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  img: {
    width: "100%",
    height: "70%",
    objectFit: "cover",
  },
});

export default function Event(props) {
  const { event } = props;
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

  const history = useHistory();
  const openEventDetails = (event) => {
    history.push({
      pathname: "/eventDetail",
      state: event,
    });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => openEventDetails(event)}
        style={{ height: "100%", width: "100%" }}
      >
        <img src={image} className={classes.img} />
        <CardContent style={{ height: "30%" }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography gutterBottom variant="h5" component="h2">
                {event.title}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="right" variant="body1" component="p">
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
      </CardActionArea>
    </Card>
  );
}
