export type ModelSize = {
  width: number;
  height: number;
};

export type PlacedModel = {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  size?: ModelSize;
  position: [number, number, number];
  instanceId: string;
};

export type Model = {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  size?: ModelSize;
}