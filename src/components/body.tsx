import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export const Body = ({ className }: { className: string }) => {
  return (
    <Grid container 
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      paddingTop="20px">
      <Grid item xs={8}>
        <Grid container spacing={2}>

          <Grid item xs={3}>
            <Card variant="outlined">{card}</Card>
          </Grid>

          <Grid item xs={3}>
            <Card variant="outlined">{card}</Card>
          </Grid>

          <Grid item xs={3}>
            <Card variant="outlined">{card}</Card>
          </Grid>

          <Grid item xs={3}>
            <Card variant="outlined">{card}</Card>
          </Grid>

          <Grid item xs={3}>
            <Card variant="outlined">{card}</Card>
          </Grid>

        </Grid>
      </Grid>
    </Grid>

  );
}