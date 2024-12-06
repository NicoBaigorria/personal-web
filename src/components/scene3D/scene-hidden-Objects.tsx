import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { relative } from "path";

const FBXModel = ({ path,
  texturePath,
  onHover, }: {
    path: string;
    texturePath: string;
    onHover: (hovered: boolean) => void;
  }) => {
  const model = useLoader(FBXLoader, path);
  const texture = useLoader(THREE.TextureLoader, texturePath);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Traverse the model and apply the texture
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          mesh.material = new THREE.MeshStandardMaterial({
            map: texture,
          });
        }
      }
    });
  }, [model, texture]);

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
        intensity={5}
        distance={3}
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
          className="smokeText"
          style={{
            position: "absolute",
            textAlign: "center",
            zIndex: 10,
            pointerEvents: "none", // Disable pointer events on this element
          }}
        >
          <div><span>T</span><span>h</span><span>e</span></div>
  <div><span>s</span><span>e</span><span>a</span><span>r</span><span>c</span><span>h</span></div>
  <div><span>i</span><span>s</span></div>
  <div><span>a</span><span>n</span></div>
  <div><span>e</span><span>n</span><span>d</span><span>l</span><span>e</span><span>s</span><span>s</span></div>
  <div><span>j</span><span>o</span><span>u</span><span>r</span><span>n</span><span>e</span><span>y</span><span>,</span></div>
  <div><span>a</span><span>l</span><span>w</span><span>a</span><span>y</span><span>s</span></div>
  <div><span>t</span><span>r</span><span>a</span><span>n</span><span>s</span><span>f</span><span>o</span><span>r</span><span>m</span><span>i</span><span>n</span><span>g</span></div>
  <div><span>i</span><span>n</span></div>
  <div><span>n</span><span>e</span><span>w</span></div>
  <div><span>d</span><span>i</span><span>r</span><span>e</span><span>c</span><span>t</span><span>i</span><span>o</span><span>n</span><span>s</span><span>.</span></div>        </div>
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
        <ambientLight intensity={0} />
        <RaycasterPointer />

        {/* FBX Model */}
        <group scale={1} position={[2, 0, 0.5]} rotation={[(Math.PI / 2), -1 * Math.PI / 12, Math.PI / 12]}>
          <FBXModel
            path="/3dObjects/oldmap.fbx"
            texturePath="3dObjects/greekmap.png"
            onHover={handleHover}
          />
        </group>

      </Canvas>
    </div>
  )
};

export default ThreeScene;
