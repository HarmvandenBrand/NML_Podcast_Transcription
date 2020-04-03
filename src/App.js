import React from 'react';
import { Router } from '@reach/router';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MediaList from './components/MediaList';
import AudioTranscript from './components/AudioTranscript';
import Header from './components/Header';
import Navigation from './components/Navigation';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Router style={{ marginBottom: '56px', paddingTop: '2vh', paddingBottom: '2vh' }}>
        <MediaList path='/' />
        <AudioTranscript path='player' />
      </Router>
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
