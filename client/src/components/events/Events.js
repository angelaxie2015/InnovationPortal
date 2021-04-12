import React, { useState, useEffect } from 'react';
import logo from '../../logo.png';
import SearchBar from '../SearchBar';
import NavBar from '../NavBar';
import EventsGallery from './EventsGallery';
import { Grid, Button, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "100vh",
    overflow: "hidden",
  },
  logo: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  },
  searchBar: {
    marginTop: 20,
    marginRight: 30,
  },
  button: {
    marginRight: 30,
    marginTop: 20,
  },
  eventsGalleryContainer: {
    marginTop: 30,
    marginBottom: 50,
    overflow: "hidden",
  },
});

export default function Events(props) {
  // hardcode events for testing purposes and because DB not set up yet
  const [events, setEvents] = useState([
    {
      title: "React Workshop",
      date: new Date("Sun Mar 14 2021"),
      desc: "Learn React",
    },
    {
      title: "Taco Tuesday",
      date: new Date("Mon Mar 15 2021"),
      desc: "Eat Tacos",
    },
    {
      title: "Kotlin Workshop",
      date: new Date("Wed Mar 17 2021"),
      desc: "Learn Kotlin",
    },
    {
      title: "Fundraiser",
      date: new Date("Sat Mar 20 2021"),
      desc: "Get Money",
    },
    eventsGalleryContainer: {
        marginTop: 30,
        marginBottom: 50,
        overflow: 'hidden',
    }
});

export default function Events(props) {
    
    const [events, setEvents] = useState([]);

    useEffect(() => {    
        Axios.get("http://localhost:8001/events/")
            .then(function (res) {
            setEvents(res.data);
            console.log(res.data);
        });
    }, [])

  const classes = useStyles();

  const handleSearch = (query) => {
    console.log(query);
  };

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
                <Button variant="contained">Past Events</Button>
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
