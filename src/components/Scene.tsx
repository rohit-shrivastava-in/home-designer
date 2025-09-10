"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Room from "./Room";

export default function Scene({ colors }: { colors: any }) {
  return (
    // Place camera inside the room, slightly offset so you can see walls and floor
    <Canvas
      shadows
      gl={{ antialias: true }}
      onCreated={({ gl }) => {
        // configure renderer after creation to avoid invalid gl prop typing
        // set tone mapping for nicer highlights; skip setting outputEncoding because
        // some three builds/Turbopack targets don't export sRGBEncoding and that
        // causes a build-time error.
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
      camera={{ position: [1.2, 1.2, 1.2], fov: 60 }}
    >
      {/* Main warm directional light (like sunlight through a window) */}
      <directionalLight
        castShadow
        position={[4, 6, 2]}
        intensity={1.2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />

      {/* Soft ambient and sky fill */}
      <hemisphereLight color={0xffffff} groundColor={0x888877} intensity={0.45} />
      <ambientLight intensity={0.15} />

      {/* Small fill to brighten darker corners */}
      <pointLight position={[-1.5, 1.5, -1]} intensity={0.35} />

      <Room colors={colors} />

      {/* Controls tuned for interior viewing */}
      <OrbitControls
        target={[0, 1.2, 0]}
        enableDamping
        dampingFactor={0.06}
        minDistance={0.3}
        maxDistance={6}
        minPolarAngle={0.01} // allow looking nearly straight up
        maxPolarAngle={Math.PI - 0.01} // allow looking nearly straight down so ceiling is visible
      />
    </Canvas>
  );
}
