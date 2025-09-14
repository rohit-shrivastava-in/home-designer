import { PlacedModel } from "@/types/models";
import { ModelInstance } from "./ModelInstance";

export const Models = ({ placedModels }: { placedModels: PlacedModel[] }) => {

  return (
    <>
      {placedModels.map((model, i) => {
        // If multiple models have the same position, offset slightly to avoid z-fighting
        let position = model.position;
        // Find how many models share this position before this one
        const overlapCount = placedModels.slice(0, i).filter(m => m.position[0] === model.position[0] && m.position[1] === model.position[1] && m.position[2] === model.position[2]).length;
        if (overlapCount > 0) {
          position = [model.position[0] + overlapCount * 0.05, model.position[1], model.position[2] + overlapCount * 0.05];
        }
        return (
          <ModelInstance
            key={model.instanceId}
            url={model.url}
            position={position}
            height={model.height}
          />
        );
      })}
    </>
  );
}