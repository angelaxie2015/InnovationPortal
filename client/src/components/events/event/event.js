import React, { Component } from 'react'
import { Card, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      minWidth: 350,
      minHeight: 200,
    },
});


export default function Event(props) {
    const { event } = props;
    const classes = useStyles();

    return (
        <Card variant="outlined"className={classes.root}>
            <CardContent>
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
        </Card>
    );
};