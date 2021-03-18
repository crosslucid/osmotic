import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { useAspect } from "@react-three/drei/useAspect";

const Video = ({ video, shapeInclination={x: 0, y: 0}, scaleFactor=1.8 }) => {
  const [x, y] = useAspect("cover", 1800, 1000);
  const mesh = useRef();
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = shapeInclination.y * 0.6;
      mesh.current.rotation.y = shapeInclination.x * 0.6;
    }
  });

  return video ? 
    <mesh scale={[x * scaleFactor, y * scaleFactor, 0]} position={[0, 0, -3]} ref={mesh}>
      <planeBufferGeometry args={[2, 2]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </mesh> : null;
}

export default Video;