import { React, useContext } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext.js";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

export default function Dashboard(props) {
    const { user, setUser } = useContext(UserContext);

    const history = useHistory();

    const addEvent = () => history.push("/addEvent");
    const logOut = () => {
        setUser({ token: undefined, user: undefined});
        history.push("/events")
    };

    if (user.user) {
        return (
            <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={12}>
                    <Button onClick={addEvent} variant="contained">
                        Add Event
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={logOut} variant="contained">
                        Log Out
                    </Button>
                </Grid>
            </Grid> 
        );
    } else {
        return(
            <div style={{margin: 'auto', textAlign: "center"}}>
                Error: User not logged in!
            </div>
        );
    }

};