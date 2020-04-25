import React, { useRef, useEffect } from 'react';
import { Container, TextField, Typography, IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Header from './Header';
import { transcript } from '../examplePodcast'; // TODO remove when real transcript can be handled
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
 * User can click this button to download the audio transcript.
 */
function TranscriptDownloadButton(props) {
  const { title } = props;

  return (
    <IconButton
      edge='end'
      href={'data:text/plain;charset=utf-8,' + transcript.replace(/\n/g, '%0A')}
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
  const { showInfo, episode } = props;
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
      <Header>
        <TextField
          id='transcript-search'
          label='Search transcript'
          type='search'
          variant='outlined'
          margin='dense'
          onKeyDown={(event) => { searchKey(event) }}
        />
        <TranscriptDownloadButton title={episode.metadata.title} />
      </Header>
      <TranscriptView
        transcript={transcriptParagraphs}
        title={episode.metadata.title}
      />
      <AudioPlayer
        audioSrc={episode.audio}
        audioRef={audioRef}
        textRefs={refsArray}
        title={episode.metadata.title}
        img={showInfo.img}
        series={showInfo.title}
        producer={showInfo.producer}
      />
    </>
  );
}

export default AudioTranscript;
