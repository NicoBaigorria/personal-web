import React, { FC } from "react";
import { Text } from "@react-three/drei";
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
    <group {...props}>
      {!!title && (
        <Text
          color="black"
          anchorX={"left"}
          anchorY="bottom"
          fontSize={0.52}
          maxWidth={2.5}
          lineHeight={1}
          //font={"./fonts/DMSerifDisplay-Regular.ttf"}
        >
          {title}
          <meshStandardMaterial
            color={"black"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      )}

      <Text
        color="black"
        anchorX={"left"}
        anchorY="top"
        fontSize={0.2}
        maxWidth={2.5}
        //font={"./fonts/Inter-Regular.ttf"}
      >
        {subtitle}
        <meshStandardMaterial
          color={"black"}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>
    </group>
  );
};
