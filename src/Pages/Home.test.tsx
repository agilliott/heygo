import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('<Home/>', () => {
  test('renders the homepage content', () => {
    render(<Home />);
    expect(screen.getByText(/hey/i)).toBeInTheDocument();
    expect(screen.getByText(/where do you want to go/i)).toBeInTheDocument();
    expect(
      screen.getByRole('textfield', { name: /where do you want to go/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /take me there/i })
    ).toBeInTheDocument();
  });
  test('sets the correct data when a location is selected', () => {});
  test('has the correctly selected location when button is clicked', () => {});
  test('Displays loading when results are pending', () => {});
  test('Displays message when no locations that match the search are found', () => {});
});
