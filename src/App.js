// src/App.js
import React, { lazy, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';

const Home = lazy(() => import('./components/Home'));
const Markets = lazy(() => import('./components/Markets'));
const Watchlist = lazy(() => import('./components/Watchlist'));
const News = lazy(() => import('./components/News'));
const About = lazy(() => import('./components/About'));

function App() {
  return (
    <ErrorBoundary>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
          <CustomNavbar />
          <div className="d-flex flex-grow-1" style={{ minHeight: 0, overflow: 'auto' }}>
            <Sidebar />
            <div className="flex-grow-1 p-3">
              <Suspense
                fallback={
                  <div className="text-center mt-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Loading...</p>
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/markets" element={<Markets />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
