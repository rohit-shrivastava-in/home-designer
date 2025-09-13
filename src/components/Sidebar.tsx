"use client";
import React, { Fragment } from "react";
import library from "@/config/library";
import Image from 'next/image';

type ColorItem = { id: string; hex: string; name: string; thumbnail?: string };
type Library = Record<string, ColorItem[]>;

type WallpaperObj = { url: string; size: { width: number; height: number } };
type ModelObj = { id: string; name: string; url: string; thumbnail: string };
export default function Sidebar({ onColorSelect, onWallpaperSelect, onFloorSelect, onModelSelect }: {
  onColorSelect: (c: string) => void;
  onWallpaperSelect: (w: WallpaperObj) => void;
  onFloorSelect: (f: WallpaperObj) => void;
  onModelSelect?: (m: ModelObj) => void;
}) {

  return (
    <div className="p-3 overflow-y-scroll h-full min-h-0">
      <h2 className="text-lg font-bold mb-2">Library</h2>
      {
        library.colors && (
          <div>
            <h3 className="font-semibold mb-1">Wall Colors</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {library.colors.map((c) => (
                <Fragment key={c.id}>
                  <div className="flex flex-col items-center">
                    <button
                      className={`w-10 h-10 rounded-full border-2`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => onColorSelect(c.hex)}
                      title={c.name}
                    />
                    <span className="text-xs text-gray-500 mt-1">{c.name}</span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        )
      }

      {
        library.wallpapers && (
          <div>
            <h3 className="font-semibold mb-1">Wallpapers</h3>
            <div className="grid grid-cols-3 gap-2">
              {library.wallpapers.map((w) => (
                <div key={w.id} className="flex flex-col items-center">
                  <button
                    className={`w-full h-20 rounded overflow-hidden border-2`}
                    onClick={() => onWallpaperSelect({ url: w.thumbnail, size: w.size })}
                    title={w.name}
                  >
                    <Image src={w.thumbnail} alt={w.name} width={100} height={80} className="object-cover w-full h-full" />
                  </button>
                  {w.size && (
                    <span className="text-xs text-gray-500 mt-1">{w.size.width}x{w.size.height} ft</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      }

      {
        library.floors && (
          <div className="mt-4">
            <h3 className="font-semibold mb-1">Floorings</h3>
            <div className="grid grid-cols-3 gap-2">
              {library.floors.map((f) => (
                <div key={f.id} className="flex flex-col items-center">
                  <button
                    key={f.id}
                    className={`w-full h-20 rounded overflow-hidden border-2`}
                    onClick={() => onFloorSelect({ url: f.thumbnail, size: f.size })}
                    title={f.name}
                  >
                    <Image src={f.thumbnail} alt={f.name} width={100} height={80} className="object-cover w-full h-full" />
                  </button>
                  {f.size && (
                    <span className="text-xs text-gray-500 mt-1">{f.size.width}x{f.size.height} ft</span>
                  )}
                </div>

              ))}
            </div>
          </div>
        )
      }

      {library.models && (
        <div className="mt-4">
          <h3 className="font-semibold mb-1">Models</h3>
          <div className="grid grid-cols-3 gap-2">
            {library.models.map((m) => (
              <div key={m.id} className="flex flex-col items-center">
                <div
                  className="w-full h-20 rounded overflow-hidden border-2 cursor-move bg-white flex flex-col items-center justify-center"
                  draggable
                  onDragStart={e => {
                    e.dataTransfer.setData("application/json", JSON.stringify(m));
                  }}
                  title={m.name}
                >
                  <Image src={m.thumbnail} alt={m.name} width={80} height={64} className="object-contain w-full h-16" />
                </div>
                <span className="text-xs text-gray-700 mt-1">{m.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
