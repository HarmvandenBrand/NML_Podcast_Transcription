import React from 'react';
import { Router } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Header from './Header';
import Episodes from './Episodes';
import ShowCard from './ShowCard';
import { metadata } from '../examplePodcast'; // example

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

  return (
    <>
      <Header />
      <Container className={classes.list} maxWidth='md' disableGutters>
        {[1, 2, 3, 4, 5].map(idx => (
          <div className={classes.card} key={idx}>
            <ShowCard
              img={metadata.img}
              showTitle={metadata.series}
              producer={metadata.producer}
              desc={metadata.series_desc}
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
      <Episodes path='episodes' />
    </Router>
  );
}

export default Home;