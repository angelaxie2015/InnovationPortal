import React from 'react';
import Event from './event/Event';
import { GridList, GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    gridList: {
        flexWrap: 'nowrap',
        overflow: 'scroll',
    },
});

export default function EventsGallery(props) {
    const classes = useStyles();

    const { events } = props;

    return (
        <GridList spacing={20} className={classes.gridList}>
            {events.map((event) => (
                <GridListTile item key={event._id} style={{ height: "70vh", width: "700px" }}>
                    <Event event={event} />
                </GridListTile>
            ))}
        </GridList>
    );
};