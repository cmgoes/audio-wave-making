import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// // react components for routing our app without refresh
// import { Link } from "react-router-dom";
// @material-ui/core components
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Avatar, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, MenuItem, Select, Snackbar, Typography } from "@material-ui/core";
import { Add, Done } from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';
import { Axios } from 'redux/services';
import { colorList, selectedColor, selectedBackground } from 'redux/actions/color'
import MakeColorModal from './MakeColorModal'
import { Root } from 'config'

const useStyles = makeStyles(styles);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SetColor(props) {
    const classes = useStyles();
    const colorsList = useSelector(state => state.color.colorList)
    const selectedColors = useSelector(state => state.color.selectedColor)
    const backgroundColor = useSelector(state => state.color.selectedBackground)
    const dispatch = useDispatch();
    const [open, handleOpenModal] = useState(false);
    const [newColorName, setNewColorName] = useState("")
    const [nameCreated, setNameCreated] = useState(false);
    const [colors, setColors] = useState([])

    const [openAlert, setOpenAlert] = useState({
        open: false,
        status: "success",
        text: ""
    })

    const handleCloseModal = () => {
        setNewColorName("")
        setNameCreated(false)
        setColors([])
        handleOpenModal(false)
    }

    const handleCreateColor = async () => {
        const response = await Axios({
            url: "api/style/addColor", data: {
                name: newColorName,
                color: colors
            }
        })
        if (response.status) {
            dispatch(colorList(response.data))
            handleCloseModal()
        } else {
            setOpenAlert({ ...openAlert, open: true, status: "error", text: response.data })
        }
    }

    const setSelectedColor = (e) => {
        dispatch(selectedColor(e))
    }

    return (
        <div className={classNames(classes.setColor, classes.p10)}>
            <Grid className={classes.title}>
                <Typography variant="h5">COLOR</Typography>
                <Typography variant="body2" className={classes.uploadDescription}>Create or select a color palette for your sound wave.</Typography>
            </Grid>
            <Button
                variant="outlined"
                color="primary"
                startIcon={<Add />}
                className={classNames(classes.w100, classes.mt10)}
                onClick={() => handleOpenModal(true)}
            >
                MAKE A COLOR PALETTE
            </Button>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={backgroundColor}
                onChange={e => dispatch(selectedBackground(e.target.value))}
                className={classNames(classes.w100, classes.mv10)}
                style={{backgroundColor: backgroundColor}}
            >
                {
                    Root.backgroundColors.map((item, i) => (
                        <MenuItem value={item} key={i} style={{backgroundColor: item}}>{item}</MenuItem>
                    ))
                }
            </Select>
            <List>
                {
                    colorsList.map((item, i) => (
                        <ListItem key={i} button className={classes.audioListItem} onClick={() => setSelectedColor(item)}>
                            <Grid container className={classes.fColumn}>
                                <Typography variant="caption" style={{ marginLeft: "2px" }}>{item.name}</Typography>
                                <Grid container>
                                    {
                                        item.color.map((item, i) => (
                                            <Grid item key={i} style={{ backgroundColor: item.color, width: "30px", height: "30px", borderRadius: "3px", margin: "0 2px" }}></Grid>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                            {
                                selectedColors && selectedColors._id === item._id ?
                                    <ListItemSecondaryAction className={classNames(classes.dFlex, classes.aCenter)}>
                                        <Done />
                                    </ListItemSecondaryAction>
                                    : null
                            }
                        </ListItem>
                    ))
                }
            </List>
            <MakeColorModal
                open={open}
                handleCloseModal={handleCloseModal}
                newColorName={newColorName}
                setNewColorName={setNewColorName}
                nameCreated={nameCreated}
                setNameCreated={setNameCreated}
                colors={colors}
                setColors={setColors}
                handleCreateColor={handleCreateColor}
            />
            <Snackbar open={openAlert.open} autoHideDuration={5000} onClose={() => setOpenAlert({ ...openAlert, open: false })}>
                <Alert onClose={() => setOpenAlert({ ...openAlert, open: false })} severity={openAlert.status}>
                    {openAlert.text}
                </Alert>
            </Snackbar>
        </div>
    );
}