import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';

export default function AboutMe() {
    const [showMore, setShowMore] = useState(false);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            id='about' 
            className='w-full px-4 sm:px-6 my-10 scroll-mt-32'
        >
            <div className='max-w-3xl mx-auto'>
                <motion.h1 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='text-green-600 my-4 font-bold uppercase tracking-wider flex items-center gap-2'
                    style={{ fontFamily: '"Poppins", sans-serif' }}
                >
                    <FaUser />
                    About Me
                </motion.h1>

                <div className='flex flex-col gap-4'>
                    {/* Always visible part */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                    I am a Backend Developer focused on building scalable, high-performance web systems using Django, PostgreSQL, and REST APIs. I have hands-on experience designing and deploying production-grade full-stack applications, combining clean architecture with practical problem-solving.
                    </motion.div>

                    {/* Toggleable part */}
                    <motion.div
                        animate={{ 
                            height: showMore ? 'auto' : 0,
                            opacity: showMore ? 1 : 0
                        }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className='overflow-hidden'
                    >
                        <div className='flex flex-col gap-3 mt-2'>
                            <span>
                            I work with technologies such as React, Tailwind CSS, Celery, Redis, Docker, and Nginx, with a strong emphasis on backend performance, system design, and reliability. I continuously explore modern engineering practices to improve scalability, maintainability, and developer experience.
                            </span>

                            <span>
                            My interests extend into competitive programming (C/C++), system design, cloud computing, and AI/ML—areas where logic, efficiency, and innovation intersect. I actively participate in coding contests and build projects to sharpen my problem-solving and engineering skills.
                            </span>

                            <span>
                            Beyond technical growth, I’m driven by a long-term goal of building impactful products and contributing to world-class engineering teams, while working toward creating a meaningful technology-driven startup.
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Toggle Button */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center gap-1 mt-4 cursor-pointer select-none text-gray-400 hover:underline w-fit'
                    onClick={() => setShowMore(prev => !prev)}
                >
                    <motion.div
                        animate={{ rotate: showMore ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <IoIosArrowDown />
                    </motion.div>
                    <span>{showMore ? 'View Less' : 'View More'}</span>
                </motion.div>
            </div>
        </motion.div>
    )
}
