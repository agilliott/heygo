import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { Map, Marker } from 'pigeon-maps';
import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  Button,
  Card,
} from '@mui/material';
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

  React.useEffect(() => {
    const config = {
      method: 'GET',
      url: `${process.env.REACT_APP_RAPID_API_GEODB_URL}/${id}`,
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_GEODB_KEY}`,
        'X-RapidAPI-Host': `${process.env.REACT_APP_RAPID_API_GEODB_HOST}`,
      },
    };

    axios(config)
      .then(function (response) {
        setCity(response.data.data);
      })
      .catch(function (error) {
        setError(error);
      });
  }, [id]);

  if (error) return <ErrorMessage status={error?.response?.status} />;

  if (!city)
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );

  return (
    <Card
      sx={{
        textAlign: 'center',
        padding: (theme) => ({ xs: theme.spacing(1), md: theme.spacing(3) }),
      }}
    >
      <Grid container spacing={3} padding={3}>
        <Grid item xs={12}>
          <Typography variant="h1" gutterBottom>
            {city.name}
          </Typography>
          <Typography variant="h2" gutterBottom>
            Great choice! Let's take a look.
          </Typography>
          <Typography>
            {city.name} is a city in the region of {city.region} in{' '}
            {city.country}.
          </Typography>
          <Typography>
            {city.population > 0 &&
              city.elevationMeters > 0 &&
              `It has a population of ${city.population} people and an elevation of ${city.elevationMeters} meters above sea level, fascinating!`}
            {city.population > 0 &&
              !city.elevationMeters &&
              `It has a population of ${city.population} people, fascinating!`}
            {!city.population &&
              city.elevationMeters > 0 &&
              `It has an elevation of ${city.elevationMeters} meters above sea level, fascinating!`}
          </Typography>
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
          <Button
            sx={{ marginBottom: (theme) => theme.spacing(3) }}
            component={Link}
            variant="contained"
            to="/"
          >
            Take me home
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Location;
