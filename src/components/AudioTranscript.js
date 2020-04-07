import React from 'react';
import { Grid, Container, Typography } from '@material-ui/core';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import { metadata, audio, transcript } from '../examplePodcast'; // example
//import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
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
  const { audioSrc, audioRef, title, duration, img } = props;
  const classes = useStyles();

  return (
    <div class={ classes.audioplayer }>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={2}>
          <img class={classes.image} src={img} alt='Podcast logo' />
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
                  <IconButton>
                    <Replay10Icon color='primary' style={{ fontSize: 50 }}/>
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={ () => this.setState({ player: "playing"}) }>
                    <PlayCircleFilledIcon color='primary' style={{ fontSize: 50 }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton>
                    <Forward10Icon color='primary' style={{ fontSize: 50 }} />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant='h7'> 
                    {duration}
                  </Typography>
                </Grid>
            </Grid>

          <Grid item justify='flex-start'>
            <audio
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
