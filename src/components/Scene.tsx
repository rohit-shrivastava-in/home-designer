"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Room from "./Room";

export default function Scene({ color, colors }: { color: string, colors: any }) {
  return (
    <Canvas camera={{ position: [0, 1.5, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Room color={color} colors={colors} />
      <OrbitControls />
    </Canvas>
  );
}

