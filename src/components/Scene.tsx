"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import Room from "./Room";


import { PlacedModel } from "@/types/models";

type SceneProps = RoomProps & {
  onModelDrop: (model: PlacedModel, position: [number, number, number]) => void;
};

import { useRef } from "react";
import { RoomProps } from "@/types/room";
import { useRoom } from "./useRoom";

export default function Scene({ colors, wallpapers, dimensions, placedModels, onModelDrop }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getWorldPosition } = useRoom({ dimensions });

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        e.preventDefault();
        const data = e.dataTransfer.getData("application/json");
        if (!data) return;
        const model = JSON.parse(data);
        const pos = getWorldPosition(e.clientX, e.clientY) as [number, number, number];
        console.log("Dropped model", model, "at", pos);
        onModelDrop(model, pos);
      }}
    >
      <Canvas
        shadows
        gl={{ antialias: true }}
        onCreated={({ gl, camera }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          // Type-safe assignment to window
          const win = window as Window & { threeFiberRoot?: { gl: THREE.WebGLRenderer; camera: THREE.Camera } };
          win.threeFiberRoot = { gl, camera };
        }}
        camera={{ position: [1.2, 1.2, 1.2], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Main directional light to cast strong shadows */}
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

        {/* Rim / fill light for gentle highlights on walls and floor */}
        <pointLight color={0xffffff} position={[-2, 2, -1]} intensity={1} />
        <pointLight color={0xffffff} position={[2, 1.8, -2]} intensity={1} />

        {/* add an HDRI-like environment so materials have realistic reflections and diffuse lighting */}
        <Environment preset="lobby" background={false} blur={0.6} />

        {/* subtle contact shadow under objects/room for anchoring */}
        <ContactShadows position={[0, -1.49, 0]} opacity={0.5} scale={8} blur={2} far={1.6} />

        {/* convert StaticImageData to string path when needed inside Room; it can accept either */}
        <Room colors={colors} wallpapers={wallpapers} dimensions={dimensions} placedModels={placedModels} />

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
    </div >
  );
}
