import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Box p={3}>
        <Typography variant="subtitle2" textAlign="center">
          &copy; Alex Gilliott
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
