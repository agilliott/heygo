import React from 'react';
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import {
  Typography,
  Autocomplete,
  TextField,
  Button,
  Card,
  Alert,
} from '@mui/material';
import debounce from 'lodash.debounce';

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
  const [error, setError] = React.useState<AxiosError | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

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
      .then(function (response) {
        setOptions(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        setError(error);
      });
  }

  // API is restricted to 1 call per second.
  const debounceGetOptions = React.useMemo(
    () => debounce(getOptions, 1000),
    []
  );

  React.useEffect(() => {
    setLoading(true);
    setOptions([]);
    debounceGetOptions(searchTerm);
  }, [searchTerm, debounceGetOptions]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open, setOptions]);

  return (
    <Card
      elevation={1}
      sx={{
        width: 'min-content',
        margin: 'auto',
        padding: (theme) => theme.spacing(4),
        textAlign: 'center',
      }}
    >
      {error?.response?.status === 429 && (
        <Alert
          severity="warning"
          sx={{ textAlign: 'left', marginBottom: (theme) => theme.spacing(3) }}
        >
          We are experiencing some request delays with our locations data.
        </Alert>
      )}
      <Typography variant="h1" textAlign="center">
        <b>Hey</b>!
      </Typography>
      <Typography variant="h2" textAlign="center">
        Where do you want to <b>go</b>?
      </Typography>
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
        loading={loading}
        blurOnSelect
        groupBy={(option) => option.country}
        filterOptions={(x) => x}
        sx={{
          width: { xs: 250, md: 300 },
          margin: 'auto',
          marginTop: (theme) => theme.spacing(3),
        }}
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
      <Button
        component={Link}
        variant="contained"
        disabled={!selected}
        sx={{ marginTop: (theme) => theme.spacing(3) }}
        to={selected ? `location/${selected.id}` : '/'}
      >
        Take me{' '}
        {selected && selected.name.length < 20
          ? `to ${selected.name}`
          : 'there'}
      </Button>
    </Card>
  );
};

export default Home;
