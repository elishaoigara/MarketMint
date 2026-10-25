/**
 * Shared Framer Motion variants, easings and helpers.
 *
 * Everything animation-related lives in `src/animations` so components stay
 * focused on markup. Global user preference (`prefers-reduced-motion`) is
 * handled once at the root with <MotionConfig reducedMotion="user" />, which
 * Framer Motion already applies to every motion component.
 */

// A slightly "expensive" ease-out that feels snappy but never abrupt.
export const EASE_OUT = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

export const SPRING = { type: 'spring', stiffness: 260, damping: 22, mass: 0.9 };
export const SPRING_SOFT = { type: 'spring', stiffness: 140, damping: 20, mass: 1 };
export const SPRING_POP = { type: 'spring', stiffness: 500, damping: 15, mass: 0.6 };

/** Route enter/exit used by <PageTransition />. */
export const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE_OUT, staggerChildren: 0.06, delayChildren: 0.04 },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

/**
 * Hero / headline entrance (mount triggered, not scroll triggered).
 *
 * Note: a `transition` defined inside a variant wins over the component's
 * `transition` prop, so delays have to live in the variant itself - hence the
 * factory instead of a shared constant.
 */
export const heroVariants = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: EASE_OUT } },
});

/**
 * Parent that reveals its children one after another when scrolled into view.
 * A factory for the same reason as `heroVariants`.
 */
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.06) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Child of a `staggerContainer`. */
export const staggerItem = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

/** Single element reveal (fade + rise). */
export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

/** Card grid item: fades, rises and scales in, then lifts on hover. */
export const cardItem = (index = 0, stagger = 0.045) => ({
  initial: { opacity: 0, y: 28, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, delay: Math.min(index * stagger, 0.7), ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.96,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
});

/**
 * Named hover variant. Using a variant label (instead of an inline object) lets
 * child motion components react to the same hover - e.g. an image that zooms
 * while its card lifts.
 */
export const hoverLift = {
  y: -8,
  transition: { type: 'spring', stiffness: 300, damping: 22 },
};

/** Gentle continuous float, used by decorative icons/illustrations. */
export const floatLoop = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};
