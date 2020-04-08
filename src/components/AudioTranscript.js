import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography } from '@material-ui/core';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import { metadata, audio, transcript } from '../examplePodcast'; // example
//import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import Replay10Icon from '@material-ui/icons/Replay10';
import Forward10Icon from '@material-ui/icons/Forward10';

const useStyles = makeStyles(theme => ({
  audioplayer: {
    //marginTop: '1vw',
    position: 'fixed', 
    position: 'sticky', 
    bottom: '56px',
    width: '100%',
    //height: '150px',
    padding: '1vw',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    background: theme.palette.background.default,
  },
  image: {
    width: 128,
    height: 128,
  },

}));

function TranscriptView(props) {
  const { transcript, title } = props;

  return (
    <Container maxWidth={'md'} style={{ paddingTop: '32px', paddingBottom: '64px' }}>
      <Typography variant='h6'>{title}</Typography>
      <Typography component={'div'}>
        {transcript}
      </Typography>
    </Container>
  );
}

function AudioPlayer(props) {
  // TODO duration uit audio halen en niet als metadata passen (huidige waarde is fout btw)
  const { audioSrc, audioRef, title, duration, img } = props;
  //const { audioSrc, audioRef, title, img } = props;
  const classes = useStyles();
  // Add a state hook for keeping track if the audio player is paused or not
  const [playerState, setPlayerState] = useState("paused"); 
  // TODO betere dateformat
  const [currentTime, setCurrentTime] = useState("0:00:00"); 

  useEffect(() => {
    if ( playerState === 'playing' )
      console.log("play button pressed");
    if ( playerState === 'paused' )
      console.log("pause button pressed");
    // TODO do this only once?
    audioRef.current.addEventListener("timeupdate",  ()=> {
      setCurrentTime(new Date(Math.floor(audioRef.current.currentTime) * 1000).toISOString().substr(11, 8));});
  })

  return (
    <div className={ classes.audioplayer }>
      <Grid container spacing={2}>
        <Grid item xs={2}>
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
                    { currentTime } / {duration}
                  </Typography>
                </Grid>
            </Grid>

          <Grid item>
            <audio
              // TODO custom slider instead of default controls
              controls
              style={{ width: '100%' }}
              ref={audioRef} >
              <source src={audioSrc} type='audio/mpeg' />
            </audio>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </div>
  );
}

/**
 * Maps paragraph tags around each paragraph of the transcript.
 * For illustrative purposes, it also maps a span around the paragraph
 * with dummy (meaningless) timestamps to make the paragraph clickable.
 * 
 * @param {string} transcript the podcast transcript
 * @param {function} handleClick _onClick_ handler
 */
function mapParagraphTag(transcript, handleClick) {
  let paragraphs = transcript.split(/\r?\n/).filter(Boolean);
  // index as key is bad practice in general but as the order of 
  // the paragraphs is fixed this is not an issue here
  return paragraphs.map((p, idx) =>
    <p key={idx}>
      <span onClick={() => handleClick(idx)}>
        {p}
      </span>
    </p>);
}

function AudioTranscript(props) {
  const audioRef = React.useRef(null);

  const handleClick = (idx) => {
    audioRef.current.currentTime = Math.fround(idx * 20);
  };

  // example with dummy timestamps
  let transcriptParagraphs = mapParagraphTag(transcript, handleClick);

  return (
    <>
      <Header />
      <TranscriptView transcript={transcriptParagraphs} title={metadata.title} />
      <AudioPlayer audioSrc={audio} audioRef={audioRef} title={metadata.title} duration={metadata.duration} img={metadata.img} />
    </>
  );
}

export default AudioTranscript;
