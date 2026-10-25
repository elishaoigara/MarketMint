// src/components/Footer.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaArrowUp } from 'react-icons/fa';
import { SPRING_POP } from '../animations/variants';

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
            {[
              { href: 'https://github.com/elishaoigara', Icon: FaGithub, label: 'GitHub' },
              { href: 'https://x.com/lambertElisha3', Icon: FaTwitter, label: 'X' },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light d-inline-flex"
                aria-label={label}
                whileHover={{ y: -5, scale: 1.25, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
                transition={SPRING_POP}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </Col>

          <Col md={4} className="d-flex justify-content-center justify-content-md-end">
            <motion.span
              className="d-inline-block"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.94 }}
              transition={SPRING_POP}
            >
              <Button variant="outline-light" size="sm" onClick={scrollToTop}>
                <motion.span
                  className="d-inline-flex"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FaArrowUp />
                </motion.span>
                <span className="ms-1">Back to Top</span>
              </Button>
            </motion.span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
