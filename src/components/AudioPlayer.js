import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
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
 * 6. Meer aftand tot navigatie bar?
 */

const useStyles = makeStyles(theme => ({
  audioplayer: {
    position: 'sticky', 
    bottom: '56px',
    width: '100%',
    padding: '1vw',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    background: theme.palette.background.default,
  },
  image: {
    width: 128,
    height: 128,
  },
  audio: {
    width: '100%'
  },
  slider: {
    width: '90%',
  }
}));

export default function AudioPlayer(props) {
  const { audioSrc, audioRef, title, img } = props;
  const classes = useStyles();
  const [playerState, setPlayerState] = useState("paused"); 
  const [currentTime, setCurrentTime] = useState(0); 
  const [duration, setDuration] = useState(0); 
  const FormatTime = function(timeSeconds){
    return new Date(timeSeconds*1000).toISOString().substr(11,8);}
  const handleProgress = (event, newValue) => {
    setCurrentTime(newValue);
    audioRef.current.currentTime=newValue;
  };

  useEffect(() => {
    // Empty array at the end indicates to only add listener once
    audioRef.current.addEventListener('loadedmetadata', ()=> {
      setDuration(Math.floor(audioRef.current.duration))
    }, []);
    audioRef.current.addEventListener("timeupdate",  ()=> {
      setCurrentTime(Math.floor(audioRef.current.currentTime))
    }, []);
  })

  return (
    <div className={ classes.audioplayer }>
      <Grid container spacing={2}>
        <Grid item xs={2} container direction='column' justify='center'>
          <img className={classes.image} src={img} alt='Podcast logo' />
        </Grid>

        <Grid item xs={10} container> 
          <Grid item container direction='column' spacing={2}>
            <Grid item >
              <Typography variant='h5'>
                {title}
              </Typography>
            </Grid>

            <Grid item container spacing={2} justify='space-evenly'>
                <Grid item>
                  <IconButton onClick={()=>{
                    audioRef.current.currentTime -= 10;}
                    }>
                    <Replay10Icon color='primary' style={{ fontSize: 50 }}/>
                  </IconButton>
                </Grid>
                { playerState === "paused" && (
                  <Grid item>
                    <IconButton onClick={ () => {
                      setPlayerState("playing");
                      audioRef.current.play();
                      }}>
                      <PlayCircleFilledIcon color='primary' style={{ fontSize: 50 }} />
                    </IconButton>
                  </Grid>
                )}
                { playerState === "playing" && (
                  <Grid item>
                    <IconButton onClick={ () => {
                      audioRef.current.pause();
                      setPlayerState("paused");}
                      }>
                      <PauseCircleFilledIcon color='primary' style={{ fontSize: 50 }} />
                    </IconButton>
                  </Grid>
                )}
                <Grid item>
                  <IconButton onClick={()=> {
                    audioRef.current.currentTime += 10;}
                    }>
                    <Forward10Icon color='primary' style={{ fontSize: 50 }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant='subtitle2'> 
                    { FormatTime(currentTime) }
                    <br/>
                    <hr/>
                    { FormatTime(duration)} 
                  </Typography>
                </Grid>
            </Grid>

          <Grid item>
            <audio
              className={classes.audio}
              ref={audioRef} >
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
