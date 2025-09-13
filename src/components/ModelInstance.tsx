"use client";

import * as THREE from "three";
import { useMemo } from "react";
import { PlacedModel } from "@/types/models";
import { useGLTF } from "@react-three/drei";


export const ModelInstance = ({ url, position, height }: Pick<PlacedModel, "url" | "position" | "height">) => {
  const { scene } = useGLTF(url);
  // Always clone the scene for bounding box calculation and rendering
  const instance = useMemo(() => scene.clone(true), [scene]);
  const scale = useMemo(() => {
    const bbox = new THREE.Box3().setFromObject(instance);
    const size = bbox.getSize(new THREE.Vector3());
    return height / (size.y || 1);
  }, [instance, height]);
  return <primitive object={instance} position={position} scale={[scale, scale, scale]} />;
}