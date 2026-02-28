import React from 'react'
import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Back End Developer',
    company: 'Softvence Agency',
    period: 'Nov 2024 - Present',
    location: 'Mohakhali, Dhaka, Bangladesh',
    description: 'Developing scalable backend systems using Django, FastAPI, PostgreSQL, Docker, and CI/CD pipelines on AWS EC2.',
  },
  {
    title: 'Freelance Full Stack Developer',
    company: 'Self-Employed',
    period: 'Jan 2023 - Present',
    description: 'Building and deploying full-stack web applications using Django, React, PostgreSQL, and modern web technologies for various clients.',
  },
]

export default function Experience() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      id='experience' 
      className='w-full px-4 sm:px-6 my-10 scroll-mt-32'
    >
      <div className='max-w-3xl mx-auto'>
        <motion.h1 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-green-600 my-4 font-bold uppercase tracking-wider'
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          Experience
        </motion.h1>

        <div className='space-y-6'>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className='relative pl-8 border-l-2 border-green-500/30 pb-6'
            >
              <div className='absolute -left-2 top-0 w-4 h-4 rounded-full bg-green-500'></div>
              
              <motion.div whileHover={{ x: 5 }} className='space-y-2'>
                <h3 className='text-lg font-semibold text-white' style={{ fontFamily: '"Poppins", sans-serif' }}>
                  {exp.title}
                </h3>
                <p className='text-green-400 font-medium'>{exp.company}</p>
                <p className='text-sm text-gray-400'>{exp.period}</p>
                {exp.location && <p className='text-sm text-gray-500'>{exp.location}</p>}
                <p className='text-gray-300 leading-relaxed'>{exp.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
