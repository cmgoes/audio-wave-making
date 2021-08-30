import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Avatar, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Snackbar, Typography } from "@material-ui/core";
import { GraphicEq, PlayArrow } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function FooterNavigation({ activeTab, handleActiveTab, tabs, handleLogin }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
    }, [])

    const goNext = () => {
        const index = tabs.indexOf(activeTab) + 1
        handleActiveTab(tabs[index]);
    }

    return (
        <Grid container justify="space-between" className={classes.footerNavigation}>
            {
                tabs.indexOf(activeTab) + 1 === tabs.length ? <Button variant="contained" color="primary" className={classes.w100} onClick={() => handleLogin(true)}>CREATE A SOUND WAVE</Button> :
                    <React.Fragment>
                        <Button variant="outlined" color="primary" onClick={() => handleLogin(true)}>Skip</Button>
                        <Button variant="contained" color="primary" disableElevation onClick={goNext}>Next</Button>
                    </React.Fragment>
            }
            {/* <Button variant="outlined" color="primary">Back</Button> */}
        </Grid>
    );
}