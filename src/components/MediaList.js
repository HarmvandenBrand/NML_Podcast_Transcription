import React from 'react';
import MediaItem from './MediaItem';
import { Container } from '@material-ui/core';

export default function MediaList(props) {
  const { data } = props;

  return (
    <Container>
      {/* Placeholder map function */}
      {data.map(id => (
        <MediaItem key={id} />
      ))}
    </Container>
  );
}
