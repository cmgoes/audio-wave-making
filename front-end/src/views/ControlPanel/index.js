import React, { useState } from "react";
import PropTypes from 'prop-types';
// // nodejs library that concatenates classes
// import classNames from "classnames";
// // react components for routing our app without refresh
// import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";

import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import { ColorLens, MusicNote, Tune, FontDownload, Print, AspectRatio, CheckCircle } from "@material-ui/icons";
import UploadAudio from './UploadAudio';
import SetColor from './SetColor';
import SetStyle from './SetStyle';
import TourComplete from './TourComplete';
import FooterNavigation from 'views/Components/FooterNavigation';
import Login from "views/Auth/Login";
import Register from "views/Auth/Register";

const useStyles = makeStyles(styles);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            {value === index && (
                children
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}


export default function ControlPanel(props) {
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState(1);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false)
    const tabs = [1, 2, 3, 6]

    const handleChange = (event, activeTab) => {
        setActiveTab(activeTab);
    };

    const handleLoginModal = () => {
        setOpenRegister(false)
        setOpenLogin(!openLogin)
    }

    const handleRegisterModal = () => {
        setOpenLogin(false)
        setOpenRegister(!openRegister)
    }

    return (
        <div className={classes.controlPanel}>
            <Typography variant="h5" className={classes.header}>Audio Visualization</Typography>
            <Tabs
                value={activeTab}
                onChange={handleChange}
                variant="fullWidth"
                scrollButtons="off"
                indicatorColor="primary"
                textColor="primary"
                className={classes.controlTabs}
            >
                {/* <Tab className={classes.controlTab} icon={<MusicNote />} aria-label="Audio" value={0} {...a11yProps(0)} /> */}
                <Tab className={classes.controlTab} icon={<ColorLens />} aria-label="Color" value={1} {...a11yProps(1)} />
                <Tab className={classes.controlTab} icon={<Tune />} aria-label="Style" value={2} {...a11yProps(2)} />
                <Tab className={classes.controlTab} icon={<FontDownload />} aria-label="Text" value={3} {...a11yProps(3)} />
                {/* <Tab className={classes.controlTab} icon={<Print />} aria-label="Print" value={4} {...a11yProps(4)} /> */}
                {/* <Tab className={classes.controlTab} icon={<AspectRatio />} aria-label="Size" value={5} {...a11yProps(5)} /> */}
                <Tab className={classes.controlTab} icon={<CheckCircle />} aria-label="Size" value={6} {...a11yProps(6)} />
            </Tabs>
            <TabPanel className={classes.tabPanel} value={activeTab} index={0}>
                <UploadAudio />
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={1}>
                <SetColor />
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={2}>
                <SetStyle />
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={3}>
                Set Text
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={4}>
                Print
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={5}>
                Set Size
            </TabPanel>
            <TabPanel className={classes.tabPanel} value={activeTab} index={6}>
                <TourComplete />
            </TabPanel>
            <FooterNavigation activeTab={activeTab} tabs={tabs} handleActiveTab={setActiveTab} handleLogin={setOpenLogin} />
            <Login open={openLogin} handleOpenModal={handleLoginModal} handleRegisterModal={handleRegisterModal} />
            <Register open={openRegister} handleOpenModal={handleRegisterModal} handleLoginModal={handleLoginModal} />
        </div>
    );
}