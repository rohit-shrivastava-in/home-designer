const library = {
  colors: [
    { id: "c1", name: "White", hex: "#ffffff" },
    { id: "c2", name: "Blue", hex: "#0077ff" },
    { id: "c3", name: "Gray", hex: "#888888" }
  ],
  wallpapers: [
    {
      id: "w1",
      name: "Red brick",
      thumbnail: "/wallpapers/red-brick.png",
      size: { width: 3, height: 3 }, // in feet
    },
  ],
  floors: [
    {
      id: "f1",
      name: "Wooden Floor",
      thumbnail: "/floors/wooden-floor.jpg",
      size: { width: 2, height: 2 }
    },
    {
      id: "f2",
      name: "Marble Floor",
      thumbnail: "/floors/marble-floor.jpg",
      size: { width: 4, height: 4 }

    }
  ],
};

export default library;
