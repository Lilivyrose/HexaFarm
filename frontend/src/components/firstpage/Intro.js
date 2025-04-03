import React from 'react';
import Header from './Header';
import Spotlight from './Spotlight';
import About from './About';
import Footer from './Footer';

const Intro = () => {
  return (
    <div className="intro-page">
      <Header />
      <Spotlight />
      <About />
      <Footer />
    </div>
  );
};

export default Intro;