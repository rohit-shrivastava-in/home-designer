"use client";

import * as THREE from "three";

export default function Room({ color, colors }: { color: string, colors: any }) {
  const width = 6;
  const height = 3;
  const depth = 6;

  return (
    <mesh>
      <boxGeometry args={[width, height, depth]} />
      {/* BackSide makes us see walls from inside */}
      <meshStandardMaterial color={color} side={THREE.BackSide} />
    </mesh>
  );
}
