import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Typography, IconButton, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { GetApp, CenterFocusStrongRounded, CenterFocusWeakRounded } from '@material-ui/icons';
import Header from './Header';
import AudioPlayer from './AudioPlayer';
import SearchField from './SearchField';


function TranscriptView(props) {
  const { transcript, title, classes} = props;
  return (
    <Container className={classes.transcriptContainer} id='transcript-container' maxWidth='md'>
      <Typography variant='h6'>{title}</Typography>
      <Typography component='div'>
        {transcript}
      </Typography>
    </Container>
  );
}

/**
 * User can click this button to download the audio transcript.
 */
function TranscriptDownloadButton(props) {
  const { transcriptJSON, title, logInfo } = props;

  // Joins the transcript on sentences with double newlines.
  const joinTranscriptJSON = () => {
    let transcriptList = transcriptJSON.map(([text, ...rest]) => text);
    return encodeURIComponent(transcriptList.join('\r\n\r\n'));
  };

  return (
    <IconButton
      edge='end'
      href={'data:text/plain;charset=utf-8,' + JSON.stringify(logInfo) + joinTranscriptJSON() }
      download={title + '.txt'}
    >
      <GetApp />
    </IconButton>
  );
}

const useStyles = makeStyles(theme => ({
  transcriptContainer: {
    paddingTop: '32px',
    paddingBottom: '32px'
  },
  fab: {
    position: 'fixed',
    right: theme.spacing(2),
    bottom: 56 + 128 + theme.spacing(2),
  }
}));

function AudioTranscript(props) {
  const { audioRef, episode, logInfo, setLogInfo } = props;
  const { title, img, series, producer } = episode.metadata;
  const transcriptJSON = episode.sentence_transcript;
  const [transcript, setTranscript] = useState(null);
  const [currentText, setCurrentText] = useState(null);
  const [isFocusMode, setIsFocusMode] = useState(true);
  const theme = useTheme();
  const textRefs = useRef([]);
  const classes = useStyles();

  function scrollTo(text) {
    text.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }

  const processTranscript = (transcript, handleClick) => {
    let timestampPrecision = 1000; // milliseconds
    return transcript.map(([sentence, start, duration, speakerId], idx) =>
      <p key={idx}>
        <span
          data-start={start / timestampPrecision}
          data-end={(start + duration) / timestampPrecision}
          data-speaker={speakerId}
          onClick={e => { handleClick(e, idx) }}
          ref={ref => textRefs.current[idx] = ref} >
            {sentence}
        </span>
      </p>
    );
  }

  useEffect(() => {
    const handleClick = (event, idx) => {
      let text = event.target;
      let start = text.dataset.start;
      audioRef.current.currentTime = start;
      scrollTo(textRefs.current[idx]);
      setLogInfo({...logInfo, transcriptSentence: logInfo['transcriptSentence']+1 }); 
    };
    setTranscript(processTranscript(transcriptJSON, handleClick));
  }, [transcriptJSON, audioRef, logInfo, setLogInfo]);

  useEffect(() => {
    // const speakerColors = [theme.palette.primary.main, 'dodgerblue']; // temporary colors
    audioRef.current.addEventListener('timeupdate', (event) => {
      let currentTime = event.target.currentTime;
      if (textRefs.current[0]) {
        textRefs.current.forEach(text => {
          let start = text.dataset.start;
          let end = text.dataset.end;
          // let speaker = text.dataset.speaker;
          if (currentTime >= start && currentTime < end) {
            // text.style.backgroundColor = speakerColors[speaker - 1];
            text.style.backgroundColor = theme.palette.primary.main;
            text.style.color = '#000';
            setCurrentText(text);
          }
          else {
            text.style.backgroundColor = 'transparent';
            text.style.color = theme.palette.text.primary;
          }
        });
      }
    });
  }, [audioRef, theme]);

  useEffect(() => {
    if (isFocusMode && currentText) {
      scrollTo(currentText);
    }
  }, [currentText, isFocusMode]);

  const scrollHandler = useCallback(() => {
    setIsFocusMode(false);
  }, []);

  useEffect(() => {
    // Cannot use scroll event because we scroll text into view.
    // There are more scroll options for example with scroll bar and arrow keys etc.
    // that are not captured right now.
    if (isFocusMode) {
      window.addEventListener('touchmove', scrollHandler);
      window.addEventListener('wheel', scrollHandler);
    } else {
      window.removeEventListener('touchmove', scrollHandler);
      window.removeEventListener('wheel', scrollHandler);
    }
  }, [isFocusMode, scrollHandler]);

  return (
    <>
      <Header allowBack>
        <SearchField 
          logInfo={logInfo}
          setLogInfo={setLogInfo}
        />
        <TranscriptDownloadButton
          transcriptJSON={transcriptJSON}
          title={title}
          logInfo={logInfo}
        />
      </Header>
      <TranscriptView
        transcript={transcript}
        title={title}
        classes={classes}
      />
      <Fab
        className={classes.fab}
        color={isFocusMode ? 'primary' : ''}
        size='medium'
        onClick={() => setIsFocusMode(!isFocusMode)}
      >
        {isFocusMode ? <CenterFocusStrongRounded /> : <CenterFocusWeakRounded />}
      </Fab>
      <AudioPlayer
        audioRef={audioRef}
        textRefs={textRefs}
        title={title}
        img={img}
        series={series}
        producer={producer}
        logInfo={logInfo}
        setLogInfo={setLogInfo}
      />
    </>
  );
}

export default AudioTranscript;
