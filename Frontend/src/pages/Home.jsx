import RecentProjects from '../Components/projects/RecentProjects';
import AboutMe from '../Components/about/AboutMe';
import Intro from '../Components/other/Intro';
import React from 'react';
import Technologies from '../Components/technologies/Technologies';
import Contact from '../Components/contact/Contact';
import Footer from '../Components/footer/Footer';
import Experience from '../Components/experience/Experience';
import Education from '../Components/education/Education';
import Codeforces from '../Components/other/Codeforces';

export default function Home() {
  return (
    <div>
      <Intro/>
      <AboutMe/>
      <Experience/>
      <Education/>
      <RecentProjects/>
      <Technologies/>
      <Codeforces />
      <Contact/>
      <Footer/>
    </div>
  );
}
