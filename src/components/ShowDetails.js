import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  showTitle: {
    lineHeight: '1.25',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2em',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.6em',
    },
  },
  producer: {
    marginTop: theme.spacing(1),
    lineHeight: '1.25',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.0em',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2em',
    },
  }
}));

export default function ShowDetails(props) {
  const { img, showTitle, producer, desc } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} sm={2}>
        <img src={img} alt='img' width='100%' />
      </Grid>
      <Grid item xs={9} sm={10}>
        <Typography
          className={classes.showTitle}
          variant='subtitle1'
        >
          {showTitle}
        </Typography>
        <Typography
          className={classes.producer}
          variant='subtitle2'
        >
          {producer}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant='body1'
          paragraph
        >
          {desc}
        </Typography>
      </Grid>
    </Grid>
  );
}
