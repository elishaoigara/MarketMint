import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { SPRING_POP } from '../animations/variants';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '60vh' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="w-100 d-flex justify-content-center"
          >
            <Alert
              variant="danger"
              className="text-center p-4"
              style={{ maxWidth: '500px', width: '100%' }}
            >
              <Alert.Heading>Something went wrong</Alert.Heading>
              <p className="mb-3">An unexpected error occurred. Please try refreshing the page.</p>
              <motion.span
                className="d-inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={SPRING_POP}
              >
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    this.setState({ hasError: false, error: null });
                    window.location.href = '/';
                  }}
                >
                  Go to Home
                </Button>
              </motion.span>
            </Alert>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
