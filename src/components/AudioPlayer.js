import React, { useState, useEffect } from 'react';
import { Divider, Grid, Typography, Paper, useMediaQuery } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import Replay10RoundedIcon from '@material-ui/icons/Replay10Rounded';
import Forward10RoundedIcon from '@material-ui/icons/Forward10Rounded';
import Slider from '@material-ui/core/Slider';
import '../styles/lineclamp.css';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'sticky',
    bottom: '56px',
    width: '100%',
    maxHeight: '128px',
    padding: theme.spacing(1),
    background: '#212121',
  },
  cover: {
    width: '100%',
    maxWidth: '100px',
    borderRadius: theme.shape.borderRadius,
  },
  title: {
    color: theme.palette.primary.main,
  },
  divider: {
    height: 2
  },
  slider: {
    width: '95%',
    [theme.breakpoints.only('xs')]: {
      margin: '0 auto',
    },
  },
  mainIcon: {
    fontSize: 40,
  },
  secondaryIcon: {
    fontSize: 40,
    color: theme.palette.text.secondary,
  }
}));

const CustomSlider = withStyles(theme => ({
  root: {
    height: 4,
  },
  thumb: {
    height: 16,
    width: 16,
    marginTop: -6,
  },
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
    color: theme.palette.action.disabled,
  }
}))(Slider);

function AudioPlayer(props) {
  const { audioRef, textRefs, title, img, series, producer } = props;
  const [isPlaying, setPlayerState] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const classes = useStyles();
  const xsBreakpoint = useMediaQuery(theme => theme.breakpoints.only('xs'));

  useEffect(() => {
    let audio = audioRef.current
    // Set states
    setPlayerState(audio.paused ? false : true);
    setCurrentTime(audio.currentTime);
    if (audio.duration) {
      setDuration(audio.duration);
    }
    // Event handler
    const handleLoadedMetadata = (event) => {
      setDuration(Math.floor(event.target.duration));
    };
    const handleTimeUpdate = (event) => {
      setCurrentTime(Math.floor(event.target.currentTime));
    };
    const handleEnded = (event) => {
      audio.currentTime = 0;
      setPlayerState(false);
    };
    // Add event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    // Clean up on unmount
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    }
  }, [audioRef]);

  const formatTime = timeSeconds => {
    return new Date(timeSeconds * 1000).toISOString().substr(11, 8)
  };

  const handleProgress = (event, newValue) => {
    setCurrentTime(newValue);
    audioRef.current.currentTime = newValue;
    let currentText = null;
    textRefs.current.forEach(text => {
      let start = text.dataset.start;
      let end = text.dataset.end;
      if (newValue >= start && newValue < end) {
        currentText = text;
      }
    });
    if (currentText) {
      currentText.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  return (
    <Paper className={classes.root} square elevation={2}>
      <Grid container spacing={2}>

        <Hidden only='xs'>
          <Grid item sm={2} md={1} container direction='column' justify='center'>
            <img className={classes.cover} src={img} alt='Podcast logo' />
          </Grid>
        </Hidden>

        <Grid item xs={12} sm={10} md={11} container>
          <Grid item xs={12}>
            <Typography
              className={`${xsBreakpoint ? 'marquee' : 'clamp1'}`}
              component='div'
              variant='overline'>
              <div>
                <span className={classes.title}>{series} ({producer}):</span> {title}
              </div>
            </Typography>
          </Grid>

          <Grid item xs={12} container spacing={1} justify='space-evenly'>
            <Grid item>
              <IconButton
                size='small'
                onClick={() => { audioRef.current.currentTime -= 10 }}
              >
                <Replay10RoundedIcon className={classes.secondaryIcon} />
              </IconButton>
            </Grid>
            {isPlaying ?
              <Grid item>
                <IconButton
                  color='primary'
                  size='small'
                  onClick={() => {
                    audioRef.current.pause();
                    setPlayerState(false);
                  }}
                >
                  <PauseCircleFilledRoundedIcon className={classes.mainIcon} />
                </IconButton>
              </Grid>
              :
              <Grid item>
                <IconButton
                  color='primary'
                  size='small'
                  onClick={() => {
                    audioRef.current.play();
                    setPlayerState(true);
                  }}
                >
                  <PlayCircleFilledRoundedIcon className={classes.mainIcon} />
                </IconButton>
              </Grid>
            }
            <Grid item>
              <IconButton
                size='small'
                onClick={() => { audioRef.current.currentTime += 10 }}
              >
                <Forward10RoundedIcon className={classes.secondaryIcon} />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant='caption'>
                {formatTime(currentTime)}
                <Divider className={classes.divider} />
                {formatTime(duration)}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} container>
            <CustomSlider
              className={classes.slider}
              value={currentTime}
              onChange={handleProgress}
              min={0}
              step={0.1}
              max={duration}
            />
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  );
}

export default AudioPlayer;
