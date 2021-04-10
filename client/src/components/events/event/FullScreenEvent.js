import { React, useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import Axios from "axios"
import placeholder from '../../../placeholder.png'
import { Card, CardContent, Typography, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
    root: {
      width: "100%",
      minheight: "100vh",
      backgroundColor: blue
    },
    img: {
        width: "100%",
        height: "50vh", 
        objectFit: "cover",
    },
    content: {
        width: "100%",
        minheight: "50vh"
    }
});


export default function FullEvent(props) {
    const location = useLocation();
    console.log("location state is " + location.state.title);
    const event = location.state;

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

    return (
        <Container>
            <Card variant="outlined"className={classes.root}>
                <img src={image} className={classes.img}/>
                <CardContent>
                    <Grid className={classes.content}>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {event.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" component="p">
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
        </Container>

    );
};
