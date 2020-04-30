import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField } from '@material-ui/core';
import Header from './Header';
import ShowDetails from './ShowDetails';
import EpisodeCard from './EpisodeCard';
import { metadata } from '../examplePodcast'; // example
import findandreplacedomtext from '../../node_modules/findandreplacedomtext';
import SearchField from './SearchField';


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

  return (
    <>
      <Header allowBack>
        <SearchField />
      </Header>
      <Container id='episodes-container' className={classes.container} maxWidth='md'>
        <ShowDetails
          img={metadata.img}
          showTitle={metadata.series}
          producer={metadata.producer}
          desc={metadata.series_desc}
        />
        <Typography variant='h6'>Episodes</Typography>
          {[1, 2, 3, 4, 5].map((idx) => (
            <div className={classes.card} key={idx}>
              <EpisodeCard
                date={metadata.date}
                title={metadata.title}
                duration={metadata.duration}
                desc={metadata.desc}
              />
            </div>
          ))}
      </Container>
    </>
  );
}

export default Episodes;