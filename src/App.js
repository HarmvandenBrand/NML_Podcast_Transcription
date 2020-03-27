import React from 'react';
import { Typography, ThemeProvider } from '@material-ui/core';
//import darkBaseTheme from '@material-ui/styles/baseThemes/darkBaseTheme'; // TODO use dark theme?
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MediaList from './components/MediaList';

function App() {
  // Custom theme for overriding material-ui defaults
  let primaryBackground = '#434343';
  let primaryTextColor = '#EF8321'; // intended for headers etc.
  let secondaryTextColor = '#FFFFFF'; 
  let surfaceColor = '#EF8321'; // intended for menus etc.
  
  //
  const mainTheme = createMuiTheme({
    palette: {
      background: {
        default: primaryBackground
      },
      // color="primary" etc.
      primary: {
        main: primaryTextColor
      },
      secondary: {
        main: secondaryTextColor
      }
    },

    typography: {
      // Rationale: give default styling
      // Only specify color="..." when you require a specific override
      h2: {
        color: primaryTextColor
      },
      // add other headers when you need them
      h5: {
        color: primaryTextColor
      },
      subtitle1: {
        color: primaryTextColor
      },
      subtitle2: {
        color: secondaryTextColor
      },
      caption: {
        color: secondaryTextColor
      }
    }
  })

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <div className="App">
        <Typography variant="h2" align="center">ScribeCast</Typography>
        <MediaList data={[1, 2, 3, 4, 5]} />
      </div>
    </ThemeProvider>
  );
}

export default App;
