import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { GraphicEq, PlayArrow } from "@material-ui/icons";
import ColorPickerInput from 'views/Components/ColorPickerInput';
import { Axios } from '../../redux/services';
import { setText, setFont, setTextColor, setFontSize, setJustification, setVerticalAlign } from 'redux/actions/text'
import { Root } from 'config'
import { Icon } from '@iconify/react';

const useStyles = makeStyles(styles);

export default function SetText(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const displayText = useSelector(state => state.text.displayText)
    const textFont = useSelector(state => state.text.textFont)
    const textColor = useSelector(state => state.text.textColor)
    const fontSize = useSelector(state => state.text.fontSize)
    const textJustification = useSelector(state => state.text.textJustification)
    const textVerticalAlign = useSelector(state => state.text.textVerticalAlign)

    useEffect(() => {
        if (displayText.length > 0) {
        }
    }, [displayText])

    const handleInputText = (e) => {
        dispatch(setText(e.target.value))
    }

    return (
        <div className={classes.setText}>
            <Grid className={classes.title}>
                <Typography variant="h5">TEXT</Typography>
                <Typography variant="body2" className={classes.uploadDescription}>Type in text that you would like displayed on your artwork, such as the song name or words that were recorded.</Typography>
            </Grid>
            <TextField id="outlined-basic" label="Write a letter you want" value={displayText} onChange={handleInputText} className={classNames(classes.mt10, classes.w100)} variant="outlined" />
            {
                displayText.length > 0 ?
                    <React.Fragment>
                        <Grid className={classNames(classes.mt20)} container direction="column" alignItems="center">
                            <Typography variant="subtitle2" className={classes.sLeft}>Font</Typography>
                            <FormControl variant="outlined" className={classNames(classes.formControl, classes.w100)}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={textFont}
                                    onChange={e => dispatch(setFont(e.target.value))}
                                    className={classNames(classes.w100)}
                                >
                                    {
                                        Root.fonts.map((item, i) => (
                                            <MenuItem value={item.name} key={i} >{item.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid className={classNames(classes.mt20)} container direction="column" alignItems="center">
                            <Typography variant="subtitle2" className={classes.sLeft}>Color</Typography>
                            <ColorPickerInput className={classNames(classes.formControl, classes.w100)} value={textColor} onChange={e => dispatch(setTextColor(e.css.backgroundColor))} />
                        </Grid>
                        <Grid className={classNames(classes.mt20)} container direction="column" alignItems="center">
                            <Typography variant="subtitle2" className={classes.sLeft}>Size</Typography>
                            <FormControl variant="outlined" className={classNames(classes.formControl, classes.w100)}>
                                <Select
                                    value={fontSize}
                                    onChange={e => dispatch(setFontSize(e.target.value))}
                                    className={classNames(classes.w100)}
                                >
                                    {
                                        Root.fontSizes.map((item, i) => (
                                            <MenuItem value={item} key={i} >{item}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid className={classNames(classes.mt20)} container>
                            <Grid item xs={6} container direction="column" alignItems="center">
                                <Typography variant="subtitle2" className={classes.sLeft}>Justification</Typography>
                                <Grid container alignItems="center">
                                    <IconButton aria-label="linear" onClick={() => dispatch(setJustification(0))} >
                                        <Icon icon="carbon:align-horizontal-left" className={classNames(textJustification === 0 ? classes.activeAlignIcon : null)} />
                                    </IconButton>
                                    <IconButton aria-label="linear" onClick={() => dispatch(setJustification(1))} >
                                        <Icon icon="carbon:align-horizontal-center" className={classNames(textJustification === 1 ? classes.activeAlignIcon : null)} />
                                    </IconButton>
                                    <IconButton aria-label="linear" onClick={() => dispatch(setJustification(2))} >
                                        <Icon icon="carbon:align-horizontal-right" className={classNames(textJustification === 2 ? classes.activeAlignIcon : null)} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} container direction="column" alignItems="center">
                                <Typography variant="subtitle2" className={classes.sLeft}>Vertical alignment</Typography>
                                <Grid container alignItems="center">
                                    <IconButton aria-label="linear" onClick={() => dispatch(setVerticalAlign(0))} >
                                        <Icon icon="carbon:align-vertical-top" className={classNames(textVerticalAlign === 0 ? classes.activeAlignIcon : null)} />
                                    </IconButton>
                                    <IconButton aria-label="linear" onClick={() => dispatch(setVerticalAlign(1))} >
                                        <Icon icon="carbon:align-vertical-center" className={classNames(textVerticalAlign === 1 ? classes.activeAlignIcon : null)} />
                                    </IconButton>
                                    <IconButton aria-label="linear" onClick={() => dispatch(setVerticalAlign(2))} >
                                        <Icon icon="carbon:align-vertical-bottom" className={classNames(textVerticalAlign === 2 ? classes.activeAlignIcon : null)} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                    : null
            }
        </div>
    );
}