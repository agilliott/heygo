import React from 'react';
import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { renderWithRouter } from '../testUtils';
import Location from './Location';

const mockedAxios = new MockAdapter(axios);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '123',
  }),
}));

const responseData = {
  id: 2989781,
  wikiDataId: 'Q7852824',
  type: 'CITY',
  city: 'Tunbridge',
  name: 'Tunbridge',
  country: 'Australia',
  countryCode: 'AU',
  region: 'Tasmania',
  regionCode: 'TAS',
  elevationMeters: null,
  latitude: -42.1333,
  longitude: 147.433,
  population: 145,
  timezone: 'Australia__Hobart',
  distance: null,
  deleted: false,
  placeType: 'CITY',
};

describe('<Location/>', () => {
  afterEach(() => jest.clearAllMocks());

  test('renders page contents when it has location data', async () => {
    act(() => {
      mockedAxios
        .onGet('https://wft-geo-db.p.rapidapi.com/v1/geo/cities/123')
        .reply(200, {
          data: responseData,
        });
    });

    renderWithRouter(<Location />);

    expect(screen.getByRole('progressbar')).toBeDefined();
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    expect(
      screen.getByRole('heading', { name: /Tunbridge/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /Great choice! Let's take a look./i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Tunbridge is a city in the region of Tasmania in Australia/i
      )
    ).toBeInTheDocument();
  });

  test('renders an error when data is not returned', async () => {
    act(() => {
      mockedAxios
        .onGet('https://wft-geo-db.p.rapidapi.com/v1/geo/cities/123')
        .reply(404, {
          data: {},
        });
    });

    renderWithRouter(<Location />);

    expect(screen.getByRole('progressbar')).toBeDefined();
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    expect(
      screen.getByRole('heading', { name: /Location unknown/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: /Let's go home/i,
      })
    ).toBeInTheDocument();
  });

  test('renders an error when data is requested too often', async () => {
    act(() => {
      mockedAxios
        .onGet('https://wft-geo-db.p.rapidapi.com/v1/geo/cities/123')
        .reply(429, {
          data: {},
        });
    });

    renderWithRouter(<Location />);

    expect(screen.getByRole('progressbar')).toBeDefined();
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    expect(
      screen.getByRole('heading', { name: /too many searches/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: /Let's go home/i,
      })
    ).toBeInTheDocument();
  });

  test('renders a generic error when any other code is received', async () => {
    act(() => {
      mockedAxios
        .onGet('https://wft-geo-db.p.rapidapi.com/v1/geo/cities/123')
        .reply(0, {
          data: {},
        });
    });

    renderWithRouter(<Location />);

    expect(screen.getByRole('progressbar')).toBeDefined();
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));

    expect(
      screen.getByRole('heading', { name: /An error occurred/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: /Let's go home/i,
      })
    ).toBeInTheDocument();
  });
});
