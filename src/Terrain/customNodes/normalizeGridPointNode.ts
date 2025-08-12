import { float, Fn, vec2 } from "three/tsl";

type NormalizeGridPointNodeProps = [
  ReturnType<typeof float>,
  ReturnType<typeof float>,
  ReturnType<typeof vec2>
];

export const normalizeGridPointNode =
  /*@__PURE__*/ Fn<NormalizeGridPointNodeProps>(([n, size, position]) => {
    // Get grid dimentions
    const gridWidth = n.mul(size).mul(Math.sqrt(3)).div(2);
    const gridHeight = n.mul(size).mul(3 / 4);

    const heightMapUv = position.div(vec2(gridWidth, gridHeight)).add(0.5);

    return heightMapUv;
  });
