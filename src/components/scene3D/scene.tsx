import React, { useRef, useState } from "react";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

const FBXModel = ({ path, onHover }: { path: string; onHover: (hovered: boolean) => void }) => {
  const model = useLoader(FBXLoader, path);
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group
      ref={groupRef}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
    >
      <primitive object={model} scale={0.01} />
    </group>
  );
};

const RaycasterPointer = () => {
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));
  const planeRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const { camera, mouse, size } = useThree();

  const handlePointerMove = () => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    if (planeRef.current) {
      const aspect = size.width / size.height;
      const height = size.height;
      const width = height * aspect;
      planeRef.current.scale.set(width, height, 1);
    }

    if (planeRef.current) {
      const intersects = raycaster.intersectObject(planeRef.current);
      if (intersects.length > 0) {
        const intersect = intersects[0].point;
        setPosition(new THREE.Vector3(intersect.x, intersect.y, intersect.z + 1));

        if (lightRef.current) {
          lightRef.current.position.set(intersect.x, intersect.y, intersect.z + 1);
        }
      }
    }
  };

  return (
    <>
      <mesh ref={planeRef} onPointerMove={handlePointerMove} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="black" side={THREE.DoubleSide} />
      </mesh>
      <pointLight
        ref={lightRef}
        intensity={10}
        distance={5}
        color="orange"
        position={position}
      />
    </>
  );
};

const ThreeScene = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true); // Show HTML
    setTimeout(() => setIsHovered(false), 5000); // Hide HTML after 5 seconds
  };
  return(
  <Canvas
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1,
    }}
    camera={{
      position: [0, 0, 5],
      fov: 75,
    }}
  >
    <ambientLight intensity={0.1} />
    <RaycasterPointer />

    {/* FBX Model */}
    <group scale={15}>
    <FBXModel
          path="/3dObjects/fbxStatue.fbx"
          onHover={handleHover}
        />
    </group>
   
   {/* HTML Element in the upper-left corner */}
   {isHovered && (
    <Html position={[-5,0,0]}>
      <div
          style={{
            position: "fixed", // Fix the position relative to the screen
            top: "10px", // Position near the top
            left: "10px", // Position near the left
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent background
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "16px",
            zIndex: 10, // Ensure it stays above the Canvas
          }}
        >
          Hovering over the model!
        </div>
    </Html>
      )}
  </Canvas>
  )
};

export default ThreeScene;
