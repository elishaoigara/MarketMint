/**
 * <AmbientBackground /> - slowly drifting colour orbs plus a faint grid.
 *
 * Purely decorative (aria-hidden, pointer-events: none). The movement itself is
 * a CSS keyframe animation so it runs on the compositor and costs nothing on
 * the React side; it is disabled under `prefers-reduced-motion`.
 */
import React from 'react';

export default function AmbientBackground({ variant = 'dark', className = '', orbs = 3 }) {
  return (
    <div className={`mm-aurora mm-aurora--${variant} ${className}`.trim()} aria-hidden="true">
      {Array.from({ length: orbs }).map((_, i) => (
        <span key={i} className={`mm-orb mm-orb--${i + 1}`} />
      ))}
      <span className="mm-aurora__grid" />
    </div>
  );
}
