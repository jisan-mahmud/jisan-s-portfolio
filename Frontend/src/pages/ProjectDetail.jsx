import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { TbWorld, TbArrowLeft, TbCalendar, TbUser, TbStack2, TbListCheck, TbFileText, TbExternalLink } from 'react-icons/tb';
import projects from '../data/projects';

function SectionHeader({ icon, label }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-green-400">{icon}</span>
      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">{label}</span>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-400 gap-4">
        <p>Project not found.</p>
        <button onClick={() => navigate('/')} className="text-green-400 hover:text-green-300 text-sm flex items-center gap-1">
          <TbArrowLeft size={15} /> Back to home
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-10 px-4 sm:px-6 w-full"
    >
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-400 transition-colors mb-5"
        >
          <TbArrowLeft size={14} /> Back to projects
        </button>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="rounded-xl overflow-hidden border border-gray-700/60 w-full h-52 sm:h-72 mb-5"
        >
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* ── Title block ── */}
        <div className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-4 mb-3">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">{tag}</span>
            ))}
          </div>
          <h1 className="text-white font-bold text-lg sm:text-xl leading-snug mb-3" style={{ fontFamily: '"Poppins", sans-serif' }}>
            {project.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 pb-3 mb-3 border-b border-gray-700/50">
            {project.year && (
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <TbCalendar size={13} className="text-green-400" /> {project.year}
              </span>
            )}
            {project.role && (
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <TbUser size={13} className="text-green-400" /> {project.role}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-2 flex-wrap">
            {project.github_link && (
              <a href={project.github_link} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-700/60 bg-gray-800/60 text-gray-300 hover:border-green-500/40 hover:text-green-400 transition-colors"
              >
                <FaGithub size={13} /> GitHub
              </a>
            )}
            {project.live_link && (
              <a href={project.live_link} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
              >
                <TbWorld size={13} /> Live Demo <TbExternalLink size={11} />
              </a>
            )}
          </div>
        </div>

        {/* ── Overview ── */}
        <div className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-4 mb-3">
          <SectionHeader icon={<TbFileText size={14} />} label="Overview" />
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{project.description}</p>
        </div>

        {/* ── Features + Tech (2-col on sm+) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {project.features?.length > 0 && (
            <div className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-4">
              <SectionHeader icon={<TbListCheck size={14} />} label="Key Features" />
              <ul className="flex flex-col gap-2">
                {project.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-gray-300">
                    <span className="text-green-400 mt-0.5 shrink-0">▸</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.tech?.length > 0 && (
            <div className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-4">
              <SectionHeader icon={<TbStack2 size={14} />} label="Tech Stack" />
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700/60">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Case Study ── */}
        {project.caseStudy && (
          <div className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-4">
            <SectionHeader icon={<TbFileText size={14} />} label="Case Study" />
            <div className="relative pl-4">
              {/* vertical line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-700/60" />
              {[
                { label: 'Problem',  text: project.caseStudy.problem,  dot: 'bg-red-400',   color: 'text-red-400' },
                { label: 'Solution', text: project.caseStudy.solution, dot: 'bg-blue-400',  color: 'text-blue-400' },
                { label: 'Outcome',  text: project.caseStudy.outcome,  dot: 'bg-green-400', color: 'text-green-400' },
              ].map(({ label, text, dot, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="relative mb-5 last:mb-0"
                >
                  {/* dot */}
                  <span className={`absolute -left-[18px] top-1 w-2.5 h-2.5 rounded-full ${dot} border-2 border-gray-900`} />
                  <span className={`text-[10px] uppercase tracking-wider font-semibold ${color} block mb-1`}>{label}</span>
                  <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
