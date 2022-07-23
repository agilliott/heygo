import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

// TODO: mock out the logic

describe('<Header/>', () => {
  test('renders the test header when on the home page', () => {
    render(<Header />);
    expect(screen.getByText(/front end test/i)).toBeInTheDocument();
  });
});
