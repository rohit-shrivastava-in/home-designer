"use client";

import * as THREE from "three";
import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { RoomProps } from "@/types/room";
import { Models } from "./model/Models";
import React from "react";



export default function Room(props: RoomProps) {
  const {
    colors,
    wallpapers,
    dimensions = { width: 6, height: 3, depth: 6 },
    placedModels = [],
    selectedModelId,
    setSelectedModelId,
    setPlacedModels,
  } = props;
  console.log('models in Room:', placedModels);
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

      const mat = (hex: string) => {
        // Use MeshBasicMaterial for true, unlit color (WYSIWYG)
        return new THREE.MeshBasicMaterial({
          color: norm(hex),
          side: THREE.BackSide,
          toneMapped: false,
        });
      };

      // Wall face dimensions (width, height) for each face in boxGeometry order
      // For the floor, use width (x) and depth (z) as the repeat axes
      const faceDims = [
        { width: depth, height },   // wall1: -z (back)
        { width: depth, height },   // wall2: +z (front)
        { width, height: depth },   // ceiling: +y (top)
        { width, height: depth },   // floor: -y (bottom) (will override below)
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
        const wp = wallpapers && (wallpapers as Partial<Record<string, { url: string; size: { width: number; height: number } }>>)[v.key];
        const matOpts: { roughness: number; metalness?: number } = { roughness: v.roughness };
        if (typeof v.metalness === 'number') matOpts.metalness = v.metalness;
        if (wp) {
          const tx = textures[i];
          tx.wrapS = THREE.RepeatWrapping;
          tx.wrapT = THREE.RepeatWrapping;
          (tx as unknown as { encoding: number }).encoding = 3001;
          // Use size from props for repeat, do not round or clamp
          const size = sizes[i];
          let wallW = faceDims[i].width;
          let wallH = faceDims[i].height;
          if (v.key === "floor") {
            wallW = width;
            wallH = depth;
          }
          let repeatX = 1, repeatY = 1;
          if (size) {
            repeatX = wallW / size.width;
            repeatY = wallH / size.height;
          }
          tx.repeat.set(repeatX, repeatY);
          mats.push(new THREE.MeshBasicMaterial({ map: tx, side: THREE.BackSide, toneMapped: false }));
        } else {
          mats.push(mat(v.color));
        }
      });

      return mats;
    },
    [colors, textures, wallpapers, width, height, depth, sizes]
  );

  return (
    <>
      <mesh material={materials}>
        <boxGeometry args={[width, height, depth]} />
      </mesh>
      <Models
        placedModels={placedModels}
        selectedModelId={selectedModelId}
        setSelectedModelId={setSelectedModelId}
        setPlacedModels={setPlacedModels}
        roomDimensions={{ width, height, depth }}
      />
    </>
  );
}
