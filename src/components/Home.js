import React from 'react';
import { Router } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Header from './Header';
import Episodes from './Episodes';
import ShowCard from './ShowCard';
import podcasts from '../podcasts/podcasts.js' // TODO schrijf alles om dat momenteel examplePodcast gebruikt

const useStyles = makeStyles(theme => ({
  list: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  card: {
    padding: theme.spacing(1),
  }
}));

function Shows(props) {
  const classes = useStyles();

  // TODO assign this dynamically from props
  let podcast = podcasts.IRL.internet_carbon_footprint;

  return (
    <>
      <Header />
      <Container className={classes.list} maxWidth='md' disableGutters>
        {[1, 2, 3, 4, 5].map(idx => (
          <div className={classes.card} key={idx}>
            <ShowCard
              img={podcast.metadata.img}
              showTitle={podcast.metadata.series}
              producer={podcast.metadata.producer}
              desc={podcast.metadata.series_desc}
            />
          </div>
        ))}
      </Container>
    </>
  );
}

function Home(props) {
  return (
    <Router>
      <Shows path='/' />
      <Episodes path='episodes' seriesTitle='IRL - Online Life is Real Life'/>
    </Router>
  );
}

export default Home;
