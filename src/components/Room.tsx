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

      // helper: create a standard material from a hex color string, convert color
      // from sRGB to linear space so it reacts correctly to tone mapping without
      // relying on renderer.outputEncoding (which can be problematic on some builds).
      const mat = (hex: string, opts: { roughness?: number; metalness?: number } = {}) => {
        const color = new THREE.Color(norm(hex));
        // convert color from sRGB -> linear to match renderer tone mapping
        color.convertSRGBToLinear();
        return new THREE.MeshStandardMaterial({
          color,
          side: THREE.BackSide,
          roughness: opts.roughness ?? 0.7,
          metalness: opts.metalness ?? 0.0,
        });
      };

      return [
        // right wall: slightly matte
        mat(colors.wall1, { roughness: 0.7 }),
        // left wall
        mat(colors.wall2, { roughness: 0.7 }),
        // ceiling: a bit brighter and matte
        mat(colors.ceiling, { roughness: 0.85 }),
        // floor: slightly less rough to catch subtle reflections
        mat(colors.floor, { roughness: 0.45 }),
        // front wall
        mat(colors.wall3, { roughness: 0.7 }),
        // back wall
        mat(colors.wall4, { roughness: 0.7 }),
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
