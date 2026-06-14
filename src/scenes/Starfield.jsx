/**
 * Starfield Component — AryanVerse
 * 
 * Generates 2,000+ colored 3D point stars scattered in a spherical shell.
 * Includes natural space rotation and blending.
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Starfield() {
  const pointsRef = useRef();
  const count = 2200;

  // Generate randomized positions and colors for the stars
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Color palette matching the realistic universe design
    const colorPalette = [
      new THREE.Color('#ffffff'), // White
      new THREE.Color('#60a5fa'), // Ice Blue
      new THREE.Color('#a78bfa'), // Soft Purple
      new THREE.Color('#f472b6'), // Faint Pink
      new THREE.Color('#3b82f6'), // Electric Blue
    ];

    for (let i = 0; i < count; i++) {
      // Place stars in a wide shell (r=12 to r=60) so they don't clip the inner planet/camera
      const radius = 12 + Math.random() * 48;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Distribute colors from the palette with random brightness offsets
      const baseColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      const brightness = 0.6 + Math.random() * 0.4; // random intensity modifier

      col[i * 3] = baseColor.r * brightness;
      col[i * 3 + 1] = baseColor.g * brightness;
      col[i * 3 + 2] = baseColor.b * brightness;
    }

    return [pos, col];
  }, []);

  // Animate a slow drift to create the parallax effect on mouse movements and background drift
  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = time * 0.003;
      pointsRef.current.rotation.x = time * 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.08}
        sizeAttenuation={true}
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
