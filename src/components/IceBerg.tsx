import { useLoader } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/Addons.js";

type FBXModelType = {
  path: string;
  positions: THREE.Vector3[];
  rotations: THREE.Euler[];
  scales: THREE.Vector3[];
};

const FBXModel: FC<FBXModelType> = ({ positions, rotations, scales, path }) => {
  const model = useLoader(FBXLoader, path); // Load the FBX model
  const groupRef = useRef<THREE.Group>(null);

  // Modify materials once the model is loaded
  useEffect(() => {
    if (model && model instanceof THREE.Object3D) {
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("lightblue"),
            roughness: 0.5,
            metalness: 0.5,
          });
        }
      });
    }
  }, [model]);

  // Create multiple instances of the model with different transformations
  return (
    <>
      {positions.map((position, index) => {
        const clone = model.clone(); // Clone the model
        clone.position.set(position.x, position.y, position.z); // Apply position
        clone.rotation.set(-(Math.PI/2), rotations[index].y, rotations[index].z); // Apply rotation
        clone.scale.set(scales[index].x, scales[index].y, scales[index].z); // Apply scale

        return (
          <primitive key={index} object={clone} />
        );
      })}
    </>
  );
};

type IcebergType = {
  positions: THREE.Vector3[];
  scales?: THREE.Vector3[];
  rotations?: THREE.Euler[];
};

export const Iceberg: FC<IcebergType> = ({ positions, scales, rotations }) => {
  const defaultScale = new THREE.Vector3(1, 1, 1); // Default scale
  const defaultRotation = new THREE.Euler(0, 0, 0); // Default rotation

  // Default scales and rotations if not provided
  const finalScales = scales ?? positions.map(() => defaultScale);
  const finalRotations = rotations ?? positions.map(() => defaultRotation);

  return (
    <FBXModel
      positions={positions}
      rotations={finalRotations}
      scales={finalScales}
      path="/3dObjects/IceBerg.fbx"
    />
  );
};
