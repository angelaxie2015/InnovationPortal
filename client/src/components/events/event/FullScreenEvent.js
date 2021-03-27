import React, {useContext} from 'react';
import { useLocation } from "react-router-dom";
import placeholder from '../../../placeholder.png'
import { Card, CardContent, Typography, Grid, Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import UserContext from "../../context/userContext.js";

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
    //const { event } = props;
    const location = useLocation();
    console.log("location state is " + location.state.title);
    const event = location.state;
    const classes = useStyles();
    const { user, setUser } = useContext(UserContext);

    return (
        <Grid container spacing={3}>
       
            <Grid item xs={9}>
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
            
            <Grid item xs={3}>
                { user.user ? 
                    <>
                    { user.user.role === "admin" ?
                        <>
                            <h1>Admin</h1> 
                            <Button>
                                Check In
                            </Button><br />
                            <Button>
                                Edit
                            </Button><br />
                            <Button>
                                Statistics 
                            </Button><br />
                            <Button>
                                Delete
                            </Button>
                        </> : 

                        <>
                            <h1>Ambassador</h1>

                            <Button>
                                Check In
                            </Button><br />
                            <Button>
                                Edit
                            </Button>
                        </>

                    } 
                    </> :
                    
                    <h1>not logged in </h1>
                }  
            </Grid>    
        </Grid>

        

    );
};
