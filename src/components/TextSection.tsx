import React, { FC } from "react";
import { Text, Html } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "@/utils/FadeMaterial";
import * as THREE from "three";


// Define the type for the props explicitly
type TextSectionProps = {
  title?: string; // Optional title
  subtitle: string; // Subtitle is required
  cameraRailDist: number;
  position: THREE.Vector3;
  // You can add more props as needed here
};

export const TextSection: FC<TextSectionProps> = ({ title, subtitle, ...props }) => {
  return (

     
      <mesh {...props}>
        <Html transform color="darkblue" scale={1} occlude>
          <div style={{background: "red", position:"relative"}} >
            <a target="_blank" href="https://www.linkedin.com/in/asfsafsa/" style={{background:"blue", color: 'orange', position:"absolute", bottom:0 }}>link</a>
          </div>
          
        </Html>
      </mesh>

  );
};
