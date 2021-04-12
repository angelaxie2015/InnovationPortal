import { React, useState, useEffect } from 'react';
import placeholder from '../../../placeholder.png'
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Axios from "axios"

const useStyles = makeStyles({
    root: {
      width: 350,
      height: "100%"
    },
    img: {
        width: 350,
        height: 300, 
        objectFit: "cover",
    },
});

export default function Event(props) {
    const { event } = props;
    const [ image, setImage ] = useState(placeholder);

    useEffect(() => {    
        if (event.filename) {
            Axios.get(`http://localhost:8001/uploads/${event.filename}`)
                .then(res => {
                    setImage(res.config.url);
                });
        }
    }, []);

    const classes = useStyles();
    
    const history = useHistory();
    const openEventDetails = (event) => {
        history.push({
            pathname: "/eventDetail",
            state: event
        });
    };

    return (
        <Card variant="outlined"className={classes.root}>
            <img src={image} className={classes.img}/>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                    
                    <a onClick={ () => openEventDetails(event) }>
                        <Typography gutterBottom variant="h5" component="h2">
                            {event.title}
                        </Typography>
                    </a>
                    
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="body1" component="p">
                            {(new Date(event.date)).toDateString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p">
                            {event.description}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
