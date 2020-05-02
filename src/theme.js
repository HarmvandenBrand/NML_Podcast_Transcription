import { createMuiTheme } from '@material-ui/core/styles';

// Custom theme for overriding material-ui defaults
let primaryBackground = '#434343';
let primaryTextColor = '#EF8321'; // intended for headers etc.
let subtitleTextColor = '#EF8321' // currently used for podcast series title
let surfaceColor = '#EF8321'; // intended for menus etc.

export let searchHighlightColor = '#EF4300' // background color for highlighted search results


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    // background: {
    //   default: primaryBackground
    // },
    primary: {
      main: primaryTextColor
    },
  },
  typography: {
    // Rationale: give default styling
    // Only specify color="..." when you require a specific override
    h1: {
      color: primaryTextColor
    },
    h2: {
      color: primaryTextColor
    },
    h3: {
      color: primaryTextColor
    },
    h4: {
      color: primaryTextColor
    },
    h5: {
      color: primaryTextColor
    },
    subtitle1: {
      color: subtitleTextColor
    },
  }
})

export default theme;
