import React, { useEffect } from 'react';
import { useParams } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import Header from './Header';
import ShowDetails from './ShowDetails';
import EpisodeCard from './EpisodeCard';
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
  const { podcasts, setEpisode } = props;
  const classes = useStyles();
  const params = useParams();
  const { metadata, ...episodes } = podcasts[params.showKey];

  return (
    <>
      <Header allowBack>
        <SearchField />
      </Header>
      <Container id='episodes-container' className={classes.container} maxWidth='md'>
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
