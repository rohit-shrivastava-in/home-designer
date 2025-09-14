import * as THREE from "three";
import { RoomProps } from "@/types/room";

export const useRoom = ({ dimensions }: Pick<RoomProps, "dimensions">) => {

  // Helper to convert screen (client) coords to 3D world coords on floor (y=0)
  const getWorldPosition = (clientX: number, clientY: number): [number, number, number] => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return [0, 0, 0];
    const rect = canvas.getBoundingClientRect();

    // Convert screen to normalized device coordinates (-1 to +1)
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;

    // Raycast from camera through mouse
    const camera = (window as any).threeFiberRoot?.camera;
    if (!camera) return [0, 0, 0];
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    // Room bounding box (centered at [0, h/2, 0])
    const w = dimensions?.width ?? 10;
    const d = dimensions?.depth ?? 10;
    const h = dimensions?.height ?? 10;
    // Room is centered at y = h/2, so minY = -h/2, maxY = h/2
    const min = new THREE.Vector3(-w / 2, -h / 2, -d / 2);
    const max = new THREE.Vector3(w / 2, h / 2, d / 2);
    const box = new THREE.Box3(min, max);

    // Intersect ray with room bounding box
    const intersection = new THREE.Vector3();
    const hit = raycaster.ray.intersectBox(box, intersection);
    if (!hit) {
      // If no intersection, clamp to nearest point inside box
      intersection.copy(raycaster.ray.at(2, new THREE.Vector3()));
      intersection.x = Math.max(min.x + 0.2, Math.min(intersection.x, max.x - 0.2));
      intersection.y = Math.max(min.y + 0.2, Math.min(intersection.y, max.y - 0.2));
      intersection.z = Math.max(min.z + 0.2, Math.min(intersection.z, max.z - 0.2));
    }
    // Clamp to room bounds (with margin)
    const clampedX = Math.max(min.x + 0.2, Math.min(intersection.x, max.x - 0.2));
    const clampedY = Math.max(min.y + 0.2, Math.min(intersection.y, max.y - 0.2));
    const clampedZ = Math.max(min.z + 0.2, Math.min(intersection.z, max.z - 0.2));
    console.log('World position:', { x: clampedX, y: clampedY, z: clampedZ });
    return [clampedX, clampedY, clampedZ];
  };
  return { getWorldPosition };
}