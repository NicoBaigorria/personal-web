import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

const FBXModel = ({ path }: { path: string }) => {
  const model = useLoader(FBXLoader, path);

  return <primitive object={model} scale={0.01} />;
};


const RaycasterPointer = () => {
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));

  const planeRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const { camera, mouse, scene, size } = useThree();

  const handlePointerMove = () => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    if (planeRef.current) {
      // Adjust the plane's size to cover the entire screen
      const aspect = size.width / size.height;
      const height = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const width = height * aspect;

      planeRef.current.scale.set(width, height, 1);
    }

    if (planeRef.current) {
      const intersects = raycaster.intersectObject(planeRef.current);
      if (intersects.length > 0) {
        const intersect = intersects[0].point;
        setPosition(new THREE.Vector3(intersect.x, intersect.y, intersect.z+1));

        if (lightRef.current) {
          lightRef.current.position.set(intersect.x, intersect.y, intersect.z+1);
        }
      }
    }
  };

  React.useEffect(() => {
    /*
    if (lightRef.current) {
      const helper = new THREE.PointLightHelper(lightRef.current, 0.2, "orange");
      scene.add(helper);

      return () => {
        scene.remove(helper);
      };
    }

    return undefined;
    */
  }, [scene]);

  return (
    <>
    {/* 
      <Html position={[0, 0, 0]} style={{ color: "white", fontSize: "18px" }}>
        Position: {position.toArray().map((p) => p.toFixed(2)).join(", ")}
      </Html>
    */}

      {/* Plane mesh */}
      <mesh ref={planeRef} onPointerMove={handlePointerMove} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="black" side={THREE.DoubleSide} />
      </mesh>

      {/* Point Light */}
      <pointLight
        ref={lightRef}
        intensity={10}
        distance={5}
        color="orange"
        position={position}
      />

      {/* Visual Marker for the Light */}
      {/*
      <mesh position={position}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      */}

      {/* Box mesh */}
      {/* 
      <mesh position={[1, 1, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="green" />
      </mesh>
      */}

       {/* FBX Statue */}
       <mesh position={[5,-8,0]} scale={100} onPointerMove={handlePointerMove} rotation={[0, THREE.MathUtils.degToRad(-30), 0]}>
        <FBXModel path="/3dObjects/fbxStatue.fbx"  />
        <meshStandardMaterial color="red" />
       </mesh>
    </>
  );
};

const ThreeScene = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
    {/* Add an ambient light for slight overall illumination */}
    <ambientLight intensity={0.1} />
    <RaycasterPointer />
  </Canvas>
);

export default ThreeScene;
