import React, { useState, useEffect, useCallback } from 'react';
import { Card, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaTrash, FaStar, FaCoins } from 'react-icons/fa';
import { getSimplePrice } from '../services/api';
import AnimatedNumber from '../animations/AnimatedNumber';
import { cardItem, SPRING_POP, fadeUp, EASE_OUT } from '../animations/variants';

const formatPriceValue = (v) => {
  const n = Number(v);
  if (n >= 1) return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (n >= 0.01) return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
  return n.toPrecision(4);
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
      <motion.div
        className="text-center mt-5"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, -8, 8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaStar size={48} className="text-warning mb-3" />
        </motion.div>
        <h3>Your Watchlist is Empty</h3>
        <p className="text-muted mb-4">
          Start adding cryptocurrencies to your watchlist to track them here.
        </p>
        <motion.span
          className="d-inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={SPRING_POP}
        >
          <Button as={Link} to="/markets" variant="primary" role="link">
            <FaCoins className="me-2" />
            Browse Markets
          </Button>
        </motion.span>
      </motion.div>
    );
  }

  return (
    <div>
      <motion.div
        className="d-flex justify-content-between align-items-center mb-4"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <h2 className="mb-0">
          <motion.span
            className="text-warning me-2 d-inline-flex"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaStar />
          </motion.span>
          My Watchlist
        </h2>
        <AnimatePresence>
          {loadingPrices && (
            <motion.span
              key="watchlist-spinner"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              <Spinner animation="border" size="sm" variant="primary" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence initial={false}>
        {priceError && (
          <motion.div
            key="watchlist-error"
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            style={{ overflow: 'hidden' }}
          >
            <Alert variant="warning" dismissible onClose={() => setPriceError(null)}>
              {priceError}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="row" layout>
        <AnimatePresence mode="popLayout">
          {watchlist.map((coin, index) => {
            if (!coin || !coin.id) return null;
            const coinPrice = prices[coin.id];
            const price = coinPrice?.usd;
            const change24h = coinPrice?.usd_24h_change;

            return (
              <motion.div
                className="col-12 col-md-6 col-lg-4 mb-4"
                key={coin.id}
                layout
                variants={cardItem(index, 0.06)}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover={{ y: -8 }}
                transition={{ layout: { duration: 0.32, ease: EASE_OUT } }}
              >
                <Card className="market-card h-100">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <div className="flex-grow-1">
                        <h5 className="mb-0">{coin.name || coin.id}</h5>
                        <small className="text-muted">
                          {coin.symbol ? coin.symbol.toUpperCase() : coin.id.toUpperCase()}
                        </small>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.12, rotate: -8 }}
                        whileTap={{ scale: 0.85 }}
                        transition={SPRING_POP}
                        className="d-inline-flex"
                      >
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFromWatchlist(coin.id)}
                          aria-label={`Remove ${coin.name || coin.id} from watchlist`}
                        >
                          <FaTrash />
                        </Button>
                      </motion.div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Price</span>
                      <strong>
                        {/* Flashes green/red whenever the 30s refresh moves it. */}
                        <AnimatedNumber
                          value={price}
                          prefix="$"
                          format={formatPriceValue}
                          flash
                        />
                      </strong>
                    </div>
                    {change24h !== undefined && change24h !== null && (
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">24h Change</span>
                        <strong className={change24h >= 0 ? 'price-positive' : 'price-negative'}>
                          <AnimatedNumber
                            value={change24h}
                            suffix="%"
                            format={(v) => Number(v).toFixed(2)}
                          />
                        </strong>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Watchlist;
