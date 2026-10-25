/**
 * Shimmering placeholders shown while data loads - a step up from a bare
 * spinner because the layout is already there when the content arrives.
 */
import React from 'react';

export function SkeletonCard({ withImage = true, lines = 3 }) {
  return (
    <div className="mm-skeleton-card" aria-hidden="true">
      <div className="d-flex align-items-center mb-3">
        {withImage && <div className="mm-skeleton mm-skeleton--avatar" />}
        <div className="flex-grow-1">
          <div className="mm-skeleton mm-skeleton--title" />
          <div className="mm-skeleton mm-skeleton--subtitle" />
        </div>
      </div>
      {Array.from({ length: lines }).map((_, i) => (
        <div className="d-flex justify-content-between mb-2" key={i}>
          <div className="mm-skeleton mm-skeleton--label" />
          <div className="mm-skeleton mm-skeleton--value" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonGrid({ count = 9, withImage = true, lines = 3 }) {
  return (
    <div className="row" role="status" aria-busy="true" aria-live="polite">
      <span className="visually-hidden">Loading…</span>
      {Array.from({ length: count }).map((_, i) => (
        <div className="col-12 col-md-6 col-lg-4 mb-4" key={i}>
          <SkeletonCard withImage={withImage} lines={lines} />
        </div>
      ))}
    </div>
  );
}

export default SkeletonGrid;
