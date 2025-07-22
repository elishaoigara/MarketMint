// src/components/Markets.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './Home.css';
import './Markets.css';

function Markets() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(10);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetchCoins();
  }, [perPage]);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: perPage,
          page: 1,
          sparkline: false,
        },
      });
      setCoins(response.data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWatchlist = (coin) => {
    const exists = watchlist.find((item) => item.id === coin.id);
    const updated = exists
      ? watchlist.filter((item) => item.id !== coin.id)
      : [...watchlist, coin];
    setWatchlist(updated);
  };

  const isInWatchlist = (coinId) => watchlist.some((item) => item.id === coinId);

  const renderCoinCard = (coin) => (
    <div className="market-card" key={coin.id}>
      <div className="coin-header">
        <img src={coin.image} alt={coin.name} className="coin-icon" />
        <h4>{coin.name} ({coin.symbol.toUpperCase()})</h4>
      </div>

      <p>💰 <strong>Price:</strong> ${coin.current_price.toLocaleString()}</p>
      <p>📊 <strong>Market Cap:</strong> ${coin.market_cap.toLocaleString()}</p>

      <p className={coin.price_change_percentage_24h >= 0 ? 'price-positive' : 'price-negative'}>
        {coin.price_change_percentage_24h >= 0 ? <FaArrowUp /> : <FaArrowDown />}{" "}
        {coin.price_change_percentage_24h.toFixed(2)}%
      </p>

      <Button
        size="sm"
        variant={isInWatchlist(coin.id) ? 'outline-danger' : 'outline-light'}
        onClick={() => toggleWatchlist(coin)}
      >
        {isInWatchlist(coin.id) ? 'Remove' : 'Add to Watchlist'}
      </Button>
    </div>
  );

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">📈 Explore Top {perPage} Cryptocurrencies</h1>
        <p className="home-subtitle">Real-time market stats and easy watchlist management.</p>

        <Form.Select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="w-auto mb-3"
        >
          <option value={10}>Top 10</option>
          <option value={25}>Top 25</option>
          <option value={50}>Top 50</option>
        </Form.Select>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading market data...</p>
        </div>
      ) : (
        <div className="market-grid">
          {coins.map(renderCoinCard)}
        </div>
      )}
    </div>
  );
}

export default Markets;
