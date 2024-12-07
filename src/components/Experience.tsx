import { Float, PerspectiveCamera, Text, useScroll, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Background } from "./Background";
import { TextSection } from "./TextSection";

const LINE_NB_POINTS = 12000;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;

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
                    curvePoints[1].x,
                    curvePoints[1].y,
                    curvePoints[1].z
                ),
                subtitle: `Welcome to Wawatmos,
  Have a seat and enjoy the ride!`,
            },
            {
                cameraRailDist: 1.5,
                position: new THREE.Vector3(
                    curvePoints[2].x,
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
                    curvePoints[3].x,
                    curvePoints[3].y,
                    curvePoints[3].z
                ),
                title: "Fear of flying?",
                subtitle: `Our flight attendants will help you have a great journey`,
            },
            {
                cameraRailDist: 1.5,
                position: new THREE.Vector3(
                    curvePoints[4].x,
                    curvePoints[4].y,
                    curvePoints[4].z
                ),
                title: "Movies",
                subtitle: `We provide a large selection of medias, we highly recommend you Porco Rosso during the flight`,
            },
        ];
    }, []);

    const linePoints = useMemo(() => {
        return curve.getPoints(LINE_NB_POINTS);
    }, [curve]);

    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.2);
        shape.lineTo(0, 0.2);

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
                <Float floatIntensity={2} speed={20}>
                    <pointLight intensity={10} distance={10} decay={2} color={"yellow"} />
                    <mesh>
                    <boxGeometry args={[0.1,0.1,0.1]}></boxGeometry>
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
                    <meshStandardMaterial color={"white"} opacity={0.7} transparent />
                </mesh>
            </group>

            {/* CUBES */}
            <mesh scale={[1, 1, 1]} position={[-2, 1, -3]}>
                <boxGeometry />
                <meshStandardMaterial color={"lightblue"} />
            </mesh>
            <mesh scale={[1, 1.5, 1]} position={[1.5, -0.5, -2]}>
                <boxGeometry />
                <meshStandardMaterial color={"lightgreen"} />
            </mesh>
            <mesh scale={[1.5, 1, 1]} position={[2, -0.2, -2]}>
                <boxGeometry />
                <meshStandardMaterial color={"lightcoral"} />
            </mesh>
            <mesh scale={[2, 2, 2]} position={[1, -0.2, -12]}>
                <boxGeometry />
                <meshStandardMaterial color={"lightsalmon"} />
            </mesh>
            <mesh scale={[1.8, 1.8, 1.8]} position={[-1, 1, -53]}>
                <boxGeometry />
                <meshStandardMaterial color={"lightgoldenrodyellow"} />
            </mesh>
            <mesh scale={[2.5, 2.5, 2.5]} position={[0, 1, -100]}>
                <boxGeometry />
                <meshStandardMaterial color={"lightpink"} />
            </mesh>
        </>
    );
};
