// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css'; // Optional for custom styling

function CustomNavbar({ isLoggedIn, onLogin, onLogout }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-success">
          MarketMint
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-3">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  <FaUser className="me-1" /> Profile
                </Nav.Link>
                <Nav.Link onClick={onLogout} style={{ cursor: 'pointer' }}>
                  <FaSignOutAlt className="me-1" /> Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={onLogin} style={{ cursor: 'pointer' }}>
                <FaSignInAlt className="me-1" /> Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
