import React from 'react';
import { useTF } from '../TFContext';
import TextLine from '../components/TextLine';

const IntroExperience = () => {
  const { pose, keypoints } = useTF();
  return (
    <div className="PoseDetection">
      { pose }
      <TextLine text="I am a line" />
    </div>
  )
};

export default IntroExperience;