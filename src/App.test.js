import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders MarketMint brand name', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const brandElement = screen.getByText(/MarketMint/i);
  expect(brandElement).toBeInTheDocument();
});
