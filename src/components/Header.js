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
  useMediaQuery
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
  const matches = useMediaQuery('(min-width:420px)');

  return (

    <HideOnScroll>
      <AppBar
        position='sticky'
        elevation={2}
        color='default'
      >
       <Toolbar style={{ textAlign: 'right' }}>
            
            {allowBack &&
              <IconButton
                edge='start'
                onClick={() => navigate(-1)}
              >
                <ArrowBack />
              </IconButton>
            }

            {matches &&
              <Typography
                className={classes.appName}
                variant='h5'
                style={{ flex: 1, textAlign: 'center' }}
              >
                Elecast
              </Typography>
            }

            {props.children}

        </Toolbar>
      </AppBar>
    </HideOnScroll>

  );
}
