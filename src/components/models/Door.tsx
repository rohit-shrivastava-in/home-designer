"use client";

import { useGLTF } from "@react-three/drei";

export default function Door(props: Record<string, unknown>) {
  // cast to any because the exact GLTF result type depends on the model
  const { scene } = useGLTF("/assets/door1.glb") as any;
  return <primitive object={scene} {...(props as any)} />;
}
