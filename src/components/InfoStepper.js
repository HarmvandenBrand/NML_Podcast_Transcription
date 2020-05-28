import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, MobileStepper, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import tutorials from '../resources/tutorialContent';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
    height: '60vh',
    overflowY: 'auto',
  },
  media: {
    width: '100%',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
  },
}));

function ContentSkeleton(props) {
  const { heading, body, img, vidSrc } = props
  const classes = useStyles();

  return (
    <Grid container spacing={2} justify='center'>
      <Grid item xs={12}>
        <Typography variant='h6' paragraph>{heading}</Typography>
        <Typography variant='body1' paragraph>{body}</Typography>
      </Grid>
      {img &&
        <Grid item xs={12} sm={6}>
          <img
            className={classes.media}
            src={img}
            alt='IMG'
          />
        </Grid>}
      {vidSrc &&
        <Grid item xs={12} sm={6}>
          <video
            className={classes.media}
            autoPlay
            loop
            src={vidSrc}
            alt='VIDEO'
          />
        </Grid>}
    </Grid>
  );
}

/**
 * Adapted from: 
 * https://material-ui.com/components/steppers/#dots
 * @param {*} props 
 */
export default function InfoStepper(props) {
  const { handleEnd } = props; // optional
  const classes = useStyles();
  const [stepContent, setStepContent] = useState([]);
  const [maxStep, setMaxStep] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let content = tutorials.map(tutorial =>
      <ContentSkeleton
        heading={tutorial.heading}
        body={tutorial.body}
        img ={tutorial.img}
        vidSrc={tutorial.vidSrc}
      />
    );
    setStepContent(content);
    setMaxStep(content.length);
  }, []);

  useEffect(() => {
    if (handleEnd && activeStep === maxStep - 1) {
      handleEnd(true);
    }
  }, [activeStep, maxStep, handleEnd]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Paper
        className={classes.content}
        variant='outlined'
      >
        {stepContent[activeStep]}
      </Paper>
      <MobileStepper
        position='static'
        variant='dots'
        steps={maxStep}
        activeStep={activeStep}
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft /> Back
            </Button>
        }
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxStep - 1}>
            Next <KeyboardArrowRight />
          </Button>
        }
      />
    </div>
  );
}
