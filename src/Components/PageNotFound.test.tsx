import React from 'react';
import { screen } from '@testing-library/react';
import PageNotFound from './PageNotFound';
import { renderWithRouter } from '../testUtils';

describe('<PageNotFound/>', () => {
  test('renders the copyright', () => {
    renderWithRouter(<PageNotFound />);
    expect(
      screen.getByRole('heading', { name: /page not found/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /let's go home/i })
    ).toBeInTheDocument();
  });
});
