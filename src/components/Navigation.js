import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BottomNavigation, BottomNavigationAction, Paper } from '@material-ui/core';
import { HomeOutlined, HearingOutlined, StarBorderRounded } from '@material-ui/icons';
import { Link, Location } from '@reach/router';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  }
}));

export default function Navigation(props) {
  const classes = useStyles();
  const paths = {
    home: '/',
    player: '/player',
    favorites: '/favorites'
  };

  const parseRootPath = (path) => {
    let idx = path.indexOf('/', 1);
    if (idx === -1) {
      return path;
    } else {
      return path.slice(0, idx);;
    }
  };

  return (
    <Location>
      {({ location }) => (

        <BottomNavigation
          className={classes.root}
          component={Paper}
          elevation={4}
          value={parseRootPath(location.pathname)}
          showLabels
        >
          <BottomNavigationAction
            component={Link}
            to={paths.home}
            value={paths.home}
            label='Home'
            icon={<HomeOutlined />}
          />
          <BottomNavigationAction
            component={Link}
            to={paths.player}
            value={paths.player}
            label='Listen Now'
            icon={<HearingOutlined />}
          />
          <BottomNavigationAction
            component={Link}
            to={paths.favorites}
            value={paths.favorites}
            label='Favorites'
            icon={<StarBorderRounded />}
          />
        </BottomNavigation>

      )}
    </Location>
  );
}
