import React from 'react';
import { Router, Redirect } from '@reach/router';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './components/Home';
import AudioTranscript from './components/AudioTranscript';
import Navigation from './components/Navigation';
import theme from './theme';
import podcasts from './podcasts/podcasts.js';

function App() {
  const defaultEpisode = podcasts['IRL']['internet_carbon_footprint'] // temporary
  const [episode, setEpisode] = React.useState(defaultEpisode);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router style={{ marginBottom: '56px' }}>
        <Redirect from='/' to='/home' noThrow />
        <Home path='/home/*' podcasts={podcasts} setEpisode={setEpisode} />
        <AudioTranscript path='player' episode={episode} />
      </Router>
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
