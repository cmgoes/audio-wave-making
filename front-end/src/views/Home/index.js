import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import { Grid } from "@material-ui/core";

import ControlPanel from '../ControlPanel';
import GraphContent from '../GraphContent';
import styles from "assets/jss/home.js";
import { colorList, selectedColor } from "redux/actions/color";
import { useDispatch, useSelector } from "react-redux";
import { Axios } from "redux/services";
import { audioList, selectedAudio } from "redux/actions/audio";
import { Root } from "config";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { ...rest } = props;
  
  const userData = JSON.parse(localStorage.getItem(Root.key))

  const colorsList = useSelector(state => state.color.colorList)
  const audios = useSelector(state => state.audio.audioList)

  useEffect(() => {
    userData ? loadData() : loadGuestData()
  }, [userData])

  useEffect(() => {
    dispatch(selectedColor(colorsList[0]))
  }, [colorsList])

  const loadData = () => {
    loadColors()
    loadAudios()
  }

  const loadGuestData = () => {
    loadPublicColor()
    loadDefaultAudio()
  }

  const loadColors = async () => {
    const response = await Axios({
      url: "api/style/getColors"
    })
    if (response.status) {
      dispatch(colorList(response.data))
    }
  }

  const loadPublicColor = async () => {
    const response = await Axios({
      url: "api/style/getPublicColors"
    })
    if (response.status) {
      dispatch(colorList(response.data))
    }
  }

  const loadAudios = async () => {
    const response = await Axios({ url: 'api/audio/getAudios' })
    if (response.status) {
      dispatch(audioList(response.data))
    }
  }

  const loadDefaultAudio = async () => {
    const response = await Axios({ url: 'api/audio/getDefaultAudio' })
    if (response.status) {
      dispatch(audioList(response.data))
    }
  }

  useEffect(() => {
    if (audios.length > 0) {
      loadJSON()
    }
  }, [audios])

  const loadJSON = async () => {
    const response = await Axios({ url: 'api/audio/getJson', data: { filename: audios[0].json_name } })
    if (response.status) {
      dispatch(selectedAudio({ id: audios[0]._id, data: response.data }))
    }
  }

  return (
    <React.Fragment>
      {/* <Header
        brand="Audio Visualization"
        rightLinks={<HeaderLinks />}
        fixed
        // color="#fff"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      /> */}
      <Grid container className={classes.root}>
        <Grid item md={4} lg={3} sm={5} xs={12}>
          <ControlPanel />
        </Grid>
        <Grid item md={8} lg={9} sm={7} xs={12}>
          <GraphContent />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
