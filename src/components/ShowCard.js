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
    [theme.breakpoints.only('xs')]: {
      height: '96px',
    },
    [theme.breakpoints.up('sm')]: {
      height: '128px',
    },
  },
  cover: {
    flex: 'none',
    [theme.breakpoints.only('xs')]: {
      width: '96px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '128px',
    },
  },
  showTitle: {
    fontSize: '1.2em',
    lineHeight: '1.15',
  },
  producer: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    fontSize: '1.0em',
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
            className={`${classes.showTitle} ${xsBreakpoint ? 'clamp2' : 'clamp1'}`}
            variant='h5'
          >
            {showTitle}
          </Typography>
          <Typography
            className={`${classes.producer} clamp1`}
            variant='subtitle1'
            color='textSecondary'
          >
            {producer}
          </Typography>
          <Hidden only='xs'>
            <Typography
              className='clamp2'
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
