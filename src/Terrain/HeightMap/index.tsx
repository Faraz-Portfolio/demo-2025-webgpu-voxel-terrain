import { Fn, instanceIndex, textureStore, uvec2, vec4 } from "three/tsl";
import * as THREE from "three/webgpu";
import { getGridPointNode } from "../customNodes/getGridPointNode";
import { getPsrdNoiseNode } from "../customNodes/getPsrdNoiseNode";

export class HeightMap extends THREE.StorageTexture {
  constructor(private _n: number, private _size: number) {
    super(_n, _n);
    this.minFilter = THREE.NearestFilter;
    this.magFilter = THREE.NearestFilter;
    this.generateMipmaps = false;
    this.format = THREE.RGBAFormat;
    this.type = THREE.FloatType;
  }

  get computeNode() {
    const computeTexture = Fn<{ storageTexture: THREE.StorageTexture }>(
      ({ storageTexture }) => {
        const gridPosition = getGridPointNode(this._n, this._size);

        const posX = instanceIndex.mod(this.width);
        const posY = instanceIndex.div(this.height);
        const indexUV = uvec2(posX, posY);

        const psrdInput = gridPosition.mul(0.3);
        const psrdNoise = getPsrdNoiseNode({
          x: psrdInput,
          octaves: 4,
          frequency: 1.0,
          persistence: 0.5,
          lacunarity: 2.0,
        }).mul(2.0);

        textureStore(
          storageTexture,
          indexUV,
          vec4(psrdNoise, 0, 0, 1)
        ).toWriteOnly();
      }
    );

    const storageTexture = this;
    const computeNode = computeTexture({ storageTexture }).compute(
      this.width * this.height
    );

    return computeNode;
  }
}
