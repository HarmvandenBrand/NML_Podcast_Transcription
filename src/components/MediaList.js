import React from "react";
import MediaItem from './MediaItem';
import { Container, Box, Divider } from '@material-ui/core'

export default function MediaList(props) {
  const { data } = props;

  return (
    <Container>
      {/* Placeholder map function */}
      {data.map(id => (
        <Box>
          <MediaItem key={id} /> <Divider />
        </Box>
      ))
      }
    </Container>
  );
}
