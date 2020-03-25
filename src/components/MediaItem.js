import React from "react";
import { Grid, Hidden, Button, Typography } from "@material-ui/core";

export default function MediaItem(props) {
  //   const {title, series, img, duration, desc} = props;

  // placeholders
  let title = "Podcast Title: A Subtitle for the Podcast";
  let series = "Podcast series: A Subtitle for the Podcast Series";
  let duration = "01:20:15"; // normally computed from seconds
  let img = "https://braininspired.co/wp-content/uploads/2018/08/Logo_Edits02_LargeBrain_small.jpg";
  let desc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              tellus lectus, fringilla sed risus accumsan, ornare gravida
              arcu. Fusce efficitur egestas sem ac hendrerit. Quisque suscipit
              tempus eros, quis euismod justo convallis eu. Aliquam vel dui
              commodo, rutrum tortor vitae, rhoncus nulla.`;

  return (
    <Grid container spacing={1} style={{ marginTop: '1vw', marginBottom: '1vw' }}>

      <Hidden mdUp>
        <Grid item xs={12}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
      </Hidden>

      <Grid item xs={3} sm={2}>
        <img src={img} alt="IMG" width="100%" />
      </Grid>

      <Grid item xs={9} sm={8}>
        <Hidden smDown>
          <Typography variant="h5">{title}</Typography>
        </Hidden>
        <Typography variant="subtitle1" color="textSecondary">
          {series}
        </Typography>
        <Typography variant="subtitle2" color="secondary">
          {duration}
        </Typography>
        <Hidden mdUp only="xs">
          <Typography noWrap display="block" variant="caption">{desc}</Typography>
        </Hidden>
        <Hidden smDown>
          <Typography variant="caption">{desc}</Typography>
        </Hidden>
      </Grid>

      <Grid item xs={12} sm={2}>
        <Button fullWidth variant="contained" color="primary">
          Listen
        </Button>
      </Grid>

    </Grid>
  );
}
