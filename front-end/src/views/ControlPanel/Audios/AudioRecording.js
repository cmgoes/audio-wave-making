import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Backdrop, Fade, Grid, IconButton, Link, Modal, Paper, Snackbar, TextField, Typography } from "@material-ui/core";
import { Lock, Stop } from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';
import { Axios } from "redux/services";
import { ReactMic } from 'react-mic';
import { audioList } from "redux/actions/audio";
import { Root } from "config";

const useStyles = makeStyles(styles);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function AudioRecording({ open, handleOpenModal }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [openAlert, setOpenAlert] = useState({
        open: false,
        status: "success",
        text: ""
    })

    const userData = JSON.parse(localStorage.getItem(Root.key))

    const [record, setRecord] = useState(false);
    const [beforeRecord, setBeforeRecord] = useState(false);
    const [couter, setCouter] = useState(3)

    useEffect(() => {
    }, [couter])

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                setBeforeRecord(true);
                
                var couterInterval = setInterval(() => {
                    setCouter(e => {
                        if (e === 1) {
                            setRecord(true);
                            return clearInterval(couterInterval);
                        }
                        return e - 1
                    })
                }, 1000)
            })
            .catch(function (err) {
                console.log('No mic for you!')
            });
    }

    const stopRecording = () => {
        setRecord(false);
    }

    const onStop = async (recordedBlob) => {
        const formData = new FormData();
        formData.append("audio", recordedBlob.blob, 'Recording.mp3')
        formData.append("user_id", userData._id)

        const response = await Axios({ url: 'api/audio/uploadRecording', data: formData })
        if (response.status) {
            setOpenAlert({ ...openAlert, open: true, status: "success", text: "An audio file has been uploaded successfully!" })
            dispatch(audioList(response.data))
            handleOpenModal()
        }
    }

    return (
        <React.Fragment>
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
                        <Grid container alignItems="center" direction="column">
                            <ReactMic
                                record={record}
                                onStop={onStop}
                                className={classes.dHidden}
                                mimeType="audio/webm"
                            />
                            <div className={classes.micAllow}>
                                {
                                    beforeRecord ?
                                        <Typography variant="h1" style={{ fontSize: "100px", fontFamily: "serif", fontStyle: "italic" }}>{couter}</Typography>
                                        :
                                        <Lock style={{ fontSize: "100px" }} onClick={startRecording} />
                                }
                                {
                                    record ? <Stop style={{ fontSize: "100px" }} onClick={stopRecording} /> : null
                                }
                            </div>
                            <Typography variant="h2" style={{ fontWeight: "bold", fontSize: '27px' }} className={classNames(classes.mv10, classes.ph30)}>Click the lock to allow</Typography>
                            <Typography variant="caption" align="center">We need permission to use your microphone.</Typography>
                            <Typography variant="caption" align="center">Click on the lock to give us permission.</Typography>
                            <Link align="center" className={classes.mt10} href="#" onClick={stopRecording}>
                                Cancel
                            </Link>
                        </Grid>
                    </Paper>
                </Fade>
            </Modal>
            <Snackbar open={openAlert.open} autoHideDuration={5000} onClose={() => setOpenAlert({ ...openAlert, open: false })}>
                <Alert onClose={() => setOpenAlert({ ...openAlert, open: false })} severity={openAlert.status}>
                    {openAlert.text}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}