import React, {useContext} from 'react';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from "../context/userContext.js";
import "./user.css";

const useStyles = makeStyles({
    root: {
      width: "100%",
      height: "100%",
      align: "center",
    },
    img: {
        width: 350,
        height: 300, 
        objectFit: "cover",
    },
});

export default function UserProfile(props) {
    const classes = useStyles();
    
    const { user } = useContext(UserContext);
    
    const list = async () => {
        console.log("in user profile user is");
        console.log(user);
    }

    return (
       <div className="profile">

           <Card variant="outlined"className={classes.root}>
                <CardContent>
                     <h1>Events Attended</h1>
                     <button onClick={list}>View</button>

                   
                </CardContent>
            </Card>

          
       </div>
    );
};