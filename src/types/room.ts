import { PlacedModel } from "./models";

export type Wallpaper = { url: string; size: { width: number; height: number } };

export type RoomWallpaper = Partial<{
  floor: Wallpaper;
  ceiling: Wallpaper;
  wall1: Wallpaper;
  wall2: Wallpaper;
  wall3: Wallpaper;
  wall4: Wallpaper;
}>;

export type RoomWallColors = {
  floor: string;
  ceiling: string;
  wall1: string;
  wall2: string;
  wall3: string;
  wall4: string;
};

export type RoomDimensions = {
  width: number;
  height: number;
  depth: number;
};

export type RoomProps = {
  colors: RoomWallColors;
  wallpapers?: RoomWallpaper;
  dimensions: RoomDimensions;
  placedModels: PlacedModel[];
  selectedModelId: string | null;
  setSelectedModelId: (id: string | null) => void;
  setPlacedModels: React.Dispatch<React.SetStateAction<PlacedModel[]>>;
};