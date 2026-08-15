import React, { useEffect, useState } from 'react';
import { fetchLeetcodeUser } from '../../lib/utils';
import { motion } from 'framer-motion';
import { TbCode, TbTrophy, TbCircleCheck, TbExternalLink, TbTag, TbChevronDown } from 'react-icons/tb';

const GROUPS = [
  { key: 'advanced',     label: 'Advanced',     color: 'text-red-400',    bg: 'bg-red-400/10',    border: 'border-red-400/20',    bar: 'bg-red-400' },
  { key: 'intermediate', label: 'Intermediate',  color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', bar: 'bg-yellow-400' },
  { key: 'fundamental',  label: 'Fundamental',   color: 'text-green-400',  bg: 'bg-green-400/10',  border: 'border-green-400/20',  bar: 'bg-green-400' },
];

const DEFAULT_SHOW = 4;

function TagGroup({ label, color, bg, border, bar, tags, globalMax }) {
  const [showAll, setShowAll] = useState(false);
  if (!tags?.length) return null;
  const max = globalMax || 1;
  const visible = showAll ? tags : tags.slice(0, DEFAULT_SHOW);
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${color} ${bg} ${border}`}>{label}</span>
      </div>
      <div className="flex flex-col gap-2">
        {visible.map(({ tagName, problemsSolved }, idx) => {
          const pct = Math.round((problemsSolved / max) * 100);
          return (
            <div key={tagName} className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-40 shrink-0 truncate">{tagName}</span>
              <div className="flex-1 h-1.5 rounded-full bg-gray-700/60 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.04, ease: 'easeOut' }}
                  className={`h-full rounded-full ${bar}`}
                />
              </div>
              <span className={`text-xs font-semibold w-10 text-right shrink-0 ${color}`}>{problemsSolved}</span>
            </div>
          );
        })}
      </div>
      {tags.length > DEFAULT_SHOW && (
        <button
          onClick={() => setShowAll(o => !o)}
          className="flex items-center gap-1 mt-2 text-xs text-gray-500 hover:text-green-400 transition-colors cursor-pointer"
        >
          <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <TbChevronDown size={13} />
          </motion.span>
          {showAll ? 'Show less' : `Show ${tags.length - DEFAULT_SHOW} more`}
        </button>
      )}
    </div>
  );
}

export default function Leetcode({ username }) {
  const activeUsername = (username || import.meta.env.VITE_LEETCODE_USERNAME || '').trim();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeUsername) return;
    let mounted = true;
    setLoading(true);
    setError(null);
    fetchLeetcodeUser(activeUsername)
      .then(d => { if (mounted) { setData(d); setLoading(false); } })
      .catch(e => { if (mounted) { setError(e.message || 'Failed'); setLoading(false); } });
    return () => { mounted = false; };
  }, [activeUsername]);

  const hasTags = data?.problemTags && Object.values(data.problemTags).some(g => g.length > 0);
  const globalMax = hasTags
    ? Math.max(...Object.values(data.problemTags).flat().map(t => t.problemsSolved))
    : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      id="leetcode"
      className="py-10 px-4 sm:px-6 w-full scroll-mt-32"
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
          <TbCode />
          LeetCode
        </motion.h2>

        {error && (
          <div className="text-sm text-red-400 p-3 bg-red-500/10 rounded-xl border border-red-500/20">{error}</div>
        )}
        {loading && (
          <div className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-8 text-center text-sm text-gray-500">
            <span className="inline-block animate-spin mr-2">⟳</span>Loading...
          </div>
        )}

        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Profile */}
            <div className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-4 mb-3 flex items-center gap-4">
              {data.avatar && (
                <img src={data.avatar} alt={activeUsername} className="w-16 h-16 rounded-full border-2 border-green-500/30 object-cover shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={`https://leetcode.com/${activeUsername}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-white text-base hover:text-green-400 transition-colors flex items-center gap-1"
                    style={{ fontFamily: '"Poppins", sans-serif' }}
                  >
                    {data.name || activeUsername}
                    <TbExternalLink size={13} className="text-gray-500" />
                  </a>
                  {data.ranking && (
                    <span className="text-xs text-yellow-400 font-medium flex items-center gap-1">
                      <TbTrophy size={12} /> #{data.ranking.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">{data.totalSolved} problems solved</div>
              </div>
            </div>

            {/* Easy / Medium / Hard */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[
                { label: 'Easy',   value: data.easySolved   ?? '—', color: 'text-green-400' },
                { label: 'Medium', value: data.mediumSolved ?? '—', color: 'text-yellow-400' },
                { label: 'Hard',   value: data.hardSolved   ?? '—', color: 'text-red-400' },
              ].map(({ label, value, color }) => (
                <motion.div key={label} whileHover={{ y: -3 }} className="rounded-xl border border-gray-700/60 bg-gray-900/40 px-4 py-3">
                  <span className={`flex items-center gap-1.5 mb-1 ${color}`}>
                    <TbCircleCheck size={15} />
                    <span className="text-[10px] uppercase tracking-wider text-gray-500">{label}</span>
                  </span>
                  <div className="text-white font-bold text-xl" style={{ fontFamily: '"Poppins", sans-serif' }}>{value}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">solved</div>
                </motion.div>
              ))}
            </div>

            {/* Problem categories grouped */}
            {hasTags && (
              <div className="rounded-xl border border-gray-700/60 bg-gray-900/40 px-4 py-4">
                <div className="flex items-center gap-2 mb-4">
                  <TbTag size={14} className="text-green-400" />
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Skills</span>
                </div>
                {GROUPS.map(g => (
                  <TagGroup key={g.key} {...g} tags={data.problemTags[g.key]} globalMax={globalMax} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
