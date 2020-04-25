import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import Header from './Header';
import ShowDetails from './ShowDetails';
import EpisodeCard from './EpisodeCard';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }, card: {
    padding: theme.spacing(1, 0, 1, 0),
  }
}));

function Episodes(props) {
  const { show, setEpisode } = props;
  const { metadata, ...episodes } = show;
  const classes = useStyles();

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
        {Object.keys(episodes).map(key => (
          <div className={classes.card} key={key}>
            <EpisodeCard
              setEpisode={setEpisode}
              episode={episodes[key]}
            />
          </div>
        ))}
      </Container>
    </>
  );
}

export default Episodes;
