// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaWallet, FaStar } from 'react-icons/fa';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to <span className="brand">MarketMint</span></h1>
        <p className="home-subtitle">
          Track your favorite cryptocurrencies, monitor real-time prices, and manage your watchlist with ease.
        </p>
        <Link to="/markets" className="explore-button">
          <FaChartLine className="icon" /> Explore Markets
        </Link>
      </div>

      <div className="features">
        <div className="feature-card">
          <FaChartLine className="feature-icon" />
          <h5>Live Market Data</h5>
          <p>Stay up-to-date with real-time cryptocurrency prices.</p>
        </div>
        <div className="feature-card">
          <FaStar className="feature-icon" />
          <h5>Watchlist</h5>
          <p>Save your favorite coins and monitor their performance.</p>
        </div>
        <div className="feature-card">
          <FaWallet className="feature-icon" />
          <h5>User-Friendly</h5>
          <p>Intuitive and responsive design across all devices.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
