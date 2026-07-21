import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa'
import { TbCalendar, TbPointFilled } from 'react-icons/tb'

const education = [
  {
    degree: 'B.Sc. in Computer Science & Engineering',
    institution: 'Uttara University',
    period: 'Expected: 2029',
    status: 'Ongoing',
    location: 'Uttara, Dhaka, Bangladesh',
    highlights: [
      'Coursework: Data Structures & Algorithms, Database Systems, Operating Systems, Backend Development.',
    ],
  },
  {
    degree: 'Diploma in Computer Science & Technology',
    institution: 'Mymensingh Polytechnic Institute',
    period: 'Completed',
    status: 'Completed',
    location: 'Mymensingh, Bangladesh',
    highlights: [
      'Programming Fundamentals, Data Structures, Computer Networks.',
      'Built strong self-learning ability through projects and continuous practice beyond curriculum.',
      'Focused on real-world software development and backend systems.',
    ],
  },
]

const statusStyle = {
  Ongoing:   'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Completed: 'bg-green-500/10 text-green-400 border-green-500/20',
}

export default function Education() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      id="education"
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
          <FaGraduationCap />
          Education
        </motion.h2>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-700/60" />

          <div className="flex flex-col gap-4">
            {education.map((edu, index) => (
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
                        {edu.degree}
                      </h3>
                      <p className="text-green-400 font-medium text-sm mt-0.5">{edu.institution}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <TbCalendar size={12} />
                        {edu.period}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${statusStyle[edu.status]}`}>
                        {edu.status}
                      </span>
                    </div>
                  </div>

                  {/* location */}
                  {edu.location && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                      <FaMapMarkerAlt size={10} />
                      {edu.location}
                    </div>
                  )}

                  {/* highlights */}
                  <ul className="space-y-1.5">
                    {edu.highlights.map((item, i) => (
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
