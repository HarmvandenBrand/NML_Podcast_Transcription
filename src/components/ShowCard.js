import React from 'react';
import '../styles/lineclamp.css';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Hidden,
  useMediaQuery
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '12vh',
    minHeight: '100px',
  },
  cover: {
    flex: 'none',
    width: '12vh',
    minWidth: '100px',
  },
  subtitle1: {
    fontSize: '1.2em',
    lineHeight: '1.2em',
  },
  subtitle2: {
    fontSize: '1.0em',
    lineHeight: '2.0em',
  }
}));

export default function ShowCard(props) {
  const { img, showTitle, producer, desc } = props;
  const classes = useStyles();
  const xsBreakpoint = useMediaQuery(theme => theme.breakpoints.only('xs'));

  return (
    <Card className={classes.root} >
      <CardMedia className={classes.cover} alt='IMG' image={img} />
      <CardActionArea
        component={Link}
        to={'episodes'}
      >
        <CardContent className={classes.content}>
          <Typography
            className={`${classes.subtitle1} ${xsBreakpoint ? 'clamp2' : 'clamp1'}`}
            variant='subtitle1'
          >
            {showTitle}
          </Typography>
          <Typography
            className={`${classes.subtitle2} clamp1`}
            variant='subtitle2'
          >
            {producer}
          </Typography>
          <Hidden only='xs'>
            <Typography
              className='clamp1'
              variant='caption'
            >
              {desc}
            </Typography>
          </Hidden>
        </CardContent>
      </CardActionArea>
    </Card >
  );
}
