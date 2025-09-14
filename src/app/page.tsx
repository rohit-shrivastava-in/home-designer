"use client";

import { useState } from "react";
import Scene from "@/components/Scene";
import Sidebar from "@/components/Sidebar";
import { PlacedModel } from "@/types/models";

import { RoomDimensions, RoomWallColors, RoomWallpaper } from "@/types/room";
import { defaultRoomColors, defaultRoomDimensions } from "@/utils/room";

export default function Home() {
  // Room dimensions: width, height, depth (in feet)
  const [dimensions] = useState<RoomDimensions>(defaultRoomDimensions);
  const [colors, setColors] = useState<RoomWallColors>(defaultRoomColors);
  const [wallpapers, setWallpapers] = useState<RoomWallpaper>({});
  const [placedModels, setPlacedModels] = useState<PlacedModel[]>([]);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  return (
    <main className="flex h-screen w-full">
      <aside className="transition-all duration-200 overflow-hidden bg-gray-100 w-72 pointer-events-auto flex flex-col min-h-0">
        <div className="w-72 flex-1 flex flex-col min-h-0">
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

      <div className="flex-1 min-h-0 flex flex-col">
        <Scene
          colors={colors}
          wallpapers={wallpapers}
          dimensions={dimensions}
          placedModels={placedModels}
          selectedModelId={selectedModelId}
          setSelectedModelId={setSelectedModelId}
          setPlacedModels={setPlacedModels}
          onModelDrop={(model, position) => {
            // Ensure each instance has a unique id
            setPlacedModels((prev) => [
              ...prev,
              {
                ...model,
                position,
                instanceId: `${model.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              },
            ]);
          }}
        />
      </div>
    </main>
  );
}

