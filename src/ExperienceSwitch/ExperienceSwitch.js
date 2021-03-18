import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import MainExperience from '../MainExperience';
import IntroExperience from '../IntroExperience';

const ExperienceSwitch = () => {
  const intro = true ;
  return (
    intro ?
      <IntroExperience /> :
      <MainExperience />
  )
}

export default ExperienceSwitch;