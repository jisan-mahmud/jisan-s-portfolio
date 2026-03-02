import React from 'react';
import { FaPython, FaJs, FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaLinux, FaCogs } from 'react-icons/fa';
import { TbBrandCpp } from "react-icons/tb";
import { FaC } from "react-icons/fa6";
import { SiDjango, SiTailwindcss, SiPostgresql, SiNginx, SiJsonwebtokens} from 'react-icons/si';
import { motion } from 'framer-motion';

export default function Technologies() {
    const technologies = [
        { name: 'C', icon: <FaC /> },
        { name: 'C++', icon: <TbBrandCpp /> },
        { name: 'Python', icon: <FaPython /> },
        { name: 'JavaScript', icon: <FaJs /> },
        { name: 'React', icon: <FaReact /> },
        { name: 'Django', icon: <SiDjango /> },
        { name: 'HTML5', icon: <FaHtml5 /> },
        { name: 'CSS3', icon: <FaCss3Alt /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
        { name: 'PostgreSQL', icon: <SiPostgresql /> },
        { name: 'Git', icon: <FaGitAlt /> },
        { name: 'JWT', icon: <SiJsonwebtokens /> },
        { name: 'Linux', icon: <FaLinux /> },
        { name: 'Nginx', icon: <SiNginx /> },
        { name: 'Docker', icon: <FaDocker /> },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            id='technologies' 
            className="py-10 px-4 sm:px-6 w-full scroll-mt-24 sm:scroll-mt-32"
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
                    <FaCogs />
                    Technologies
                </motion.h2>

                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
                    {technologies.map((technology, index) => (
                        <motion.div
                            key={technology.name}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="group aspect-square w-full border border-gray-700 rounded-xl p-1 flex flex-col items-center justify-center text-white hover:shadow-lg transition duration-300 ease-in-out"
                        >
                            <div className="text-4xl mb-2 transform transition-transform duration-500 group-hover:-translate-y-1">
                                {technology.icon}
                            </div>
                            <span className="font-medium text-sm text-center">{technology.name}</span>
                        </motion.div>
                    ))}
                </div>

            </div>
        </motion.div>
    );
}
