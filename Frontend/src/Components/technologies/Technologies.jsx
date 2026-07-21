import React, { useState } from 'react';
import { FaPython, FaJs, FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaLinux, FaCogs } from 'react-icons/fa';
import { TbBrandCpp, TbLayoutGrid, TbLayoutList } from "react-icons/tb";
import { FaC } from "react-icons/fa6";
import { SiDjango, SiTailwindcss, SiPostgresql, SiNginx, SiJsonwebtokens, SiAmazonwebservices, SiSwagger, SiPostman } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  {
    label: 'Languages',
    color: 'blue',
    skills: [
      { name: 'Python', icon: <FaPython /> },
      { name: 'JavaScript', icon: <FaJs /> },
      { name: 'C', icon: <FaC /> },
      { name: 'C++', icon: <TbBrandCpp /> },
    ],
  },
  {
    label: 'Frontend',
    color: 'cyan',
    skills: [
      { name: 'React', icon: <FaReact /> },
      { name: 'HTML5', icon: <FaHtml5 /> },
      { name: 'CSS3', icon: <FaCss3Alt /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    ],
  },
  {
    label: 'Backend',
    color: 'green',
    skills: [
      { name: 'Django', icon: <SiDjango /> },
      { name: 'DRF', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/djangorest/djangorest-original-wordmark.svg" className="w-5 h-5" /> },
      { name: 'JWT', icon: <SiJsonwebtokens /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ],
  },
  {
    label: 'DevOps & Cloud',
    color: 'orange',
    skills: [
      { name: 'AWS', icon: <SiAmazonwebservices /> },
      { name: 'Docker', icon: <FaDocker /> },
      { name: 'Nginx', icon: <SiNginx /> },
      { name: 'Linux', icon: <FaLinux /> },
    ],
  },
  {
    label: 'Tools',
    color: 'purple',
    skills: [
      { name: 'Git', icon: <FaGitAlt /> },
      { name: 'Postman', icon: <SiPostman /> },
      { name: 'Swagger', icon: <SiSwagger /> },
    ],
  },
];

const colorMap = {
  blue:   { border: 'border-blue-500/30',   bg: 'bg-blue-500/10',   text: 'text-blue-400',   dot: 'bg-blue-400',   badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  cyan:   { border: 'border-cyan-500/30',   bg: 'bg-cyan-500/10',   text: 'text-cyan-400',   dot: 'bg-cyan-400',   badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  green:  { border: 'border-green-500/30',  bg: 'bg-green-500/10',  text: 'text-green-400',  dot: 'bg-green-400',  badge: 'bg-green-500/10 text-green-400 border-green-500/20' },
  orange: { border: 'border-orange-500/30', bg: 'bg-orange-500/10', text: 'text-orange-400', dot: 'bg-orange-400', badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  purple: { border: 'border-purple-500/30', bg: 'bg-purple-500/10', text: 'text-purple-400', dot: 'bg-purple-400', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
};

export default function Technologies() {
  const [isGrid, setIsGrid] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      id="technologies"
      className="py-10 px-4 sm:px-6 w-full scroll-mt-24 sm:scroll-mt-32"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-green-500 uppercase font-bold text-sm tracking-wider flex items-center gap-2"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            <FaCogs />
            Technologies
          </motion.h2>

          <div className="flex items-center gap-1 bg-gray-800/60 rounded-lg p-1 border border-gray-700/50">
            <button
              onClick={() => setIsGrid(false)}
              className={`p-1.5 rounded-md transition-colors duration-200 ${!isGrid ? 'bg-green-500/20 text-green-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <TbLayoutList size={16} />
            </button>
            <button
              onClick={() => setIsGrid(true)}
              className={`p-1.5 rounded-md transition-colors duration-200 ${isGrid ? 'bg-green-500/20 text-green-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <TbLayoutGrid size={16} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isGrid ? (
            /* ── List view ── */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-3"
            >
              {categories.map((cat, catIndex) => {
                const c = colorMap[cat.color];
                return (
                  <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: catIndex * 0.07, duration: 0.4 }}
                    className={`flex items-center gap-4 rounded-xl border ${c.border} bg-gray-900/40 px-4 py-3`}
                  >
                    <div className="w-28 shrink-0 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${c.dot}`} />
                      <span className={`text-xs font-semibold uppercase tracking-wider ${c.text}`} style={{ fontFamily: '"Poppins", sans-serif' }}>
                        {cat.label}
                      </span>
                    </div>
                    <div className={`w-px self-stretch ${c.bg}`} />
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, i) => (
                        <motion.div
                          key={skill.name}
                          whileHover={{ scale: 1.08, y: -2 }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium ${c.badge} transition-transform duration-200`}
                        >
                          <span className="text-sm">{skill.icon}</span>
                          {skill.name}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* ── Grid view ── */
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {categories.map((cat, catIndex) => {
                const c = colorMap[cat.color];
                return (
                  <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: catIndex * 0.07, duration: 0.4 }}
                    className={`rounded-xl border ${c.border} bg-gray-900/40 p-4`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${c.dot}`} />
                      <span className={`text-xs font-semibold uppercase tracking-wider ${c.text}`} style={{ fontFamily: '"Poppins", sans-serif' }}>
                        {cat.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <motion.div
                          key={skill.name}
                          whileHover={{ scale: 1.08, y: -2 }}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium ${c.badge} transition-transform duration-200`}
                        >
                          <span className="text-sm">{skill.icon}</span>
                          {skill.name}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
