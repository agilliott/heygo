import React from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';

// TODO: no options jolly message.

interface Location {
  id: number;
  name: string;
}

const topFilms = [
  { name: 'The Shawshank Redemption', id: 1994 },
  { name: 'The Godfather', id: 1972 },
  { name: 'The Godfather: Part II', id: 1974 },
  { name: 'The Dark Knight', id: 2008 },
  { name: '12 Angry Men', id: 1957 },
  { name: "Schindler's List", id: 1993 },
  { name: 'Pulp Fiction', id: 1994 },
];

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Location[]>([]);
  const loading = open && options.length === 0;

  axios
    .get(`https://code-challenge-backend.herokuapp.com/locations?q=lon`)
    .then((res) => {
      const locations = res;
      console.log(locations);
    });

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        setOptions([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <Box pt={3}>
        <Typography variant="h1" textAlign="center">
          <b>Hey</b>!
        </Typography>
        <Typography variant="h2" textAlign="center">
          Where do you want to <b>go</b>?
        </Typography>
      </Box>
      <Box p={3}>
        <Autocomplete
          id="location-input"
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          options={options}
          loading={loading}
          sx={{ width: 300, margin: 'auto' }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Find a location"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <Box textAlign="center" p={2}>
          <Button variant="contained">Take me there</Button>
        </Box>
      </Box>
    </>
  );
};

export default Home;
