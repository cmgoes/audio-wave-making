import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Avatar, Backdrop, Button, Fade, Grid, IconButton, Link, Modal, Paper, Snackbar, TextField, Typography } from "@material-ui/core";
import { GraphicEq, PlayArrow } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function Login({ open, handleOpenModal, handleRegisterModal }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
    }, [])

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classNames(classes.modal, classes.makeColorModal)}
            open={open}
            onClose={handleOpenModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open} >
                <Paper className={classes.modalBody}>
                    <Typography align="center" variant="h5" className={classes.mt20}>LOGIN</Typography>
                    <Typography align="center" variant="subtitle2">Welcome back!</Typography>
                    <Grid container justify="center" direction="column" className={classNames(classes.pv10, classes.loginModal)}>
                        <TextField
                            id="outlined-username-input"
                            label="Username"
                            variant="outlined"
                            className={classes.mv10}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            className={classes.mv10}
                        />
                        <Link align="center" className={classes.mv10} href="#" style={{fontSize: "14px"}}>
                            Forgot Password?
                        </Link>
                        <Button variant="contained" color="primary">LOGIN</Button>
                        <Link align="center" className={classes.mt10} href="#" onClick={handleRegisterModal}>
                            Create an account
                        </Link>
                    </Grid>
                </Paper>
            </Fade>
        </Modal>
    );
}