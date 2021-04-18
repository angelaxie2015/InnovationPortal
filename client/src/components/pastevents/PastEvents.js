import { React, useState, useEffect } from "react";
import logo from "../../logo.png";
import SearchBar from "../SearchBar";
import PastEventsGallery from "./PastEventsGallery.js";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Hidden } from "@material-ui/core";
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
  eventsGalleryContainer: {
    height: "100%",
    marginBottom: 50,
    marginRight: 10,
    marginLeft: 10,
  },
  searchBar: {
    marginTop: 25,
    marginRight: 30,
  },
});

export default function PastEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get("https://ufia.herokuapp.com/events/")
      .then(function (res) {
        setEvents(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const classes = useStyles();

  const handleSearch = (query) => {
    console.log(query);
  };

  return (
    <div className={classes.root}>
      <Grid container style={{ height: "100%" }}>
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
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.eventsGalleryContainer}>
          <PastEventsGallery events={events} />
        </Grid>
      </Grid>
    </div>
  );
}
