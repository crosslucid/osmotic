/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useApp } from '../../contexts/AppContext';

const introSteps = [
  'BEGINNING',
  'ACCESS',
  'INSTRUCTION_START',
  'INSTRUCTION_WAIT',
  'INSTRUCTION_DONE',
] as const;
type IntroStep = typeof introSteps[number];

const timeStamps = {
  BEGINNING: { end: 83 },
  ACCESS: { start: 84.5, end: 85 },
};

const IntroExperience = () => {
  const [ position, setPosition ] = useState<number>(0);
  const [ step, setStep ] = useState<IntroStep>('BEGINNING');
  const { advanceStep } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => {
    if (step === 'ACCESS') advanceStep();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = ({ timeStamp }:{ timeStamp: number }) => {
      setPosition(Math.round(video.currentTime))
    }
    video.addEventListener('timeupdate', onTimeUpdate)
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, []);

  useEffect(() => {
    audioRef.current!.volume = 0.4
  }, [audioRef.current]);


  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    switch (step) {
      case 'BEGINNING':
        if (position > timeStamps.BEGINNING.end) setStep('ACCESS');
        break;
      case 'ACCESS':
        if (position > timeStamps.ACCESS.end) {
          video.currentTime = timeStamps.ACCESS.start;
        }
        break;
    }
  }, [step, position])

  return (
    <div className="Page IntroExperience" onClick={handleClick}>
      <div className="Debugger">
        Time: { position }
        <br />
        Step: { step }
      </div>
      <audio
         src="https://osmotic-passage.s3.eu-central-1.amazonaws.com/OSMOTIC_PASSAGE_EXP_SOUND.mp4"
         autoPlay
         loop
         ref={audioRef}
      />
      <video
        ref={videoRef}
        id="VideoSource"
        className="VideoSource"
        autoPlay
        crossOrigin="anonymous"
        src="https://osmotic-passage.s3.eu-central-1.amazonaws.com/OSMOTIC_PASSAGE_INTRO_TEXT.mp4"
      />
    </div>
  )
};

export default IntroExperience;