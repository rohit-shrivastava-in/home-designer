"use client";
import library from "@/config/library";
import Image from 'next/image';

type ColorItem = { id: string; hex: string; name: string; thumbnail?: string };
type Library = Record<string, ColorItem[]>;

export default function Sidebar({ onColorSelect, color }: { onColorSelect: (c: string) => void; color: string; }) {

  return (
    <div className="p-3">
      <h2 className="text-lg font-bold mb-2">Library</h2>

      {Object.entries(library as unknown as Library).map(([category, items]) => (
        <div key={category} className="mb-4">
          <h3 className="font-semibold capitalize">{category}</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {items.map((item) => {
              if (category === "colors") {
                return (
                  <div
                    key={item.id}
                    className={`border rounded p-2 text-center cursor-pointer ${color === item.hex ? "ring-2 ring-blue-500" : ""
                      }`}
                    onClick={() => onColorSelect(item.hex)}
                  >
                    <div
                      className="w-full h-12 rounded"
                      style={{ background: item.hex }}
                    />
                    <p className="text-xs mt-1">{item.name}</p>
                  </div>
                );
              }

              return (
                <div
                  key={item.id}
                  className="border rounded p-1 text-center cursor-pointer hover:bg-gray-100"
                >
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.name}
                      width={160}
                      height={80}
                      className="w-full h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-20 bg-gray-200 rounded" />
                  )}
                  <p className="text-xs mt-1">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
