import React, { useRef, useState } from "react";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { relative } from "path";

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
        setPosition(new THREE.Vector3(intersect.x, intersect.y, intersect.z + 2));

        if (lightRef.current) {
          lightRef.current.position.set(intersect.x, intersect.y, intersect.z + 2);
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
        distance={10}
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
  return (
    <div style={{
      position: "relative",
      width: "50vw",
      height: "100vh",
    }}>
      {isHovered && (
        <div
          style={{
            position: "absolute",
            width: "fit-content",
            height: "fit-content",
            margin: "auto",
            top: 0,
            left: 0,
            right: 0,
            bottom:0,
            color: "white",
            zIndex: 10,
            overflow: "auto",
            pointerEvents: "none", // Disable pointer events on this element
            paddingTop: "80px",
            paddingRight: "80px"
          }}
        >
          <span>C</span><span>S</span><span>S</span><span>&nbsp;</span><span>S</span><span>m</span><span>o</span><span>k</span><span>y</span><span>&nbsp;</span><span>T</span><span>e</span><span>x</span><span>t</span><span>&nbsp;</span><span>E</span><span>f</span><span>f</span><span>e</span><span>c</span><span>t</span>
        </div>
      )}
      {/*"The search is an endless journey, always transforming in new directions."
"Sometimes we find what we need, even if it's not what we expected."
"It is uncertainty that drives us to move forward, to continue exploring."
"If what you are looking for is to stand out, you have found the right path."*/}
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
        <group scale={0.5} position={[1, 0, 0.5]} rotation={[(Math.PI / 2), -1 * 0, Math.PI / 12]}>
          <FBXModel
            path="/3dObjects/oldmap.fbx"
            onHover={handleHover}
          />
        </group>

      </Canvas>
    </div>
  )
};

export default ThreeScene;
