// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom doesn't implement IntersectionObserver, which Framer Motion needs for
// `whileInView` (the scroll-reveal animations). This stub reports every element
// as visible on the next tick so revealed content is rendered in tests.
if (typeof global.IntersectionObserver === 'undefined') {
  class IntersectionObserverStub {
    constructor(callback) {
      this.callback = callback;
    }

    observe(target) {
      // isIntersecting: true => reveal animations play immediately.
      this.callback([{ target, isIntersecting: true, intersectionRatio: 1 }], this);
    }

    unobserve() {}

    disconnect() {}

    takeRecords() {
      return [];
    }
  }

  global.IntersectionObserver = IntersectionObserverStub;
  global.window.IntersectionObserver = IntersectionObserverStub;
}
