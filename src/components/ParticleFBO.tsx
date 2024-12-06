import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { WebGLRenderTarget, Points, BufferGeometry, Float32BufferAttribute, PointsMaterial, Vector3, Color } from 'three';

type ParticleFBOProps = {
  width: number;
  height: number;
};

const ParticleFBO: React.FC<ParticleFBOProps> = ({ width, height }) => {
  const particlesRef = useRef<Points>(null);

  // Number of particles
  const particleCount = 1000;

  // Store mouse position
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Handle mouse move event
  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,  // Normalize x to -1 to 1
        y: -(event.clientY / window.innerHeight) * 2 + 1 // Normalize y to -1 to 1
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Generate random positions for particles
  const positions = useMemo(() => {
    const pos: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      pos.push(Math.random() * 2 - 1);  // X
      pos.push(Math.random() * 2 - 1);  // Y
      pos.push(Math.random() * 2 - 1);  // Z
    }
    return new Float32BufferAttribute(pos, 3);
  }, []);

  // Particle material with white color, transparent size, and opacity
  const particleMaterial = useMemo(() => new PointsMaterial({
    color: 0xffffff,
    size: 0.05,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,  // Disable depth write for better blending
    vertexColors: false, // No custom vertex colors
    map: undefined, // If you want to use textures, you can assign a map here
  }), []);

  // Particle geometry
  const particleGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', positions);
    return geometry;
  }, [positions]);

  // FBO texture and render target
  const renderTarget = useMemo(() => new WebGLRenderTarget(width, height), [width, height]);

  // Update and render particles into the FBO
  useFrame(({ gl, scene, camera }) => {
    if (particlesRef.current) {
      // Rotate particles to animate them
      particlesRef.current.rotation.x += 0.001;
      particlesRef.current.rotation.y += 0.001;

      // Move particles based on the mouse position
      const positionsArray = particlesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const particle = new Vector3(
          positionsArray[i3], 
          positionsArray[i3 + 1], 
          positionsArray[i3 + 2]
        );

        // Apply mouse movement influence to the particles' position
        particle.x += (mouse.x - particle.x) * 0.1;  // Mouse movement effect on X
        particle.y += (mouse.y - particle.y) * 0.1;  // Mouse movement effect on Y

        // Update position
        positionsArray[i3] = particle.x;
        positionsArray[i3 + 1] = particle.y;
        positionsArray[i3 + 2] = particle.z;
      }

      // Mark the geometry as needing an update
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Render the particles to the FBO (off-screen)
    gl.setRenderTarget(renderTarget);
    gl.render(scene, camera);
    gl.setRenderTarget(null); // Reset to the default framebuffer
  });

  // Return the particle system (Points)
  return <primitive object={new Points(particleGeometry, particleMaterial)} ref={particlesRef} />;
};

export default ParticleFBO;
