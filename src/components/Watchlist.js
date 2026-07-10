import React, { useState, useEffect, useCallback } from 'react';
import { Card, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash, FaStar, FaCoins } from 'react-icons/fa';
import { getSimplePrice } from '../services/api';

const safeFormat = (n) => {
  if (n === null || n === undefined || isNaN(n)) return 'N/A';
  return Number(n).toLocaleString();
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

function Watchlist() {
  const [watchlist, setWatchlist] = useState(getWatchlistFromStorage);
  const [prices, setPrices] = useState({});
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [priceError, setPriceError] = useState(null);

  const fetchPrices = useCallback(async () => {
    const validIds = watchlist.filter((c) => c && c.id).map((c) => c.id);
    if (validIds.length === 0) {
      setPrices({});
      return;
    }
    setLoadingPrices(true);
    setPriceError(null);
    const controller = new AbortController();
    try {
      const data = await getSimplePrice(validIds);
      setPrices(data);
    } catch (err) {
      if (err.name === 'CanceledError' || err.name === 'AbortError') return;
      setPriceError('Failed to fetch latest prices.');
      console.error('Error fetching prices:', err);
    } finally {
      setLoadingPrices(false);
    }
    return () => controller.abort();
  }, [watchlist]);

  useEffect(() => {
    const cleanupPromise = fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => {
      clearInterval(interval);
      if (cleanupPromise && typeof cleanupPromise === 'function') cleanupPromise();
    };
  }, [fetchPrices]);

  const removeFromWatchlist = (coinId) => {
    setWatchlist((prev) => {
      const updated = prev.filter((c) => c.id !== coinId);
      setWatchlistToStorage(updated);
      return updated;
    });
  };

  if (watchlist.length === 0) {
    return (
      <div className="text-center mt-5">
        <FaStar size={48} className="text-warning mb-3" />
        <h3>Your Watchlist is Empty</h3>
        <p className="text-muted mb-4">
          Start adding cryptocurrencies to your watchlist to track them here.
        </p>
        <Button as={Link} to="/markets" variant="primary">
          <FaCoins className="me-2" />
          Browse Markets
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FaStar className="text-warning me-2" />
          My Watchlist
        </h2>
        {loadingPrices && <Spinner animation="border" size="sm" variant="primary" />}
      </div>

      {priceError && (
        <Alert variant="warning" dismissible onClose={() => setPriceError(null)}>
          {priceError}
        </Alert>
      )}

      <Row>
        {watchlist.map((coin) => {
          if (!coin || !coin.id) return null;
          const coinPrice = prices[coin.id];
          const price = coinPrice?.usd;
          const change24h = coinPrice?.usd_24h_change;

          return (
            <Col lg={4} md={6} sm={12} key={coin.id} className="mb-4">
              <Card className="market-card h-100">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex-grow-1">
                      <h5 className="mb-0">{coin.name || coin.id}</h5>
                      <small className="text-muted">
                        {coin.symbol ? coin.symbol.toUpperCase() : coin.id.toUpperCase()}
                      </small>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromWatchlist(coin.id)}
                      aria-label={`Remove ${coin.name || coin.id} from watchlist`}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Price</span>
                    <strong>${safeFormat(price)}</strong>
                  </div>
                  {change24h !== undefined && change24h !== null && (
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">24h Change</span>
                      <strong
                        className={change24h >= 0 ? 'price-positive' : 'price-negative'}
                      >
                        {Number(change24h).toFixed(2)}%
                      </strong>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Watchlist;
