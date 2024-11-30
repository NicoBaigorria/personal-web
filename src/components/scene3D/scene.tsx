import React, { useRef, useState } from "react";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

const FBXModel = ({ path }: { path: string }) => {
  const model = useLoader(FBXLoader, path);
  const groupRef = useRef<THREE.Group>(null); // Reference to the FBX model
  const [isHovered, setIsHovered] = useState(false); // Hover state
  const [hoverPosition, setHoverPosition] = useState<[number, number, number]>([0, 0, 0]);

  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useThree((state) => state.mouse);

  useFrame(({ camera }) => {
    if (groupRef.current) {
      // Update raycaster based on the mouse position
      raycaster.current.setFromCamera(mouse, camera);

      // Check intersections with the FBX model
      const intersects = raycaster.current.intersectObject(groupRef.current, true);

      if (intersects.length > 0) {
        setIsHovered(true);
        setHoverPosition([
          intersects[0].point.x,
          intersects[0].point.y,
          intersects[0].point.z,
        ]);
      } else {
        setIsHovered(false);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} scale={0.01} />
      {isHovered && (
        <Html position={[0,0,0]} style={{ color: "white", fontSize: "16px", background: "black", padding: "5px", borderRadius: "5px" }}>
          Hovering over the model!
        </Html>
      )}
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

const ThreeScene = () => (
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
    <mesh scale={30} position={[0,-3,0]}>
        <FBXModel path="/3dObjects/fbxStatue.fbx" />
    </mesh>
  </Canvas>
);

export default ThreeScene;
