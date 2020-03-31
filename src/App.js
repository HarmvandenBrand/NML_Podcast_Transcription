import React from 'react';
import { Router} from '@reach/router';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MediaList from './components/MediaList';
import AudioTranscript from './components/AudioTranscript';
import Header from './components/Header';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <Header/>
        <Router>
          <MediaList path="/" />
          <AudioTranscript path="player/:podcastId" />
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
