import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

// TODO: mock out the logic

describe('<Header/>', () => {
  test('renders the test header when on the home page', () => {
    render(<Header />);
    expect(screen.getByText(/front end test/i)).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /take me home/i })
    ).not.toBeInTheDocument();
  });
  test('renders the button when on the location page', () => {
    render(<Header />);
    expect(
      screen.getByRole('button', { name: /take me home/i })
    ).toBeInTheDocument();
    expect(screen.queryByText(/front end test/i)).not.toBeInTheDocument();
  });
});
