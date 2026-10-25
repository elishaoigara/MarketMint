import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBars, FaTimes, FaChartLine, FaStar, FaNewspaper, FaInfoCircle } from 'react-icons/fa';
import { SPRING_SOFT } from '../animations/variants';
import './Sidebar.css';

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
      <motion.button
        className="btn btn-dark sidebar-toggle d-md-none"
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={isOpen}
        initial={false}
        animate={{ left: isOpen ? 220 : 10 }}
        transition={SPRING_SOFT}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? 'close' : 'open'}
            className="d-inline-flex"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <motion.aside
        className="sidebar d-flex flex-column"
        initial={false}
        animate={{ width: isOpen ? 220 : 0, opacity: isOpen ? 1 : 0 }}
        transition={SPRING_SOFT}
        style={{
          background: '#1e293b',
          minHeight: '100%',
          overflow: 'hidden',
          flex: '0 0 auto',
        }}
        aria-hidden={!isOpen}
      >
        <nav className="d-flex flex-column gap-2 mt-4 px-3">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `mm-sidebar-link d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none ${
                    isActive ? 'text-white fw-bold' : 'text-white-50'
                  }`
                }
                onClick={() => {
                  if (window.innerWidth <= 768) {
                    setIsOpen(false);
                  }
                }}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        className="mm-sidebar-pill"
                        layoutId="sidebar-active-pill"
                        transition={SPRING_SOFT}
                      />
                    )}
                    <motion.span
                      className="mm-sidebar-content"
                      animate={{ x: isOpen ? 0 : -12, opacity: isOpen ? 1 : 0 }}
                      transition={{ ...SPRING_SOFT, delay: isOpen ? index * 0.05 : 0 }}
                      whileHover={{ x: isOpen ? 4 : 0 }}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </motion.span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
}

export default Sidebar;
