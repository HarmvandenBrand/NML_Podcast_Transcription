import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Button, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: 2000, // at least > 1500 to avoid conflicts with MUI
    backgroundColor: theme.palette.background.default,
  },
  form: {
    marginTop: '20vh',
  },
}));

/**
 * Overlay that appears on initial page load. Once dismissed, it should 
 * not be rendered anymore during the session.
 * @param {*} props 
 */
export default function StartOverlay(props) {
  const { setStarted, setId } = props;
  const classes = useStyles();
  const [textValue, setTextValue] = useState('');

  const handleStart = () => {
    setId(textValue);
    setStarted(true);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth='sm'>
        <Grid
          className={classes.form}
          container
          alignItems='center'
          direction='column'
          spacing={4}
        >
          <Grid item xs={12}>
            <Typography variant='h1'>EleCast</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1'>
              Welcome, and thank you for participating in our experiment!<br />
              Please fill in your participant ID below to start the experiment.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Participant ID'
              required
              onChange={e => setTextValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant='contained'
              color='primary'
              disabled={textValue === ''}
              onClick={handleStart}
            >
              Start
          </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
