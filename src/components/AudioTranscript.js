import React, { useRef, useEffect } from 'react';
import { Container, TextField, Typography, IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Header from './Header';
import GetAppIcon from '@material-ui/icons/GetApp';
import AudioPlayer from './AudioPlayer';

function TranscriptView(props) {
  const { transcript, title } = props;

  return (
    <Container maxWidth='md' style={{ paddingTop: '32px', paddingBottom: '32px' }}>
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
  const { transcriptJSON, title } = props;

  // Joins the transcript on sentences with double newlines.
  const joinTranscriptJSON = () => {
    let transcriptList = transcriptJSON.map(([text, ...rest]) => text);
    return encodeURIComponent(transcriptList.join('\r\n\r\n'));
  };

  return (
    <IconButton
      edge='end'
      href={'data:text/plain;charset=utf-8,' + joinTranscriptJSON()}
      download={title + '.txt'}
    >
      <GetAppIcon />
    </IconButton>
  );
}

//Searches the page for the phrase in the search field. Only fires when triggered by pressing the 'Enter' key.
function searchKey(event) {
  if (event.keyCode === 13) {
    try {
      var searchval = document.getElementById("transcript-search").value;

      //If called during event handling, works for Chrome, not for Firefox :(.
      window.find(searchval);
    }
    catch (error) {
      //Weird Firefox error
      if (error.name === "NS_ERROR_ILLEGAL_VALUE") {
        console.error(error.name);
      }
    }
  }
}

function AudioTranscript(props) {
  const { episode } = props;
  const { title, img, series, producer } = episode.metadata;
  const transcriptJSON = episode.sentence_transcript;
  const [transcript, setTranscript] = React.useState(null);
  const theme = useTheme();
  const audioRef = useRef(null);
  const refsArray = useRef([]);
  const timestampPrecision = 1000; // milliseconds

  useEffect(() => {
    const handleClick = (event, idx) => {
      let text = event.target;
      let start = text.dataset.start;
      audioRef.current.currentTime = start;
      refsArray.current[idx].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    const processTranscript = (transcript, handleClick) => {
      return transcript.map(([sentence, start, duration, speakerId], idx) =>
        <p key={idx}>
          <span
            data-start={start / timestampPrecision}
            data-end={(start + duration) / timestampPrecision}
            data-speaker={speakerId}
            onClick={e => handleClick(e, idx)}
            ref={ref => refsArray.current[idx] = ref}
          >
            {sentence}
          </span>
        </p>
      );
    }
    setTranscript(processTranscript(transcriptJSON, handleClick));
  }, [transcriptJSON]);

  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', (event) => {
      let currentTime = event.target.currentTime;
      if (refsArray.current[0]) {
        refsArray.current.forEach(text => {
          let start = text.dataset.start;
          let end = text.dataset.end;
          if (currentTime >= start && currentTime < end) {
            text.style.backgroundColor = theme.palette.primary.main;
            text.style.color = '#000';
          }
          else {
            text.style.backgroundColor = 'transparent';
            text.style.color = theme.palette.text.primary;
          }
        });
      }
    });
  }, [theme]);

  return (
    <>
      <Header>
        <TextField
          id='transcript-search'
          label='Search transcript'
          type='search'
          variant='outlined'
          margin='dense'
          onKeyDown={(event) => { searchKey(event) }}
        />
        <TranscriptDownloadButton
          transcriptJSON={transcriptJSON}
          title={title}
        />
      </Header>
      <TranscriptView
        transcript={transcript}
        title={title}
      />
      <AudioPlayer
        audioSrc={episode.audio}
        audioRef={audioRef}
        textRefs={refsArray}
        title={title}
        img={img}
        series={series}
        producer={producer}
      />
    </>
  );
}

export default AudioTranscript;
