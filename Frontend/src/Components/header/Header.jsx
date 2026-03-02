import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { HashLink } from 'react-router-hash-link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaBriefcase, FaGraduationCap, FaCode, FaEnvelope, FaCogs } from 'react-icons/fa';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const scrollTimeoutRef = React.useRef(null);
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'contact') {
      setActiveSection('contact');
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const sections = ['about', 'experience', 'education', 'projects', 'technologies', 'contact'];
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const element = document.getElementById(sections[i]);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 200) {
              setActiveSection(sections[i]);
              break;
            }
          }
        }
      }, 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {!isScrolled && (
          <motion.header 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 py-4"
          >
            <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 shadow-2xl">
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-lg sm:text-xl md:text-2xl text-green-500 font-bold hover:text-green-400 transition-colors"
                  style={{ fontFamily: '"Caveat", cursive' }}
                >
                  Jisan Mahmud
                </Link>

                <nav>
                  <ul className="flex gap-3 sm:gap-6 text-xs sm:text-sm md:text-base" style={{ fontFamily: '"Poppins", sans-serif' }}>
                    <HashLink smooth to="/#about">
                      <motion.li 
                        whileHover={{ scale: 1.1, color: '#22c55e' }} 
                        className="cursor-pointer font-medium transition-colors flex items-center gap-1 sm:gap-2"
                      >
                        <FaUser className="text-sm sm:text-xs" />
                        <span className="hidden sm:inline">About</span>
                      </motion.li>
                    </HashLink>
                    <HashLink smooth to="/#experience">
                      <motion.li 
                        whileHover={{ scale: 1.1, color: '#22c55e' }} 
                        className="cursor-pointer font-medium transition-colors flex items-center gap-1 sm:gap-2"
                      >
                        <FaBriefcase className="text-sm sm:text-xs" />
                        <span className="hidden sm:inline">Experience</span>
                      </motion.li>
                    </HashLink>
                    <HashLink smooth to="/#education">
                      <motion.li 
                        whileHover={{ scale: 1.1, color: '#22c55e' }} 
                        className="cursor-pointer font-medium transition-colors flex items-center gap-1 sm:gap-2"
                      >
                        <FaGraduationCap className="text-sm sm:text-xs" />
                        <span className="hidden sm:inline">Education</span>
                      </motion.li>
                    </HashLink>
                    <HashLink smooth to="/#projects">
                      <motion.li 
                        whileHover={{ scale: 1.1, color: '#22c55e' }} 
                        className="cursor-pointer font-medium transition-colors flex items-center gap-1 sm:gap-2"
                      >
                        <FaCode className="text-sm sm:text-xs" />
                        <span className="hidden sm:inline">Projects</span>
                      </motion.li>
                    </HashLink>
                    <HashLink smooth to="/#contact">
                      <motion.li 
                        whileHover={{ scale: 1.1, color: '#22c55e' }} 
                        className="cursor-pointer font-medium transition-colors flex items-center gap-1 sm:gap-2"
                      >
                        <FaEnvelope className="text-sm sm:text-xs" />
                        <span className="hidden sm:inline">Contact</span>
                      </motion.li>
                    </HashLink>
                  </ul>
                </nav>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isScrolled && (
          <motion.aside
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:bottom-auto sm:left-4 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 z-50"
          >
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl py-3 px-4 sm:py-6 sm:px-3 shadow-2xl">
              <nav>
                <ul className="flex flex-row sm:flex-col gap-4 sm:gap-3" style={{ fontFamily: '"Poppins", sans-serif' }}>
                  <HashLink smooth to="/#about">
                    <div className="relative group">
                      <motion.li 
                        whileHover={{ scale: 1.2, y: -5 }} 
                        className={`cursor-pointer transition-colors ${
                          activeSection === 'about' ? 'text-green-500' : ''
                        }`}
                      >
                        <FaUser className="text-lg sm:text-xl" />
                      </motion.li>
                      <div className="hidden sm:block absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                        <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
                          About
                        </div>
                      </div>
                    </div>
                  </HashLink>
                  <HashLink smooth to="/#experience">
                    <div className="relative group">
                      <motion.li 
                        whileHover={{ scale: 1.2, y: -5 }} 
                        className={`cursor-pointer transition-colors ${
                          activeSection === 'experience' ? 'text-green-500' : ''
                        }`}
                      >
                        <FaBriefcase className="text-lg sm:text-xl" />
                      </motion.li>
                      <div className="hidden sm:block absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                        <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
                          Experience
                        </div>
                      </div>
                    </div>
                  </HashLink>
                  <HashLink smooth to="/#education">
                    <div className="relative group">
                      <motion.li 
                        whileHover={{ scale: 1.2, y: -5 }} 
                        className={`cursor-pointer transition-colors ${
                          activeSection === 'education' ? 'text-green-500' : ''
                        }`}
                      >
                        <FaGraduationCap className="text-lg sm:text-xl" />
                      </motion.li>
                      <div className="hidden sm:block absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                        <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
                          Education
                        </div>
                      </div>
                    </div>
                  </HashLink>
                  <HashLink smooth to="/#projects">
                    <div className="relative group">
                      <motion.li 
                        whileHover={{ scale: 1.2, y: -5 }} 
                        className={`cursor-pointer transition-colors ${
                          activeSection === 'projects' ? 'text-green-500' : ''
                        }`}
                      >
                        <FaCode className="text-lg sm:text-xl" />
                      </motion.li>
                      <div className="hidden sm:block absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                        <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
                          Projects
                        </div>
                      </div>
                    </div>
                  </HashLink>
                  <HashLink smooth to="/#technologies">
                    <div className="relative group">
                      <motion.li 
                        whileHover={{ scale: 1.2, y: -5 }} 
                        className={`cursor-pointer transition-colors ${
                          activeSection === 'technologies' ? 'text-green-500' : ''
                        }`}
                      >
                        <FaCogs className="text-lg sm:text-xl" />
                      </motion.li>
                      <div className="hidden sm:block absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                        <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
                          Technologies
                        </div>
                      </div>
                    </div>
                  </HashLink>
                  <HashLink smooth to="/#contact">
                    <div className="relative group">
                      <motion.li 
                        whileHover={{ scale: 1.2, y: -5 }} 
                        className={`cursor-pointer transition-colors ${
                          activeSection === 'contact' ? 'text-green-500' : ''
                        }`}
                      >
                        <FaEnvelope className="text-lg sm:text-xl" />
                      </motion.li>
                      <div className="hidden sm:block absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                        <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
                          Contact
                        </div>
                      </div>
                    </div>
                  </HashLink>
                </ul>
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
