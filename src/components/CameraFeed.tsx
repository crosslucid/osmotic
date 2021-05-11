import { useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import type { AppErrors } from '../contexts/AppContext'

const setupCamera = async (video:HTMLVideoElement, onError:(error: AppErrors) => void):Promise<void> => {
  const width = 600;
  const height = 400;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      'audio': false,
      'video': {
        facingMode: 'user',
        width: width,
        height: height,
      },
    });
    video.srcObject = stream;
  } catch {
    onError('CameraPermissionRejected');
  } 

  return new Promise((resolve) => {
    video.onloadeddata = () => {
      video.play();
      resolve();
    };
  });
}

const CameraFeed = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { sendError, advanceStep } = useApp();
  
  useEffect(() => {
    const loadCamera = async () => {
      if (videoRef.current) {
        await setupCamera(videoRef.current, sendError);
        advanceStep();
      }
    }
    loadCamera();
  }, [sendError, advanceStep, videoRef]);

  return (
    <video ref={videoRef} id="CameraFeed" width="600" height="400"></video>
  )
}

export default CameraFeed;
