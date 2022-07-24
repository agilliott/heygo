import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithRouter } from '../testUtils';
import Home from './Home';

describe('<Home/>', () => {
  test('renders the homepage content', async () => {
    renderWithRouter(<Home />);

    expect(screen.getByText(/hey/i)).toBeInTheDocument();
    expect(
      screen.getByText(/where do you want/i, { exact: false }).textContent
    ).toEqual('Where do you want to go?');
    expect(
      screen.getByRole('combobox', { name: /find a location/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('link', { name: /take me there/i })
    ).toHaveClass('Mui-disabled');
  });
  // Test button change
  // Test no options
  // Test loading
});
