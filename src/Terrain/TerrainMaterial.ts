import { positionGeometry, smoothstep, texture, vec3 } from "three/tsl";
import * as THREE from "three/webgpu";
import { HeightMap } from "./HeightMap";
import { getGridPointNode } from "./customNodes/getGridPointNode";
import { normalizeGridPointNode } from "./customNodes/normalizeGridPointNode";

export class TerrainMaterial extends THREE.MeshBasicNodeMaterial {
  constructor(n: number, size: number, heightMap: HeightMap) {
    super({ wireframe: false });

    const gridPosition = getGridPointNode(n, size);
    const heightMapUv = normalizeGridPointNode(n, size, gridPosition);

    const heightMapColor = texture(heightMap, heightMapUv);
    const height = heightMapColor.r;

    const topMask = smoothstep(0.0, 0.01, positionGeometry.y);

    const position = vec3(gridPosition.x, height.mul(topMask), gridPosition.y);
    this.positionNode = positionGeometry.add(position);

    const redColorNode = vec3(height).div(2);
    this.colorNode = redColorNode;
  }
}
