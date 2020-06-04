import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Grow } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InfoStepper from './InfoStepper';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: 1900, // at least > 1500 to avoid conflicts with MUI
    backgroundColor: theme.palette.background.default,
  },
  tutorial: {
    maxWidth: '960px',
    height: '100%',
    margin: '0 auto',
    padding: theme.spacing(1),
  },
  finBtn: {
    display: 'block',
    margin: '0 auto',
  }
}));

export default function Tutorial(props) {
  const { setTutorialFinished, started } = props;
  const classes = useStyles();
  const [lastReached, setLastReached] = useState(false);

  return (
    <div className={classes.root}>
      <Grow in={started} mountOnEnter unmountOnExit timeout={500}>
        <Grid
          className={classes.tutorial}
          container
          alignItems='center'
        >
          <Grid item xs={12}>
            <Typography variant='overline' color='primary'> Tutorial </Typography>
            <InfoStepper handleEnd={setLastReached} />
            <Button
              className={classes.finBtn}
              variant='contained'
              color='primary'
              disabled={!lastReached}
              onClick={() => setTutorialFinished(true)}
            >
              Finish
            </Button>
          </Grid>
        </Grid>
      </Grow>
    </div >
  );
}
