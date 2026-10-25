import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Markets from './Markets';
import api from '../services/api';

// The CoinGecko client is replaced so tests never touch the network.
jest.mock('../services/api', () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

const makeCoin = (id, name, price) => ({
  id,
  name,
  symbol: id,
  image: `${id}.png`,
  current_price: price,
  market_cap: 1_000_000_000,
  price_change_percentage_24h: 2.5,
});

const renderMarkets = () =>
  render(
    <MemoryRouter>
      <Markets />
    </MemoryRouter>
  );

beforeEach(() => {
  window.localStorage.clear();
  api.get.mockReset();
});

test('renders a card per coin once the market data resolves', async () => {
  api.get.mockResolvedValue({
    data: [makeCoin('bitcoin', 'Bitcoin', 60000), makeCoin('ethereum', 'Ethereum', 3000)],
  });

  renderMarkets();

  expect(await screen.findByText('Bitcoin')).toBeInTheDocument();
  expect(screen.getByText('Ethereum')).toBeInTheDocument();
  expect(screen.getByText('Cryptocurrency Market')).toBeInTheDocument();
});

test('shows the shimmer skeleton grid while loading', () => {
  api.get.mockReturnValue(new Promise(() => {})); // never resolves

  renderMarkets();

  expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
});

test('surfaces an error message when the request fails', async () => {
  api.get.mockRejectedValue(new Error('boom'));

  renderMarkets();

  await waitFor(() =>
    expect(
      screen.getByText(/Failed to fetch cryptocurrency data/i)
    ).toBeInTheDocument()
  );
});

test('toggling a star adds the coin to the watchlist in localStorage', async () => {
  api.get.mockResolvedValue({ data: [makeCoin('bitcoin', 'Bitcoin', 60000)] });

  renderMarkets();

  const button = await screen.findByLabelText('Add Bitcoin to watchlist');
  button.click();

  await waitFor(() => {
    expect(JSON.parse(window.localStorage.getItem('watchlist'))).toEqual([
      { id: 'bitcoin', symbol: 'bitcoin', name: 'Bitcoin' },
    ]);
  });

  expect(await screen.findByLabelText('Remove Bitcoin from watchlist')).toBeInTheDocument();
});
