import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaCoins } from 'react-icons/fa';
import './Navbar.css';

function CustomNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <FaCoins className="me-2" size={28} />
          MarketMint
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/markets" end>
              Markets
            </Nav.Link>
            <Nav.Link as={NavLink} to="/watchlist" end>
              Watchlist
            </Nav.Link>
            <Nav.Link as={NavLink} to="/news" end>
              News
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" end>
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
