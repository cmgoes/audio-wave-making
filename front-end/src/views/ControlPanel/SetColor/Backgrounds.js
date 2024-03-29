import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/control-panel.js";
import {
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  Typography,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
import { selectedBackground } from "redux/actions/color";
import { Root } from "config";
import { updateAudioStyles } from "redux/actions/style";

const useStyles = makeStyles(styles);

export default function Backgrounds(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { backgroundColor } = useSelector((state) => state.color);

  return (
    <React.Fragment>
      <List>
        {Root.backgroundColors.map((item, i) => (
          <ListItem
            key={i}
            button
            className={classes.audioListItem}
            onClick={() => {
              dispatch(selectedBackground(item.color));
              dispatch(updateAudioStyles());
            }}
          >
            <Grid container alignItems="center">
              <Grid
                style={{
                  backgroundColor: item.color,
                  width: "30px",
                  height: "30px",
                }}
              ></Grid>
              <Typography variant="subtitle1" style={{ marginLeft: "10px" }}>
                {item.name}
              </Typography>
            </Grid>
            {backgroundColor === item.color ? (
              <ListItemSecondaryAction
                className={classNames(classes.dFlex, classes.aCenter)}
              >
                <Done />
              </ListItemSecondaryAction>
            ) : null}
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
