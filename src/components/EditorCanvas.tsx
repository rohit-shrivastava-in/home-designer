"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEditorStore } from "@/store/editorStore";

export default function EditorCanvas() {
  const room = useEditorStore((s) => s.room);

  return (
    <Canvas camera={{ position: [5, 5, 5] }}>
      <ambientLight intensity={0.6} />
      <OrbitControls />

      {/* Room Box */}
      <mesh>
        <boxGeometry args={[room.width / 100, room.height / 100, room.depth / 100]} />
        <meshStandardMaterial color="#f0f0f0" wireframe />
      </mesh>
    </Canvas>
  );
}
