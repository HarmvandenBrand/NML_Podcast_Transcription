import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
  Slide
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  appName: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  }
}));

/**
 * Hide header when scrolling down.
 * 
 * Adapted from:
 * https://material-ui.com/components/app-bar/#app-bar
 * @param {*} props 
 */
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header(props) {
  const classes = useStyles();

  return (
    <HideOnScroll>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          <Typography
            className={classes.appName}
            variant='h5'
          >
            Placeholder 
          </Typography>
          {props.children}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
