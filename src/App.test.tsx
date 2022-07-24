import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('<App />', () => {
  describe('integration', () => {
    test('shows header, body and footer', async () => {
      render(<App />);
      expect(screen.getByText(/front end test/i)).toBeInTheDocument();
      expect(
        screen.getByText(/where do you want/i, { exact: false }).textContent
      ).toEqual('Where do you want to go?');
      expect(screen.getByText(/alex gilliott/i)).toBeInTheDocument();
      expect(
        screen.getByRole('combobox', { name: /find a location/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByRole('link', { name: /take me there/i })
      ).toHaveClass('Mui-disabled');
    });
  });
  describe('Meets challenge requirements', () => {
    test('Can type a query into a search box', async () => {
      render(<App />);
      const input = screen.getByRole('combobox', { name: /find a location/i });
      const value = 'tun';

      userEvent.type(input, value);

      await waitFor(() => {
        expect(input).toHaveValue(value);
      });
    });
  });
});
