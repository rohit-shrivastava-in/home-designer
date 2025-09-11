// Example: you can make these stateful for UI controls
"use client";

import { useState } from "react";
import Scene from "@/components/Scene";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  // Room dimensions: width, height, depth (in feet)
  const [dimensions, setDimensions] = useState({ width: 10, height: 8, depth: 15 });
  const [colors, setColors] = useState({
    floor: "#888888",
    ceiling: "#ffffff",
    wall1: "#97bcabff",
    wall2: "#b8a0d7ff",
    wall3: "#ceccf0ff",
    wall4: "#dceca7ff",
  });
  type WallpaperObj = { url: string; size: { width: number; height: number } };
  const [wallpapers, setWallpapers] = useState<Partial<{ wall1: WallpaperObj; wall2: WallpaperObj; wall3: WallpaperObj; wall4: WallpaperObj; ceiling: WallpaperObj; floor: WallpaperObj }>>({});

  // const wallpaperSrc = typeof wallpaperImg === "string" ? wallpaperImg : (wallpaperImg as any).src;
  // const [wallpapers, setWallpapers] = useState<Partial<{ wall1: string; wall2: string; wall3: string; wall4: string; ceiling: string; floor: string }>>({
  //   wall3: wallpaperSrc,
  // });

  return (
    <main className="flex h-screen w-full">
      <aside className={`transition-all duration-200 overflow-hidden bg-gray-100 w-72 pointer-events-auto'}`}>
        <div className="w-72">
          <Sidebar
            onColorSelect={(color) =>
              setColors((c) => ({ ...c, wall1: color }))
            }
            onWallpaperSelect={(wallpaper) =>
              setWallpapers((w) => ({ ...w, wall3: wallpaper }))
            }
            onFloorSelect={(floor) =>
              setWallpapers((w) => ({ ...w, floor: floor }))
            }
          />
        </div>
      </aside>

      <div className="flex-1">
        <Scene colors={colors} wallpapers={wallpapers} dimensions={dimensions} />
      </div>
    </main>
  );
}

