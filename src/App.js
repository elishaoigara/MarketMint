// src/App.js
import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Sidebar from './components/Sidebar';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import PageTransition from './animations/PageTransition';
import ScrollProgress from './animations/ScrollProgress';

const Home = lazy(() => import('./components/Home'));
const Markets = lazy(() => import('./components/Markets'));
const Watchlist = lazy(() => import('./components/Watchlist'));
const News = lazy(() => import('./components/News'));
const About = lazy(() => import('./components/About'));

function RouteLoader() {
  return (
    <div className="text-center mt-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2">Loading...</p>
    </div>
  );
}

/** Every route gets the same enter/exit animation + its own loading state. */
const page = (element) => (
  <PageTransition>
    <Suspense fallback={<RouteLoader />}>{element}</Suspense>
  </PageTransition>
);

function AnimatedRoutes() {
  const location = useLocation();

  // Start each page at the top - the previous page may have been scrolled down.
  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={page(<Home />)} />
        <Route path="/markets" element={page(<Markets />)} />
        <Route path="/watchlist" element={page(<Watchlist />)} />
        <Route path="/news" element={page(<News />)} />
        <Route path="/about" element={page(<About />)} />
        <Route path="*" element={page(<NotFound />)} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    // reducedMotion="user" makes every Framer Motion animation respect the
    // visitor's `prefers-reduced-motion` setting automatically.
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <Router basename={process.env.PUBLIC_URL}>
          <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <ScrollProgress />
            <CustomNavbar />
            <div className="d-flex flex-grow-1">
              <Sidebar />
              <div className="flex-grow-1 p-3" style={{ minWidth: 0 }}>
                <AnimatedRoutes />
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </ErrorBoundary>
    </MotionConfig>
  );
}

export default App;
