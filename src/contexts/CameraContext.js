import React, { createContext, useContext, useEffect, useState, useRef } from 'react';


const CameraContext = createContext();
CameraContext.displayName = 'CameraContext';

const setupCamera = async (video) => {
  const width = 600;
  const height = 400;

  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      width: width,
      height: height,
    },
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadeddata = () => {
      video.play();
      resolve();
    };
  });
}

const CameraProvider = ({ children }) => {
  const [ cameraReady, setCameraReady ] = useState(false);
  const videoRef = useRef();
  useEffect(() => {
    const loadCamera = async () => {
      await setupCamera(videoRef.current);
      setCameraReady(true);
    }
    videoRef.current && !cameraReady && loadCamera();
  }, [cameraReady, setCameraReady]);

  return (
    <CameraContext.Provider value={{ cameraReady }}>
      <video ref={videoRef} id="video" width="600" height="400"></video>
      {children}
    </CameraContext.Provider>
  )
}

const useCamera = () => useContext(CameraContext);

export { CameraProvider, useCamera };
