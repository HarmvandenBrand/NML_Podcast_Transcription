import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Divider, Typography } from '@material-ui/core';
import Header from './Header';
import ShowDetails from './ShowDetails';
import EpisodeCard from './EpisodeCard';
import { metadata } from '../examplePodcast'; // example

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

function Episodes(props) {
  // const { showId, ...showDetails } = props;
  const classes = useStyles();

  return (
    <>
      <Header allowBack />
      <Container className={classes.container} maxWidth='md'>
        <ShowDetails
          img={metadata.img}
          showTitle={metadata.series}
          producer={metadata.producer}
          desc={metadata.series_desc}
        />
        <Typography variant='h6'>Episodes</Typography>
        {[1, 2, 3, 4, 5].map((idx) => (
          <div key={idx}>
            <EpisodeCard
              date={metadata.date}
              title={metadata.title}
              duration={metadata.duration}
              desc={metadata.desc}
            />
            <Divider />
          </div>
        ))}
      </Container>
    </>
  );
}

export default Episodes;