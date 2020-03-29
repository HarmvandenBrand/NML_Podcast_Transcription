import React from 'react';
import { Typography, ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MediaList from './components/MediaList';
import theme from './Theme';

function App() {
  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <div className="App">
        <Typography variant="h2" align="center">ScribeCast</Typography>
        <MediaList data={[1, 2, 3, 4, 5]} />
      </div>
    </ThemeProvider>
  );
}

export default App;
