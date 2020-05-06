import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Box } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  cover: {
    borderRadius: theme.shape.borderRadius,
  },
  showTitle: {
    lineHeight: '1.25',
    [theme.breakpoints.only('xs')]: {
      fontSize: '1.2em',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.6em',
    },
  },
  producer: {
    marginTop: theme.spacing(1),
    lineHeight: '1.25',
    [theme.breakpoints.only('xs')]: {
      fontSize: '1.0em',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.2em',
    },
  }
}));

export default function ShowDetails(props) {
  const { img, showTitle, producer, desc } = props;
  const classes = useStyles();
  const [isFav, setIsFav] = React.useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={3} sm={2}>
        <img className={classes.cover} src={img} alt='img' width='100%' />
      </Grid>
      <Grid item xs={9} sm={10}>
        <Typography
          className={classes.showTitle}
          variant='h5'
        >
          {showTitle}
        </Typography>
        <Typography
          className={classes.producer}
          variant='subtitle1'
          color='textSecondary'
        >
          {producer}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant='outlined'
          size='small'
          color='primary'
          onClick={() => setIsFav(!isFav)}
        >
          {isFav ?
            <>
              <Favorite />
              <Box pl={1}>Favorited</Box>
            </>
            :
            <>
              <FavoriteBorder />
              <Box pl={1}>Favorite</Box>
            </>
          }
        </Button>
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
