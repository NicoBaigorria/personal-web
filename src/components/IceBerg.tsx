import { useGLTF } from "@react-three/drei";
import React, {FC} from "react";
import * as THREE from "three";

type IcebergType = {
    opacity: number,
    props: any
}

export const Iceberg: FC<IcebergType> = ({ opacity, ...props }) =>{
  return (
    <group {...props} dispose={null}>
      {/* Replace the GLTF model with cubes */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} /> {/* Cube geometry */}
        <meshStandardMaterial
          envMapIntensity={2}
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          envMapIntensity={2}
          transparent
          opacity={opacity}
        />
      </mesh>
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          envMapIntensity={2}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

