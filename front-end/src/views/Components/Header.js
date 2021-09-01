import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { PowerSettingsNew } from "@material-ui/icons";
import { handleLogout } from "redux/actions/auth";
import { Root } from "config";

const useStyles = makeStyles(styles);

export default function Header({ activeTab, handleActiveTab, tabs, handleRegister }) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const userData = JSON.parse(localStorage.getItem(Root.key))

    const logout = () => {
        dispatch(handleLogout)
        location.reload()
    }

    return (
        <Grid container justify="space-between" alignItems="center" className={classes.header}>
            <Typography variant="h5" style={{ fontSize: "22px" }}>Audio Visualization</Typography>
            {
                userData ?
                    <IconButton aria-label="logout" size="medium" onClick={() => logout()} style={{padding: "5px"}}>
                        <PowerSettingsNew fontSize="inherit" />
                    </IconButton>
                    : <div></div>
            }
        </Grid>
    );
}