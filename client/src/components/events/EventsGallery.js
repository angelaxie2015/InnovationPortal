import React from 'react';
import Event from './event/Event';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    gridList: {
        flexWrap: 'nowrap',
        overflow: 'scroll',
      },
})

export default function EventsGallery(props) {
    const classes = useStyles();

    const { events } = props;

    return (
        <Grid container spacing={6} className={classes.gridList}>
            {events.map((event) => (
                <Grid item key={event.title} style={{height: "100%"}}>
                    <Event event={event} />
                </Grid>
            ))}
        </Grid>
    );
};