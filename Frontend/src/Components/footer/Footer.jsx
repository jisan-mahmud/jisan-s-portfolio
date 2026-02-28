import React from 'react'
import SocialIcons from '../other/SocialIcons';
import { motion } from 'framer-motion'

export default function Footer() {
  const d = new Date();
  let year = d.getFullYear();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-5 px-4 sm:px-6 w-full"
    >
      <div className="flex max-w-3xl justify-between justify-items-center mx-auto border-t pt-4 px-4 border-gray-700">
        <motion.p 
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='tracking-widest'
        >
          © {year} Jisan Mahmud
        </motion.p>
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <SocialIcons />
        </motion.div>
      </div>
    </motion.div>
  )
}
