// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChartLine, FaWallet, FaStar, FaArrowRight } from 'react-icons/fa';
import MarketTicker from './MarketTicker';
import AmbientBackground from '../animations/AmbientBackground';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';
import { heroVariants, floatLoop } from '../animations/variants';
import './Home.css';

const features = [
  {
    icon: FaChartLine,
    title: 'Live Market Data',
    copy: 'Stay up-to-date with real-time cryptocurrency prices.',
  },
  {
    icon: FaStar,
    title: 'Watchlist',
    copy: 'Save your favorite coins and monitor their performance.',
  },
  {
    icon: FaWallet,
    title: 'User-Friendly',
    copy: 'Intuitive and responsive design across all devices.',
  },
];

function Home() {
  return (
    <div className="home-container">
      <AmbientBackground variant="dark" />

      <div className="home-content">
        <motion.h1
          className="home-title"
          variants={heroVariants(0)}
          initial="hidden"
          animate="show"
        >
          Welcome to <span className="brand">MarketMint</span>
        </motion.h1>

        <motion.p
          className="home-subtitle"
          variants={heroVariants(0.12)}
          initial="hidden"
          animate="show"
        >
          Track your favorite cryptocurrencies, monitor real-time prices, and manage your watchlist
          with ease.
        </motion.p>

        <motion.div variants={heroVariants(0.24)} initial="hidden" animate="show">
          <motion.span
            className="d-inline-block"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            <Link to="/markets" className="explore-button mm-pulse">
              <FaChartLine className="icon" /> Explore Markets
              <motion.span
                className="explore-button__arrow"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <FaArrowRight />
              </motion.span>
            </Link>
          </motion.span>
        </motion.div>

        <Reveal className="home-ticker" delay={0.15}>
          <MarketTicker />
        </Reveal>
      </div>

      <RevealGroup className="features" amount={0.1}>
        {features.map(({ icon: Icon, title, copy }) => (
          <RevealItem
            className="feature-card"
            key={title}
            whileHover={{ y: -10, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.span className="feature-icon" variants={floatLoop} animate="animate">
              <Icon />
            </motion.span>
            <h5>{title}</h5>
            <p>{copy}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

export default Home;
