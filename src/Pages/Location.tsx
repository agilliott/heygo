import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { Map, Marker } from 'pigeon-maps';
import { Grid, Typography, CircularProgress, Box, Button } from '@mui/material';
import { ErrorMessage } from '../Components';

interface City {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  elevationMeters: number;
  latitude: number;
  longitude: number;
  population: number;
  timezone: string;
  deleted: false;
  placeType: string;
}

const Location = () => {
  const { id } = useParams();
  const [city, setCity] = React.useState<City | null>(null);
  const [error, setError] = React.useState<AxiosError | null>(null);

  const config = {
    method: 'GET',
    url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${id}`,
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_GEODB_KEY || '',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
  };

  React.useEffect(() => {
    axios(config)
      .then(function(response) {
        setCity(response.data.data);
      })
      .catch(function(error) {
        setError(error);
      });
  }, []);

  if (error) return <ErrorMessage status={error?.response?.status} />;

  if (!city)
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );

  return (
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12}>
        <Box p={3} textAlign="center">
          <Typography variant="h1">Great choice!</Typography>
          <Typography variant="h2">Now, about {city.name}</Typography>
          <Typography>
            {city.name} is a {city.type.toLowerCase()} in the region of{' '}
            {city.region} in {city.country}.
          </Typography>
          <Typography>
            It has a population of {city.population} people and an elevation of{' '}
            {city.elevationMeters} meters above sea level, fascinating!
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Map
          height={400}
          defaultCenter={[city.latitude, city.longitude]}
          defaultZoom={11}
        >
          <Marker width={50} anchor={[city.latitude, city.longitude]} />
        </Map>
      </Grid>
      <Grid item xs={12}>
        <Box textAlign="center">
          <Button component={Link} variant="contained" to="/">
            Take me home
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Location;
