import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

// TODO: test map for the codes and default
describe('<Error/>', () => {
  test('renders the correct copy for the code', () => {
    render(<ErrorMessage />);
    expect(
      screen.getByRole('heading', { name: /place unknown/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /Looks like you might be list lost/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: /lets go home/i,
      })
    ).toBeInTheDocument();
  });
});
