import React, {useContext, useState} from 'react';
import { useLocation } from "react-router-dom";
import placeholder from '../../../placeholder.png'
import { Card, CardContent, Typography, Grid, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import UserContext from "../../context/userContext.js";
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Axios from "axios";
import PopUp from "./PopUp.js";
import { InputBase } from '@material-ui/core';
import "./event.css"

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
    },
    input: {
        backgroundColor: blue,
        marginLeft: 3,
    }
});



export default function FullEvent(props) {
    //const { event } = props;
    const location = useLocation();
    console.log("location state is " + location.state.title);
    const event = location.state;
    const classes = useStyles();
    const { user, setUser } = useContext(UserContext);
    const [ buttonPopup, setButtonPopup ] = useState(false);
    const [passcode, setPasscode] = useState("");

    const handleChange = event => {
        setPasscode(event.target.value);
        
    }


    const checkIn = async () => {
        //setButtonPopup(true);
        console.log("checking in");
        console.log("passcode is " + passcode);

        //check if the passcode is correct
        const correctPassword = await Axios.post("http://localhost:8001/events/passcode", {event, passcode})
                                            .catch((error) => {
                                                console.log(error.message);
                                                console.log(error.response.data);  
                                                console.log(error.response.status);  
                                                console.log(error.response.headers);
                                        });

        console.log("psscode si ");
        console.log(correctPassword.data);                        
        if(correctPassword.data){ //if password input is correct
            console.log("psscode si ");
            console.log(correctPassword);

            console.log(user);

            const checkIn = await Axios.post("http://localhost:8001/users/checkin", {user, event})
                                            .catch((error) => {
                                                console.log(error.message);
                                                console.log(error.response.data);  
                                                 console.log(error.response.status);  
                                                 console.log(error.response.headers);
                                            });
        }else{
            alert("wrong password");
        }
    }

    

    return (
        <div className="fullevent">
            <Grid container spacing={1}>
           
                <Grid item xs={10}>
                    <Container>
                        <Card variant="outlined"className={classes.root}>
                            <img src={placeholder} className={classes.img}/>
                            <CardContent>
                                <Grid className={classes.content}>
                                    <Grid item xs={12}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {event.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" component="p">
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
                    </Container>             
                </Grid>
                
                <Grid item xs={2}>
                    { user.user ? 
                        <>
                        <Button variant="contained" onClick={() => setButtonPopup(true)} color="primary" startIcon={<CheckIcon />}>
                            Check In
                        </Button ><br /><br />
                        <Button variant="contained" startIcon={<EditIcon />}>
                            Edit
                        </Button><br /><br />
                        { user.user.role === "admin" ?
                            <>
                                <h1>Admin</h1> 
                                <Button variant="contained" startIcon={<EqualizerIcon />}>
                                    Statistics 
                                </Button><br /><br />
                                
                            </> : 

                            <>
                                <h1>Ambassador</h1>
                            </>

                        } 
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                        >
                           Delete
                        </Button>

                        <PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
                               <div className="input-box">
                                   <InputBase
                                        className={classes.input}
                                        placeholder={`Enter Passcode: `}
                                        inputProps={{ 'aria-label': `${props.item}` }}
                                        onChange = {handleChange}
                                    />
                                    <br />
                                </div>
                            <Button className="checkin-button" variant="contained" onClick={ () => checkIn(event, user) } color="primary" startIcon={<CheckIcon />}>
                                Check In
                            </Button ><br /><br />
                        </PopUp>

                        </> :
                        
                        <>
                            <h1>not logged in </h1>
                            <Button variant="contained" color="secondary">
                                Interested
                            </Button>
                        </>
                    }  
                </Grid>    
            </Grid>

            
        </div>
        

    );
};








