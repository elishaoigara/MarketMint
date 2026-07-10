import React, { useState } from 'react';
import profilePic from '../assets/elisha.jpeg';

function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        padding: '3rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <h2>About MarketMint</h2>
      <p className="text-muted mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
        MarketMint is your real-time cryptocurrency tracker. Stay updated with
        live prices, market trends, and news – all in one sleek dashboard.
      </p>
      <div
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          overflow: 'hidden',
          margin: '2rem auto',
          border: '4px solid #0f9d58',
        }}
      >
        <img
          src={imgError ? 'https://via.placeholder.com/180/0f9d58/ffffff?text=ME' : profilePic}
          alt="Elisha Oigara"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={() => setImgError(true)}
        />
      </div>
      <h4>Elisha Oigara</h4>
      <p className="text-muted">Full Stack Developer & Crypto Enthusiast</p>
      <p style={{ maxWidth: '500px', margin: '0 auto' }}>
        Passionate about building intuitive tools that make cryptocurrency
        accessible to everyone. MarketMint combines real-time data with a
        clean, user-friendly interface.
      </p>
      <div className="mt-4">
        <a
          href="https://github.com/elishaoigara"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary me-2"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/elishaoigara"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default About;
