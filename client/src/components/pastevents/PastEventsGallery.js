import { React } from "react"
import Event from '../events/event/Event.js';
import { GridList, GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        height: "100%",
        width: "100%",
    },
})

export default function PastEventsGallery(props) {
    const classes = useStyles();

    const { events } = props;

    return (
        <div className={classes.root}>
            <GridList spacing={20} cols={3} className={classes.gridList}>
                {events.map((event) => (
                    <GridListTile key={event._id} cols={1} style={{ height: "50vh"}}>
                        <Event event={event} />
                    </GridListTile>
                ))}
            </GridList>
        </div>

    );
}