"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
// ...existing code...
import Room from "./Room";

type Colors = {
  floor: string;
  ceiling: string;
  wall1: string;
  wall2: string;
  wall3: string;
  wall4: string;
};

export default function Scene({ colors, wallpapers, dimensions }: {
  colors: Colors;
  wallpapers?: Partial<{ floor: { url: string; size: { width: number; height: number } }; ceiling: { url: string; size: { width: number; height: number } }; wall1: { url: string; size: { width: number; height: number } }; wall2: { url: string; size: { width: number; height: number } }; wall3: { url: string; size: { width: number; height: number } }; wall4: { url: string; size: { width: number; height: number } } }>;
  dimensions?: { width: number; height: number; depth: number };
}) {
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
        color={0xffffff} // pure white for true color
        position={[4, 6, 2]}
        intensity={1.5} // brighter main light
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0006}
      />

      {/* Soft ambient and sky fill */}
      <hemisphereLight color={0xffffff} groundColor={0x888888} intensity={0.18} />
      <ambientLight color={0xffffff} intensity={0.06} />

      {/* Rim / fill light for gentle highlights on walls and floor */}
      <pointLight color={0xffffff} position={[-2, 2, -1]} intensity={1} />
      <pointLight color={0xffffff} position={[2, 1.8, -2]} intensity={1} />

      {/* add an HDRI-like environment so materials have realistic reflections and diffuse lighting */}
      <Environment preset="lobby" background={false} blur={0.6} />

      {/* subtle contact shadow under objects/room for anchoring */}
      <ContactShadows position={[0, -1.49, 0]} opacity={0.5} scale={8} blur={2} far={1.6} />

      {/* convert StaticImageData to string path when needed inside Room; it can accept either */}
      <Room colors={colors} wallpapers={wallpapers} dimensions={dimensions} />

      {/* Controls tuned for interior viewing */}
      <OrbitControls
        target={[0, 1.2, 0]}
        enableDamping
        dampingFactor={0.06}
        minDistance={0.3}
        maxDistance={20} // allow zooming out much further
        minPolarAngle={0.01} // allow looking nearly straight up
        maxPolarAngle={Math.PI - 0.01} // allow looking nearly straight down so ceiling is visible
      />
    </Canvas>
  );
}
