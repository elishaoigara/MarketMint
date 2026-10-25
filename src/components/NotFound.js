import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import { SPRING_POP, EASE_OUT } from '../animations/variants';

function NotFound() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '60vh' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className="w-100 d-flex justify-content-center"
      >
        <Alert
          variant="warning"
          className="text-center p-5"
          style={{ maxWidth: '500px', width: '100%' }}
        >
          <motion.div
            initial={{ scale: 0.4, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ ...SPRING_POP, delay: 0.1 }}
          >
            <Alert.Heading className="display-4 mb-4">404</Alert.Heading>
          </motion.div>
          <motion.h4
            className="mb-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.4, ease: EASE_OUT }}
          >
            Page Not Found
          </motion.h4>
          <motion.p
            className="mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: EASE_OUT }}
          >
            The page you are looking for does not exist or has been moved.
          </motion.p>
          <motion.span
            className="d-inline-block"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={SPRING_POP}
          >
            <Button as={Link} to="/" variant="outline-warning" role="link">
              <FaHome className="me-2" />
              Back to Home
            </Button>
          </motion.span>
        </Alert>
      </motion.div>
    </div>
  );
}

export default NotFound;
