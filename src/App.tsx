import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import * as THREE from "three/webgpu";

import { Terrain } from "./Terrain";

export default function App() {
  return (
    <>
      <Canvas
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer(props as any);
          await renderer.init();
          return renderer;
        }}
      >
        <OrbitControls makeDefault />
        <PerspectiveCamera position={[5, 5, 5]} makeDefault />

        <axesHelper />
        <gridHelper />

        <Terrain />
      </Canvas>
    </>
  );
}
