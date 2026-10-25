import { render, screen } from '@testing-library/react';
import App from './App';

// App already mounts its own <BrowserRouter>, so it must not be wrapped in another router.
test('renders the MarketMint brand', async () => {
  render(<App />);

  // The home page is lazy-loaded, so wait for it to resolve.
  const heading = await screen.findByRole('heading', { level: 1 });
  expect(heading).toHaveTextContent(/MarketMint/i);
  expect(screen.getAllByText(/MarketMint/i).length).toBeGreaterThan(0);
});
