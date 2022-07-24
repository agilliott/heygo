import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithRouter } from '../testUtils';
import ErrorMessage from './ErrorMessage';

describe('<ErrorMessage/>', () => {
  test.each`
    status | message
    ${404} | ${/Location unknown/i}
    ${429} | ${/Too many searches/i}
    ${0}   | ${/An error occurred/i}
  `(
    'renders the correct copy for the status $status',
    ({ status, message }) => {
      renderWithRouter(<ErrorMessage status={status} />);

      expect(
        screen.getByRole('heading', { name: message })
      ).toBeInTheDocument();
    }
  );
});
