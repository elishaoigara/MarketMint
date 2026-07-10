import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';

function NotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Alert variant="warning" className="text-center p-5" style={{ maxWidth: '500px' }}>
        <Alert.Heading className="display-4 mb-4">404</Alert.Heading>
        <h4 className="mb-3">Page Not Found</h4>
        <p className="mb-4">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button as={Link} to="/" variant="outline-warning">
          <FaHome className="me-2" />
          Back to Home
        </Button>
      </Alert>
    </div>
  );
}

export default NotFound;
