import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Header from './Header';
import GetAppIcon from '@material-ui/icons/GetApp';
import AudioPlayer from './AudioPlayer';
import SearchField from './SearchField'

function TranscriptView(props) {
  const { transcript, title } = props;

  return (
    <Container id='transcript-container' maxWidth='md' style={{ paddingTop: '32px', paddingBottom: '32px' }}>
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

function AudioTranscript(props) {
  const { audioRef, episode } = props;
  const { title, img, series, producer } = episode.metadata;
  const transcriptJSON = episode.sentence_transcript;
  const [transcript, setTranscript] = useState(null);
  const theme = useTheme();
  const textRefs = useRef([]);

  useEffect(() => {
    const handleClick = (event, idx) => {
      let text = event.target;
      let start = text.dataset.start;
      audioRef.current.currentTime = start;
      textRefs.current[idx].scrollIntoView({
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
            onClick={e => handleClick(e, idx)}
            ref={ref => textRefs.current[idx] = ref}
          >
            {sentence}
          </span>
        </p>
      );
    }
    setTranscript(processTranscript(transcriptJSON, handleClick));
  }, [transcriptJSON, audioRef]);

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
          }
          else {
            text.style.backgroundColor = 'transparent';
            text.style.color = theme.palette.text.primary;
          }
        });
      }
    });
  }, [theme, audioRef]);

  return (
    <>
      <Header allowBack>
        <SearchField/>
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
        audioRef={audioRef}
        textRefs={textRefs}
        title={title}
        img={img}
        series={series}
        producer={producer}
      />
    </>
  );
}

export default AudioTranscript;
