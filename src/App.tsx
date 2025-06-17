import {
  Bounds,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";

import * as THREE from "three/webgpu";
import { MeshBasicNodeMaterial, MeshStandardNodeMaterial } from "three/webgpu";

import { Model } from "./Model";

extend({ MeshBasicNodeMaterial, MeshStandardNodeMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshBasicNodeMaterial: any;
      meshStandardNodeMaterial: any;
    }
  }
}

function Thing() {
  return <Model />;
}

export default function App() {
  return (
    <>
      <Canvas
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer(props as any);
          await renderer.init();
          return renderer;
        }}
        camera={{ fov: 50, position: [0, 300, -85] }}
        onCreated={(state) => {
          state.setSize(window.innerWidth, window.innerHeight);
        }}
      >
        <OrbitControls makeDefault autoRotate />
        <PerspectiveCamera position={[2, 1, 2]} makeDefault />

        <Environment
          files={"/demo-2023-r3f-webgpu/venice_sunset_1k (1).hdr"}
          background
          blur={0.4}
        />
        <ambientLight intensity={0.5} />

        <Bounds fit clip observe margin={1.3}>
          <Thing />
        </Bounds>
      </Canvas>
    </>
  );
}
