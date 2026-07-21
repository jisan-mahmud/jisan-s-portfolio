import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { HashLink } from 'react-router-hash-link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaBriefcase, FaGraduationCap, FaCode, FaEnvelope, FaCogs } from 'react-icons/fa';

const navItems = [
  { id: 'about',        label: 'About',        icon: <FaUser size={15} />,          href: '/#about' },
  { id: 'experience',   label: 'Experience',   icon: <FaBriefcase size={15} />,     href: '/#experience' },
  { id: 'education',    label: 'Education',    icon: <FaGraduationCap size={15} />, href: '/#education' },
  { id: 'projects',     label: 'Projects',     icon: <FaCode size={15} />,          href: '/#projects' },
  { id: 'technologies', label: 'Technologies', icon: <FaCogs size={15} />,          href: '/#technologies' },
  { id: 'contact',      label: 'Contact',      icon: <FaEnvelope size={15} />,      href: '/#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const scrollTimeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) setActiveSection(hash);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        const sections = navItems.map(n => n.id);
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.getBoundingClientRect().top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }, 80);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* ── Top bar (before scroll) ── */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4"
          >
            <div className="max-w-3xl mx-auto flex items-center justify-between backdrop-blur-md bg-gray-900/70 border border-gray-700/50 rounded-2xl px-5 py-3 shadow-xl">
              {/* Logo */}
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-lg font-bold text-green-400 hover:text-green-300 transition-colors"
                style={{ fontFamily: '"Caveat", cursive' }}
              >
                Jisan Mahmud
              </Link>

              {/* Nav links */}
              <nav>
                <ul className="flex items-center gap-1" style={{ fontFamily: '"Poppins", sans-serif' }}>
                  {navItems.map(item => (
                    <HashLink key={item.id} smooth to={item.href}>
                      <li className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors duration-200
                        ${activeSection === item.id
                          ? 'text-green-400 bg-green-500/10'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        }`}
                      >
                        <span className="hidden sm:block">{item.icon}</span>
                        <span className="hidden md:inline">{item.label}</span>
                        <span className="sm:hidden">{item.icon}</span>
                        {activeSection === item.id && (
                          <motion.div
                            layoutId="topbar-indicator"
                            className="absolute inset-0 rounded-lg bg-green-500/10 border border-green-500/20"
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                      </li>
                    </HashLink>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ── Floating dock (after scroll) ── */}
      <AnimatePresence>
        {isScrolled && (
          <motion.nav
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-1 backdrop-blur-md bg-gray-900/80 border border-gray-700/50 rounded-2xl px-3 py-2.5 shadow-2xl">
              {navItems.map(item => (
                <HashLink key={item.id} smooth to={item.href}>
                  <div className="relative group">
                    <motion.div
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className={`relative flex items-center justify-center w-9 h-9 rounded-xl cursor-pointer transition-colors duration-200
                        ${activeSection === item.id
                          ? 'text-green-400 bg-green-500/15 border border-green-500/30'
                          : 'text-gray-500 hover:text-gray-200 hover:bg-gray-700/50'
                        }`}
                    >
                      {item.icon}
                      {/* active dot */}
                      {activeSection === item.id && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-400" />
                      )}
                    </motion.div>

                    {/* tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150">
                      <div className="bg-gray-800 border border-gray-700/60 text-white text-xs px-2.5 py-1 rounded-lg whitespace-nowrap shadow-lg">
                        {item.label}
                      </div>
                      <div className="w-1.5 h-1.5 bg-gray-800 border-r border-b border-gray-700/60 rotate-45 mx-auto -mt-1" />
                    </div>
                  </div>
                </HashLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
