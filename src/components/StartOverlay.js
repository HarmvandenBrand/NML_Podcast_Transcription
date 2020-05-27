import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField, Typography, Slide } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: 2000, // at least > 1500 to avoid conflicts with MUI
    backgroundColor: theme.palette.background.default,
  },
  form: {
    maxWidth: '960px',
    height: '100%',
    margin: '0 auto',
    padding: theme.spacing(1),
  },
  formItems: {
    textAlign: 'center',
  },
  formInput: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  formBtn: {
    display: 'block',
    margin: '0 auto',
    // marginTop: theme.spacing(4),
  },
  logo: {
    [theme.breakpoints.only('xs')]: {
      fontSize: '4.0em',
    },
  }
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
      <Slide direction='up' in={true} appear={true} unmountOnExit timeout={500}>
        <Grid
          className={classes.form}
          container
          alignItems='center'
        >

          <Grid className={classes.formItems} item xs={12}>
            <Typography className={classes.logo} variant='h1'
            >
              EleCast
            </Typography>

            <Typography variant='body1'>
              Welcome, and thank you for participating in our experiment!<br />
              Please fill in your participant ID below to continue.
            </Typography>

            <TextField
              className={classes.formInput}
              label='Participant ID'
              required
              onChange={e => setTextValue(e.target.value)}
            />

            <Button
              className={classes.formBtn}
              variant='contained'
              color='primary'
              disabled={textValue === ''}
              onClick={handleStart}
            >
              Continue
            </Button>
          </Grid>

        </Grid>
      </Slide>
    </div>
  );
}
