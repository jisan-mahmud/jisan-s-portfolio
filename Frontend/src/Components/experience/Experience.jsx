import React from 'react'
import { motion } from 'framer-motion'
import { FaBriefcase } from 'react-icons/fa'

const experiences = [
  {
    title: 'Backend Developer (Python, Django)',
    company: 'Softvence Agency',
    period: 'Nov 2025 - Present',
    location: 'Mohakhali, Dhaka, Bangladesh',
    highlights: [
      'Built production-grade REST APIs with JWT authentication, Google OAuth, and RBAC for multi-role systems.',
      'Implemented real-time bidirectional messaging using Django Channels for scalable user communication.',
      'Collaborated with frontend and AI teams to deliver production-ready features and improve system responsiveness.',
      'Automated CI/CD pipelines using GitHub Actions, reducing manual deployment effort and improving release reliability.',
    ],
  },
  {
    title: 'Freelance Full Stack Developer',
    company: 'Self-Employed',
    period: 'Jan 2023 - Present',
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
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      id="experience"
      className="w-full px-4 sm:px-6 my-10 scroll-mt-32"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-green-600 my-4 font-bold uppercase tracking-wider flex items-center gap-2"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <FaBriefcase />
          Experience
        </motion.h1>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
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
                  {exp.title}
                </h3>

                <p className="text-green-400 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-400">{exp.period}</p>
                {exp.location && (
                  <p className="text-sm text-gray-500">{exp.location}</p>
                )}

                <ul className="mt-2 space-y-2 text-gray-300 leading-relaxed">
                  {exp.highlights.map((item, i) => (
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