/**
 * Galaxy Component — AryanVerse
 * 
 * Generates a rotating 3D double-armed spiral galaxy in the background.
 * Uses mathematical logarithmic spirals and color blending (warm core -> violet -> blue).
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Galaxy() {
  const galaxyRef = useRef();
  const count = 4500;

  // Generate spiral coordinates and colors
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorCore = new THREE.Color('#ff8a65'); // Pinkish-orange core
    const colorArm = new THREE.Color('#a855f7');  // Accent Purple arms
    const colorEdge = new THREE.Color('#3b82f6'); // Electric Blue edge tips

    for (let i = 0; i < count; i++) {
      // Radial distance from core
      const radius = Math.random() * 3.8;
      
      // Determine arm assignment (2 spiral arms)
      const armIndex = i % 2;
      
      // Logarithmic spiral angle calculation: angle increases with radius
      const spinAngle = radius * 1.6;
      const armAngle = (armIndex * Math.PI) + spinAngle;
      
      // Add dispersion/random scattering (denser core, dispersed arms)
      const dispersion = 0.2 / (radius + 0.15);
      const dx = (Math.random() - 0.5) * dispersion;
      const dy = (Math.random() - 0.5) * dispersion;
      const dz = (Math.random() - 0.5) * dispersion;

      pos[i * 3] = Math.cos(armAngle) * radius + dx;
      pos[i * 3 + 1] = dy;
      pos[i * 3 + 2] = Math.sin(armAngle) * radius + dz;

      // Color interpolation based on radius (dense core -> purple arms -> blue edges)
      let finalColor;
      if (radius < 1.0) {
        finalColor = colorCore.clone().lerp(colorArm, radius);
      } else {
        finalColor = colorArm.clone().lerp(colorEdge, (radius - 1.0) / 2.8);
      }

      // Intensify brightness of the core stars
      const brightnessFactor = radius < 0.4 ? 2.5 : 1.0;

      col[i * 3] = finalColor.r * brightnessFactor;
      col[i * 3 + 1] = finalColor.g * brightnessFactor;
      col[i * 3 + 2] = finalColor.b * brightnessFactor;
    }

    return [pos, col];
  }, []);

  // Spin the galaxy around its Y axis
  useFrame((state) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y = state.clock.getElapsedTime() * 0.012;
    }
  });

  return (
    // Positioned in the bottom-right space background, tilted for depth, shifted downward
    <group ref={galaxyRef} position={[4.8, -4.6, -6.0]} rotation={[0.55, -0.35, 0.45]}>
      <points>
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
          size={0.045}
          sizeAttenuation={true}
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
