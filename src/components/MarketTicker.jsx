/**
 * <MarketTicker /> - a continuously scrolling strip of live prices.
 *
 * The list is rendered twice so the CSS marquee can loop seamlessly, pauses on
 * hover, and disappears entirely if the API call fails (the Home page is still
 * perfectly usable without it).
 */
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const formatPrice = (n) => {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return 'N/A';
  const value = Number(n);
  if (value >= 1000) return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  if (value >= 1) return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${value.toPrecision(4)}`;
};

const formatChange = (n) => {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return 'N/A';
  return `${Number(n) >= 0 ? '+' : ''}${Number(n).toFixed(2)}%`;
};

export default function MarketTicker() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTicker = async () => {
      try {
        const res = await api.get('/coins/markets', {
          signal: controller.signal,
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 12,
            page: 1,
            sparkline: false,
          },
        });
        if (Array.isArray(res.data)) setCoins(res.data);
      } catch (err) {
        if (err.name === 'CanceledError' || err.name === 'AbortError') return;
        // Non-critical decoration: fail silently.
      }
    };

    fetchTicker();

    return () => controller.abort();
  }, []);

  if (coins.length === 0) return null;

  const loop = [...coins, ...coins];

  return (
    <div className="mm-ticker" aria-label="Live market prices">
      <div className="mm-ticker__track">
        {loop.map((coin, index) => (
          <span className="mm-ticker__item" key={`${coin.id}-${index}`}>
            <img
              src={coin.image}
              alt=""
              width="18"
              height="18"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
            <span className="mm-ticker__symbol">{coin.symbol?.toUpperCase()}</span>
            <span className="mm-ticker__price">{formatPrice(coin.current_price)}</span>
            <span
              className={
                coin.price_change_percentage_24h >= 0
                  ? 'mm-ticker__change mm-up'
                  : 'mm-ticker__change mm-down'
              }
            >
              {formatChange(coin.price_change_percentage_24h)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
