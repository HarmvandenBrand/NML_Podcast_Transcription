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
  // const { showId, ...showDetails } = props;
  const classes = useStyles();
  var podcast = podcasts.internet_carbon_footprint

  return (
    <>
      <Header allowBack />
      <Container className={classes.container} maxWidth='md'>
        <ShowDetails
          img={podcast.metadata.img}
          showTitle={podcast.metadata.series}
          producer={podcast.metadata.producer}
          desc={podcast.metadata.series_desc}
        />
        <Typography variant='h6'>Episodes</Typography>
        {[1, 2, 3, 4, 5].map((idx) => (
          <div className={classes.card} key={idx}>
            <EpisodeCard
              date={podcast.metadata.date}
              title={podcast.metadata.title}
              duration={podcast.metadata.duration}
              desc={podcast.metadata.desc}
            />
          </div>
        ))}
      </Container>
    </>
  );
}

export default Episodes;
