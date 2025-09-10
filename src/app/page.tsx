"use client";

import { useState } from "react";
import Scene from "@/components/Scene";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [colors, setColors] = useState({
    floor: "#cccccc",
    ceiling: "#de8a8aff",
    wall1: "#97bcabff",
    wall2: "#b8a0d7ff",
    wall3: "#ceccf0ff",
    wall4: "#dceca7ff",
  });

  return (
    <main className="flex h-screen">
      <aside className="w-72 bg-gray-100">
        <Sidebar
          color={colors.wall1}
          onColorSelect={(color) =>
            setColors((c) => ({ ...c, wall1: color || c.wall1 }))
          }
        />
      </aside>
      <div className="flex-1">
        <Scene colors={colors} />
      </div>
    </main>
  );
}
