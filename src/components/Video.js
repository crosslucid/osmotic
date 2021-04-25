import { useRef } from 'react';
import { useAspect } from "@react-three/drei/useAspect";

const Video = ({ video, scaleFactor=1 }) => {
  const [x, y] = useAspect("cover", 1800, 1000);
  const mesh = useRef();

  return video ? 
    <mesh scale={[x * scaleFactor, y * scaleFactor, 0]} position={[0, 0, -3]} ref={mesh}>
      <planeBufferGeometry args={[2, 2]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </mesh> : null;
}

export default Video;