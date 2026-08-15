import React, { useEffect, useRef, useState } from 'react';
import { fetchCodeforcesUser, fetchCodeforcesContests } from '../../lib/utils';
import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';
import { TbTrophy, TbStar, TbCalendarStats, TbChevronLeft, TbChevronRight, TbExternalLink } from 'react-icons/tb';

function formatDate(sec) {
  if (!sec) return '—';
  return new Date(sec * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getRankColor(rank) {
  if (!rank) return 'text-gray-400';
  const r = rank.toLowerCase();
  if (r.includes('grandmaster') || r.includes('legendary')) return 'text-red-400';
  if (r.includes('master')) return 'text-orange-400';
  if (r.includes('candidate')) return 'text-violet-400';
  if (r.includes('expert')) return 'text-blue-400';
  if (r.includes('specialist')) return 'text-cyan-400';
  if (r.includes('pupil')) return 'text-green-400';
  return 'text-gray-400';
}

export default function Codeforces({ handle }) {
  const envHandle = import.meta.env.VITE_CODEFORCES_HANDLE || '';
  const initial = (handle || envHandle || '').trim();

  const [activeHandle] = useState(initial);
  const [user, setUser] = useState(null);
  const [contests, setContests] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (!activeHandle) return;
    let mounted = true;
    setLoading(true);
    setError(null);
    Promise.allSettled([
      fetchCodeforcesUser(activeHandle),
      fetchCodeforcesContests(activeHandle),
    ]).then(([userRes, contestsRes]) => {
      if (!mounted) return;
      if (userRes.status === 'fulfilled') setUser(userRes.value);
      else setError(userRes.reason?.message || 'Failed to fetch user');
      setContests(contestsRes.status === 'fulfilled' ? contestsRes.value || [] : []);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [activeHandle]);

  const scroll = (dir) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir * carouselRef.current.clientWidth * 0.75, behavior: 'smooth' });
  };

  const recentContests = contests ? contests.slice(-8).reverse() : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      id="codeforces"
      className="py-10 px-4 sm:px-6 w-full scroll-mt-32"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.h2
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-green-500 uppercase font-bold text-sm mb-6 tracking-wider flex items-center gap-2"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <FaCode />
          Codeforces
        </motion.h2>

        {error && (
          <div className="text-sm text-red-400 mb-4 p-3 bg-red-500/10 rounded-xl border border-red-500/20">{error}</div>
        )}

        {loading && (
          <div className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-8 text-center text-sm text-gray-500">
            <div className="inline-block animate-spin mr-2">⟳</div>Loading...
          </div>
        )}

        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Profile card */}
            <div className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-4 mb-3 flex items-center gap-4">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.handle}
                  className="w-16 h-16 rounded-full border-2 border-green-500/30 object-cover shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={`https://codeforces.com/profile/${user.handle}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-white text-base hover:text-green-400 transition-colors flex items-center gap-1"
                    style={{ fontFamily: '"Poppins", sans-serif' }}
                  >
                    {user.handle}
                    <TbExternalLink size={13} className="text-gray-500" />
                  </a>
                  {user.rank && (
                    <span className={`text-xs font-medium capitalize ${getRankColor(user.rank)}`}>
                      {user.rank}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">Last seen: {formatDate(user.lastOnlineTimeSeconds)}</div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[
                { icon: <TbStar size={15} />, label: 'Current Rating', value: user.rating ?? '—', sub: user.rank || 'Unrated', color: getRankColor(user.rank) },
                { icon: <TbTrophy size={15} />, label: 'Max Rating', value: user.maxRating ?? '—', sub: user.maxRank || '—', color: getRankColor(user.maxRank) },
                { icon: <TbCalendarStats size={15} />, label: 'Contests', value: contests ? contests.length : '—', sub: contests?.length ? `Last: ${formatDate(contests[contests.length - 1].ratingUpdateTimeSeconds)}` : '—', color: 'text-green-400' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -3 }}
                  className="rounded-xl border border-gray-700/60 bg-gray-900/40 px-4 py-3"
                >
                  <span className={`flex items-center gap-1.5 mb-1 ${stat.color}`}>
                    {stat.icon}
                    <span className="text-[10px] uppercase tracking-wider text-gray-500">{stat.label}</span>
                  </span>
                  <div className="text-white font-bold text-xl" style={{ fontFamily: '"Poppins", sans-serif' }}>{stat.value}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5 truncate">{stat.sub}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent Contests */}
            {contests && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="rounded-xl border border-gray-700/60 bg-gray-900/40 p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Recent Contests</span>
                  <a
                    href={`https://codeforces.com/contests/with/${activeHandle}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
                  >
                    Full history <TbExternalLink size={11} />
                  </a>
                </div>

                {contests.length === 0 ? (
                  <div className="text-sm text-gray-500 text-center py-4">No contests yet</div>
                ) : (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => scroll(-1)}
                      className="absolute left-0 inset-y-0 z-10 flex items-center justify-center w-7 text-gray-400 hover:text-white transition-colors"
                      aria-label="Previous"
                    >
                      <TbChevronLeft size={18} />
                    </button>

                    <div
                      ref={carouselRef}
                      className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-8"
                    >
                      {recentContests.map((c, idx) => {
                        const delta = c.newRating != null && c.oldRating != null ? c.newRating - c.oldRating : null;
                        const deltaColor = delta === null ? 'text-gray-400' : delta > 0 ? 'text-green-400' : 'text-red-400';
                        return (
                          <motion.a
                            key={c.contestId}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.04, duration: 0.3 }}
                            whileHover={{ y: -3 }}
                            href={`https://codeforces.com/contest/${c.contestId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="min-w-[200px] shrink-0 rounded-lg border border-gray-700/60 bg-gray-800/50 hover:border-green-500/30 p-3 transition-colors duration-200"
                          >
                            <div className="text-xs font-medium text-white truncate leading-snug">{c.contestName}</div>
                            <div className="text-[11px] text-gray-500 mt-1.5">{formatDate(c.ratingUpdateTimeSeconds)}</div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-[11px] text-gray-500">Rank #{c.rank ?? '—'}</span>
                              <span className={`text-sm font-bold ${deltaColor}`}>
                                {delta !== null ? (delta > 0 ? `+${delta}` : `${delta}`) : '—'}
                              </span>
                            </div>
                          </motion.a>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => scroll(1)}
                      className="absolute right-0 inset-y-0 z-10 flex items-center justify-center w-7 text-gray-400 hover:text-white transition-colors"
                      aria-label="Next"
                    >
                      <TbChevronRight size={18} />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
