"use client";

import * as THREE from "three";
import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import library from "@/config/library";

export default function Room({
  colors,
  wallpapers,
  dimensions = { width: 6, height: 3, depth: 6 },
}: {
  colors: {
    floor: string;
    ceiling: string;
    wall1: string;
    wall2: string;
    wall3: string;
    wall4: string;
  };
  wallpapers?: Partial<{
    floor: string;
    ceiling: string;
    wall1: string;
    wall2: string;
    wall3: string;
    wall4: string;
  }>;
  dimensions?: { width: number; height: number; depth: number };
}) {
  const { width, height, depth } = dimensions;

  // Prepare wallpaper textures (one per face) — keep stable 6-item array so hooks don't change
  const placeholder =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

  const faceOrder = ["wall1", "wall2", "ceiling", "floor", "wall3", "wall4"] as const;
  // Get urls and sizes for each face
  type WallpaperObj = { url: string; size: { width: number; height: number } };
  const urls = faceOrder.map((k) => {
    const wp = wallpapers && (wallpapers[k] as WallpaperObj | string | undefined);
    if (!wp) return placeholder;
    if (typeof wp === 'string') return wp;
    return wp.url;
  });
  const sizes = faceOrder.map((k) => {
    const wp = wallpapers && (wallpapers[k] as WallpaperObj | string | undefined);
    if (!wp || typeof wp === 'string') return undefined;
    return wp.size;
  });
  const textures = useLoader(THREE.TextureLoader, urls);

  // Create materials only once
  const materials = useMemo(
    () => {
      // Normalize color to 6-digit hex and convert sRGB to linear
      const norm = (c: string) => {
        if (!c || typeof c !== "string") return c;
        if (c.startsWith("#") && c.length === 9) return c.slice(0, 7);
        if (c.startsWith("#") && c.length === 4) {
          // Expand #rgb to #rrggbb
          return '#' + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];
        }
        return c;
      };

      const mat = (hex: string, opts: { roughness?: number; metalness?: number } = {}) => {
        let color = new THREE.Color(norm(hex));
        // Always convert sRGB to linear for correct display
        if (color.isColor) color = color.convertSRGBToLinear();
        return new THREE.MeshStandardMaterial({
          color,
          side: THREE.BackSide,
          roughness: opts.roughness ?? 0.7,
          metalness: opts.metalness ?? 0.0,
        });
      };

      // Wall face dimensions (width, height) for each face in boxGeometry order
      const faceDims = [
        { width: depth, height },   // wall1: -z (back)
        { width: depth, height },   // wall2: +z (front)
        { width, height: depth },   // ceiling: +y (top)
        { width, height: depth },   // floor: -y (bottom)
        { width, height },          // wall3: -x (left)
        { width, height },          // wall4: +x (right)
      ];

      const mats: THREE.Material[] = [];
      const vals = [
        { key: "wall1", color: colors.wall1, roughness: 0.8 },
        { key: "wall2", color: colors.wall2, roughness: 0.8 },
        // Ceiling: slightly warm white, high roughness, no metalness for natural plaster/paint
        { key: "ceiling", color: colors.ceiling, roughness: 0.97, metalness: 0.0 },
        // Floor: high roughness, no metalness for natural wood/laminate look
        { key: "floor", color: colors.floor, roughness: 0.93, metalness: 0.0 },
        { key: "wall3", color: colors.wall3, roughness: 0.8 },
        { key: "wall4", color: colors.wall4, roughness: 0.8 },
      ];

      vals.forEach((v, i) => {
        const wp = wallpapers && (wallpapers as any)[v.key];
        const matOpts: any = { roughness: v.roughness };
        if (typeof v.metalness === 'number') matOpts.metalness = v.metalness;
        if (wp) {
          const tx = textures[i];
          tx.wrapS = THREE.RepeatWrapping;
          tx.wrapT = THREE.RepeatWrapping;
          // Ensure sRGB encoding for accurate color (robust for all three.js builds)
          // 3001 is the value for sRGBEncoding in three.js
          (tx as any).encoding = 3001;
          // Use size from props
          const size = sizes[i];
          const { width: wallW, height: wallH } = faceDims[i];
          let repeatX = 1, repeatY = 1;
          if (size) {
            repeatX = Math.max(1, Math.round(wallW / size.width));
            repeatY = Math.max(1, Math.round(wallH / size.height));
          }
          tx.repeat.set(repeatX, repeatY);
          // Use MeshBasicMaterial for true, unlit color, and disable tone mapping
          mats.push(new THREE.MeshBasicMaterial({ map: tx, side: THREE.BackSide, toneMapped: false }));
        } else {
          mats.push(mat(v.color, matOpts));
        }
      });

      return mats;
    },
    [colors, textures, wallpapers, width, height, depth]
  );

  return (
    <mesh material={materials}>
      <boxGeometry args={[width, height, depth]} />
    </mesh>
  );
}
