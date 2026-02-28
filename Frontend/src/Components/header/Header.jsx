import React from 'react';
import { Link } from 'react-router';
import { HashLink } from 'react-router-hash-link';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 py-4"
    >
      <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-6 py-3 shadow-2xl">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl sm:text-2xl text-green-500 font-bold hover:text-green-400 transition-colors"
            style={{ fontFamily: '"Caveat", cursive' }}
          >
            Jisan Mahmud
          </Link>

          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ul className="flex gap-6 text-sm sm:text-base" style={{ fontFamily: '"Poppins", sans-serif' }}>
              <HashLink smooth to="/#about">
                <motion.li 
                  whileHover={{ scale: 1.1, color: '#22c55e' }} 
                  className="cursor-pointer font-medium transition-colors"
                >
                  About
                </motion.li>
              </HashLink>
              <HashLink smooth to="/#experience">
                <motion.li 
                  whileHover={{ scale: 1.1, color: '#22c55e' }} 
                  className="cursor-pointer font-medium transition-colors"
                >
                  Experience
                </motion.li>
              </HashLink>
              <HashLink smooth to="/#projects">
                <motion.li 
                  whileHover={{ scale: 1.1, color: '#22c55e' }} 
                  className="cursor-pointer font-medium transition-colors"
                >
                  Projects
                </motion.li>
              </HashLink>
              <HashLink smooth to="/#contact">
                <motion.li 
                  whileHover={{ scale: 1.1, color: '#22c55e' }} 
                  className="cursor-pointer font-medium transition-colors"
                >
                  Contact
                </motion.li>
              </HashLink>
            </ul>
          </motion.nav>
        </div>
      </div>
    </motion.header>
  );
}
