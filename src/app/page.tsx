"use client";

import { useState } from "react";
import Scene from "@/components/Scene";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [color, setColor] = useState("#cccccc");
  const [colors, setColors] = useState({
    floor: "#cccccc",
    ceiling: "#cccccc",
    wall1: "#cccccc",
    wall2: "#cccccc",
    wall3: "#cccccc",
    wall4: "#cccccc"
  });

  return (
    <main className="flex h-screen">
      <aside className="w-72 bg-gray-100">
        <Sidebar onColorSelect={setColor} color={color} />
      </aside>
      <div className="flex-1">
        <Scene color={color} colors={colors} />
      </div>
    </main>
  );
}
