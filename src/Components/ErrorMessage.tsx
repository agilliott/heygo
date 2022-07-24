import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Box, Button } from '@mui/material';

interface ErrorMessageProps {
  status?: number;
}

interface MessageMap {
  [key: number]: {
    title: string;
    subtitle: string;
    text: string;
  };
}

const ErrorMessage = ({ status = 0 }: ErrorMessageProps) => {
  const messageMap: MessageMap = {
    404: {
      title: 'Location unknown',
      subtitle: 'Looks like you might be lost',
      text: 'Unfortunately we have no details for the location you are trying to view. Head back home and try again.',
    },
    429: {
      title: 'Too many searches',
      subtitle: "It's great you're so eager but...",
      text: 'Unfortunately we have a rate limit of 1 call per second, so please wait a few seconds and try again.',
    },
  };

  return (
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12}>
        <Box p={3} textAlign="center">
          <Typography variant="h1" gutterBottom>
            {messageMap[status]?.title || 'An error occurred'}
          </Typography>
          <Typography variant="h2" gutterBottom>
            {messageMap[status]?.subtitle ||
              'We are sorry for any inconvenience caused.'}
          </Typography>
          <Typography>
            {messageMap[status]?.text ||
              'Please return to the home page and try again.'}
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

export default ErrorMessage;
