import React from 'react';
import { navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
  Slide,
  IconButton,
  Grid
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  appName: {
    color: theme.palette.text.primary,
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
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header(props) {
  const { allowBack } = props;
  const classes = useStyles();

  return (
    <HideOnScroll>
      <AppBar
        position='sticky'
        elevation={2}
        color='default'
      >
        <Toolbar>
          <Grid container spacing={2} alignItems='center'>

            <Grid item md={4} sm={2} xs={1}>
              {allowBack &&
                <IconButton
                  edge='start'
                  onClick={() => navigate(-1)}
                >
                  <ArrowBack />
                </IconButton>
              }
            </Grid>

            <Grid item md={4} sm={3} xs={2}>
              <Typography
                className={classes.appName}
                variant='h5'
                style={{ flex: 1, textAlign: 'center' }}
              >
                Placeholder
              </Typography>
            </Grid>

            <Grid item md={4} sm={7} xs={9} style={{ textAlign: 'right' }}>
              {props.children}
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
