import React from 'react';

import { renderWithRouter } from '../testUtils';
import Location from './Location';

describe('<Location/>', () => {
  test('renders the Location page content', () => {
    renderWithRouter(<Location />);
  });
  // Test error state
  // Test loading state
  // Test content hide/show logic
});
