// src/pages/Watchlist.js
import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert } from 'react-bootstrap';
import { FaTrashAlt, FaStar } from 'react-icons/fa';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('watchlist');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const cleaned = parsed.filter(
          (coin) => coin && coin.id && coin.symbol && coin.current_price
        );
        setWatchlist(cleaned);
      } catch (e) {
        console.error('Failed to parse watchlist:', e);
        setWatchlist([]);
      }
    }
    setLoading(false);
  }, []);

  const removeFromWatchlist = (id) => {
    const updated = watchlist.filter((coin) => coin.id !== id);
    setWatchlist(updated);
    localStorage.setItem('watchlist', JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className="text-center mt-5">
        <Alert variant="info">Your watchlist is currently empty.</Alert>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 d-flex align-items-center gap-2">
        <FaStar color="gold" /> My Watchlist
      </h2>
      <Table striped bordered hover responsive className="text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((coin, index) => (
            <tr key={coin.id}>
              <td>{index + 1}</td>
              <td className="d-flex align-items-center gap-2">
                {coin.image && (
                  <img
                    src={coin.image}
                    alt={coin.name || 'coin'}
                    width={24}
                    height={24}
                    style={{ borderRadius: '50%' }}
                  />
                )}
                <span>{coin.name || 'N/A'}</span>
              </td>
              <td>{coin.symbol?.toUpperCase() || 'N/A'}</td>
              <td>${coin.current_price?.toLocaleString() || 'N/A'}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeFromWatchlist(coin.id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Watchlist;
