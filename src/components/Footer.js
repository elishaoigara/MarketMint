// src/components/Footer.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaGithub, FaTwitter, FaArrowUp } from 'react-icons/fa';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row className="text-center text-md-left align-items-center">
          <Col md={4} className="mb-3 mb-md-0">
            <h6>&copy; {new Date().getFullYear()} MarketMint</h6>
            <p className="mb-0">Built by Elisha Oigara</p>
          </Col>

          <Col md={4} className="mb-3 mb-md-0 d-flex justify-content-center gap-3">
            <a href="https://github.com/elishaoigara" target="_blank" rel="noopener noreferrer" className="text-light">
              <FaGithub size={24} />
            </a>
            <a href="https://x.com/lambertElisha3" target="_blank" rel="noopener noreferrer" className="text-light">
              <FaTwitter size={24} />
            </a>
          </Col>

          <Col md={4} className="d-flex justify-content-center justify-content-md-end">
            <Button variant="outline-light" size="sm" onClick={scrollToTop}>
              <FaArrowUp /> Back to Top
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
