/**
 * <AnimatedNumber /> - counts smoothly from the previous value to the next one.
 *
 * Prices update constantly ( Markets on sort change, Watchlist every 30s ), so
 * the number tweening up/down makes those updates feel alive instead of
 * popping. The tween writes to the DOM through a ref rather than React state so
 * a grid of 50 cards doesn't re-render on every frame.
 */
import React, { useEffect, useRef } from 'react';
import { animate, useReducedMotion } from 'framer-motion';

const defaultFormat = (v) => Number(v).toLocaleString(undefined, { maximumFractionDigits: 2 });

export default function AnimatedNumber({
  value,
  format = defaultFormat,
  prefix = '',
  suffix = '',
  duration = 0.9,
  flash = false,
  className = '',
  style,
}) {
  const nodeRef = useRef(null);
  const previous = useRef(value);
  // Keep the formatter in a ref so an inline arrow function at the call site
  // doesn't re-trigger the animation effect on every render.
  const formatRef = useRef(format);
  formatRef.current = format;

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    const to = Number(value);
    const from = Number(previous.current);
    previous.current = value;

    const render = (v) => {
      const text =
        v === null || v === undefined || Number.isNaN(Number(v))
          ? 'N/A'
          : `${prefix}${formatRef.current(Number(v))}${suffix}`;
      if (node) node.textContent = text;
      return text;
    };

    const validTo = !Number.isNaN(to);
    const validFrom = !Number.isNaN(from);

    // Flash green/red so a price tick is noticeable even when it is small.
    if (flash && node && validTo && validFrom && to !== from) {
      node.classList.remove('mm-flash-up', 'mm-flash-down');
      // Reading offsetWidth restarts the CSS animation when the class flips.
      void node.offsetWidth;
      node.classList.add(to > from ? 'mm-flash-up' : 'mm-flash-down');
      const timer = setTimeout(() => {
        node.classList.remove('mm-flash-up', 'mm-flash-down');
      }, 900);
      return () => clearTimeout(timer);
    }

    if (reduceMotion || !validTo || !validFrom || to === from) {
      render(validTo ? to : value);
      return undefined;
    }

    if (!node) return undefined;

    const controls = animate(from, to, {
      duration,
      ease: 'easeOut',
      onUpdate: render,
      onComplete: () => render(to),
    });

    return () => controls.stop();
  }, [value, duration, flash, reduceMotion, prefix, suffix]);

  const initial =
    value === null || value === undefined || Number.isNaN(Number(value))
      ? 'N/A'
      : `${prefix}${format(Number(value))}${suffix}`;

  return (
    <span ref={nodeRef} className={className} style={style}>
      {initial}
    </span>
  );
}
