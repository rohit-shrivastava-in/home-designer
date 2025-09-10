"use client";

import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Door() {
  // the GLTF result varies per model; we only need the scene here.
  const gltf = useGLTF("/assets/door1.glb") as unknown as { scene: THREE.Group };
  const { scene } = gltf;
  return <primitive object={scene} />;
}
