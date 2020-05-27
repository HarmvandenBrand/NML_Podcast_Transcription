import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, MobileStepper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(2)
  },
}));

/**
 * Adapted from: 
 * https://material-ui.com/components/steppers/#dots
 * @param {*} props 
 */
export default function InfoStepper(props) {
  const { handleEnd } = props; // optional
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const stepContent = [
    {
      head: 'Hello',
      body: 'World',
    },
    {
      head: 'React',
      body: 'App',
    }
  ]
  const maxStep = stepContent.length;

  useEffect(() => {
    if (handleEnd && activeStep === maxStep - 1) {
      handleEnd(true);
    }
  }, [activeStep, maxStep, handleEnd])

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
        <Typography variant='h6'>{stepContent[activeStep].head}</Typography>
        <Typography variant='body1'>{stepContent[activeStep].body}</Typography>
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
