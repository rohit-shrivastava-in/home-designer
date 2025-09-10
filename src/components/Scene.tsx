"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Room from "./Room";

export default function Scene({ colors }: { colors: any }) {
  return (
    // Place camera inside the box so BackSide materials are visible
    <Canvas camera={{ position: [0, 1.5, 0.1], fov: 60 }}>
      {/* Soft interior lighting */}
      <hemisphereLight color={0xffffff} groundColor={0x444444} intensity={0.8} />
      <ambientLight intensity={0.4} />

      {/* Fill and rim for depth */}
      <pointLight position={[2, 2, 2]} intensity={0.8} />
      <pointLight position={[-2, 2, -2]} intensity={0.5} />

      <Room colors={colors} />
      <OrbitControls target={[0, 1.5, 0]} />
    </Canvas>
  );
}
