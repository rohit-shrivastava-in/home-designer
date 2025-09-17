"use client";

import * as THREE from "three";
import React, { useMemo, forwardRef } from "react";
import { PlacedModel } from "@/types/models";
import { useGLTF } from "@react-three/drei";


type ModelInstanceProps = Pick<PlacedModel, "url" | "position" | "size"> & {
  onClick?: (e: any) => void;
};

export const ModelInstance = forwardRef<any, ModelInstanceProps>(
  ({ url, position, size, onClick }, ref) => {
    const { scene } = useGLTF(url);
    // Always clone the scene for bounding box calculation and rendering
    const instance = useMemo(() => scene.clone(true), [scene]);
    const scale = useMemo(() => {
      const bbox = new THREE.Box3().setFromObject(instance);
      const objSize = bbox.getSize(new THREE.Vector3());
      if (size && size.width && size.height) {
        // Scale to fit both width and height
        const scaleX = size.width / (objSize.x || 1);
        const scaleY = size.height / (objSize.y || 1);
        return [scaleX, scaleY, scaleX];
      } else if (size?.height) {
        // Only height given, scale uniformly
        const s = size.height / (objSize.y || 1);
        return [s, s, s];
      } else if (size?.width) {
        // Only width given, scale uniformly
        const s = size.width / (objSize.x || 1);
        return [s, s, s];
      } else {
        // Default scale
        return [1, 1, 1];
      }
    }, [instance, size]);
    return <primitive ref={ref} object={instance} position={position} scale={scale} onClick={onClick} />;
  }
);

ModelInstance.displayName = "ModelInstance";