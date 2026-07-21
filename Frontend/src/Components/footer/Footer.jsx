import React from 'react'
import { HashLink } from 'react-router-hash-link'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { TbCode } from 'react-icons/tb'

const navLinks = [
  { label: 'About',        href: '/#about' },
  { label: 'Experience',   href: '/#experience' },
  { label: 'Education',    href: '/#education' },
  { label: 'Projects',     href: '/#projects' },
  { label: 'Technologies', href: '/#technologies' },
  { label: 'Contact',      href: '/#contact' },
]

const socials = [
  { icon: <FaGithub size={15} />,          href: 'https://github.com/jisan-mahmud',           label: 'GitHub' },
  { icon: <FaLinkedin size={15} />,         href: 'https://www.linkedin.com/in/jisanmahmud/',  label: 'LinkedIn' },
  { icon: <FaSquareXTwitter size={15} />,   href: 'https://x.com/jisan__mahmud',              label: 'Twitter' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full px-4 sm:px-6 pb-24 sm:pb-8"
    >
      <div className="max-w-3xl mx-auto border-t border-gray-700/50 pt-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">

          {/* Brand */}
          <div className="text-center sm:text-left">
            <p
              className="text-green-400 font-bold text-lg mb-1"
              style={{ fontFamily: '"Caveat", cursive' }}
            >
              Jisan Mahmud
            </p>
            <p className="text-gray-500 text-xs">Backend Developer · Dhaka, Bangladesh</p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
            {navLinks.map(link => (
              <HashLink
                key={link.label}
                smooth
                to={link.href}
                className="text-xs text-gray-500 hover:text-green-400 transition-colors duration-200"
              >
                {link.label}
              </HashLink>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={s.label}
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-700/60 text-gray-500 hover:text-white hover:border-gray-500 bg-gray-800/40 transition-colors duration-200"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800/60">
          <p className="text-xs text-gray-600">© {year} Jisan Mahmud. All rights reserved.</p>
          <span className="flex items-center gap-1 text-xs text-gray-700">
            <TbCode size={12} />
            Built with React & Tailwind
          </span>
        </div>
      </div>
    </motion.footer>
  )
}
