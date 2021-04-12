import logo from '../../logo.png';
import FullScreenEvent from './event/FullScreenEvent.js'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: "100%",
        minHeight: "100vh",
        overflow: 'hidden',
    },
    logo: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 30
    },
});

export default function EventDetails(props) {
    const classes = useStyles();

    const handleSearch = query => {
        console.log(query);
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item>
                    <img src={logo} height={100} className={classes.logo}/>
                </Grid>
            </Grid>
            <FullScreenEvent />
        </div>
    );
};
