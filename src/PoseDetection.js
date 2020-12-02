import React, { useRef, useEffect } from 'react';
import { useTF } from './TFContext';
import { useCamera } from './CameraContext';
import { drawKeypoints, drawSkeleton } from "./utils";

const PoseDetection = ({ width, height}) => {
  const canvas = useRef(null);
  const { net } = useTF();
  const { cameraReady } = useCamera();

  useEffect(() => {
    const drawResult = async () => {
      const video = document.getElementById('video');
      const ctx = canvas.current.getContext("2d");
      const [ pose ] = await net.estimatePoses(video, {
        flipHorizontal: true,
        decodingMethod: 'single-person'
      });
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-width, 0);
      ctx.drawImage(video, 0, 0, width, height);
      ctx.restore();
      drawKeypoints(pose["keypoints"], 0.6, ctx);
      drawSkeleton(pose["keypoints"], 0.7, ctx);
      requestAnimationFrame(drawResult);
    };
    if (canvas.current && net && cameraReady) {
      console.log('something changed')
      drawResult();
    }
  }, [canvas.current, !!net, cameraReady])

  return (

    <canvas width={width} heigth={height} ref={canvas}></canvas>
  )
}

export default PoseDetection;