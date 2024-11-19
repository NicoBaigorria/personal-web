import React, { useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei"; // Import Html from drei

const RaycasterPointer = () => {
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));

  const planeRef = useRef<THREE.Mesh>(null);
  const cubeRef = useRef<THREE.Mesh>(null); // Add ref for cube

  const { camera, mouse } = useThree();

  const handlePointerMove = () => {
    // Create a raycaster
    const raycaster = new THREE.Raycaster();

    // Update the raycaster with the mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check intersection with the plane
    if (planeRef.current) {
      const intersects = raycaster.intersectObject(planeRef.current);
      if (intersects.length > 0) {
        const intersect = intersects[0].point;
        setPosition(new THREE.Vector3(intersect.x, intersect.y, intersect.z));

        // Move the cube to the intersection point
        if (cubeRef.current) {
          cubeRef.current.position.set(intersect.x, intersect.y, intersect.z);
        }
      }
    }
  };

  return (
    <>
      {/* Use Html component to display the position */}
      <Html position={[0, 0, 0]} style={{ color: "white", fontSize: "18px" }}>
        Position: {position}
      </Html>

      {/* Plane mesh */}
      <mesh ref={planeRef} onPointerMove={handlePointerMove}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="lightblue" side={THREE.DoubleSide} />
      </mesh>

      {/* Cube that will move */}
      <mesh ref={cubeRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="orange" />
      </mesh>
    </>
  );
};

const ThreeScene = () => (
  <Canvas>
    <ambientLight />
    <RaycasterPointer />
  </Canvas>
);

export default ThreeScene;
