import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  Slide
} from '@material-ui/core';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: 2000, // at least > 1500 to avoid conflicts with MUI
    backgroundColor: theme.palette.background.default,
  },
  form: {
    paddingTop: '20vh',
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
      <Slide direction='up' in={true} unmountOnExit timeout={500}>
        <Container maxWidth='sm'>
          <Grid
            className={classes.form}
            container
            alignItems='center'
            direction='column'
            spacing={4}
          >

            <Grid item xs={12}>
              <Typography className={classes.logo} variant='h1'
              >
                EleCast
            </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body1'>
                Welcome, and thank you for participating in our experiment!<br />
              Please fill in your participant ID below to continue.
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
                <Box pr={1}>Continue</Box><ArrowForwardRoundedIcon />
              </Button>
            </Grid>

          </Grid>
        </Container>
      </Slide>
    </div>
  );
}
