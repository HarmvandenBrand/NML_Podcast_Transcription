import React from 'react';
import { Grid, Container, Typography } from '@material-ui/core';
import Header from './Header';
import { metadata, audio, transcript } from '../examplePodcast'; // example
import AudioPlayer from './AudioPlayer';

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
      <AudioPlayer audioSrc={audio} audioRef={audioRef} title={metadata.title} img={metadata.img} />
    </>
  );
}

export default AudioTranscript;
