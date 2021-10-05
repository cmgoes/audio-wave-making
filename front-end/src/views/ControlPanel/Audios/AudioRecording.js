import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Backdrop, Fade, Grid, Link, Modal, Paper, Snackbar, Typography } from "@material-ui/core";
import { Lock, Stop } from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';
import { Axios } from "redux/services";
import { audioList } from "redux/actions/audio";
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";

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
    const [record, setRecord] = useState(false);
    const [beforeRecord, setBeforeRecord] = useState(false);
    const [couter, setCouter] = useState(3)

    useEffect(() => {
    }, [couter])

    const startAudioRecording = () => {
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
        // setRecord(true)
    }

    const stopAudioRecording = () => {
        setRecord(false);
    }

    const onStop = async (recordedBlob) => {
        console.log(`recordedBlob`, recordedBlob)
        // let reader = new FileReader();
        // reader.readAsDataURL(recordedBlob.blob); // converts the blob to base64 and calls onload

        // reader.onload = function () {
        //     // console.log(`reader.result`, reader.result)
        // };
        // const extension = recordedBlob.blob.type.split("/")[1]
        // const recorded_audio = new File([recordedBlob.blob], `Recording.${extension}`, { type: recordedBlob.options.mimeType })
        // console.log(`recorded_audio`, recorded_audio)

        const formData = new FormData();
        formData.append("audio", recordedBlob.blob, 'Recording.mp3')
        console.log(`formData`, formData)
        // const response = await Axios({ url: 'api/audio/uploadRecording', data: formData })
        // if (response.status) {
        //     setOpenAlert({ ...openAlert, open: true, status: "success", text: "An audio file has been uploaded successfully!" })
        //     dispatch(audioList(response.data))
        //     handleOpenModal()
        // }
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
                        {
                            navigator.mediaDevices.getUserMedia({video: false, audio: true}).then(() => (
                                <ReactMediaRecorder
                                    audio
                                    render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                                        <div>
                                            <p>{status}</p>
                                            <button onClick={startRecording}>Start Recording</button>
                                            <button onClick={stopRecording}>Stop Recording</button>
                                            <audio src={mediaBlobUrl} controls autoPlay loop />
                                        </div>
                                    )}
                                />
                            ))
                        }
                            {/* <div className={classes.micAllow}>
                                {
                                    beforeRecord ?
                                        <Typography variant="h1" style={{ fontSize: "100px", fontFamily: "serif", fontStyle: "italic" }}>{couter}</Typography>
                                        :
                                        <Lock style={{ fontSize: "100px" }} onClick={startAudioRecording} />
                                }
                                {
                                    record ? <Stop style={{ fontSize: "100px" }} onClick={stopAudioRecording} /> : null
                                }
                            </div> */}
                            <Typography variant="h2" style={{ fontWeight: "bold", fontSize: '27px' }} className={classNames(classes.mv10, classes.ph30)}>Click the lock to allow</Typography>
                            <Typography variant="caption" align="center">We need permission to use your microphone.</Typography>
                            <Typography variant="caption" align="center">Click on the lock to give us permission.</Typography>
                            <Link align="center" className={classes.mt10} href="#" onClick={stopAudioRecording}>
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