import React from 'react';
import { Typography } from '@material-ui/core'
import MediaList from './components/MediaList';

function App() {
  return (
    <div className="App">
      <Typography variant="h2" align="center">App</Typography>
      <MediaList data={[1, 2, 3, 4, 5]} />
    </div>
  );
}

export default App;
