import React from 'react';
import { Router, Redirect } from '@reach/router';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './components/Home';
import AudioTranscript from './components/AudioTranscript';
import Navigation from './components/Navigation';
import theme from './theme';

function App() {
  const [show, setShow] = React.useState(null);
  const [episode, setEpisode] = React.useState(null); 

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router style={{ marginBottom: '56px' }}>
        <Redirect from='/' to='/home' noThrow />
        <Home path='/home/*' show={show} setShow={setShow} setEpisode={setEpisode}/>
        <AudioTranscript path='player' show={show} episode={episode}/>
      </Router>
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
