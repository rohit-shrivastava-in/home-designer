import { create } from "zustand";

type RoomConfig = {
  width: number;
  height: number;
  depth: number;
  wallColor: string;
  roofColor: string;
  doors: { id: string; position: [number, number, number] }[];
  windows: { id: string; position: [number, number, number] }[];
};

type Store = {
  userId: string;
  room: RoomConfig;
  setRoom: (config: Partial<RoomConfig>) => void;
};

export const useRoomStore = create<Store>((set) => ({
  userId: "user-123", // hardcoded for now
  room: {
    width: 10,
    height: 6,
    depth: 8,
    wallColor: "#ffffff",
    roofColor: "#888888",
    doors: [],
    windows: []
  },
  setRoom: (config) =>
    set((state) => ({ room: { ...state.room, ...config } }))
}));
