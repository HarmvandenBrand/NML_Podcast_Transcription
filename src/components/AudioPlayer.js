import React, { useState, useEffect } from 'react';
import { Divider, Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import Replay10RoundedIcon from '@material-ui/icons/Replay10Rounded';
import Forward10RoundedIcon from '@material-ui/icons/Forward10Rounded';
import Slider from '@material-ui/core/Slider';
import '../styles/lineclamp.css';

/* TODO
 * 1. Navigeer van audio (progress slider) naar tekst timestamp
 * 2. Audio volume knop toevoegen
 */

const useStyles = makeStyles(theme => ({
  root: {
    position: 'sticky',
    bottom: '56px',
    width: '100%',
    maxHeight: '128px',
    padding: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.primary.main}`,
    background: theme.palette.background.default,
  },
  cover: {
    width: '100%',
    maxWidth: '100px',
    borderRadius: theme.shape.borderRadius,
  },
  divider: {
    height: 2
  },
  mainIcon: {
    fontSize: 40,
  },
  secondaryIcon: {
    fontSize: 40,
    color: theme.palette.text.secondary,
  }
}));

function AudioPlayer(props) {
  const { audioSrc, audioRef, textRefs, title, img, series, producer } = props;
  const [isPlaying, setPlayerState] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const classes = useStyles();

  const formatTime = timeSeconds => {
    return new Date(timeSeconds * 1000).toISOString().substr(11, 8)
  };

  const handleProgress = (event, newValue) => {
    setCurrentTime(newValue);
    audioRef.current.currentTime = newValue;
    // TODO dit is de DUMMY implementatie 
    textRefs.current[Math.floor(newValue / 20)].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleEnd = () => {
    setCurrentTime(0);
    setPlayerState(false);
  }

  useEffect(() => {
    // Empty array at the end indicates to only add listener once
    audioRef.current.addEventListener('loadedmetadata', (event) => {
      setDuration(Math.floor(event.target.duration))
    }, []);
    audioRef.current.addEventListener("timeupdate", (event) => {
      setCurrentTime(Math.floor(event.target.currentTime))
    }, []);
  })

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
            <Typography className='marquee' variant='subtitle1'>
              <span>{series}: {title} (by {producer})</span>
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

          <Grid item xs={12} container justify='center'>
            <audio
              ref={audioRef}
              onEnded={handleEnd}>
              <source src={audioSrc} type='audio/mpeg' />
            </audio>
            <Slider
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
