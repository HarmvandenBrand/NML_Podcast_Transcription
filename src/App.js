import React from 'react';
import { Router, Redirect } from '@reach/router';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './components/Home';
import AudioTranscript from './components/AudioTranscript';
import Navigation from './components/Navigation';
import theme from './theme';
import podcasts from './podcasts/podcasts.js'; // TODO schrijf alles om dat momenteel examplePodcast gebruikt

function App() {
  // temporary
  const defaultShow = podcasts['IRL']
  const defaultEpisode = defaultShow['internet_carbon_footprint']
  const [show, setShow] = React.useState(defaultShow);
  const [episode, setEpisode] = React.useState(defaultEpisode); 

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router style={{ marginBottom: '56px' }}>
        <Redirect from='/' to='/home' noThrow />
        <Home path='/home/*' podcasts={podcasts} show={show} setShow={setShow} setEpisode={setEpisode}/>
        <AudioTranscript path='player' showInfo={show.metadata} episode={episode}/>
      </Router>
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
