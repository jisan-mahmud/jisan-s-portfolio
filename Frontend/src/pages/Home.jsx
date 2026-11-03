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
import { HomeSkeleton } from '../Components/loading/Skeletons';
import Seo from '../Components/Seo';
import { resolveMediaUrl } from '../lib/api';

export default function Home() {
  const { data, error, loading } = useHomeData();
  const profile = data?.profile;
  const name = profile?.full_name || 'Jisan Mahmud';
  const description =
    profile?.bio_short ||
    'Explore the portfolio of Jisan Mahmud, a backend-focused full-stack developer building APIs and web applications with Django, Python, and React.';
  const siteOrigin = new URL(import.meta.env.VITE_SITE_URL || window.location.origin).origin;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: profile?.headline || 'Backend-Focused Full-Stack Developer',
    description,
    url: siteOrigin,
    image: new URL(resolveMediaUrl(profile?.avatar) || '/images/jisan-mahmud.png', siteOrigin).href,
    sameAs: profile?.socials?.map((social) => social.url).filter(Boolean) || [],
  };

  if (loading) {
    return (
      <>
        <Seo path="/" />
        <HomeSkeleton />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Seo path="/" />
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
      </>
    );
  }

  const integrations = data?.integrations || {};

  return (
    <>
      <Seo
        path="/"
        title={`${name} | ${profile?.headline || 'Backend-Focused Full-Stack Developer'}`}
        description={description}
        image={profile?.avatar}
        structuredData={structuredData}
      />
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
    </>
  );
}
