import React from 'react';
import MediaItem from './MediaItem';
import { Container } from '@material-ui/core';
import { metadata } from '../examplePodcast'; // example

export default function MediaList(props) {
  // example to fill the screen
  const data = [1, 2, 3, 4, 5];

  return (
    <Container>
      {data.map(idx => (
        <MediaItem
          key={idx}
          id={metadata.id}
          title={metadata.title}
          series={metadata.series}
          duration={metadata.duration}
          img={metadata.img}
          desc={metadata.desc}
        />
      ))}
    </Container>
  );
}
