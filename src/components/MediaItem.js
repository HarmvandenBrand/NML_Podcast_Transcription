import React from 'react';
import { Grid, Hidden, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@reach/router';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '2vw',
    marginBottom: '2vw',
    padding: '1vw',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main
  }
}));

export default function MediaItem(props) {
  const { id, title, series, duration, img, desc } = props;
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={1} >

      <Hidden mdUp>
        <Grid item xs={12}>
          <Typography variant='h5'>{title}</Typography>
        </Grid>
      </Hidden>

      <Grid item xs={3} sm={2}>
        <img src={img} alt='IMG' width='100%' />
      </Grid>

      <Grid item xs={9} sm={8}>
        <Hidden smDown>
          <Typography variant='h5'>{title}</Typography>
        </Hidden>
        <Typography variant='subtitle1'>{series}</Typography>
        <Typography variant='subtitle2'>{duration}</Typography>
        <Hidden mdUp only='xs'>
          <Typography noWrap display='block' variant='caption'>{desc}</Typography>
        </Hidden>
        <Hidden smDown>
          <Typography variant='caption'>{desc}</Typography>
        </Hidden>
      </Grid>

      <Grid item xs={12} sm={2}>
        <Button
          component={Link}
          to={`player/${id}`}
          fullWidth
          variant='contained'
          color='primary'
        >
          Listen
        </Button>
      </Grid>

    </Grid>
  );
}
