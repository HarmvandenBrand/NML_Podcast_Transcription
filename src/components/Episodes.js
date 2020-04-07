import React from 'react';
import { Container } from '@material-ui/core';
import MediaItem from './MediaItem';
import Header from './Header';
import { metadata } from '../examplePodcast'; // example

// Placeholder: design a proper list of episodes screen
function Episodes(props) {
  return (
    <>
      <Header allowBack />
      <Container>
        <MediaItem
          id={metadata.id}
          title={metadata.title}
          series={metadata.series}
          duration={metadata.duration}
          img={metadata.img}
          desc={metadata.desc}
        />
      </Container>
    </>
  );
}

export default Episodes;