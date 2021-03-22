import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "./context/userContext.js";

import { 
    Grid,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    navLink: {
        textTransform: 'none',
    }
});

export default function NonUserNavBar() {
    const classes = useStyles();

    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const event = () => history.push("/events");
    const contact = () => history.push("/contact");
    const logout = () => {
        setUser({
            token: undefined,
            user: undefined
        });
    };

    return (
        <Grid container className={classes.root} justify={'flex-end'}>
            <Grid item key={"Events"}>
                <Button onClick={event} className={classes.navLink}>Events</Button>
            </Grid>
            <Grid item key={"Contact"}>
                <Button onClick={contact} className={classes.navLink}>Contact</Button>
            </Grid>
            
            { user.user ? 
                (
                    <Grid item key={"Log Out"}>
                        <Button className={classes.navLink} onClick={logout}>Log out</Button>
                    </Grid>
                ) : (
                     <>
                        <Grid item key={"Log In"}>
                            <Button onClick={login} className={classes.navLink}>Log In</Button>
                        </Grid>
                        <Grid item key={"Log In"}>
                            <Button onClick={register} className={classes.navLink}>Register</Button>
                        </Grid>
                     </>
                )

            }
        </Grid>
    );
}