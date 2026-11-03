import RecentProjects from '../Components/projects/RecentProjects';
import AboutMe from '../Components/about/AboutMe';
import Intro from '../Components/other/Intro';
import React from 'react';
import Technologies from '../Components/technologies/Technologies';
import Contact from '../Components/contact/Contact';
import Experience from '../Components/experience/Experience';
import Education from '../Components/education/Education';
import Codeforces from '../Components/other/Codeforces';
import Leetcode from '../Components/other/Leetcode';
import { useHomeData } from '../lib/hooks';

export default function Home() {
  const { data, error, loading } = useHomeData();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <span className="inline-block animate-spin text-green-400">⟳</span>
          Loading portfolio...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-red-400 text-sm">Unable to load portfolio content.</p>
        <p className="text-gray-500 text-xs max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-green-400 hover:text-green-300 border border-green-500/30 bg-green-500/10 px-4 py-2 rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  const profile = data?.profile;
  const integrations = data?.integrations || {};

  return (
    <div>
      <Intro profile={profile} />
      <AboutMe about={data?.about} />
      <Experience experiences={data?.experience} />
      <Education education={data?.education} />
      <RecentProjects projects={data?.projects} />
      <Technologies categories={data?.technologies} />
      <Codeforces handle={integrations.codeforces_handle || profile?.codeforces_handle} />
      <Leetcode username={integrations.leetcode_username || profile?.leetcode_username} />
      <Contact />
    </div>
  );
}
