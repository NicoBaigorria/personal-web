import { useLoader } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/Addons.js";

type FBXModelType = {
  path: string,
  position: THREE.Vector3,
  rotation: THREE.Euler,
  scale: THREE.Vector3
};

const FBXModel: FC<FBXModelType> = ({ position, rotation, scale, path }) => {
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

  return (
    <mesh position={position}>
       <boxGeometry args={[1,1,1]}/>
       <primitive object={model} scale={0.01} />
       <meshBasicMaterial color={"red"} />
    </mesh>
  );
};

type IcebergType = {
  position: THREE.Vector3;
  scale?: THREE.Vector3;
  rotation?: THREE.Euler;
};

export const Iceberg: FC<IcebergType> = ({ position, scale, rotation }) => {
  const defaultScale = new THREE.Vector3(1, 1, 1); // Default scale
  const defaultRotation = new THREE.Euler(0, 0, 0); // Default rotation

  return (
    <FBXModel
      position={position}
      scale={scale ?? defaultScale}
      rotation={rotation ?? defaultRotation}
      path="/3dObjects/IceBerg.fbx"
    />
  );
};
