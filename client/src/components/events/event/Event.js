import React from 'react';
import placeholder from '../../../placeholder.png'
import { Card, CardContent, Typography, Grid, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
      width: "700px",
      height: "50vh",
      backgroundColor: "white"
    },
    img: {
        width: "100%",
        height: "70%",  
        objectFit: "cover",
    },
});

export default function Event(props) {
    const { event } = props;
    const classes = useStyles();
    
    const history = useHistory();
    const openEventDetails = (event) => {
        history.push({
            pathname: "/eventDetail",
            state: event
        });
    };

    return (
        <CardActionArea onClick={ () => openEventDetails(event) } className={classes.root}>
            <img src={placeholder} className={classes.img}/>
            <CardContent style={{ height: "30%" }}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {event.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="body1" component="p">
                            {event.date.toDateString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p">
                            {event.desc}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </CardActionArea>

    );
};
