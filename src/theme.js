import { createMuiTheme } from '@material-ui/core/styles';

// Custom theme for overriding material-ui defaults
let primaryBackground = '#434343';
let primaryTextColor = '#EF8321'; // intended for headers etc.
let subtitleTextColor = '#EF8321' // currently used for podcast series title
let surfaceColor = '#EF8321'; // intended for menus etc.

let searchHighlightColor = '#FF2000'; // background color for highlighted search results
let searchHiglightFocusColor = '#FFC3A0'; // background color for the currently focussed search result


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
  },
  highlighting: {
    searchResult: searchHighlightColor,
    searchResultFocus: searchHiglightFocusColor
  }
})

export default theme;
