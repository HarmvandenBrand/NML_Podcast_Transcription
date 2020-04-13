import React, { useState, useEffect } from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import Replay10Icon from '@material-ui/icons/Replay10';
import Forward10Icon from '@material-ui/icons/Forward10';
import Slider from '@material-ui/core/Slider';

/* TODO
 *
 * 1. Navigeer van audio (progress slider) naar tekst timestamp
 * 2. Maak ook responsive voor hele kleine schermen
 * 3. Ik haal "duration" niet meer uit de metadata maar uit de audio zelf; dit vraagt om een consistentere aanpak over de hele app. Mogelijk dat in een hogere component doen en dan alsnog hier naartoe passen. N.B. duration moet in *seconden* gegeven worden!
 * 4. Audio volume knop toevoegen
 * 5. Finetune positie podcast titel
 */

const useStyles = makeStyles(theme => ({
  audioplayer: {
    position: 'sticky', 
    bottom: '56px',
    width: '100%',
    height: '165px',
    padding: '1vw',
    borderStyle: 'solid',
    border: 0,
    borderTop: 1,
    borderColor: theme.palette.primary.main,
    background: theme.palette.background.default,
  },
  image: {
    width: 128,
    height: 128
  },
  slider: {
    width: '90%',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    height: 2
  },
  icon: {
    fontSize: 40,
    color: theme.palette.primary.main 
  }
}));

export default function AudioPlayer(props) {
  const { audioSrc, audioRef, textRefs, title, img, series, producer } = props;
  const classes = useStyles();
  const [isPlaying, setPlayerState] = useState(false); 
  const [currentTime, setCurrentTime] = useState(0); 
  const [duration, setDuration] = useState(0); 
  const formatTime = timeSeconds => {
    return new Date(timeSeconds*1000).toISOString().substr(11,8)};
  const handleProgress = (event, newValue) => {
    setCurrentTime(newValue);
    audioRef.current.currentTime=newValue;
    // TODO dit is de DUMMY implementatie 
    textRefs.current[Math.floor(newValue/20)].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  const handleEnd = () => {
    setCurrentTime(0);
    setPlayerState(false);
  }

  // TODO currently audioRef is not maintained across screens causing a null
  // pointer exception. Removing the event listeners is an option but for now
  // does not make much sense, because the problem is caused elsewhere.
  useEffect(() => {
    // Empty array at the end indicates to only add listener once
    audioRef.current.addEventListener('loadedmetadata', ()=> {
      if (audioRef.current)
        setDuration(Math.floor(audioRef.current.duration))
    }, []);
    audioRef.current.addEventListener("timeupdate",  ()=> {
      if (audioRef.current)
        setCurrentTime(Math.floor(audioRef.current.currentTime))
    }, []);
  })

  return (
    <div className={ classes.audioplayer }>
      <Grid container spacing={1}>
        <Grid item xs={1} md={2} container direction='column' justify='center'>
          <Hidden smDown>
            <img className={classes.image} src={img} alt='Podcast logo' />
          </Hidden>
        </Grid>

        <Grid item xs={11} md={10} container> 
          <Grid item container direction='column' spacing={1}>
            <Grid item >
              <Typography variant='subtitle1'>
                {series}: {title} ({producer})
              </Typography>
            </Grid>
            <Grid item container spacing={1} justify='space-evenly'>
                <Grid item>
                  <IconButton onClick={()=>{
                    audioRef.current.currentTime -= 10;}
                    }>
                    <Replay10Icon className={classes.icon}/>
                  </IconButton>
                </Grid>
                { isPlaying ?
                  <Grid item>
                    <IconButton onClick={ () => {
                      audioRef.current.pause();
                      setPlayerState(false);}
                      }>
                      <PauseCircleFilledIcon className={classes.icon} />
                    </IconButton>
                  </Grid>
                  :
                  <Grid item>
                    <IconButton onClick={ () => {
                      audioRef.current.play();
                      setPlayerState(true);
                      }}>
                      <PlayCircleFilledIcon className={classes.icon}/>
                    </IconButton>
                  </Grid>
                }
                <Grid item>
                  <IconButton onClick={()=> {
                    audioRef.current.currentTime += 10;}
                    }>
                    <Forward10Icon className={classes.icon}/>
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle2'> 
                    { formatTime(currentTime) }
                    <Divider className={classes.divider}/>
                    { formatTime(duration)} 
                  </Typography>
                </Grid>
            </Grid>
          <Grid item>
            <audio
              ref={audioRef}
              onEnded={handleEnd}>
              <source src={audioSrc} type='audio/mpeg' />
            </audio>
            <Slider 
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
    </Grid>
    </div>
  );
}
