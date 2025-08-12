import { wgslFn } from "three/tsl";
import { psrdNoiseNode } from "./psrdNoiseNode";

export const getPsrdNoiseNode = wgslFn(
  `
	fn getPsrdNoiseNode( x: vec2<f32>, octaves: i32, frequency: f32, persistence: f32, lacunarity: f32 ) -> f32 {
		var noise: f32 = 0.0;
		var freq: f32 = frequency;
		var amplitude: f32 = 1.0;
		var maxAmplitude: f32 = 0.0;
		for (var i: i32 = 0; i < octaves; i = i + 1) {
			var n: f32 = sdnoise2( x * freq ).noise * 0.5 + 0.5;
			noise = noise + n * amplitude;
			maxAmplitude = maxAmplitude + amplitude;
			amplitude = amplitude * persistence;
			freq = freq * lacunarity;
		}

		return noise / maxAmplitude;
	}
`,
  [psrdNoiseNode as any]
);
