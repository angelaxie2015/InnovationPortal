import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../logo.png";
import SearchBar from "../SearchBar";
import EventsGallery from "./EventsGallery";
import { Grid, Button, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";

const useStyles = makeStyles({
  root: {
    width: "100%",
    minHeight: "100vh",
    overflow: "hidden",
  },
  logo: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
  },
  button: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 25,
  },
  eventsGalleryContainer: {
    height: "100%",
    marginBottom: 50,
    marginRight: 10,
    marginLeft: 10,
  },
  searchBar: {
    marginTop: 25,
  },
});

export default function Events(props) {
  const [events, setEvents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    Axios.get("https://ufia.herokuapp.com/events/")
      .then(function (res) {
        setEvents(res.data.slice(0, 10)); // take only top 10 events
      })
      .catch((error) => {
        console.log(error.message);
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      });
  }, []);

  const classes = useStyles();

  const handleSearch = (query) => {
    console.log(query);
  };

  const pastEvents = () => history.push("/pastEvents");

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item>
          <a href="/events">
            <img src={logo} height={100} className={classes.logo} />
          </a>
        </Grid>
        <Grid item xs>
          <Grid container item alignItems="center">
            <Grid item xs className={classes.searchBar}>
              <SearchBar onSearch={handleSearch} item="Event" />
            </Grid>
            <Hidden only="xs">
              <Grid item className={classes.button}>
                <Button variant="contained" onClick={pastEvents}>
                  Past Events
                </Button>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.eventsGalleryContainer}>
          <EventsGallery events={events} />
        </Grid>
      </Grid>
    </div>
  );
}
