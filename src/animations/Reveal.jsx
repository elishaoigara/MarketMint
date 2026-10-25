/**
 * Scroll-triggered reveal helpers.
 *
 * `Reveal` animates a single block into view; `RevealGroup` staggers its
 * children. Both use Framer Motion's `whileInView`, which is powered by
 * IntersectionObserver and falls back to "always visible" where that API is
 * missing (jsdom, very old browsers).
 */
import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, EASE_OUT } from './variants';

const defaultViewport = { once: true, amount: 0.2 };

export function Reveal({ children, delay = 0, y = 24, className, style, as = 'div', ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Wraps a list of items and reveals them one by one.
 * Children must be motion components (or use `as={motion.div}`) and should be
 * direct children so the stagger order matches the visual order.
 */
export function RevealGroup({
  children,
  className,
  style,
  as = 'div',
  amount = 0.15,
  stagger = 0.08,
  delayChildren = 0.06,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Item inside a <RevealGroup />. */
export function RevealItem({ children, className, style, as = 'div', ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag className={className} style={style} variants={staggerItem} {...rest}>
      {children}
    </MotionTag>
  );
}
