import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCoins } from 'react-icons/fa';
import './Navbar.css';

const navLinks = [
  { to: '/markets', label: 'Markets' },
  { to: '/watchlist', label: 'Watchlist' },
  { to: '/news', label: 'News' },
  { to: '/about', label: 'About' },
];

function CustomNavbar() {
  const [scrolled, setScrolled] = useState(false);

  // Shrink the bar once the page starts scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className={`mm-navbar ${scrolled ? 'mm-navbar--scrolled' : ''}`}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <motion.span
            className="d-inline-flex"
            animate={{ y: [0, -4, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.25, rotate: 15 }}
          >
            <FaCoins className="me-2" size={28} />
          </motion.span>
          <motion.span
            className="mm-brand-text"
            whileHover={{ letterSpacing: '0.08em' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            MarketMint
          </motion.span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navLinks.map(({ to, label }) => (
              <Nav.Link
                key={to}
                as={NavLink}
                to={to}
                end
                className={({ isActive }) => `mm-nav-item ${isActive ? 'active' : ''}`}
              >
                {({ isActive }) => (
                  <>
                    <motion.span
                      className="mm-nav-label"
                      whileHover={{ y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    >
                      {label}
                    </motion.span>
                    {isActive && (
                      // layoutId lets the underline slide between links.
                      <motion.span
                        className="mm-nav-underline"
                        layoutId="navbar-active-underline"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
