import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('<Footer/>', () => {
  test('renders the copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/alex gilliott/i)).toBeInTheDocument();
  });
});
