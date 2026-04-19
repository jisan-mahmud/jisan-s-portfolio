import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap } from 'react-icons/fa'

const education = [
  {
    degree: 'B.Sc. in Computer Science & Engineering',
    institution: 'Uttara University',
    period: 'Expected: 2029',
    location: 'Bangladesh',
    highlights: [
      'Coursework (ongoing): Data Structures & Algorithms, Database Systems, Operating Systems, Backend Development',
    ],
  },
  {
    degree: 'Diploma in Computer Science & Technology',
    institution: 'Mymensingh Polytechnic Institute',
    period: 'Completed',
    location: 'Mymensingh, Bangladesh',
    highlights: [
      'Programming Fundamentals, Data Structures, Computer Networks',
      'Built strong self-learning ability through projects and continuous practice beyond curriculum',
      'Focused on real-world software development and backend systems',
    ],
  },
]

export default function Education() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      id="education"
      className="w-full px-4 sm:px-6 my-10 scroll-mt-32"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-green-600 my-4 font-bold uppercase tracking-wider flex items-center gap-2"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <FaGraduationCap />
          Education
        </motion.h1>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative pl-8 border-l border-green-500/30 pb-6"
            >
              <div className="absolute -left-[3px] top-0 w-[6px] h-[6px] rounded-full bg-green-500"></div>

              <motion.div whileHover={{ x: 5 }} className="space-y-2">
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: '"Poppins", sans-serif' }}
                >
                  {edu.degree}
                </h3>

                <p className="text-green-400 font-medium">
                  {edu.institution}
                </p>

                <p className="text-sm text-gray-400">{edu.period}</p>

                {edu.location && (
                  <p className="text-sm text-gray-500">{edu.location}</p>
                )}

                <ul className="mt-2 space-y-2 text-gray-300 leading-relaxed">
                  {edu.highlights.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}