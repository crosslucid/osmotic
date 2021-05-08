/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import { useTF } from '../../contexts/TFContext';
declare global {
  interface Window { filter: any; }
}

const MainExperience = () => {
  const { pose } = useTF();
  const [ position, setPosition ] = useState<number>(0);
  const [ step, setStep ] = useState<string>('RUNNING_EXPERIENCE')
  const [ filter, setFilter ] = useState<BiquadFilterNode>()
  const [ incorrectPoseTime, setIncorrectPoseTime ] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio) return;
    video.play();
    const onTimeUpdate = ({ timeStamp }:{ timeStamp: number }) => {
      setPosition(Math.round(video.currentTime))
    }
    const context = new AudioContext();
    const source = context.createMediaElementSource(audio);
    const myFilter = context.createBiquadFilter();
    myFilter.frequency.value = 10000;
    window.filter = myFilter;
    source.connect(myFilter);
    myFilter.connect(context.destination)
    setFilter(myFilter)

    video.addEventListener('timeupdate', onTimeUpdate)
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, []);

  useEffect(() => {
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
  }, [incorrectPoseTime])

  useEffect(() => {
    if (['DARKENING', 'END_EXPERIENCE']) {
      if (filter) {
        filter.frequency.value = 10000 - incorrectPoseTime * 480;
      }
    }
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
         src="/soundtrack.mp3"
         ref={audioRef}
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
        className="VideoSource"
        crossOrigin="anonymous"
        autoPlay
        src="https://osmotic-passage.s3.eu-central-1.amazonaws.com/OSMOTIC_PASSAGE_XR_NOSOUND.mp4"
      />
      <video
        ref={videoRef}
        className="VideoSource object"
        crossOrigin="anonymous"
        autoPlay
        src="https://osmotic-passage.s3.eu-central-1.amazonaws.com/OP_XP_ALPHA.webm"
      />
    </div>
  )
}

export default MainExperience;