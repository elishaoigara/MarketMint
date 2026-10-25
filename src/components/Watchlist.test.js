import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Watchlist from './Watchlist';
import { getSimplePrice } from '../services/api';

jest.mock('../services/api', () => ({
  __esModule: true,
  default: { get: jest.fn() },
  getSimplePrice: jest.fn(),
}));

const renderWatchlist = () =>
  render(
    <MemoryRouter>
      <Watchlist />
    </MemoryRouter>
  );

beforeEach(() => {
  window.localStorage.clear();
  getSimplePrice.mockReset();
  getSimplePrice.mockResolvedValue({});
});

test('shows the animated empty state when nothing is being tracked', async () => {
  renderWatchlist();

  expect(screen.getByText('Your Watchlist is Empty')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Browse Markets/i })).toBeInTheDocument();
});

test('renders a card per tracked coin with its live price', async () => {
  window.localStorage.setItem(
    'watchlist',
    JSON.stringify([{ id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' }])
  );
  getSimplePrice.mockResolvedValue({ bitcoin: { usd: 61234.5, usd_24h_change: -1.25 } });

  renderWatchlist();

  expect(screen.getByText('Bitcoin')).toBeInTheDocument();
  expect(getSimplePrice).toHaveBeenCalledWith(['bitcoin']);

  // AnimatedNumber tweens to the price, so wait for the final value.
  await waitFor(() => expect(screen.getByText('$61,234.50')).toBeInTheDocument());
  expect(screen.getByText('-1.25%')).toBeInTheDocument();
});

test('removing a card updates localStorage', async () => {
  window.localStorage.setItem(
    'watchlist',
    JSON.stringify([
      { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
      { id: 'solana', symbol: 'sol', name: 'Solana' },
    ])
  );

  renderWatchlist();

  const remove = screen.getByLabelText('Remove Solana from watchlist');
  remove.click();

  await waitFor(() => {
    expect(JSON.parse(window.localStorage.getItem('watchlist'))).toEqual([
      { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
    ]);
  });
});
