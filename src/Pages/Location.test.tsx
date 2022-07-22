import React from 'react';
import { render, screen } from '@testing-library/react';
import Location from './Location';

describe('<Location/>', () => {
  test('renders the Locationpage content', () => {
    render(<Location />);
  });
});
