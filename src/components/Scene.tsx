"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import Room from "./Room";

type Colors = {
  floor: string;
  ceiling: string;
  wall1: string;
  wall2: string;
  wall3: string;
  wall4: string;
};

export default function Scene({ colors }: { colors: Colors }) {
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
        color={0xfff3e0}
        position={[4, 6, 2]}
        intensity={1.0}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0006}
      />

      {/* Soft ambient and sky fill */}
      <hemisphereLight color={0xffffff} groundColor={0x887766} intensity={0.45} />
      <ambientLight color={0xffffff} intensity={0.12} />

      {/* Rim / fill light for gentle highlights on walls and floor */}
      <pointLight color={0xfff8e8} position={[-2, 2, -1]} intensity={0.35} />
      <pointLight color={0xe8f0ff} position={[2, 1.8, -2]} intensity={0.15} />

      {/* add an HDRI-like environment so materials have realistic reflections and diffuse lighting */}
      <Environment preset="sunset" background={false} blur={0.6} />

      {/* subtle contact shadow under objects/room for anchoring */}
      <ContactShadows position={[0, -1.49, 0]} opacity={0.5} scale={8} blur={2} far={1.6} />

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
