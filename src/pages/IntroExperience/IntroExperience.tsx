/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useTF } from '../../contexts/TFContext';
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
  INSTRUCTION_START: { end: 133 },
  INSTRUCTION_WAIT: { start: 141, end: 148 },
  INSTRUCTIONS_DONE: { start: 163, end: 168 }
};

const textMap:{ [key: string]: (pose:string, correctPoseTime:number) => string | JSX.Element } = { 
  'BEGINNING': () => 'intro video',
  'ACCESS': () => 'waiting for user click',
  'INSTRUCTION_START': () => 'intro for instructions',
  'INSTRUCTION_WAIT': (pose, correctPoseTime) => <>
    waiting for the user to assume pose
    <br />
    Pose: {pose}
    <br />
    Correct pose time: { correctPoseTime }
  </>,
  'INSTRUCTION_DONE': (pose, correctPoseTime) => <>
    about to start experience
    <br />
    Correct pose time: { correctPoseTime }
  </>
}

const IntroExperience = () => {
  const { pose } = useTF();
  const [ position, setPosition ] = useState<number>(0);
  const [ correctPoseTime, setCorrectPoseTime ] = useState<number>(0);
  const [ step, setStep ] = useState<IntroStep>('BEGINNING');
  const { advanceStep } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClick = () => (step === 'ACCESS') && setStep('INSTRUCTION_START');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play();
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
      case 'INSTRUCTION_START':
        if (position > timeStamps.INSTRUCTION_START.end) setStep('INSTRUCTION_WAIT');
        break;
      case 'INSTRUCTION_WAIT':
        if (position > timeStamps.INSTRUCTION_WAIT.end) {
          video.currentTime = timeStamps.INSTRUCTION_WAIT.start;
        }
        if (pose === 'hands_up') {
          setCorrectPoseTime(correctPoseTime + 1);
        } else {
          setCorrectPoseTime(0)
        }
        break;
      case 'INSTRUCTION_DONE':
        if (position < timeStamps.INSTRUCTIONS_DONE.start) {
          video.currentTime = timeStamps.INSTRUCTIONS_DONE.start;
        }
        if (position > timeStamps.INSTRUCTIONS_DONE.end) {
          advanceStep();
        }
        break;
    }
  }, [position, step, pose])

  useEffect(() => {
    if (correctPoseTime > 10) setStep('INSTRUCTION_DONE')
  }, [correctPoseTime])

  return (
    <div className="Page IntroExperience" onClick={handleClick}>
      <div className="Debugger">
        Time: { position }
        <br />
        Step: { step }
        <br />
        { textMap[step](pose, correctPoseTime) }
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
        crossOrigin="anonymous"
        src="https://osmotic-passage.s3.eu-central-1.amazonaws.com/OSMOTIC_PASSAGE_INTRO_TEXT.mp4"
      />
    </div>
  )
};

export default IntroExperience;