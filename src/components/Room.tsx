"use client";

import * as THREE from "three";
import { useMemo } from "react";

export default function Room({
  colors,
}: {
  colors: {
    floor: string;
    ceiling: string;
    wall1: string;
    wall2: string;
    wall3: string;
    wall4: string;
  };
}) {
  const width = 6;
  const height = 3;
  const depth = 6;

  // Create materials only once
  const materials = useMemo(
    () => {
      // three.js may not accept 8-digit hex strings with alpha (e.g. "#rrggbbaa").
      // Normalize to 6-digit hex before creating THREE.Color.
      const norm = (c: string) => {
        if (!c || typeof c !== "string") return c;
        if (c.startsWith("#") && c.length === 9) return c.slice(0, 7);
        return c;
      };

      return [
        new THREE.MeshStandardMaterial({ color: new THREE.Color(norm(colors.wall1)), side: THREE.BackSide }), // right
        new THREE.MeshStandardMaterial({ color: new THREE.Color(norm(colors.wall2)), side: THREE.BackSide }), // left
        new THREE.MeshStandardMaterial({ color: new THREE.Color(norm(colors.ceiling)), side: THREE.BackSide }), // top
        new THREE.MeshStandardMaterial({ color: new THREE.Color(norm(colors.floor)), side: THREE.BackSide }), // bottom
        new THREE.MeshStandardMaterial({ color: new THREE.Color(norm(colors.wall3)), side: THREE.BackSide }), // front
        new THREE.MeshStandardMaterial({ color: new THREE.Color(norm(colors.wall4)), side: THREE.BackSide }), // back
      ];
    },
    [colors]
  );

  return (
    <mesh material={materials}>
      <boxGeometry args={[width, height, depth]} />
    </mesh>
  );
}
