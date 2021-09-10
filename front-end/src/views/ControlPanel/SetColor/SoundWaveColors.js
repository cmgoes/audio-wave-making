import React, { useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Button, Grid, List, ListItem, ListItemSecondaryAction, Snackbar, Typography } from "@material-ui/core";
import { Add, Done } from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';
import { Axios } from 'redux/services';
import MakeColorModal from './MakeColorModal'
import { selectedColor, colorList } from "redux/actions/color";

const useStyles = makeStyles(styles);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SoundWaveColors(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const colorsList = useSelector(state => state.color.colorList)
    const selectedColors = useSelector(state => state.color.selectedColor)
    const backgroundColor = useSelector(state => state.color.selectedBackground)

    const [open, handleOpenModal] = useState(false);
    const [newColorName, setNewColorName] = useState("")
    const [nameCreated, setNameCreated] = useState(false);
    const [colors, setColors] = useState([])
    const [openAlert, setOpenAlert] = useState({
        open: false,
        status: "success",
        text: ""
    })

    const setSelectedColor = (e) => {
        dispatch(selectedColor(e))
    }

    
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

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                color="primary"
                startIcon={<Add />}
                className={classNames(classes.w100, classes.mt10)}
                onClick={() => handleOpenModal(true)}
            >
                MAKE A COLOR PALETTE
            </Button>
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
        </React.Fragment>
    )
}
