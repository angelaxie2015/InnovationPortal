import React, { useState } from 'react';
import logo from '../../logo.png';
import NonUserNavBar from '../NonUserNavBar';
import FullScreenEvent from './event/FullScreenEvent.js'
import { Grid, Button, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: "100%",
        minHeight: "100vh",
        overflow: 'hidden',
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
        overflow: 'hidden',
    }
});

export default function EventDetails(props) {
    const [events, setEvents] = useState([
        { title: "React Workshop", date: new Date("Sun Mar 14 2021"), desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus tincidunt neque quis molestie. Proin faucibus, tortor vel auctor dictum, mi orci volutpat ex, eu tempor dolor neque id leo. Phasellus porta rhoncus leo id vestibulum. Vivamus eu turpis ac metus finibus condimentum. Duis metus mi, cursus non nibh semper, viverra posuere urna. Quisque ut placerat est, vel ultrices nibh. Ut eu libero ut lacus hendrerit mattis non at ipsum. Donec eget augue quis ligula porttitor viverra vitae et ex. Donec molestie fermentum risus imperdiet luctus. Integer urna tellus, condimentum quis sapien ut, hendrerit sagittis augue. Fusce vel placerat libero. Proin elementum felis libero, eget efficitur ex tristique et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rhoncus tincidunt neque quis molestie. Proin faucibus, tortor vel auctor dictum, mi orci volutpat ex, eu tempor dolor neque id leo. Phasellus porta rhoncus leo id vestibulum. Vivamus eu turpis ac metus finibus condimentum. Duis metus mi, cursus non nibh semper, viverra posuere urna. Quisque ut placerat est, vel ultrices nibh. Ut eu libero ut lacus hendrerit mattis non at ipsum. Donec eget augue quis ligula porttitor viverra vitae et ex. Donec molestie fermentum risus imperdiet luctus. Integer urna tellus, condimentum quis sapien ut, hendrerit sagittis augue. Fusce vel placerat libero. Proin elementum felis libero, eget efficitur ex tristique et." },
    ]);

    const classes = useStyles();

    const handleSearch = query => {
        console.log(query);
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item>
                    <img src={logo} height={100} className={classes.logo}/>
                </Grid>
                <Grid item xs>
                    <NonUserNavBar/>
                </Grid>
            </Grid>
            {events.map((event) => (
                    <FullScreenEvent event={event}/>
            ))}
        </div>
    );
};
