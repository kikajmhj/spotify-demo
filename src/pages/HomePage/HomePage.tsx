import React from 'react';
import NewReleases from './components/NewReleases';
import Tracks from './components/Tracks';
import Albums from './components/Albums';

export const HomePage = () => {
  return (
    <div> 
      <NewReleases/> 
      <Tracks/>
      <Albums/>  
    </div>
  );
};

export default HomePage;
