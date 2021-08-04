import React, { useState } from "react";
// // nodejs library that concatenates classes
// import classNames from "classnames";
// // react components for routing our app without refresh
// import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Button, Grid, Snackbar, Typography } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(styles);


export default function UploadAudio(props) {
    const classes = useStyles();
    const [openAlert, setOpenAlert] = useState({
        open: false,
        status: "success",
        text: ""
    })

    const uploadAudio = (e) => {
        if (e.target.files[0] && e.target.files[0].type.indexOf("audio") === -1) {
            setOpenAlert({...openAlert, open: true, status: "error", text: "You are able to upload only audio file."})
            return
        }
        console.log(`e.target.files[0]`, e.target.files[0])
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <div className={classes.uploadAudio}>
            <Typography variant="h5">LOAD A SOUND</Typography>
            <Typography variant="body2" className={classes.uploadDescription}>Create or upload your own sound, or choose from your library below.</Typography>
            <Typography variant="caption" color="primary">Max file size: 40mb</Typography>
            <Grid spacing={2} container className={classes.pt10}>
                <Grid item md={6}>
                    <Button variant="contained" color="primary" className={classes.w100} disableElevation>Make a recording</Button>
                </Grid>
                <Grid item md={6}>
                    <Button variant="contained" color="primary" className={classes.w100} disableElevation component="label">
                        Upload a sound
                        <input type="file" hidden accept="audio/*" onChange={uploadAudio} />
                    </Button>
                </Grid>
            </Grid>
            <Snackbar open={openAlert.open} autoHideDuration={5000} onClose={() => setOpenAlert({...openAlert, open: false})}>
                <Alert onClose={() => setOpenAlert({...openAlert, open: false})} severity={openAlert.status}>
                    {openAlert.text}
                </Alert>
            </Snackbar>
        </div>
    );
}