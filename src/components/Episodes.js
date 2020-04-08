import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Header from './Header';
import ShowDetails from './ShowDetails';
import { metadata } from '../examplePodcast'; // example

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

function Episodes(props) {
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
      </Container>
    </>
  );
}

export default Episodes;