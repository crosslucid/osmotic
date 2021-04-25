import React from 'react';
import { useTF } from '../../contexts/TFContext';
import TextLine from '../../components/TextLine';

const IntroExperience = () => {
  const { pose } = useTF();
  return (
    <div className="Page PoseDetection">
      { pose }
      <TextLine text="I am a line" />
    </div>
  )
};

export default IntroExperience;