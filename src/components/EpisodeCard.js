import React from 'react';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Box } from '@material-ui/core';
import { GraphicEqRounded } from '@material-ui/icons';
import '../styles/lineclamp.css';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  gridItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  listenButton: {
    marginLeft: theme.spacing(1),
  }
}));

export default function EpisodeCard(props) {
  const { id, title, date, duration, desc } = props;
  const classes = useStyles();

  return (
    <Grid className={classes.root} container>
      <Grid item xs={12}>
        <Typography
          variant='overline'
          color='textSecondary'
        >
          {date}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant='subtitle1'
        >
          {title}
        </Typography>
      </Grid>
      <Grid className={classes.gridItem} item xs={12}>
        <Typography
          variant='overline'
        >
          {duration}
        </Typography>
        <Button
          className={classes.listenButton}
          component={Link}
          to={'/player'}
          variant='contained'
          size='small'
          color='primary'
        >
          <GraphicEqRounded /> <Box pl={1}>Listen</Box>
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography
          className='clamp2'
          variant='caption'
        >
          {desc}
        </Typography>
      </Grid>
    </Grid>
  );
}