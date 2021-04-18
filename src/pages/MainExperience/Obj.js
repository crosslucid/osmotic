import React, { useRef, Suspense } from 'react';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useFrame, useLoader } from 'react-three-fiber'
import {MeshPhongMaterial, FrontSide, VideoTexture, Vector2 } from 'three';

const Asset = ({ url, video }) => {
  const fbx = useLoader(FBXLoader, url)
  const texture = new VideoTexture(video)
  const material = new MeshPhongMaterial({ transparent: true, opacity: 0.7, depthTest: false, color: 'white', shininess: 100, diffuse: 'blue', reflectivity: 1  });
  fbx.children[0].material = material;
  return <primitive object={fbx} dispose={null} scale={[0.4, 0.4]} />
}

const Obj = ({ x, y, video })=>{
  const mesh = useRef();
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = y + 0.5;
      mesh.current.rotation.y = x + 0.1;
      mesh.current.position.x = x + 1;
    }
  });

  return (
    <group dispose={null} ref={mesh}>
      <Suspense fallback={null}>
        <Asset url={"/model.fbx"} {...{video}} ></Asset>
      </Suspense>
    </group>
  );
}

export default Obj;