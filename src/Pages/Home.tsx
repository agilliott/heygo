import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  Button,
} from '@mui/material';
import debounce from 'lodash.debounce';

// TODO: no options jolly message.

interface Location {
  city: string;
  country: string;
  countryCode: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  region: string;
  regionCode: string;
  type: string;
  wikiDataId: string;
}

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [selected, setSelected] = React.useState<Location | null>(null);
  const [options, setOptions] = React.useState<Location[]>([]);

  function getOptions(term: string) {
    const config = {
      method: 'GET',
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
      params: { namePrefix: term, limit: '10' },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_GEODB_KEY || '',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },
    };

    axios(config)
      .then(function(response) {
        setOptions(response.data.data);
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  React.useEffect(() => {
    getOptions(searchTerm);
  }, [searchTerm]);

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
          id="location-finder"
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          options={options}
          blurOnSelect
          groupBy={(option) => option.country}
          filterOptions={(x) => x}
          sx={{ width: 300, margin: 'auto' }}
          onChange={(_, value) => setSelected(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Find a location"
              InputProps={{
                ...params.InputProps,
                onChange: (e) => setSearchTerm(e.currentTarget.value),
              }}
            />
          )}
        />
        <Box textAlign="center" p={2}>
          <Button
            component={Link}
            variant="contained"
            disabled={!selected}
            to={selected ? `location/${selected.id}` : '/'}
          >
            Take me{' '}
            {selected && selected.name.length < 20
              ? `to ${selected.name}`
              : 'there'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Home;
