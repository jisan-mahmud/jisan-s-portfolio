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
      className="w-full px-4 sm:px-6"
    >
      <div className="max-w-3xl mx-auto py-4 flex items-center justify-between gap-4 sm:gap-0">
        <Link
          className="text-lg sm:text-3xl text-green-600 font-bold"
          style={{ fontFamily: '"Caveat", cursive' }}
        >
          Jisan Mahmud
        </Link>

        <nav>
          <motion.ul 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 text-sm sm:text-base"
          >
            <HashLink smooth to="/#projects">
              <motion.li whileHover={{ scale: 1.1, color: '#16a34a' }} className="hover:text-green-600 cursor-pointer">Projects</motion.li>
            </HashLink>
            <HashLink smooth to="/#about">
              <motion.li whileHover={{ scale: 1.1, color: '#16a34a' }} className="hover:text-green-600 cursor-pointer">About</motion.li>
            </HashLink>
            <HashLink smooth to="/#contact">
              <motion.li whileHover={{ scale: 1.1, color: '#16a34a' }} className="hover:text-green-600 cursor-pointer">Contact</motion.li>
            </HashLink>
          </motion.ul>
        </nav>
      </div>
    </motion.header>
  );
}
