import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Box, Button } from '@mui/material';

const PageNotFound = () => {
  return (
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12}>
        <Box p={3} textAlign="center">
          <Typography variant="h1" gutterBottom>
            Page not found
          </Typography>
          <Typography variant="h2" gutterBottom>
            We're not sure how you got here but you are welcome to stay
          </Typography>
          <Typography>
            Seems you might be lost so let's go home and search for some amazing
            adventures.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box textAlign="center">
          <Button component={Link} variant="contained" to="/">
            Let's go home
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PageNotFound;
