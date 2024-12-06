import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html, ScrollControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { relative } from "path";
import { Experience } from "../Experience";


const ThreeScene = () => {
  
  return (
    <Canvas>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={5} damping={0.3}>
          <Experience />
        </ScrollControls>
      </Canvas>
  )
};

export default ThreeScene;
