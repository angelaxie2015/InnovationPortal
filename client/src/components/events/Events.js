import React, { useState } from 'react'
import logo from '../../logo.png'
import SearchBar from '../SearchBar'
import NonUserNavBar from '../NonUserNavBar'
import EventsGallery from './EventsGallery'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: "100%",
        overflow: 'hidden',
      },
      gridList: {
        flexWrap: 'nowrap',
        overflow: 'scroll',
      },
});

export default function Events(props) {
    const [events, setEvents] = useState([
        { title: "React Workshop", date: new Date("Sun Mar 14 2021"), desc: "Learn React" },
        { title: "Taco Tuesday", date: new Date("Mon Mar 15 2021"), desc: "Eat Tacos" },
        { title: "Kotlin Workshop", date: new Date("Wed Mar 17 2021"), desc: "Learn Kotlin" },
        { title: "Fundraiser", date: new Date("Sat Mar 20 2021"), desc: "Get Money" },
        { title: "Meat Cookoff", date: new Date("Sat Mar 20 2021"), desc: "Cook Meat" },
        { title: "JS Convention", date: new Date("Sat Mar 20 2021"), desc: "Learn JS" },
        { title: "Ramsay Fundraiser", date: new Date("Sat Mar 20 2021"), desc: "Get Money" },
        { title: "Business Meeting", date: new Date("Sat Mar 20 2021"), desc: "Do Business" },
        { title: "Spanish Hang Out", date: new Date("Sat Mar 20 2021"), desc: "Hang out with Spanish" }
    ]);

    const classes = useStyles();

    const handleSearch = query => {
        console.log(query);
    }

    return (
        <div className={classes.root}>
            <img src={logo} height={100}/>
            <NonUserNavBar/>
            <SearchBar onSearch={handleSearch} item="Event"/>
            <EventsGallery events={events}/>
        </div>
    );
};
