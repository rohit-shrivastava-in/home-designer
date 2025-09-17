import { PlacedModel } from "@/types/models";
import { ModelInstance } from "./ModelInstance";
import { TransformControls } from "@react-three/drei";
import React, { useRef, RefObject } from "react";
import * as THREE from "three";

type ModelsProps = {
  placedModels: PlacedModel[];
  selectedModelId: string | null;
  setSelectedModelId: (id: string | null) => void;
  setPlacedModels: React.Dispatch<React.SetStateAction<PlacedModel[]>>;
  roomDimensions: { width: number; height: number; depth: number };
};

export const Models = ({ placedModels, selectedModelId, setSelectedModelId, setPlacedModels, roomDimensions }: ModelsProps) => {
  // Create a ref for each model instanceId
  const refs = useRef<{ [key: string]: RefObject<THREE.Group | null> }>({});
  // Ensure refs exist for all placedModels
  placedModels.forEach((model: PlacedModel) => {
    if (!refs.current[model.instanceId]) {
      refs.current[model.instanceId] = React.createRef<THREE.Group>();
    }
  });

  return (
    <>
      {placedModels.map((model: PlacedModel, i: number) => {
        // If multiple models have the same position, offset slightly to avoid z-fighting
        let position = model.position;
        // Find how many models share this position before this one
        const overlapCount = placedModels.slice(0, i).filter((m: PlacedModel) => m.position[0] === model.position[0] && m.position[1] === model.position[1] && m.position[2] === model.position[2]).length;
        if (overlapCount > 0) {
          position = [model.position[0] + overlapCount * 0.05, model.position[1], model.position[2] + overlapCount * 0.05];
        }
        const isSelected = selectedModelId === model.instanceId;
        const ref = refs.current[model.instanceId];
        return (
          <React.Fragment key={model.instanceId}>
            {isSelected ? (
              <TransformControls
                object={ref as React.RefObject<THREE.Object3D>}
                mode="translate"
                onMouseUp={() => {
                  // Clamp to room bounds
                  const [x, y, z] = ref.current!.position.toArray();
                  const minX = -roomDimensions.width / 2 + 0.2;
                  const maxX = roomDimensions.width / 2 - 0.2;
                  const minY = -roomDimensions.height / 2 + 0.2;
                  const maxY = roomDimensions.height / 2 - 0.2;
                  const minZ = -roomDimensions.depth / 2 + 0.2;
                  const maxZ = roomDimensions.depth / 2 - 0.2;
                  const clamped = [
                    Math.max(minX, Math.min(x, maxX)),
                    Math.max(minY, Math.min(y, maxY)),
                    Math.max(minZ, Math.min(z, maxZ)),
                  ];
                  setPlacedModels((prev: PlacedModel[]) =>
                    prev.map((m: PlacedModel) =>
                      m.instanceId === model.instanceId ? { ...m, position: clamped as [number, number, number] } : m
                    )
                  );
                  // Deselect after move
                  setSelectedModelId(null);
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <ModelInstance
                  ref={ref}
                  url={model.url}
                  position={position}
                  size={model.size}
                  onClick={() => setSelectedModelId(model.instanceId)}
                />
              </TransformControls>
            ) : (
              <ModelInstance
                ref={ref}
                url={model.url}
                position={position}
                size={model.size}
                onClick={() => setSelectedModelId(model.instanceId)}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};