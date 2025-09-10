import { create } from "zustand";

interface Object3D {
  id: string;
  type: "window" | "door";
  position: [number, number, number];
  size: { w: number; h: number };
}

interface EditorState {
  room: { width: number; depth: number; height: number };
  objects: Object3D[];
  setRoom: (dims: { width: number; depth: number; height: number }) => void;
  addObject: (obj: Object3D) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  room: { width: 400, depth: 500, height: 300 },
  objects: [],
  setRoom: (dims) => set({ room: dims }),
  addObject: (obj) =>
    set((state) => ({ objects: [...state.objects, obj] }))
}));
