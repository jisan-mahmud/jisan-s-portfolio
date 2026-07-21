import React from 'react'
import { motion } from 'framer-motion'
import { FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa'
import { TbCalendar, TbPointFilled } from 'react-icons/tb'

const experiences = [
  {
    title: 'Backend Developer',
    stack: 'Python · Django',
    company: 'Softvence Agency',
    period: 'Nov 2025 – Jul 2026',
    type: 'Full-time',
    location: 'Mohakhali, Dhaka, Bangladesh',
    highlights: [
      'Built production-grade REST APIs with JWT authentication, Google OAuth, and RBAC for multi-role systems.',
      'Implemented real-time bidirectional messaging using Django Channels for scalable user communication.',
      'Collaborated with frontend and AI teams to deliver production-ready features and improve system responsiveness.',
      'Automated CI/CD pipelines using GitHub Actions, reducing manual deployment effort and improving release reliability.',
    ],
  },
  {
    title: 'Full Stack Developer',
    stack: 'Django · React · PostgreSQL',
    company: 'Self-Employed',
    period: 'Jan 2023 – Present',
    type: 'Freelance',
    location: '',
    highlights: [
      'Built and deployed full-stack web applications using Django, React, and PostgreSQL.',
      'Delivered client-specific solutions with focus on performance, scalability, and clean architecture.',
      'Integrated modern APIs and third-party services to extend application functionality.',
    ],
  },
]

export default function Experience() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      id="experience"
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
          <FaBriefcase />
          Experience
        </motion.h2>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-700/60" />

          <div className="flex flex-col gap-4">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative pl-12"
              >
                {/* timeline dot */}
                <div className="absolute left-[11px] top-5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-gray-900 z-10" />

                <div className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-4 hover:border-green-500/30 transition-colors duration-300">
                  {/* top row */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-white font-semibold text-base leading-tight" style={{ fontFamily: '"Poppins", sans-serif' }}>
                        {exp.title}
                      </h3>
                      <p className="text-green-400 font-medium text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <TbCalendar size={12} />
                        {exp.period}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* meta */}
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span className="text-xs px-2 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700/50">
                      {exp.stack}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <FaMapMarkerAlt size={10} />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {/* highlights */}
                  <ul className="space-y-1.5">
                    {exp.highlights.map((item, i) => (
                      <li key={i} className="flex gap-2 text-xs text-gray-400 leading-relaxed">
                        <TbPointFilled className="text-green-500 shrink-0 mt-0.5" size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
