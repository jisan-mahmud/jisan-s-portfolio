import React from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { TbSend, TbBrandGithub } from 'react-icons/tb'

const socials = [
  { label: 'GitHub',   icon: <FaGithub size={16} />,          href: 'https://github.com/jisan-mahmud',            color: 'hover:text-white hover:border-gray-400' },
  { label: 'LinkedIn', icon: <FaLinkedin size={16} />,         href: 'https://www.linkedin.com/in/jisanmahmud/',   color: 'hover:text-blue-400 hover:border-blue-400' },
  { label: 'Twitter',  icon: <FaSquareXTwitter size={16} />,   href: 'https://x.com/jisan__mahmud',               color: 'hover:text-sky-400 hover:border-sky-400' },
  { label: 'Email',    icon: <FaEnvelope size={16} />,         href: 'mailto:jisan.mahmud203@gmail.com',           color: 'hover:text-green-400 hover:border-green-400' },
]

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      id="contact"
      className="py-10 px-4 sm:px-6 w-full scroll-mt-32"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-green-500 uppercase font-bold text-sm mb-6 tracking-wider flex items-center gap-2"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <FaEnvelope />
          Let's Connect
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="rounded-2xl border border-gray-700/60 bg-gray-900/40 p-6 sm:p-8 text-center"
        >
          {/* availability */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-medium">Open to new opportunities</span>
          </div>

          <h3
            className="text-white text-xl sm:text-2xl font-bold mb-2"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            Got a project or opportunity?
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto mb-7">
            Whether it's a job offer, freelance project, or just a tech chat — my inbox is always open.
          </p>

          {/* primary CTA */}
          <motion.a
            href="mailto:jisan.mahmud203@gmail.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors duration-200 mb-8"
          >
            <TbSend size={15} />
            Say Hello
          </motion.a>

          {/* divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-700/60" />
            <span className="text-xs text-gray-600">or find me on</span>
            <div className="flex-1 h-px bg-gray-700/60" />
          </div>

          {/* social links */}
          <div className="flex items-center justify-center gap-3">
            {socials.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={s.label}
                className={`flex items-center justify-center w-10 h-10 rounded-xl border border-gray-700/60 text-gray-500 bg-gray-800/50 transition-colors duration-200 ${s.color}`}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
