import React, { createContext, useContext, useEffect, useState } from 'react';

import '@tensorflow/tfjs-backend-webgl';
import * as posenet from '@tensorflow-models/posenet';
import { useCamera } from './CameraContext';
import { keyBy } from 'lodash';

const TFContext = createContext();
TFContext.displayName = 'TFContext';


const detectPose = (keypoints) => {
  const { rightWrist, leftWrist, nose, leftShoulder, rightShoulder } = keypoints;
  if (
    (leftShoulder.position.y - nose.position.y) > 200 ||
    (leftShoulder.score < 0.2 || rightShoulder.score < 0.2)
  ) return 'too_close';

  if (
    (rightWrist.position.y > nose.position.y) 
    || (leftWrist.position.y > nose.position.y)
  ) return 'hands_down';
  return 'hands_up';
}

const TFProvider = ({ children }) => {
  const [ net, setNet ] = useState();
  const [ keypoints, setKeypoints ] = useState(null);
  const { cameraReady } = useCamera();

  useEffect(() => {
    const loadNet = async  () => {    
      const net = await posenet.load({
        inputResolution: 300
      });
      setNet(net);
    };
    loadNet();
  }, []);


  useEffect(() => {
    const drawResult = async () => {
      const video = document.getElementById('video');
      const result = await net.estimateSinglePose(video, {
        flipHorizontal: true,
        scoreThreshold: 0.8,
      });
      setKeypoints(keyBy(result.keypoints, 'part'));
      requestAnimationFrame(drawResult);
    };
    if (net && cameraReady && !keypoints) {
      console.log('something changed')
      drawResult();
    }
  }, [!!net, cameraReady, keypoints])

  const pose = keypoints ? detectPose(keypoints) : 'none'
  return <TFContext.Provider value={{ keypoints, pose }}>{children}</TFContext.Provider>
}

const useTF = () => useContext(TFContext);

export { TFProvider, useTF };
