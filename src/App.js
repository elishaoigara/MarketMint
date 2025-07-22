// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Watchlist from './components/Watchlist';
import Markets from './components/Markets';
import News from './components/News'; // ✅ Import the News page

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar */}
        <CustomNavbar />

        {/* Main Content Area with Sidebar */}
        <div className="d-flex flex-grow-1">
          {/* Sidebar */}
          <Sidebar />

          {/* Page Content */}
          <div className="flex-grow-1 p-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/news" element={<News />} /> {/* ✅ Add News route */}
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
