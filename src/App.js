import React, { useState, useRef } from 'react';
import { Router, Redirect } from '@reach/router';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './components/Home';
import AudioTranscript from './components/AudioTranscript';
import Navigation from './components/Navigation';
import Tutorial from './components/Tutorial';
import theme from './theme';
import podcasts from './podcasts/podcasts.js';

function App() {
  const defaultEpisode = podcasts['IRL']['internet_carbon_footprint'] // temporary
  const [episode, setEpisode] = useState(defaultEpisode);
  const audioRef = useRef();

  // Maintain a dictionary with all relevant logging info (clicks)
  const [logInfo, setLogInfo] = useState( 
    { id: '',
      forwardButton: 0,
      backwardButton: 0,
      playButton: 0,
      pauseButton: 0,
      audioBar: 0,
      transcriptSentence: 0,
      searchClick: 0,
      searchNavigation: 0
    });

  // Once true, always true for a session
  const [tutorialFinished, setTutorialFinished] = useState(false);
  // ID is set only once per session
  const [id, setId] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {!tutorialFinished &&
        <Tutorial setTutorialFinished={setTutorialFinished} started={true} />
      }

      <Router style={{ marginBottom: '56px' }}>
        <Redirect from='/' to='/home' noThrow />
        <Home path='/home/*' podcasts={podcasts} setEpisode={setEpisode} />
        <AudioTranscript path='player' audioRef={audioRef} episode={episode} logInfo={logInfo} setLogInfo={setLogInfo} id={id} />
      </Router>
      <audio ref={audioRef} src={episode.audio} />
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
