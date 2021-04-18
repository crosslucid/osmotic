import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas } from 'react-three-fiber'
import { useTF } from '../TFContext';
import { useRunningAverage } from '../hooks';
import round from 'lodash/round';
import Obj from './Obj';
import Video from './Video';

const detectNoseOffset = (keypoints, width, height) => {
  if (!keypoints || !keypoints.nose) return { x: 0, y: 0 };
  const { position, score } = keypoints.nose;

  return {
    x: round((position.x - width / 2) / width, 3),
    y: round((position.y - height / 2) / height, 3),
  }
}

const MainExperience = () => {
  const { keypoints } = useTF();
  const [queue, setQueue] = useState([]);
  const video = document.getElementById('backgroundVideo');
  const shapeInclination = detectNoseOffset(keypoints, 800, 600)

  const x = useRunningAverage(shapeInclination.x, 8);
  const y = useRunningAverage(shapeInclination.y, 8);
  return (
    <div className="MainExperience">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <group>
          <Obj {...{x, y, video}} />
          <Video shapeInclination={{ x, y }} video={video} />
        </group>
      </Canvas>
    </div>

  )
}

export default MainExperience;