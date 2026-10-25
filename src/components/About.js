import React, { useState } from 'react';
import { motion } from 'framer-motion';
import profilePic from '../assets/elisha.jpeg';
import { staggerContainer, staggerItem, SPRING_POP } from '../animations/variants';
import './About.css';

function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="about-container"
      variants={staggerContainer()}
      initial="hidden"
      animate="show"
    >
      <motion.h2 variants={staggerItem}>About MarketMint</motion.h2>

      <motion.p
        className="text-muted mb-4 about-lead"
        variants={staggerItem}
      >
        MarketMint is your real-time cryptocurrency tracker. Stay updated with
        live prices, market trends, and news – all in one sleek dashboard.
      </motion.p>

      <motion.div className="about-avatar-wrap" variants={staggerItem}>
        <motion.span
          className="about-avatar-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        />
        <motion.div
          className="about-avatar"
          whileHover={{ scale: 1.06, rotate: 2 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          <img
            src={
              imgError
                ? 'https://via.placeholder.com/180/0f9d58/ffffff?text=ME'
                : profilePic
            }
            alt="Elisha Oigara"
            onError={() => setImgError(true)}
          />
        </motion.div>
      </motion.div>

      <motion.h4 variants={staggerItem}>Elisha Oigara</motion.h4>
      <motion.p className="text-muted" variants={staggerItem}>
        Full Stack Developer &amp; Crypto Enthusiast
      </motion.p>
      <motion.p className="about-bio" variants={staggerItem}>
        Passionate about building intuitive tools that make cryptocurrency
        accessible to everyone. MarketMint combines real-time data with a
        clean, user-friendly interface.
      </motion.p>

      <motion.div className="mt-4 d-flex justify-content-center gap-2" variants={staggerItem}>
        <motion.a
          href="https://github.com/elishaoigara"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary"
          whileHover={{ y: -3, scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          transition={SPRING_POP}
        >
          GitHub
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/elishaoigara"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary"
          whileHover={{ y: -3, scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          transition={SPRING_POP}
        >
          LinkedIn
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export default About;
