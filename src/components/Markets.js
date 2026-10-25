import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Alert, Form, ButtonGroup, Button } from 'react-bootstrap';
import { AnimatePresence, motion } from 'framer-motion';
import { FaStar, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import api from '../services/api';
import { SkeletonGrid } from '../animations/Skeletons';
import AnimatedNumber from '../animations/AnimatedNumber';
import { cardItem, SPRING_POP, fadeUp, EASE_OUT } from '../animations/variants';
import './Markets.css';

/** Price formatter: keeps precision sensible for both BTC and SHIB. */
const formatPriceValue = (v) => {
  const n = Number(v);
  if (n >= 1) return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (n >= 0.01) return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
  return n.toPrecision(4);
};

/** Compact market cap: 1.24B instead of 1,240,000,000. */
const formatCompact = (v) => {
  const n = Number(v);
  const abs = Math.abs(n);
  if (abs >= 1e12) return `${(n / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${(n / 1e3).toFixed(2)}K`;
  return n.toFixed(2);
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
          setError('CoinGecko API rate limit reached. Please wait a moment and try again.');
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

  return (
    <div className="markets-container">
      <motion.h2 className="mb-4" variants={fadeUp} initial="hidden" animate="show">
        <motion.span
          className="d-inline-flex me-2"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaSortAmountDown />
        </motion.span>
        Cryptocurrency Market
      </motion.h2>

      <AnimatePresence initial={false}>
        {error && (
          <motion.div
            key="markets-error"
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            style={{ overflow: 'hidden' }}
          >
            <Alert variant="warning" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Row className="mb-4 align-items-center">
        <Col md={6} className="mb-2 mb-md-0">
          <Form.Control
            type="text"
            placeholder="Search for a coin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search coins"
            className="mm-search-input"
          />
        </Col>
        <Col md={6}>
          <ButtonGroup aria-label="Sort coins">
            <Button
              as={motion.button}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={SPRING_POP}
              variant={sortBy === 'market_cap_desc' ? 'primary' : 'outline-primary'}
              onClick={() => setSortBy('market_cap_desc')}
            >
              <FaSortAmountDown className="me-1" />
              Market Cap
            </Button>
            <Button
              as={motion.button}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={SPRING_POP}
              variant={sortBy === 'volume_desc' ? 'primary' : 'outline-primary'}
              onClick={() => setSortBy('volume_desc')}
            >
              <FaSortAmountUp className="me-1" />
              Volume
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      {loading ? (
        <SkeletonGrid count={9} />
      ) : (
        <motion.div className="row" layout transition={{ duration: 0.3, ease: EASE_OUT }}>
          <AnimatePresence mode="popLayout">
            {filteredCoins.map((coin, index) => {
              const favourite = isInWatchlist(coin.id);
              return (
                <motion.div
                  className="col-12 col-md-6 col-lg-4 mb-4"
                  key={coin.id}
                  layout
                  variants={cardItem(index)}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover={{ y: -8 }}
                  transition={{ layout: { duration: 0.32, ease: EASE_OUT } }}
                >
                  <Card className="market-card h-100">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <motion.img
                          src={coin.image}
                          alt={coin.name}
                          className="coin-icon me-3"
                          width="32"
                          height="32"
                          loading="lazy"
                          whileHover={{ rotate: 12, scale: 1.15 }}
                          transition={SPRING_POP}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/32';
                          }}
                        />
                        <div className="flex-grow-1">
                          <h5 className="mb-0">{coin.name}</h5>
                          <small className="text-muted">{coin.symbol?.toUpperCase()}</small>
                        </div>
                        <motion.button
                          className={`btn btn-sm ${
                            favourite ? 'btn-warning' : 'btn-outline-warning'
                          }`}
                          onClick={() => toggleWatchlist(coin)}
                          aria-label={
                            favourite
                              ? `Remove ${coin.name} from watchlist`
                              : `Add ${coin.name} to watchlist`
                          }
                          whileHover={{ scale: 1.12 }}
                          whileTap={{ scale: 0.85 }}
                          transition={SPRING_POP}
                        >
                          {/* Re-keying on the favourite flag replays the pop. */}
                          <motion.span
                            key={favourite ? 'starred' : 'unstarred'}
                            className="d-inline-flex"
                            initial={{ scale: 0.4, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={SPRING_POP}
                          >
                            <FaStar />
                          </motion.span>
                        </motion.button>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Price</span>
                        <strong>
                          <AnimatedNumber
                            value={coin.current_price}
                            prefix="$"
                            format={formatPriceValue}
                            flash
                          />
                        </strong>
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
                          <AnimatedNumber
                            value={coin.price_change_percentage_24h}
                            suffix="%"
                            format={(v) => Number(v).toFixed(2)}
                          />
                        </strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Market Cap</span>
                        <strong>
                          <AnimatedNumber
                            value={coin.market_cap}
                            prefix="$"
                            format={formatCompact}
                          />
                        </strong>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence initial={false}>
        {filteredCoins.length === 0 && !loading && (
          <motion.p
            key="no-results"
            className="text-center text-muted mt-4"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10 }}
          >
            No coins found matching your search.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Markets;
