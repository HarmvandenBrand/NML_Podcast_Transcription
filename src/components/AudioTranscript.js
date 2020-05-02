import React, { useRef, useEffect } from 'react';
import { Container, Typography, IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Header from './Header';
import { metadata, audio, transcript } from '../examplePodcast'; // example
import GetAppIcon from '@material-ui/icons/GetApp';
import AudioPlayer from './AudioPlayer';
import SearchField from './SearchField'

function TranscriptView(props) {
  const { transcript, title } = props;

  return (
    <Container id='transcript-container' maxWidth={'md'} style={{ paddingTop: '32px', paddingBottom: '64px' }}>
      <Typography variant='h6'>{title}</Typography>
      <Typography component={'div'}>
        {transcript}
      </Typography>
    </Container>
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
function mapParagraphTag(transcript, handleClick, setTextRef) {
  let paragraphs = transcript.split(/\r?\n/).filter(Boolean);
  // index as key is bad practice in general but as the order of 
  // the paragraphs is fixed this is not an issue here
  return paragraphs.map((p, idx) =>
    <p key={idx} id={'transcript_p' + idx}>
      <span id={idx * 20} ref={ref => setTextRef(ref, idx)} onClick={() => handleClick(idx)}>
        {p}
      </span>
    </p>);
}

/**
 * Returns the transcript to be downloaded by the user as a text file.
 */
function prepareTranscript() {
  return ('data:text/plain;charset=utf-8,' + transcript.replace(/\n/g, '%0A'));
}

/**
 * User can click this button to download the audio transcript.
 */
function TranscriptDownloadButton(props) {
  const { title } = props;

  return (
    <IconButton
      edge='end'
      href={prepareTranscript()}
      download={title + '.txt'}
    >
      <GetAppIcon />
    </IconButton>
  );
}

function AudioTranscript(props) {
  const theme = useTheme();
  const audioRef = useRef(null);
  const refsArray = useRef([]);

  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', (event) => {
      let roundedTime = Math.round(event.target.currentTime);
      // workaround to fix nullpointer exception for now when switching screens
      if (refsArray.current[0]) {
        refsArray.current.forEach(text => {
          let timestamp = parseInt(text.id)
          // hardcode timestamp range
          if (timestamp <= roundedTime && roundedTime < timestamp + 20) {
            text.style.backgroundColor = theme.palette.primary.main;
            text.style.color = 'black';
          }
          else {
            text.style.backgroundColor = 'transparent';
            text.style.color = theme.palette.text.primary;
          }
        });
      }
    });
  }, [theme])

  const handleClick = (idx) => {
    audioRef.current.currentTime = Math.fround(idx * 20);
    refsArray.current[idx].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const setTextRef = (ref, idx) => {
    refsArray.current[idx] = ref;
  }

  // example with dummy timestamps
  let transcriptParagraphs = mapParagraphTag(transcript, handleClick, setTextRef);

  return (
    <>
      <Header allowBack>
        <SearchField/>
        <TranscriptDownloadButton title={metadata.title} />
      </Header>
      <TranscriptView transcript={transcriptParagraphs} title={metadata.title} />
      <AudioPlayer audioSrc={audio} audioRef={audioRef} textRefs={refsArray} title={metadata.title} img={metadata.img} series={metadata.series} producer={metadata.producer} />
    </>
  );
}

export default AudioTranscript;
