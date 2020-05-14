import React, { useRef } from 'react';
import { Router, Redirect } from '@reach/router';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './components/Home';
import AudioTranscript from './components/AudioTranscript';
import Navigation from './components/Navigation';
import theme from './theme';
import podcasts from './podcasts/podcasts.js';

function App() {
  const defaultEpisode = podcasts['99PercentInvisible']['WipeOut'] // temporary
  const [episode, setEpisode] = React.useState(defaultEpisode);
  const audioRef = useRef();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router style={{ marginBottom: '56px' }}>
        <Redirect from='/' to='/home' noThrow />
        <Home path='/home/*' podcasts={podcasts} setEpisode={setEpisode} />
        <AudioTranscript path='player' audioRef={audioRef} episode={episode} />
      </Router>
      <audio ref={audioRef} src={episode.audio}/>
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
