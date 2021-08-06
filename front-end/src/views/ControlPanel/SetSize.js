import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Avatar, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Snackbar, Typography } from "@material-ui/core";
import { GraphicEq, PlayArrow } from "@material-ui/icons";
import { Axios } from '../../redux/services';
import { audioList, selectedAudio } from '../../redux/actions/audio'

const useStyles = makeStyles(styles);

export default function SetSize(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
    }, [])

    return (
        <div className={classes.setSize}>
        </div>
    );
}