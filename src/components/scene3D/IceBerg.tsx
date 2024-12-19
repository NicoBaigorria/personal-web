import { useLoader } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

type FBXModelType = {
  path: string;
  positions: THREE.Vector3[];
  rotations: THREE.Euler[];
  scales: THREE.Vector3[];
  opacity?: number; // Optional opacity property
};

const FBXModel: FC<FBXModelType> = ({ positions, rotations, scales, path, opacity = 1 }) => {
  const model = useLoader(FBXLoader, path); // Load the FBX model
  const groupRef = useRef<THREE.Group>(null);

  const createMaterial = (): THREE.MeshStandardMaterial => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("white"),
      roughness: 1,
      metalness: 0,
      opacity: opacity,
      transparent: opacity < 1,
    });
  };

  const applyMaterial = (object: THREE.Object3D) => {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = createMaterial();
        (child.material as THREE.Material).needsUpdate = true;
      }
    });
  };

  // Apply material when the model loads
  useEffect(() => {
    if (model && model instanceof THREE.Object3D) {
      applyMaterial(model);
    }
  }, [model, opacity]);

  // Clone and transform the model
  const renderClones = () => {
    return positions.map((position, index) => {
      const clone = model.clone(); // Clone the loaded model
      clone.position.copy(position);
      clone.rotation.copy(rotations[index]);
      clone.scale.copy(scales[index]);

      // Apply material to the clone
      applyMaterial(clone);

      return <primitive key={index} object={clone} />;
    });
  };

  return <>{renderClones()}</>;
};

type IcebergType = {
  positions: THREE.Vector3[];
  scales?: THREE.Vector3[];
  rotations?: THREE.Euler[];
  opacity?: number; // Optional opacity property for Iceberg
};

export const Iceberg: FC<IcebergType> = ({ positions, scales, rotations, opacity }) => {
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
      opacity={opacity} // Pass opacity to the FBXModel component
    />
  );
};
