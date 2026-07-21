import React from "react";
import LinkButton from "../button/LinkButton";
import SocialIcons from "./SocialIcons";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbDownload } from "react-icons/tb";

const skills = ["Python", "Django", "REST APIs", "React", "PostgreSQL", "Docker"];

export default function Intro() {
  return (
    <div className="w-full px-4 sm:px-6 pt-8 pb-4 sm:py-12">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start gap-8">

        {/* Text Section */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 text-center sm:text-left"
        >
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-medium">Available for opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            Hi, I'm <span className="text-green-400">Jisan Mahmud</span>
          </motion.h1>

          {/* Typing role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-base sm:text-lg text-gray-400 mb-3 h-7"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            <TypeAnimation
              sequence={[
                "Backend Developer",
                1500,
                "Django & DRF Engineer",
                1500,
                "Full Stack Developer",
                1500,
                "REST API Specialist",
                1500,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="text-gray-300"
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-sm text-gray-400 leading-relaxed mb-4 max-w-md mx-auto sm:mx-0"
          >
            Building scalable REST APIs and production-grade web systems with Python, Django, and modern backend tooling.
          </motion.p>

          {/* Skill pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap gap-2 justify-center sm:justify-start mb-5"
          >
            {skills.map((skill, i) => (
              <span
                key={skill}
                className="text-xs px-2.5 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700/60"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="flex flex-wrap gap-3 items-center justify-center sm:justify-start"
          >
            <a
              href="https://drive.google.com/file/d/1V17wK80xyEYZCGdbbmqR7eEvG5hxZndA/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <TbDownload size={15} />
              Resume
            </a>
            <SocialIcons />
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex items-center gap-1.5 mt-4 text-xs text-gray-500 justify-center sm:justify-start"
          >
            <FaMapMarkerAlt size={11} />
            Dhaka, Bangladesh
          </motion.div>
        </motion.div>

        {/* Avatar Section */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex justify-center shrink-0"
        >
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44">
            {/* glow */}
            <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl scale-110" />
            {/* orbit rings */}
            <div className="absolute inset-[-10px] rounded-full border border-dashed border-green-500/30 animate-spin" style={{ animationDuration: '12s' }} />
            <div className="absolute inset-[-20px] rounded-full border border-dashed border-green-500/15 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
            {/* avatar */}
            <img
              src="images/jisan-mahmud.png"
              alt="Jisan Mahmud"
              className="relative w-full h-full rounded-full object-cover border-2 border-green-500/50 z-10"
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
