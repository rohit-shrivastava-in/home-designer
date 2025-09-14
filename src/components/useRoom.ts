import * as THREE from "three";
import { RoomProps } from "@/types/room";

export const useRoom = ({ dimensions }: Pick<RoomProps, "dimensions">) => {

  // Helper to convert screen (client) coords to 3D world coords on floor (y=0)
  const getWorldPosition = (clientX: number, clientY: number) => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return [0, 0, 0];
    const rect = canvas.getBoundingClientRect();

    // Convert screen to normalized device coordinates (-1 to +1)
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;

    // Raycast from camera through mouse to y=0 (floor)
    const camera = (window as unknown as { threeFiberRoot?: { camera: THREE.Camera } }).threeFiberRoot?.camera;
    if (!camera) return [0, 0, 0];
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    // Plane: y=0 (floor)
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersection = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersection);

    // Clamp to room bounds (room is centered at [0, height/2, 0])
    const w = dimensions?.width ?? 10;
    const d = dimensions?.depth ?? 10;
    // const h = dimensions?.height ?? 10; // removed unused variable
    const minX = -w / 2 + 0.2;
    const maxX = w / 2 - 0.2;
    const minZ = -d / 2 + 0.2;
    const maxZ = d / 2 - 0.2;
    const clampedX = Math.max(minX, Math.min(intersection.x, maxX));
    const clampedY = 0; // Always on floor
    const clampedZ = Math.max(minZ, Math.min(intersection.z, maxZ));
    return [clampedX, clampedY, clampedZ];
  };
  return { getWorldPosition };
}