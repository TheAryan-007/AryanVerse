/**
 * WarpParticles Component — AryanVerse
 * 
 * Spawns a cylinder of glowing point streaks along the Z-axis.
 * Rushes particles backward past the camera to create a cinematic "warp speed"
 * atmosphere entry effect when transitionState === "ATMOSPHERE".
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WarpParticles({ transitionState }) {
  const pointsRef = useRef();
  const count = 400;
  const isActive = transitionState === "ATMOSPHERE";

  // Create speed points distributed along a cylinder tunnel
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute in a cylinder tunnel around the camera trajectory
      const radius = 0.4 + Math.random() * 3.6; // Tunnel opening size
      const angle = Math.random() * Math.PI * 2;
      
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      // Start spread out along the Z axis (depth: -15 to +15)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;

      // Speed velocity scaling factor
      spd[i] = 0.5 + Math.random() * 1.5;
    }

    return [pos, spd];
  }, []);

  // Animate the particles at high velocity along the Z axis toward the lens
  useFrame((state, delta) => {
    if (!pointsRef.current || !isActive) return;

    const positionsArray = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      // Increment Z-axis position to simulate flying forward past static camera
      positionsArray[i * 3 + 2] += speeds[i] * delta * 70; // High velocity entry

      // If particles pass the viewport threshold (e.g. z > 15), recycle them to the back (z = -15)
      if (positionsArray[i * 3 + 2] > 15) {
        positionsArray[i * 3 + 2] = -15;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!isActive) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c084fc"
        size={0.065}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
