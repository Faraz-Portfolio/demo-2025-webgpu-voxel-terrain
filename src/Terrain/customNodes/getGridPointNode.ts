import { float, Fn, instanceIndex, vec2 } from "three/tsl";

type GetGridPointNodeProps = [
  ReturnType<typeof float>,
  ReturnType<typeof float>
];

export const getGridPointNode = /*@__PURE__*/ Fn<GetGridPointNodeProps>(
  ([n, size]) => {
    // Lay out in grid
    let positionX = float(instanceIndex).div(n).floor() as any;
    let positionZ = float(instanceIndex).mod(n).floor() as any;

    // Center grid
    positionX = positionX.sub(n.div(2).sub(0.5));
    positionZ = positionZ.sub(n.div(2).sub(0.5));

    // Nudge every other row to create a hexagonal grid
    positionX = positionX.add(positionZ.mod(2).mul(0.5).mul(-1).add(0.5));

    // Close the gaps between hexagons
    positionX = positionX.mul(size.mul(Math.sqrt(3)).div(2));
    positionZ = positionZ.mul(size.mul(3 / 4));

    return vec2(positionX, positionZ);
  }
);
