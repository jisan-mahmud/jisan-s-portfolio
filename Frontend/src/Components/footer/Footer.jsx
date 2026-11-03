import React from 'react'
import { HashLink } from 'react-router-hash-link'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaLink } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { TbCode } from 'react-icons/tb'
import { useProfile } from '../../lib/hooks'

const navLinks = [
  { label: 'About',        href: '/#about' },
  { label: 'Experience',   href: '/#experience' },
  { label: 'Education',    href: '/#education' },
  { label: 'Projects',     href: '/#projects' },
  { label: 'Technologies', href: '/#technologies' },
  { label: 'Contact',      href: '/#contact' },
]

const iconMap = {
  github: <FaGithub size={15} />,
  linkedin: <FaLinkedin size={15} />,
  twitter: <FaSquareXTwitter size={15} />,
  x: <FaSquareXTwitter size={15} />,
  email: <FaEnvelope size={15} />,
  link: <FaLink size={15} />,
}

export default function Footer() {
  const { data: profile } = useProfile()
  const year = new Date().getFullYear()
  const socials = profile?.socials || []

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

          <div className="text-center sm:text-left">
            <p
              className="text-green-400 font-bold text-lg mb-1"
              style={{ fontFamily: '"Caveat", cursive' }}
            >
              {profile?.full_name || 'Jisan Mahmud'}
            </p>
            <p className="text-gray-500 text-xs">
              {[profile?.headline, profile?.location].filter(Boolean).join(' · ') || 'Backend Developer'}
            </p>
          </div>

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

          {socials.length > 0 && (
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <motion.a
                  key={social.id || social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-700/60 text-gray-500 hover:text-white hover:border-gray-500 bg-gray-800/40 transition-colors duration-200"
                >
                  {iconMap[social.icon] || iconMap.link}
                </motion.a>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800/60">
          <p className="text-xs text-gray-600">© {year} {profile?.full_name || 'Jisan Mahmud'}. All rights reserved.</p>
          <span className="flex items-center gap-1 text-xs text-gray-700">
            <TbCode size={12} />
            Built with React & Tailwind
          </span>
        </div>
      </div>
    </motion.footer>
  )
}
