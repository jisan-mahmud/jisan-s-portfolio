import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaMapMarkerAlt } from 'react-icons/fa'
import { TbBriefcase, TbCode, TbBulb, TbChevronDown, TbRocket } from 'react-icons/tb'

const stats = [
  { icon: <TbBriefcase size={16} />, label: 'Experience', value: '2+ Years' },
  { icon: <TbCode size={16} />, label: 'Focus', value: 'Backend Dev' },
  { icon: <TbRocket size={16} />, label: 'Projects', value: '10+ Built' },
  { icon: <FaMapMarkerAlt size={13} />, label: 'Location', value: 'Dhaka, BD' },
]

const interests = [
  { label: 'System Design', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  { label: 'Competitive Programming', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  { label: 'Cloud Computing', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' },
  { label: 'AI / ML', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  { label: 'Open Source', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
]

export default function AboutMe() {
  const [showMore, setShowMore] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      id="about"
      className="w-full px-4 sm:px-6 py-10 scroll-mt-32"
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
          <FaUser />
          About Me
        </motion.h2>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 rounded-xl border border-gray-700/60 bg-gray-900/40 px-4 py-3"
            >
              <span className="text-green-400 flex items-center gap-1.5">
                {stat.icon}
                <span className="text-[10px] uppercase tracking-wider text-gray-500">{stat.label}</span>
              </span>
              <span className="text-white font-semibold text-sm" style={{ fontFamily: '"Poppins", sans-serif' }}>
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Summary card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-4 mb-3"
        >
          <p className="text-gray-300 text-sm leading-relaxed">
            I'm a <span className="text-white font-medium">Backend Developer</span> focused on building scalable, high-performance web systems using <span className="text-green-400">Django</span>, <span className="text-green-400">PostgreSQL</span>, and <span className="text-green-400">REST APIs</span>. I have hands-on experience designing and deploying production-grade full-stack applications, combining clean architecture with practical problem-solving.
          </p>

          <AnimatePresence initial={false}>
            {showMore && (
              <motion.div
                key="more"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-3 mt-3 pt-3 border-t border-gray-700/50">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    I work with technologies such as <span className="text-white font-medium">React, Tailwind CSS, Celery, Redis, Docker,</span> and <span className="text-white font-medium">Nginx</span>, with a strong emphasis on backend performance, system design, and reliability.
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    I actively participate in coding contests and build projects to sharpen my problem-solving skills. Long-term, I'm driven to build impactful products and contribute to world-class engineering teams.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowMore(prev => !prev)}
            className="flex items-center gap-1 mt-3 text-xs text-gray-500 hover:text-green-400 transition-colors duration-200 cursor-pointer select-none"
          >
            <motion.span animate={{ rotate: showMore ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <TbChevronDown size={14} />
            </motion.span>
            {showMore ? 'Show less' : 'Read more'}
          </button>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-xl border border-gray-700/60 bg-gray-900/40 px-4 py-3"
        >
          <div className="flex items-center gap-2 mb-3">
            <TbBulb size={14} className="text-yellow-400" />
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Interests</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {interests.map((item) => (
              <span
                key={item.label}
                className={`text-xs px-3 py-1 rounded-full border font-medium ${item.color}`}
              >
                {item.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
