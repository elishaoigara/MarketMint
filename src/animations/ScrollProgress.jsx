/**
 * <ScrollProgress /> - a slim animated progress bar pinned to the top of the
 * window that tracks how far the page has been scrolled.
 */
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      className="mm-scroll-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
