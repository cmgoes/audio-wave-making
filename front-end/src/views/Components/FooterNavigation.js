import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Button, Grid } from "@material-ui/core";
import { handleActiveTab } from "redux/actions/auth";
import { Root } from "config";

const useStyles = makeStyles(styles);

export default function FooterNavigation({ activeTab, tabs, handleRegister }) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const userData = JSON.parse(localStorage.getItem(Root.key))

    const goNext = () => {
        const index = tabs.indexOf(activeTab) + 1 >= tabs.length ? tabs.length - 1 : tabs.indexOf(activeTab) + 1
        dispatch(handleActiveTab(tabs[index]));
    }

    const goBack = () => {
        const index = tabs.indexOf(activeTab) - 1 < 0 ? 0 : tabs.indexOf(activeTab) - 1
        dispatch(handleActiveTab(tabs[index]));
    }

    return (
        <Grid container justify="space-between" className={classes.footerNavigation}>
            {
                userData ?
                    <React.Fragment>
                        <Button variant="outlined" color="primary" disableElevation onClick={() => goBack()}>Back</Button>
                        <Button variant="contained" color="primary" disableElevation onClick={() => goNext()}>Next</Button>
                    </React.Fragment>
                    :
                    tabs.indexOf(activeTab) + 1 === tabs.length ? <Button variant="contained" color="primary" className={classes.w100} onClick={handleRegister}>CREATE A SOUND WAVE</Button> :
                        <React.Fragment>
                            <Button variant="outlined" color="primary" onClick={handleRegister}>Skip</Button>
                            {
                                activeTab === 7 ?
                                    <Button variant="contained" color="primary" disableElevation onClick={() => dispatch(handleActiveTab(1))}>Start Tutorial</Button>
                                    : <Button variant="contained" color="primary" disableElevation onClick={() => goNext()}>Next</Button>
                            }
                        </React.Fragment>
            }
        </Grid>
    );
}