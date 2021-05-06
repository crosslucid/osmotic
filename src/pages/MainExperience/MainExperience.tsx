/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useTF } from '../../contexts/TFContext';


const MainExperience = () => {
  const { pose } = useTF();
  const [ position, setPosition ] = useState<number>(0);
  const [ step, setStep ] = useState<string>('RUNNING_EXPERIENCE')
  const [ incorrectPoseTime, setIncorrectPoseTime ] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    console.log(pose)
    if (pose !== 'hands_up') {
      if (incorrectPoseTime < 20) setIncorrectPoseTime(incorrectPoseTime + 1);
    } else {
      setIncorrectPoseTime(0)
    }
  }, [position])

  useEffect(() => {
    const applyStep = () => {
      if (step === 'END_EXPERIENCE') return;
      if ((incorrectPoseTime < 4)) {
        setStep('RUNNING_EXPERIENCE')
        return;
      }
      if (incorrectPoseTime < 20) {
        setStep('DARKENING');
        return;
      }
      setStep('END_EXPERIENCE')
    }
    applyStep();
    console.log({ step, incorrectPoseTime })
  }, [incorrectPoseTime])


  return (
    <div className="Page MainExperience">
      <div className="Debugger">
        Position: { position }
        <br />
        Step: { step }
        <br />
        Incorrect pose time: { incorrectPoseTime }
      </div>
      <audio
         src="https://osmotic-passage.s3.eu-central-1.amazonaws.com/EXPERIENCE_STAND_IN.mp3"
         autoPlay
         loop
      />
      <video
        style={{
          transition: '1s filter linear',
          filter: `blur(${incorrectPoseTime * 2}px) saturate(${1 + incorrectPoseTime / 2})`
        }}
        ref={videoRef}
        id="VideoSource"
        crossOrigin="anonymous"
        src="https://osmotic-passage.s3.eu-central-1.amazonaws.com/OSMOTIC_PASSAGE_XR_NOSOUND.mp4"
      />
    </div>
  )
}

export default MainExperience;