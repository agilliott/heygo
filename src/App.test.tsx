import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// TODO: Cypress?

describe('Meets challenge requirements', () => {
  test('Can type a query into a search box', () => {
    render(<App />);
  });
  test('As you type, the relevant results are displayed dynamically below the input', () => {
    render(<App />);
  });
  test(' When you click on a result, we navigate to a new screen which shows the details of the location including a map view', () => {
    render(<App />);
  });
});
