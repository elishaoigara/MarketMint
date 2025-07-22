// src/components/About.js
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import profilePic from '../assets/elisha.jpeg';

function About() {
  return (
    <section style={{ backgroundColor: '#1e1e2f', padding: '3rem 1rem', color: '#fff' }}>
      <Container>
        <Row className="align-items-center mb-5">
          <Col md={6} className="text-center">
            <Image
              src={profilePic}
              alt="Elisha Oigara"
              roundedCircle
              style={{
                width: 180,
                height: 180,
                objectFit: 'cover',
                marginBottom: '1rem',
                border: '3px solid #fff',
              }}
            />
            <h2>Elisha Oigara</h2>
            <p className="text-muted" style={{ color: '#aaa' }}>Software Engineer</p>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <a
                href="https://github.com/elishaoigara"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light"
              >
                <FaGithub className="me-2" />
                GitHub
              </a>
              <a
                href="https://portfolio-site-elisha-oigaras-projects.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-info"
              >
                <FaArrowRight className="me-2" />
                View Portfolio
              </a>
            </div>
          </Col>
          <Col md={6}>
            <h4 className="mb-3">🚀 Mission</h4>
            <p style={{ fontSize: '1.1rem', color: '#ddd' }}>
              To empower users with accessible, real-time crypto data and web tools that fuel smarter decisions.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;
