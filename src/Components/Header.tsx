import React from 'react';
import { Box, Typography, Button } from '@mui/material';

// TODO: Show nav for home when on location page

const Header = () => {
  return (
    <header>
      <Box pt={3} textAlign="center">
        <Typography variant="subtitle2">The front end test</Typography>
        <Button variant="text">Take me home</Button>
      </Box>
    </header>
  );
};

export default Header;
