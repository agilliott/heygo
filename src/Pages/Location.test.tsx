import React from 'react';
import { render, screen } from '@testing-library/react';
import Location from './Location';

describe('<Location/>', () => {
  test('renders the Locationpage content', () => {
    render(<Location />);
  });
  test('has a loading state when given an invalid url param', () => {
    render(<Location />);
    screen.getByRole('progressbar');
  });
});
