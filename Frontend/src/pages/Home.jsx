import RecentProjects from '../Components/projects/RecentProjects';
import AboutMe from '../Components/about/AboutMe';
import Intro from '../Components/other/Intro';
import React from 'react';
import Technologies from '../Components/technologies/Technologies';

export default function Home() {
  return (
    <div>
      <Intro/>
      <AboutMe/>
      <RecentProjects/>
      <Technologies/>
    </div>
  );
}
