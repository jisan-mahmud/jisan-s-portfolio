import React from 'react'
import LinkButton from '../button/LinkButton'
import SocialIcons from './SocialIcons';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

export default function Intro() {
    return (
        <div className='w-full px-4 sm:px-6 my-4 sm:my-10'>
            <div className='max-w-3xl mx-auto flex flex-col sm:flex-row justify-between gap-6 md:gap-14'>

                {/* Text Section */}
                <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className='flex-1 text-center sm:text-left'
                >
                    <TypeAnimation
                        sequence={[
                            "Hi, I'm Jisan Mahmud",
                            1000,
                        ]}
                        wrapper="h1"
                        cursor={true}
                        className="text-md md:text-2xl font-bold tracking-tight"
                        style={{ fontFamily: '"Quando", serif' }}
                    />

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className='my-1 leading-tight sm:my-3 text-sm sm:text-lg text-gray-300'
                    >
                        Backend Engineer focused on scalable REST APIs using Python, Django, and DRF, with experience in real-time systems, authentication, and backend performance optimization.
                    </motion.p>
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className='block my-2 text-sm sm:text-base'
                    >
                        Dhaka, Bangladesh
                    </motion.span>
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className='flex gap-2 sm:gap-4 my-2 sm:my-4 items-center justify-center sm:justify-start'
                    >
                        <div>
                            <LinkButton link={'https://drive.google.com/file/d/1V17wK80xyEYZCGdbbmqR7eEvG5hxZndA/view?usp=sharing'} label={'Resume'} />
                        </div>

                        <div>
                            <SocialIcons />
                        </div>
                    </motion.div>

                </motion.div>

                {/* Image Section */}
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className='flex justify-center sm:justify-end'
                >
                    <img
                        src='images/jisan.jpg'
                        alt='Jisan Mahmud'
                        className='w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full shadow-lg object-cover'
                    />
                </motion.div>
            </div>
        </div>
    )
}
