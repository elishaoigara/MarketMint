/**
 * <PageTransition /> - fade + rise applied to every route change.
 * Used inside <AnimatePresence mode="wait"> in App.js.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from './variants';

export default function PageTransition({ children, className }) {
  return (
    <motion.div
      className={className}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
