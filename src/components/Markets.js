import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner, Alert, Form, ButtonGroup, Button } from 'react-bootstrap';
import { FaStar, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import api from '../services/api';
import './Markets.css';

const safeFormat = (n) => {
  if (n === null || n === undefined || isNaN(n)) return 'N/A';
  return Number(n).toLocaleString();
};

const formatPercent = (n) => {
  if (n === null || n === undefined || isNaN(n)) return 'N/A';
  return Number(n).toFixed(2) + '%';
};

const getWatchlistFromStorage = () => {
  try {
    const stored = localStorage.getItem('watchlist');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
    return [];
  } catch (e) {
    console.error('Error reading watchlist from localStorage:', e);
    try {
      localStorage.removeItem('watchlist');
    } catch (removeErr) {
      console.error('Could not remove corrupted watchlist:', removeErr);
    }
    return [];
  }
};

const setWatchlistToStorage = (watchlist) => {
  try {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  } catch (e) {
    console.error('Error saving watchlist to localStorage:', e);
  }
};

function Markets() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [watchlist, setWatchlist] = useState(getWatchlistFromStorage);

  const isRateLimitError = (err) => {
    return err?.response?.status === 429 || err?.response?.data?.error?.includes('rate');
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchCoins = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/coins/markets', {
          signal,
          params: {
            vs_currency: 'usd',
            order: sortBy,
            per_page: 50,
            page: 1,
            sparkline: false,
          },
        });
        setCoins(res.data);
      } catch (err) {
        if (err.name === 'CanceledError' || err.name === 'AbortError') return;
        if (isRateLimitError(err)) {
          setError(
            'CoinGecko API rate limit reached. Please wait a moment and try again.'
          );
        } else {
          setError('Failed to fetch cryptocurrency data. Please try again later.');
        }
        console.error('Error fetching coins:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();

    return () => controller.abort();
  }, [sortBy]);

  const toggleWatchlist = (coin) => {
    setWatchlist((prev) => {
      const exists = prev.find((c) => c.id === coin.id);
      let updated;
      if (exists) {
        updated = prev.filter((c) => c.id !== coin.id);
      } else {
        updated = [...prev, { id: coin.id, symbol: coin.symbol, name: coin.name }];
      }
      setWatchlistToStorage(updated);
      return updated;
    });
  };

  const isInWatchlist = (coinId) => {
    return watchlist.some((c) => c.id === coinId);
  };

  const filteredCoins = coins.filter((coin) => {
    if (!coin || !coin.name) return false;
    return (
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      (coin.symbol && coin.symbol.toLowerCase().includes(search.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading cryptocurrencies...</p>
      </div>
    );
  }

  return (
    <div className="markets-container">
      <h2 className="mb-4">
        <FaSortAmountDown className="me-2" />
        Cryptocurrency Market
      </h2>

      {error && (
        <Alert variant="warning" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Row className="mb-4 align-items-center">
        <Col md={6} className="mb-2 mb-md-0">
          <Form.Control
            type="text"
            placeholder="Search for a coin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search coins"
          />
        </Col>
        <Col md={6}>
          <ButtonGroup aria-label="Sort coins">
            <Button
              variant={sortBy === 'market_cap_desc' ? 'primary' : 'outline-primary'}
              onClick={() => setSortBy('market_cap_desc')}
            >
              <FaSortAmountDown className="me-1" />
              Market Cap
            </Button>
            <Button
              variant={sortBy === 'volume_desc' ? 'primary' : 'outline-primary'}
              onClick={() => setSortBy('volume_desc')}
            >
              <FaSortAmountUp className="me-1" />
              Volume
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      <Row>
        {filteredCoins.map((coin) => (
          <Col lg={4} md={6} sm={12} key={coin.id} className="mb-4">
            <Card className="market-card h-100">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="coin-icon me-3"
                    width="32"
                    height="32"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/32';
                    }}
                  />
                  <div className="flex-grow-1">
                    <h5 className="mb-0">{coin.name}</h5>
                    <small className="text-muted">{coin.symbol?.toUpperCase()}</small>
                  </div>
                  <button
                    className={`btn btn-sm ${isInWatchlist(coin.id) ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => toggleWatchlist(coin)}
                    aria-label={isInWatchlist(coin.id) ? `Remove ${coin.name} from watchlist` : `Add ${coin.name} to watchlist`}
                  >
                    <FaStar />
                  </button>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Price</span>
                  <strong>${safeFormat(coin.current_price)}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">24h Change</span>
                  <strong
                    className={
                      coin.price_change_percentage_24h >= 0
                        ? 'price-positive'
                        : 'price-negative'
                    }
                  >
                    {formatPercent(coin.price_change_percentage_24h)}
                  </strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Market Cap</span>
                  <strong>${safeFormat(coin.market_cap)}</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredCoins.length === 0 && !loading && (
        <p className="text-center text-muted mt-4">
          No coins found matching your search.
        </p>
      )}
    </div>
  );
}

export default Markets;
