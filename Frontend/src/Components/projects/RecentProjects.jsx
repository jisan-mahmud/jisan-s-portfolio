import React, { useState } from 'react';
import { FaGithub, FaCode } from "react-icons/fa";
import { TbWorld, TbLayoutGrid, TbLayoutList, TbArrowUpRight } from "react-icons/tb";
import IconButton from '../button/IconButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import projects from '../../data/projects';

function ProjectLinks({ project }) {
  return (
    <div className="flex gap-2">
      {project.github_link && <IconButton link={project.github_link} icon={<FaGithub size={14} />} />}
      {project.live_link && <IconButton link={project.live_link} icon={<TbWorld size={14} />} />}
    </div>
  );
}

function GridCard({ project, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group relative rounded-xl border border-gray-700/60 bg-gray-900/40 backdrop-blur-sm overflow-hidden hover:border-green-500/40 transition-colors duration-300"
    >
      <div className="relative w-full h-44 overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-105 group-hover:blur-sm" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
          <ProjectLinks project={project} />
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {project.tags?.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">{tag}</span>
          ))}
        </div>
        <h3 className="text-white font-semibold text-sm leading-snug" style={{ fontFamily: '"Poppins", sans-serif' }}>{project.title}</h3>
        <p className="text-gray-400 text-xs mt-1.5 leading-relaxed line-clamp-2">{project.description || project.shortDesc}</p>
        <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-1 mt-3 text-xs text-green-400 hover:text-green-300 transition-colors">
          View details <TbArrowUpRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}

function ListCard({ project, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group flex gap-4 rounded-xl border border-gray-700/60 bg-gray-900/40 backdrop-blur-sm p-3 hover:border-green-500/40 transition-colors duration-300"
    >
      <div className="relative w-28 sm:w-36 shrink-0 rounded-lg overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
          <ProjectLinks project={project} />
        </div>
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex flex-wrap gap-1.5 mb-1.5">
          {project.tags?.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">{tag}</span>
          ))}
        </div>
        <h3 className="text-white font-semibold text-sm leading-snug truncate" style={{ fontFamily: '"Poppins", sans-serif' }}>{project.title}</h3>
        <p className="text-gray-400 text-xs mt-1 leading-relaxed line-clamp-2">{project.description || project.shortDesc}</p>
        <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-1 mt-2 text-xs text-green-400 hover:text-green-300 transition-colors">
          View details <TbArrowUpRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function RecentProjects() {
  const [isGrid, setIsGrid] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      id="projects"
      className="py-10 px-4 sm:px-6 w-full scroll-mt-32"
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
            <FaCode />
            Recent Projects
          </motion.h2>

          <div className="flex items-center gap-1 bg-gray-800/60 rounded-lg p-1 border border-gray-700/50">
            <button
              onClick={() => setIsGrid(true)}
              className={`p-1.5 rounded-md transition-colors duration-200 ${isGrid ? 'bg-green-500/20 text-green-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <TbLayoutGrid size={16} />
            </button>
            <button
              onClick={() => setIsGrid(false)}
              className={`p-1.5 rounded-md transition-colors duration-200 ${!isGrid ? 'bg-green-500/20 text-green-400' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <TbLayoutList size={16} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isGrid ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {projects.map((project, index) => (
                <GridCard key={project.title} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-3"
            >
              {projects.map((project, index) => (
                <ListCard key={project.title} project={project} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
