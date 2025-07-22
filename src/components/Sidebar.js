import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaMoneyBillWave, FaChartLine, FaBars, FaUser, FaNewspaper } from 'react-icons/fa';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className="bg-dark text-white d-flex flex-column p-3"
      style={{
        width: isOpen ? '220px' : '60px',
        transition: 'width 0.3s',
        minHeight: '100vh',
      }}
    >
      <div className="mb-4" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
        <FaBars />
      </div>

      <NavLink to="/" className="text-white mb-3 text-decoration-none d-flex align-items-center">
        <FaHome className="me-2" /> {isOpen && 'Home'}
      </NavLink>

      <NavLink to="/markets" className="text-white mb-3 text-decoration-none d-flex align-items-center">
        <FaChartLine className="me-2" /> {isOpen && 'Markets'}
      </NavLink>

      <NavLink to="/watchlist" className="text-white mb-3 text-decoration-none d-flex align-items-center">
        <FaMoneyBillWave className="me-2" /> {isOpen && 'Watchlist'}
      </NavLink>

      <NavLink to="/news" className="text-white mb-3 text-decoration-none d-flex align-items-center">
        <FaNewspaper className="me-2" /> {isOpen && 'News'}
      </NavLink>

      <NavLink to="/about" className="text-white mb-3 text-decoration-none d-flex align-items-center">
        <FaUser className="me-2" /> {isOpen && 'About'}
      </NavLink>
    </div>
  );
}

export default Sidebar;
