import React, { useRef, useEffect } from 'react';
import { Container, TextField, Typography, IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Header from './Header';
import { transcript } from '../examplePodcast'; // example TODO verwijderen
import podcasts from '../podcasts/podcasts.js' // TODO schrijf alles om dat momenteel examplePodcast gebruikt
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

//Searches the page for the phrase in the search field. Only fires when triggered by pressing the 'Enter' key.
function searchKey(event) {
  if (event.keyCode === 13) {
    try {
      var searchval = document.getElementById("transcript-search").value;

      //If called during eventhandling, works for Chrome, not for Firefox :(.
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
  // TODO assign this dynamically from props
  let podcast = podcasts.internet_carbon_footprint


  return (
    <>
      <Header allowBack>
        <TextField
          id='transcript-search'
          label='Search transcript'
          type='search'
          variant='outlined'
          margin='dense'
          onKeyDown={(event) => { searchKey(event) }}
        />
        <TranscriptDownloadButton title={podcast.metadata.title} />
      </Header>
      <TranscriptView transcript={transcriptParagraphs} title={podcast.metadata.title} />
      <AudioPlayer audioSrc={podcast.audio} audioRef={audioRef} textRefs={refsArray} title={podcast.metadata.title} img={podcast.metadata.img} series={podcast.metadata.series} producer={podcast.metadata.producer} />
    </>
  );
}

export default AudioTranscript;
