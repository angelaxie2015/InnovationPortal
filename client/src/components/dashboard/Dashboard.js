import { React, useContext } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext.js";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

export default function Dashboard(props) {
    const { user, setUser } = useContext(UserContext);

    const history = useHistory();
    const addEvent = () => history.push("/addEvent");

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
                <Button onClick={addEvent} >Add Event</Button>
            </Grid>
        </Grid> 
    );
};