import React, { useRef, useState } from 'react';
import { Router, Redirect } from '@reach/router';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './components/Home';
import AudioTranscript from './components/AudioTranscript';
import Navigation from './components/Navigation';
import StartOverlay from './components/StartOverlay';
import Tutorial from './components/Tutorial';
import theme from './theme';
import podcasts from './podcasts/podcasts.js';

function App() {
  const defaultEpisode = podcasts['IRL']['internet_carbon_footprint'] // temporary
  const [episode, setEpisode] = useState(defaultEpisode);
  const audioRef = useRef();

  // Once true, always true for a session
  const [started, setStarted] = useState(false);
  const [tutorialFinished, setTutorialFinished] = useState(false);
  // ID is set only once per session
  const [id, setId] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!started &&
        <StartOverlay setStarted={setStarted} setId={setId} />
      }
      {!tutorialFinished &&
        <Tutorial setTutorialFinished={setTutorialFinished} started={started}/>
      }
      <Router style={{ marginBottom: '56px' }}>
        <Redirect from='/' to='/home' noThrow />
        <Home path='/home/*' podcasts={podcasts} setEpisode={setEpisode} />
        <AudioTranscript path='player' audioRef={audioRef} episode={episode} />
      </Router>
      <audio ref={audioRef} src={episode.audio} />
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
