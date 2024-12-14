import React, { FC, useState } from "react";
import { Text } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "@/utils/FadeMaterial";
import * as THREE from "three";

// Define the type for the props explicitly
type TextSectionProps = {
  title?: string; // Optional title
  subtitle: string; // Subtitle is required
  cameraRailDist: number;
  position: THREE.Vector3;
  link?: string; // Optional link for the subtitle
};

export const TextSection: FC<TextSectionProps> = ({ title, subtitle, link, ...props }) => {
  // State to handle hover effect for the button
  const [isHovered, setIsHovered] = useState(false);

  // State to store the original background color
  const [backgroundColor, setBackgroundColor] = useState<string>('transparent');

  // Handle the click event to open the link in a new tab
  const handleTextClick = () => {
    if (link) {
      window.open(link, "_blank"); // Open the link in a new tab
    }
  };

  // Handle mouse enter and leave events for hover effects on the "button" text
  const handlePointerOver = () => {
    setIsHovered(true); // Set hover to true when mouse enters
    setBackgroundColor('darkblue'); // Change background color on hover
  };

  const handlePointerOut = () => {
    setIsHovered(false); // Set hover to false when mouse leaves
    setBackgroundColor('blue'); // Revert to the original background color
  };

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
        >
          {title}
          <meshStandardMaterial
            color="black"
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
      >
        {subtitle}
        <meshStandardMaterial
          color="black"
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>

      {/* "Go to Link" Text */}
      {link && (
        <group  position={[1, -3, 0]}>
          <mesh
          onPointerOver={handlePointerOver} // Handle mouse enter event
          onPointerOut={handlePointerOut} // Handle mouse leave event
          onClick={handleTextClick} // Handle click event
        >
          <planeGeometry args={[2, 1]} /> {/* Create a plane behind the text */}
          <meshStandardMaterial
            color={backgroundColor} // Use the backgroundColor state to change the background color
            opacity={0.8} // Slight opacity to make the effect subtle
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </mesh>
        
        <Text
        fontStyle="italic"
          color={isHovered ? 'black' : 'black'} // Change text color on hover
          anchorX="center"
          anchorY="middle"
          fontSize={0.3}
          onPointerOver={handlePointerOver} // Add mouse enter event for hover effect
          onPointerOut={handlePointerOut} // Add mouse leave event for hover effect
          onClick={handleTextClick} // Handle click event
          position={[0,0,1]}
        >
          Contact
          <meshStandardMaterial
          
            color="blue" // Keep the text material transparent
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
        </group>
      )}
    </group>
  );
};
