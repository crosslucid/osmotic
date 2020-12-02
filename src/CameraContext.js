import React, { createContext, useContext, useEffect, useState } from 'react';


const CameraContext = createContext();
CameraContext.displayName = 'CameraContext';



const setupCamera = async () => {
  const video = document.getElementById('video');
  const width = 600;
  const height = 300;

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

  useEffect(() => {
    const loadCamera = async () => {
      await setupCamera();
      setCameraReady(true);
    }
    loadCamera();
  });

  return <CameraContext.Provider value={{ cameraReady }}>{children}</CameraContext.Provider>
}

const useCamera = () => useContext(CameraContext);

export { CameraProvider, useCamera };
