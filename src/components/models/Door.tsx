"use client";

import { useGLTF } from "@react-three/drei";

export default function Door(props: any) {
  const { scene } = useGLTF("/assets/door1.glb");
  return <primitive object={scene} {...props} />;
}
