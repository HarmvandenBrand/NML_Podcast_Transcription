import React from 'react';
import { Router } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Header from './Header';
import Episodes from './Episodes';
import ShowCard from './ShowCard';

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
  const { podcasts } = props;
  const classes = useStyles();

  return (
    <>
      <Header />
      <Container className={classes.list} maxWidth='md' disableGutters>
        {Object.keys(podcasts).map(key => (
          <div className={classes.card} key={key}>
            <ShowCard
              showKey={key}
              show={podcasts[key]}
            />
          </div>
        ))}
      </Container>
    </>
  );
}

function Home(props) {
  const { podcasts, setEpisode } = props;

  return (
    <Router>
      <Shows path='/' podcasts={podcasts} />
      <Episodes path='episodes/:showKey' podcasts={podcasts} setEpisode={setEpisode}  />
    </Router>
  );
}

export default Home;
