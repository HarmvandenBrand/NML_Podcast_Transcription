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
  const { seriesTitle } = props;
  const classes = useStyles();
  let podcastsKeys = [];
  let seriesMetadata = {};

  // Quite inefficient to loop over all podcasts each time
  // TODO instead have a pre-generated JSON that lists all episodes per series
  // as well as the series-specific metadata so you don't have to retrieve this from an episode
  Object.keys(podcasts).map( (key, index) => {
    // Quick hack because I have to retrieve series metadata from the episode itself
    if (podcasts[key].metadata.series === seriesTitle){
      podcastsKeys.push(key)
      if (index === 0){
        seriesMetadata['series'] = podcasts[key].metadata.series
        seriesMetadata['series_desc'] = podcasts[key].metadata.series_desc
        seriesMetadata['img'] = podcasts[key].metadata.img
        seriesMetadata['producer'] = podcasts[key].metadata.producer
      }
    }
  })

  return (
    <>
      <Header allowBack />
      <Container className={classes.container} maxWidth='md'>
        <ShowDetails
          img={seriesMetadata.img}
          showTitle={seriesMetadata.series}
          producer={seriesMetadata.producer}
          desc={seriesMetadata.series_desc}
        />
        <Typography variant='h6'>Episodes</Typography>
        {podcastsKeys.map((key) => (
          <div className={classes.card} key={key}>
            <EpisodeCard
              date={podcasts[key].metadata.date}
              title={podcasts[key].metadata.title}
              duration={podcasts[key].metadata.duration}
              desc={podcasts[key].metadata.desc}
            />
          </div>
        ))}
      </Container>
    </>
  );
}

export default Episodes;
