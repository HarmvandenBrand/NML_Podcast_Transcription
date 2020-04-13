import React from 'react';
import { Container, TextField, Typography, IconButton} from '@material-ui/core';
import Header from './Header';
import { metadata, audio, transcript } from '../examplePodcast'; // example
import GetAppIcon from '@material-ui/icons/GetApp';
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
    <p key={idx} id={'transcript_p' + idx}>
      <span onClick={() => handleClick(idx)}>
        {p}
      </span>
    </p>);
}

/**
 * Returns the transcript to be downloaded by the user as a text file.
 */
function PrepareTranscript() {
  return ('data:text/plain;charset=utf-8,' + transcript.replace(/\n/g, '%0A'));
}

/**
 * User can click this button to download the audio transcript.
 */
function TranscriptDownloadButton(props) {
const { title } = props;

  return (
    <IconButton
    href = {PrepareTranscript()}
    download= {title + '.txt'}
    width='40px'
    >
      <GetAppIcon/>
    </IconButton>
  );
}

//Searches the page for the phrase in the search field. Only fires when triggered by pressing the 'Enter' key.
function SearchKey(event) {
  if (event.keyCode === 13)
  {
    try
    {
      var searchval = document.getElementById("transcript-search").value;

      //If called during eventhandling, works for Chrome, not for Firefox :(.
      window.find(searchval);
    }
    catch(error) {
      //Weird Firefox error
      if(error.name === "NS_ERROR_ILLEGAL_VALUE")
      {
        console.error(error.name);
      }
    }
  }
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
      <Header allowBack>
        <TextField id="transcript-search" label="Search Transcript" type="search" variant="outlined" onKeyDown={(event) => {SearchKey(event)}}/>
        <TranscriptDownloadButton title={metadata.title}/>
      </Header>
      <TranscriptView transcript={transcriptParagraphs} title={metadata.title} />
      <AudioPlayer audioSrc={audio} audioRef={audioRef} title={metadata.title} img={metadata.img} series={metadata.series} producer={metadata.producer} />
    </>
  );
}

export default AudioTranscript;
