import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    navLink: {
        textTransform: 'none',
    }
});

export default function NonUserNavBar() {
    const classes = useStyles();

    return (
        <Grid justify={'flex-end'}>
            <Grid item key={"Events"}>
                <Button className={classes.navLink}>Events</Button>
            </Grid>
            <Grid item key={"Contact"}>
                <Button className={classes.navLink}>Contact</Button>
            </Grid>
            <Grid item key={"Log In"}>
                <Button className={classes.navLink}>Log In</Button>
            </Grid>
        </Grid>
    );
};