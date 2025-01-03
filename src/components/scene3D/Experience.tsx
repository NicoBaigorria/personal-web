import { Float, PerspectiveCamera, Text, useScroll, OrbitControls } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef, useEffect, FC } from "react";
import * as THREE from "three";
import { Background } from "./Background";
import { TextSection } from "./TextSection";
import { FBXLoader } from "three/examples/jsm/Addons.js";
import path from "path";
import { Iceberg } from "./IceBerg";

const LINE_NB_POINTS = 12000;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;

type FBXModelType = {
  path: string;
};

const FBXModel: FC<FBXModelType> = ({ path }) => {
  const model = useLoader(FBXLoader, path); 
  const groupRef = useRef<THREE.Group>(null);


  useEffect(() => {
    if (model && model instanceof THREE.Object3D) {
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {

          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("darkblue"), 
            roughness: 0.2,
            metalness: 1,
          });
        }
      });
    }
  }, [model]);

  return (
    <group ref={groupRef}>
      <primitive object={model} scale={0.01} />
    </group>
  );
};

export default FBXModel;


export const Experience = () => {
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
    ],
    []
  );

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
  }, []);

  const textSections = useMemo(() => {
    return [
      {
        cameraRailDist: -1,
        position: new THREE.Vector3(
          curvePoints[1].x - 1,
          curvePoints[1].y + 1,
          curvePoints[1].z
        ),
        title: "The Journey Begins",
        subtitle: `Every journey starts with a single step.
  Keep moving forward without looking back.`,
      },
      {
        cameraRailDist: 1.5,
        position: new THREE.Vector3(
          curvePoints[2].x - 1,
          curvePoints[2].y + 1,
          curvePoints[2].z
        ),
        title: "Ups and Downs",
        subtitle: `The path is full of challenges, but each one makes us stronger.`,
      },
      {
        cameraRailDist: -1,
        position: new THREE.Vector3(
          curvePoints[3].x - 1,
          curvePoints[3].y + 1,
          curvePoints[3].z
        ),
        title: "Continuous Learning",
        subtitle: `Every obstacle is a lesson that brings us closer to the goal.`,
      },
      {
        cameraRailDist: 1.5,
        position: new THREE.Vector3(
          curvePoints[4].x - 1,
          curvePoints[4].y + 1,
          curvePoints[4].z
        ),
        title: "Together is Better",
        subtitle: `Mutual support takes us further than we ever imagined.`,
      },
      {
        cameraRailDist: -1,
        position: new THREE.Vector3(
          curvePoints[7].x - 1,
          curvePoints[7].y + 4,
          curvePoints[7].z + 18
        ),
        title: "Don't Stop",
        subtitle: `Don't let obstacles hold you back.
  Together, we can keep moving forward.`,
  link:"https://linkedin.com/in/nicolas-baigorria"
      },
    ];
  }, []);


  const icebergs = useMemo(
    () => [
      // STARTING
      {
        position: new THREE.Vector3(-7, -2, -7),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.random() * Math.PI * 2),
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
      },
      {
        position: new THREE.Vector3(7, -2, -10),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.random() * Math.PI * 2),
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
      },
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(-18, -2, -68),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.random() * Math.PI * 2),
      },
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(10, -2, -52),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.random() * Math.PI * 2),
      },
      // FIRST POINT
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[1].x + 10, -2, curvePoints[1].z + 64),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.random() * Math.PI * 2),
      },
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[1].x - 14, -2, curvePoints[1].z + 28),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.PI / 7),
      },
      {
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.random() * Math.PI * 2),
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[1].x - 13, -2, curvePoints[1].z - 62),
      },
      {
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.random() * Math.PI * 2),
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[1].x + 12, -2, curvePoints[1].z - 82),
      },
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[1].x + 18, -2, curvePoints[1].z - 22),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.random() * Math.PI * 2),
      },
      // SECOND POINT
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[2].x + 6, -2, curvePoints[2].z + 50),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.random() * Math.PI * 2),
      },
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[2].x - 17, -2, curvePoints[2].z - 26),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.random() * Math.PI * 0.5),
      },
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[2].x + 12, -2, curvePoints[2].z - 86),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.PI / 3),
      },
      // THIRD POINT
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[3].x + 8, -2, curvePoints[3].z + 50),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.random() * Math.PI * 2),
      },
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[3].x - 10, -2, curvePoints[3].z + 30),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.PI / 5),
      },
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[3].x - 20, -2, curvePoints[3].z - 8),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.PI / 5),
      },
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[3].x + 8, -2, curvePoints[3].z - 98),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.PI / 3),
      },
      // FOURTH POINT
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[4].x + 8, -2, curvePoints[4].z + 2),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.random() * Math.PI * 2),
      },
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[4].x + 14, -2, curvePoints[4].z - 42),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.PI / 5),
      },
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[4].x - 17, -2, curvePoints[4].z - 62),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.PI / 3),
      },
      // FINAL
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[7].x + 12, -2, curvePoints[7].z + 60),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.random() * Math.PI * 2),
      },
      {
        scale: new THREE.Vector3(Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01, Math.random() * 0.03 + 0.01),
        position: new THREE.Vector3(curvePoints[7].x - 12, -2, curvePoints[7].z + 120),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, Math.PI / 6),
      },
      {
        scale: new THREE.Vector3(0.08, 0.08, 0.08),
        position: new THREE.Vector3(curvePoints[7].x, -2, curvePoints[7].z - 15),
        rotation: new THREE.Euler(-(Math.PI / 2), 0, 0),
      },
    ],
    []
  );


  const positions = icebergs.map((item) => item.position);
  const rotations = icebergs.map((item) => item.rotation || new THREE.Euler(0, 0, 0)); // Default rotation if none is provided
  const scales = icebergs.map((item) => item.scale || new THREE.Vector3(1, 1, 1));

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -2);
    shape.lineTo(0, 2);

    return shape;
  }, [curve]);

  const cameraGroup = useRef<THREE.Group>(null!);
  const scroll = useScroll();


  useFrame((_state, delta) => {
    const maxScrollOffset = 0.98; 
    const scrollOffset = Math.min(scroll.offset, maxScrollOffset); // Limit scroll offset
  
    const curPoint = curve.getPoint(scrollOffset);
  
    cameraGroup.current?.position.lerp(curPoint, delta * 24); // Safely access current
  
    // Make the group look ahead on the curve
    const lookAtPoint = curve.getPoint(
      Math.min(scrollOffset + CURVE_AHEAD_CAMERA, 1)
    );
  
    const currentLookAt = cameraGroup.current.getWorldDirection(
      new THREE.Vector3()
    );
    const targetLookAt = new THREE.Vector3()
      .subVectors(curPoint, lookAtPoint)
      .normalize();
  
    const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);
    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    );
  });
  


  return (
    <>
      <group ref={cameraGroup}>
        <Background />
        <PerspectiveCamera position={[0, -1, 5]} rotation={[0.1, 0, 0]} fov={30} makeDefault />
        <ambientLight intensity={10} /> {/* Add ambient light */}
        <Float floatingRange={[0, 0.05]} rotationIntensity={0.1} speed={10} position={[0, -2.4, -5]}>
        
          <mesh scale={0.005} rotation={[0, (Math.PI / 2), 0]}>
            <FBXModel path="/3dObjects/boat.fbx" />
          </mesh>
        </Float>
      </group>

      {/* TEXT */}
      {textSections.map((textSection, index) => (
        <TextSection {...textSection} key={index} />
      ))}

      {/* LINE */}
      <group position-y={-2}>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial color={"lightblue"} opacity={1} />
        </mesh>
      </group>


      {icebergs.map((iceberg, index) => (

        <Iceberg
          key={index}
          positions={positions}
          rotations={rotations}
          scales={scales}
          opacity={0.2}
        />
      ))}
    </>
  );
};
