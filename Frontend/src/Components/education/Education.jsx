import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap } from 'react-icons/fa'

const education = [
  {
    degree: 'Diploma in Computer Science and Technology',
    institution: 'Mymensingh Polytechnic Institute',
    period: 'Apr 2022 - Dec 2025',
    location: 'Mymensingh, Bangladesh',
    description: 'Completed a Diploma in Computer Science and Technology. Developed programming and software development skills through self-learning, independent projects, and continuous practice beyond the academic curriculum. Actively focused on modern development technologies, problem-solving, and real-world application building.',
  },
]

export default function Education() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      id='education' 
      className='w-full px-4 sm:px-6 my-10 scroll-mt-32'
    >
      <div className='max-w-3xl mx-auto'>
        <motion.h1 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='text-green-600 my-4 font-bold uppercase tracking-wider flex items-center gap-2'
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <FaGraduationCap />
          Education
        </motion.h1>

        <div className='space-y-6'>
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className='relative pl-8 border-l border-green-500/30 pb-6'
            >
              <div className='absolute -left-[3px] top-0 w-[6px] h-[6px] rounded-full bg-green-500'></div>
              
              <motion.div whileHover={{ x: 5 }} className='space-y-2'>
                <h3 className='text-lg font-semibold text-white' style={{ fontFamily: '"Poppins", sans-serif' }}>
                  {edu.degree}
                </h3>
                <p className='text-green-400 font-medium'>{edu.institution}</p>
                <p className='text-sm text-gray-400'>{edu.period}</p>
                {edu.location && <p className='text-sm text-gray-500'>{edu.location}</p>}
                <p className='text-gray-300 leading-relaxed'>{edu.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
