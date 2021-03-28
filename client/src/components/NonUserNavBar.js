import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "./context/userContext.js";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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

    const profile = (user) => history.push({
        pathname: "/profile", 
        state: user
    });

    const logout = () => {
        setUser({
            token: undefined,
            user: undefined,
            role: undefined,
        });
        localStorage.setItem("auth-token", undefined);
        history.push("/");
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
                    <>
                        <Grid item key={"Log Out"}>
                            <Button className={classes.navLink} onClick={logout}>Log out</Button>
                        </Grid>
                        <Grid item key={"User"}>
                            <Button className={classes.navLink} onClick={ () => profile(user)}><AccountCircleIcon /> {user.user.userName}</Button>
                        </Grid>
                    </>
                ) : (
                     <>
                        <Grid item key={"Log In"}>
                            <Button onClick={login} className={classes.navLink}>Log In</Button>
                        </Grid>
                        <Grid item key={"Register"}>
                            <Button onClick={register} className={classes.navLink}>Register</Button>
                        </Grid>
                     </>
                )

            }
   
        </Grid>
    );
}