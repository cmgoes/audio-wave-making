import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// // react components for routing our app without refresh
// import { Link } from "react-router-dom";
// @material-ui/core components
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Avatar, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Snackbar, Typography } from "@material-ui/core";
import { GraphicEq, PlayArrow, Stop } from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';
import { Axios } from 'redux/services';
import { audioList, selectedAudio } from 'redux/actions/audio'
import AudioRecording from "./AudioRecording";
import { Root } from "config";

const useStyles = makeStyles(styles);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UploadAudio(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openAlert, setOpenAlert] = useState({
        open: false,
        status: "success",
        text: ""
    })
    const [openRecording, setOpenRecording] = useState(false)
    const [playAudio, setPlayAudio] = useState(null);
    const [playAudioId, setPlayAudioId] = useState("");

    const userData = JSON.parse(localStorage.getItem(Root.key))

    const audios = useSelector(state => state.audio.audioList)
    const currentAudio = useSelector(state => state.audio.selectedAudio)
    const { graphColor, backgroundColor } = useSelector(state => state.color)
    const graph_style = useSelector(state => state.style)
    const text_style = useSelector(state => state.text)

    const uploadAudio = async (e) => {
        if (!e.target.files[0] || (e.target.files[0] && e.target.files[0].type.indexOf("audio") === -1)) {
            setOpenAlert({ ...openAlert, open: true, status: "error", text: "You should upload an audio file." })
            return
        }

        const color_style = {
            color: graphColor._id,
            backgroundColor
        }

        const formData = new FormData();
        formData.append("audio", e.target.files[0])
        formData.append("user_id", userData._id)
        formData.append("color", JSON.stringify(color_style))
        formData.append("style", JSON.stringify(graph_style))
        formData.append("text", JSON.stringify(text_style))

        const response = await Axios({ url: 'api/audio/uploadAudio', data: formData })
        if (response.status) {
            setOpenAlert({ ...openAlert, open: true, status: "success", text: "An audio file has been uploaded successfully!" })
            dispatch(audioList(response.data))
        }
    }

    const loadAudioJson = async (e) => {
        const response = await Axios({ url: 'api/audio/getJson', data: { filename: e.json_name } })
        if (response.status) {
            dispatch(selectedAudio({ id: e._id, data: response.data }))
        } else {
            setOpenAlert({ ...openAlert, open: true, status: "error", text: response.data })
        }
    }

    const makeRecords = () => {
        setOpenRecording(!openRecording)
    }

    const playMusic = (id) => {
        stopMusic();
        const audio_name = audios.find(e => e._id == id).audio_name
        setPlayAudio(new Audio(`${Root.baseurl}music/${audio_name}`));
        setPlayAudioId(id)
    }

    const stopMusic = () => {
        if (playAudio) {
            playAudio.pause();
            setPlayAudio(null);
            setPlayAudioId("");
        }
    }

    useEffect(() => {
        if (playAudio) {
            playAudio.play();
            playAudio.addEventListener("ended", function () {
                setPlayAudio(null);
                setPlayAudioId("");
            });
        }
    }, [playAudio])

    return (
        <div className={classNames(classes.uploadAudio, classes.p10)}>
            <Typography variant="h5">LOAD A SOUND</Typography>
            <Typography variant="body2" className={classes.uploadDescription}>Create or upload your own sound, or choose from your library below.</Typography>
            <Typography variant="caption" color="primary">Max file size: 40mb</Typography>
            <Grid spacing={2} container className={classes.pv10}>
                <Grid item md={6}>
                    <Button variant="contained" color="primary" className={classNames(classes.w100, classes.tCenter)} onClick={() => makeRecords()} disableElevation>Make a recording</Button>
                </Grid>
                <Grid item md={6}>
                    <Button variant="contained" color="primary" className={classNames(classes.w100, classes.tCenter)} disableElevation component="label">
                        Upload a sound
                        <input type="file" hidden accept="audio/*" onChange={uploadAudio} />
                    </Button>
                </Grid>
            </Grid>
            <div className={classes.audioList}>
                <List>
                    {
                        audios.map((item, i) => (
                            <ListItem key={i} button className={classes.audioListItem} onClick={() => loadAudioJson(item)} style={{ border: currentAudio && currentAudio.id === item._id ? "1px solid #ffba39" : "none" }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <GraphicEq />
                                    </Avatar>
                                </ListItemAvatar>
                                <Grid container className={classes.overflowHidden}>
                                    <Grid item className={classes.overflowHidden}>
                                        <Typography noWrap>{item.origin_name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption">{new Date(item.date).toLocaleString()}</Typography>
                                    </Grid>
                                </Grid>
                                <ListItemSecondaryAction>
                                    {
                                        playAudioId === item._id ?
                                            <IconButton edge="end" aria-label="stop music" onClick={() => stopMusic()}>
                                                <Stop />
                                            </IconButton>
                                            :
                                            <IconButton edge="end" aria-label="play music" onClick={() => playMusic(item._id)}>
                                                <PlayArrow />
                                            </IconButton>
                                    }
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    }
                </List>
            </div>
            {
                openRecording ?
                    <AudioRecording open={openRecording} handleOpenModal={makeRecords} />
                    : null
            }
            <Snackbar open={openAlert.open} autoHideDuration={5000} onClose={() => setOpenAlert({ ...openAlert, open: false })}>
                <Alert onClose={() => setOpenAlert({ ...openAlert, open: false })} severity={openAlert.status}>
                    {openAlert.text}
                </Alert>
            </Snackbar>
        </div>
    );
}