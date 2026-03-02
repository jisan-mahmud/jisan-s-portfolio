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
                    I'm a developer who's passionate about building for the web, with a strong focus on backend development using Django, PostgreSQL, and REST APIs. Over the past year, I've worked on and deployed several full-stack projects where I've been able to combine creativity with technical problem-solving. I also enjoy working with tools like Tailwind CSS, React, Celery, and Nginx, and I'm always curious to learn and experiment with new technologies that help me grow as a developer.
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
                            My interests span across competitive programming (C/C++), system design, cloud computing, AI/ML —fields where logic, performance, and innovation intersect. I actively challenge myself through hands-on projects and by participating in competitive programming contests to sharpen my problem-solving abilities.
                            </span>

                            <span>
                            Beyond development, I'm driven by entrepreneurial ambition and aspire to build a meaningful startup that blends technology and impact. I'm continuously learning, pushing boundaries, and working toward my dream of contributing to world-class tech teams.
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
