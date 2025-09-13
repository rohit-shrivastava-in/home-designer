const library = {
  colors: [
    { id: "c1", name: "Green-Plant", hex: "#4fa473ff" },
    { id: "c2", name: "Green-Leaf", hex: "#869c3fff" },
    { id: "c3", name: "Gray-Stone", hex: "#994477ff" },
    { id: "c4", name: "Brown-Earth", hex: "#7b5b3a" },
    { id: "c5", name: "Red-Brick", hex: "#b03a2e" },
    { id: "c6", name: "Beige-Wall", hex: "#c2afafff" },
    { id: "c7", name: "Blue-Sky", hex: "#297fe2ff" },
    { id: "c8", name: "Gray-Stone", hex: "#888888" }

  ],
  wallpapers: [
    {
      id: "w2",
      name: "Red brick",
      thumbnail: "/wallpapers/wall-paper-2.jpg",
      size: { width: 10, height: 2 }, // in feet
    },
    {
      id: "w3",
      name: "Red brick",
      thumbnail: "/wallpapers/wall-paper-3.jpg",
      size: { width: 10, height: 2 }, // in feet
    },
    {
      id: "w4",
      name: "Red brick",
      thumbnail: "/wallpapers/wall-paper-4.jpg",
      size: { width: 10, height: 4 }, // in feet
    },
    {
      id: "w5",
      name: "Red brick",
      thumbnail: "/wallpapers/wall-paper-5.jpg",
      size: { width: 10, height: 4 }, // in feet
    },
  ],
  floors: [
    {
      id: "f2",
      name: "Wooden Floor",
      thumbnail: "/floors/wooden-floor-2.jpg",
      size: { width: 2, height: 2 }
    },
    {
      id: "f3",
      name: "Wooden Floor",
      thumbnail: "/floors/wooden-floor-3.jpg",
      size: { width: 2, height: 3 }
    },
    {
      id: "f4",
      name: "Marble Floor",
      thumbnail: "/floors/tile-1.webp",
      size: { width: 1, height: 1 }
    },
    {
      id: "f5",
      name: "Marble Floor",
      thumbnail: "/floors/tile-2.webp",
      size: { width: 1, height: 1 }
    },
  ],

  // Add a new models category with sample GLTF/GLB objects
  models: [
    {
      id: "m1",
      name: "Chair",
      url: "/models/Avocado.glb",
      thumbnail: "/models/Avocado.jpg",
      height: 1
    }
  ]
};

export default library;
