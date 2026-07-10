import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaChartLine, FaStar, FaNewspaper, FaInfoCircle } from 'react-icons/fa';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(() => window.innerWidth > 768);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const navItems = [
    { to: '/markets', icon: FaChartLine, label: 'Markets' },
    { to: '/watchlist', icon: FaStar, label: 'Watchlist' },
    { to: '/news', icon: FaNewspaper, label: 'News' },
    { to: '/about', icon: FaInfoCircle, label: 'About' },
  ];

  return (
    <>
      <button
        className="btn btn-dark sidebar-toggle d-md-none position-fixed"
        style={{ top: '70px', left: isOpen ? '220px' : '10px', zIndex: 1050, transition: 'left 0.3s' }}
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={isOpen}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div
        className={`sidebar d-flex flex-column p-3 ${isOpen ? 'open' : 'closed'}`}
        style={{
          width: isOpen ? '220px' : '0',
          minWidth: isOpen ? '220px' : '0',
          overflow: 'hidden',
          transition: 'width 0.3s, min-width 0.3s',
          background: '#1e293b',
          minHeight: '100%',
        }}
      >
        <nav className="d-flex flex-column gap-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none ${
                    isActive
                      ? 'text-white fw-bold'
                      : 'text-white-50'
                  }`
                }
                style={({ isActive }) => ({
                  background: isActive ? '#0f9d58' : 'transparent',
                  transition: 'background 0.2s',
                })}
                onClick={() => {
                  if (window.innerWidth <= 768) {
                    setIsOpen(false);
                  }
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
