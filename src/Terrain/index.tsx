import { useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three/webgpu";
import { HeightMap } from "./HeightMap";
import { TerrainMaterial } from "./TerrainMaterial";

export function Terrain() {
  const n = 50;
  const size = 0.25;

  const gl = useThree((state) => state.gl as any as THREE.WebGPURenderer);

  const instancedMeshRef = useRef<THREE.InstancedMesh>(null!);

  const heightMap = useMemo(() => new HeightMap(n, size), [n]);
  const terrainMaterial = useMemo(
    () => new TerrainMaterial(n, size, heightMap),
    [n, size, heightMap]
  );

  useLayoutEffect(() => () => terrainMaterial.dispose(), [terrainMaterial]);
  useEffect(() => {
    gl.computeAsync(heightMap.computeNode)
      .then(() => {
        console.log("HeightMap computed successfully");
      })
      .catch((error) => {
        console.error("Error computing HeightMap:", error);
        alert(error);
      });

    return () => heightMap.dispose();
  }, [heightMap]);

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[null!, terrainMaterial, n * n]}
    >
      <cylinderGeometry args={[size / 2, size / 2, 0.5, 6, 1]} />
    </instancedMesh>
  );
}
