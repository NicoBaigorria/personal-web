import { Environment, Sphere } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";

import * as THREE from "three";

export const Background = () => {
  return (
    <>
      <Environment preset="sunset" />
      <Sphere scale={[100, 100, 100]} rotation-y={Math.PI / 2}>
        <LayerMaterial
          color={"#ffffff"}
          lighting="physical"
          transmission={1}
          side={THREE.BackSide}
        >
          <Gradient
            colorA={"lightblue"}
            colorB={"blue"}
            axes={"y"}
            start={0.15}
            end={-0.1}
          />
        </LayerMaterial>
      </Sphere>
    </>
  );
};