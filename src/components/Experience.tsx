import { Float, PerspectiveCamera, Text, useScroll, OrbitControls } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef, useEffect, FC } from "react";
import * as THREE from "three";
import { Background } from "./Background";
import { TextSection } from "./TextSection";
import { FBXLoader } from "three/examples/jsm/Addons.js";
import path from "path";
import {Iceberg} from "./IceBerg";

const LINE_NB_POINTS = 12000;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;

type FBXModelType = {
    path: string;
};

const FBXModel: FC<FBXModelType> = ({ path }) => {
  const model = useLoader(FBXLoader, path); // Load the FBX model
  const groupRef = useRef<THREE.Group>(null);

  // Modify materials once the model is loaded
  useEffect(() => {
    if (model && model instanceof THREE.Object3D) {
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Change the material of each mesh
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("lightblue"), // Example: red color
            roughness: 0.5,
            metalness: 0.5,
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
                    curvePoints[1].x-1,
                    curvePoints[1].y,
                    curvePoints[1].z
                ),
                subtitle: `Welcome to Wawatmos,
  Have a seat and enjoy the ride!`,
            },
            {
                cameraRailDist: 1.5,
                position: new THREE.Vector3(
                    curvePoints[2].x-1,
                    curvePoints[2].y,
                    curvePoints[2].z
                ),
                title: "Services",
                subtitle: `Do you want a drink?
  We have a wide range of beverages!`,
            },
            {
                cameraRailDist: -1,
                position: new THREE.Vector3(
                    curvePoints[3].x-1,
                    curvePoints[3].y,
                    curvePoints[3].z
                ),
                title: "Fear of flying?",
                subtitle: `Our flight attendants will help you have a great journey`,
            },
            {
                cameraRailDist: 1.5,
                position: new THREE.Vector3(
                    curvePoints[4].x-1,
                    curvePoints[4].y,
                    curvePoints[4].z
                ),
                title: "Movies",
                subtitle: `We provide a large selection of medias, we highly recommend you Porco Rosso during the flight`,
            },
        ];
    }, []);

    const icebergs = useMemo(
        () => [
          // STARTING
          {
            position: new THREE.Vector3(-3.5, -3.2, -7),
          },
          {
            position: new THREE.Vector3(3.5, -4, -10),
          },
          {
            scale: new THREE.Vector3(4, 4, 4),
            position: new THREE.Vector3(-18, 0.2, -68),
            rotation: new THREE.Euler(-Math.PI / 5, Math.PI / 6, 0),
          },
          {
            scale: new THREE.Vector3(2.5, 2.5, 2.5),
            position: new THREE.Vector3(10, -1.2, -52),
          },
          // FIRST POINT
          {
            scale: new THREE.Vector3(4, 4, 4),
            position: new THREE.Vector3(
              curvePoints[1].x + 10,
              curvePoints[1].y - 4,
              curvePoints[1].z + 64
            ),
          },
          {
            scale: new THREE.Vector3(3, 3, 3),
            position: new THREE.Vector3(
              curvePoints[1].x - 20,
              curvePoints[1].y + 4,
              curvePoints[1].z + 28
            ),
            rotation: new THREE.Euler(0, Math.PI / 7, 0),
          },
          {
            rotation: new THREE.Euler(0, Math.PI / 7, Math.PI / 5),
            scale: new THREE.Vector3(5, 5, 5),
            position: new THREE.Vector3(
              curvePoints[1].x - 13,
              curvePoints[1].y + 4,
              curvePoints[1].z - 62
            ),
          },
          {
            rotation: new THREE.Euler(Math.PI / 2, Math.PI / 2, Math.PI / 3),
            scale: new THREE.Vector3(5, 5, 5),
            position: new THREE.Vector3(
              curvePoints[1].x + 54,
              curvePoints[1].y + 2,
              curvePoints[1].z - 82
            ),
          },
          {
            scale: new THREE.Vector3(5, 5, 5),
            position: new THREE.Vector3(
              curvePoints[1].x + 8,
              curvePoints[1].y - 14,
              curvePoints[1].z - 22
            ),
          },
          // SECOND POINT
          {
            scale: new THREE.Vector3(3, 3, 3),
            position: new THREE.Vector3(
              curvePoints[2].x + 6,
              curvePoints[2].y - 7,
              curvePoints[2].z + 50
            ),
          },
          {
            scale: new THREE.Vector3(2, 2, 2),
            position: new THREE.Vector3(
              curvePoints[2].x - 2,
              curvePoints[2].y + 4,
              curvePoints[2].z - 26
            ),
          },
          {
            scale: new THREE.Vector3(4, 4, 4),
            position: new THREE.Vector3(
              curvePoints[2].x + 12,
              curvePoints[2].y + 1,
              curvePoints[2].z - 86
            ),
            rotation: new THREE.Euler(Math.PI / 4, 0, Math.PI / 3),
          },
          // THIRD POINT
          {
            scale: new THREE.Vector3(3, 3, 3),
            position: new THREE.Vector3(
              curvePoints[3].x + 3,
              curvePoints[3].y - 10,
              curvePoints[3].z + 50
            ),
          },
          {
            scale: new THREE.Vector3(3, 3, 3),
            position: new THREE.Vector3(
              curvePoints[3].x - 10,
              curvePoints[3].y,
              curvePoints[3].z + 30
            ),
            rotation: new THREE.Euler(Math.PI / 4, 0, Math.PI / 5),
          },
          {
            scale: new THREE.Vector3(4, 4, 4),
            position: new THREE.Vector3(
              curvePoints[3].x - 20,
              curvePoints[3].y - 5,
              curvePoints[3].z - 8
            ),
            rotation: new THREE.Euler(Math.PI, 0, Math.PI / 5),
          },
          {
            scale: new THREE.Vector3(5, 5, 5),
            position: new THREE.Vector3(
              curvePoints[3].x + 0,
              curvePoints[3].y - 5,
              curvePoints[3].z - 98
            ),
            rotation: new THREE.Euler(0, Math.PI / 3, 0),
          },
          // FOURTH POINT
          {
            scale: new THREE.Vector3(2, 2, 2),
            position: new THREE.Vector3(
              curvePoints[4].x + 3,
              curvePoints[4].y - 10,
              curvePoints[4].z + 2
            ),
          },
          {
            scale: new THREE.Vector3(3, 3, 3),
            position: new THREE.Vector3(
              curvePoints[4].x + 24,
              curvePoints[4].y - 6,
              curvePoints[4].z - 42
            ),
            rotation: new THREE.Euler(Math.PI / 4, 0, Math.PI / 5),
          },
          {
            scale: new THREE.Vector3(3, 3, 3),
            position: new THREE.Vector3(
              curvePoints[4].x - 4,
              curvePoints[4].y + 9,
              curvePoints[4].z - 62
            ),
            rotation: new THREE.Euler(Math.PI / 3, 0, Math.PI / 3),
          },
          // FINAL
          {
            scale: new THREE.Vector3(3, 3, 3),
            position: new THREE.Vector3(
              curvePoints[7].x + 12,
              curvePoints[7].y - 5,
              curvePoints[7].z + 60
            ),
            rotation: new THREE.Euler(-Math.PI / 4, -Math.PI / 6, 0),
          },
          {
            scale: new THREE.Vector3(3, 3, 3),
            position: new THREE.Vector3(
              curvePoints[7].x - 12,
              curvePoints[7].y + 5,
              curvePoints[7].z + 120
            ),
            rotation: new THREE.Euler(Math.PI / 4, Math.PI / 6, 0),
          },
          {
            scale: new THREE.Vector3(4, 4, 4),
            position: new THREE.Vector3(
              curvePoints[7].x,
              curvePoints[7].y,
              curvePoints[7].z
            ),
            rotation: new THREE.Euler(0, 0, 0),
          },
        ],
        []
      );

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
        const scrollOffset = Math.max(0, scroll.offset);

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
                <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
                <ambientLight intensity={0} /> {/* Add ambient light */}
                <Float floatingRange={[0,0.05]} rotationIntensity={0.1} speed={10} position={[0,-2.4,-5]}>
                    <pointLight intensity={10} distance={10} decay={2} color={"yellow"} position={[0,0.2,-1.5]} />
                    <mesh scale={0.005} rotation={[0,(Math.PI / 2), 0]}>
                    <FBXModel
            path="/3dObjects/boat.fbx"
          />
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
  position={iceberg.position}
  scale={iceberg.scale}
  rotation={iceberg.rotation}
      />
    ))}
    <OrbitControls/>
        </>
    );
};
