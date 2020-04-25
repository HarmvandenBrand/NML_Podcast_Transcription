import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import Header from './Header';
import ShowDetails from './ShowDetails';
import EpisodeCard from './EpisodeCard';
import podcasts from '../podcasts/podcasts.js'

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }, card: {
    padding: theme.spacing(1, 0, 1, 0),
  }
}));

function Episodes(props) {
  const classes = useStyles();
  // TODO retrieve seriesKey from props
  const seriesKey = 'IRL';
  const metadata = podcasts[seriesKey].metadata;
  const episodes = []
  Object.keys(podcasts[seriesKey]).map( (key, index) => {
    if (key !== 'metadata'){
      episodes.push(key)
    }
  });
  return (
    <>
      <Header allowBack />
      <Container className={classes.container} maxWidth='md'>
        <ShowDetails
          img={metadata.img}
          showTitle={metadata.title}
          producer={metadata.producer}
          desc={metadata.desc}
        />
        <Typography variant='h6'>Episodes</Typography>
        {Array.from(episodes).map((key) => (
          <div className={classes.card} key={key}>
            <EpisodeCard
              date={podcasts[seriesKey][key].metadata.date}
              title={podcasts[seriesKey][key].metadata.title}
              duration={podcasts[seriesKey][key].metadata.duration}
              desc={podcasts[seriesKey][key].metadata.desc}
            />
          </div>
        ))}
      </Container>
    </>
  );
}

export default Episodes;
