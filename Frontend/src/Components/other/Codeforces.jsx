import React, { useEffect, useRef, useState } from 'react';
import { fetchCodeforcesUser, fetchCodeforcesContests } from '../../lib/utils';
import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';

function formatDateSeconds(sec) {
  if (!sec) return '—';
  const d = new Date(sec * 1000);
  return d.toLocaleString();
}

export default function Codeforces({ handle }) {
  const envHandle = import.meta.env.VITE_CODEFORCES_HANDLE || '';
  const initial = (handle || envHandle || '').trim();

  const [inputHandle, setInputHandle] = useState(initial);
  const [activeHandle, setActiveHandle] = useState(initial);
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
    ]).then(results => {
      if (!mounted) return;
      const [userRes, contestsRes] = results;
      if (userRes.status === 'fulfilled') setUser(userRes.value);
      else setError(userRes.reason?.message || 'Failed to fetch user');
      if (contestsRes.status === 'fulfilled') setContests(contestsRes.value || []);
      else setContests([]); // no contests or failed — show empty
      setLoading(false);
    }).catch(e => {
      if (!mounted) return;
      setError(e.message || 'Failed');
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [activeHandle]);

  const submit = (e) => {
    e?.preventDefault();
    const h = inputHandle.trim();
    if (h) setActiveHandle(h);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      id="codeforces"
      className="w-full p-4 sm:px-6 my-10 scroll-mt-32 border-gray-700 border rounded-2xl max-w-3xl mx-auto"
    >
      <div className="section-card">
        <motion.h2
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title flex items-center gap-2"
          style={{ fontFamily: '"Poppins", sans-serif' }}
        >
          <FaCode />
          Codeforces
        </motion.h2>

        {activeHandle && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400 mb-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20"
              >
                {error}
              </motion.div>
            )}
            {loading && (
              <div className="text-sm text-slate-400 text-center py-8">
                <div className="inline-block animate-spin">⟳</div> Loading...
              </div>
            )}

            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row sm:items-start gap-6"
              >
                {user.avatar && (
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={user.avatar}
                    alt={user.handle}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-green-500/30 object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <a
                      href={`https://codeforces.com/profile/${user.handle}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-green-400 text-xl hover:text-green-300 transition"
                      style={{ fontFamily: '"Poppins", sans-serif' }}
                    >
                      {user.handle}
                    </a>
                    <div className="text-xs text-slate-400">Last seen: {formatDateSeconds(user.lastOnlineTimeSeconds)}</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="p-4 rounded-lg border border-white/10"
                    >
                      <div className="text-xs text-slate-400 uppercase tracking-wide font-medium">Current Rating</div>
                      <div className="text-2xl font-bold text-green-400 mt-1">{user.rating ?? '—'}</div>
                      <div className="text-xs text-slate-500 mt-1">{user.rank || 'Unrated'}</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="p-4 rounded-lg border border-white/10"
                    >
                      <div className="text-xs text-slate-400 uppercase tracking-wide font-medium">Max Rating</div>
                      <div className="text-2xl font-bold text-blue-400 mt-1">{user.maxRating ?? '—'}</div>
                      <div className="text-xs text-slate-500 mt-1">{user.maxRank || '—'}</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="p-4 rounded-lg border border-white/10"
                    >
                      <div className="text-xs text-slate-400 uppercase tracking-wide font-medium">Total Contests</div>
                      <div className="text-2xl font-bold text-purple-400 mt-1">{contests ? contests.length : '—'}</div>
                      <div className="text-xs text-slate-500 mt-1">Latest: {contests && contests.length ? formatDateSeconds(contests[contests.length - 1].ratingUpdateTimeSeconds) : '—'}</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {contests && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-400 text-sm uppercase tracking-wide font-medium">Recent Contests</span>
                  <a
                    href={`https://codeforces.com/contests/with/${activeHandle}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-green-400 hover:text-green-300 transition"
                  >
                    Full history →
                  </a>
                </div>

                {contests.length === 0 ? (
                  <div className="text-sm text-slate-400 text-center py-6">No contests yet</div>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-1 z-10">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (!carouselRef.current) return;
                          carouselRef.current.scrollBy({ left: -carouselRef.current.clientWidth * 0.8, behavior: 'smooth' });
                        }}
                        className="h-10 w-10 flex items-center justify-center rounded-full text-white shadow-lg transition"
                        aria-label="Previous contest"
                      >
                        ‹
                      </motion.button>
                    </div>
                    <div
                      ref={carouselRef}
                      className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-4 pr-12"
                      style={{ scrollBehavior: 'smooth' }}
                    >
                      {contests.slice(-8).reverse().map((c, idx) => {
                        const link = `https://codeforces.com/contest/${c.contestId}`;
                        const delta = c.newRating != null && c.oldRating != null ? c.newRating - c.oldRating : null;
                        const deltaColor = delta === null ? 'text-slate-400' : delta > 0 ? 'text-green-400' : 'text-red-400';
                        return (
                          <motion.a
                            key={c.contestId}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05, duration: 0.4 }}
                            whileHover={{ y: -5 }}
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="min-w-[280px] flex-shrink-0 rounded-2xl border border-white/10 p-4 shadow-lg transition"
                          >
                            <div className="text-sm font-semibold text-green-400 truncate">{c.contestName}</div>
                            <div className="text-xs text-slate-500 mt-2">{formatDateSeconds(c.ratingUpdateTimeSeconds)}</div>
                            <div className={`mt-3 text-lg font-semibold ${deltaColor}`}>
                              {delta !== null ? (delta > 0 ? `+${delta}` : `${delta}`) : '—'}
                            </div>
                          </motion.a>
                        );
                      })}
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-1 z-10">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (!carouselRef.current) return;
                          carouselRef.current.scrollBy({ left: carouselRef.current.clientWidth * 0.8, behavior: 'smooth' });
                        }}
                        className="h-10 w-10 flex items-center justify-center rounded-full text-white shadow-lg transition"
                        aria-label="Next contest"
                      >
                        ›
                      </motion.button>
                    </div>
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
