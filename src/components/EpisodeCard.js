import React from 'react';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Button, Box } from '@material-ui/core';
import { GraphicEqRounded } from '@material-ui/icons';
import '../styles/lineclamp.css';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2, 1, 2),
  },
  gridItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  listenButton: {
    marginLeft: theme.spacing(1),
  },
}));

export default function EpisodeCard(props) {
  const { setEpisode, episode } = props;
  const { title, date, duration, desc  } = episode.metadata;
  const classes = useStyles();
  const captionRef = React.useRef(null);
  const [readMore, setReadMore] = React.useState(false);
  const [overflown, setOverflown] = React.useState(false);

  const isOverflown = (element) => {
    let el = element.current;
    return el.scrollHeight > el.clientHeight;
  }

  React.useEffect(() => {
    setOverflown(isOverflown(captionRef));
  }, []);

  return (
    <Paper className={classes.root}>
      <Grid container>
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
            onClick={() => setEpisode(episode)}
            variant='contained'
            size='small'
            color='primary'
          >
            <GraphicEqRounded /> <Box pl={1}>Listen</Box>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={readMore ? '' : 'clamp2'}
            ref={captionRef}
            variant='caption'
          >
            {desc}
          </Typography>
          {overflown &&
            <Grid container item xs={12} justify='center'>
              <Button
                variant='text'
                size='small'
                onClick={() => setReadMore(!readMore)}
              >
                <Box fontSize={10}>
                  {readMore ? 'Hide' : 'Read more'}
                </Box>
              </Button>
            </Grid>
          }
        </Grid>
      </Grid>
    </Paper>
  );
}
