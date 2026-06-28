/**
 * UniverseScene Component — AryanVerse
 * 
 * The main 3D scene rendering inside the R3F Canvas.
 * Combines Starfield, Galaxy, Planet, Warp Speed Particles, and Destination Hubs.
 * Controls the cinematic camera zoom, noise shake (turbulence), and node-focus states.
 */

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import EtherviaPlanet from './EtherviaPlanet';
import DestinationHubs from './DestinationHubs';
import { getNodePosition } from '../data/destinations';

// Background Faint Nebula Component using Additive Blending and Radial Shaders
function NebulaCloud({ position, color, size = 12, opacity = 0.08 }) {
  const shader = useMemo(() => ({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 uColor;
      uniform float uOpacity;
      void main() {
        float d = length(vUv - 0.5);
        float glow = pow(smoothstep(0.5, 0.0, d), 1.8);
        gl_FragColor = vec4(uColor, glow * uOpacity);
      }
    `
  }), [color, opacity]);

  return (
    <mesh position={position} raycast={() => null}>
      <planeGeometry args={[size, size]} />
      <shaderMaterial
        args={[shader]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Camera Management Component inside the R3F Context
function CameraController({ transitionState, setTransitionState, selectedNode }) {
  const targetPos = useRef(new THREE.Vector3(0, 0, 8)); // Starting position in space
  const lookAtPos = useRef(new THREE.Vector3(0, 0, 0)); // Point camera looks at
  const tempVec = new THREE.Vector3();
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera);

  useFrame((state) => {
    const { pointer, camera } = state;

    if (transitionState === "LEAVING" && selectedNode) {
      // 5. Leaving Warp: Zoom camera extremely fast into selected planet surface
      const aspect = size.width / size.height;
      const fovRad = (camera.fov * Math.PI) / 360;
      const referenceHeight = 2 * Math.tan(fovRad) * 4.2;
      const referenceWidth = referenceHeight * aspect;
      const [nx, ny, nz] = getNodePosition(selectedNode.id, referenceWidth, referenceHeight);
      
      targetPos.current.set(nx, ny, 0.85); // Zoom close to surface without clipping mesh geometry
      lookAtPos.current.set(nx, ny, nz);

      camera.position.lerp(targetPos.current, 0.095); // High acceleration zoom
      
      if (!state.cameraLookTarget) {
        state.cameraLookTarget = new THREE.Vector3(0, 0, 0);
      }
      state.cameraLookTarget.lerp(lookAtPos.current, 0.095);
      camera.lookAt(state.cameraLookTarget);
    }
    else if (transitionState === "IDLE") {
      // 1. Space View: Planet in center, mouse parallax shifts camera position
      targetPos.current.set(0, 0, 8);
      lookAtPos.current.set(0, 0, 0);

      tempVec.copy(targetPos.current);
      tempVec.x += pointer.x * 0.9;
      tempVec.y += pointer.y * 0.6;
      camera.position.lerp(tempVec, 0.04);
      camera.lookAt(lookAtPos.current);
    } 
    else if (transitionState === "ZOOMING") {
      // 2. Zooming View: Camera accelerates forward towards center of planet
      targetPos.current.set(0, 0, 1.4);
      camera.position.lerp(targetPos.current, 0.04);

      // Aerodynamic turbulence (Camera Shake)
      const shakeFactor = 0.035;
      camera.position.x += (Math.random() - 0.5) * shakeFactor;
      camera.position.y += (Math.random() - 0.5) * shakeFactor;
      
      camera.lookAt(lookAtPos.current);

      // Once close enough to the atmospheric boundary, switch to entry mode
      if (camera.position.z < 2.5) {
        setTransitionState("ATMOSPHERE");
      }
    } 
    else if (transitionState === "ATMOSPHERE") {
      // 3. Atmosphere Entry: Penetrating the energy field
      targetPos.current.set(0, 0, -1.0);
      camera.position.lerp(targetPos.current, 0.045);

      // Severe entry turbulence shake
      const shakeFactor = 0.08;
      camera.position.x += (Math.random() - 0.5) * shakeFactor;
      camera.position.y += (Math.random() - 0.5) * shakeFactor;
      
      camera.lookAt(lookAtPos.current);

      // Once passing through the planet center (origin), emerge into the inner world
      if (camera.position.z < 0.2) {
        setTransitionState("WORLD");
      }
    } 
    else if (transitionState === "WORLD") {
      // 4. World View: Emerge inside the holographic core
      if (selectedNode) {
        // Zoom and center camera onto the specific hovered structure using stable position
        const aspect = size.width / size.height;
        const fovRad = (camera.fov * Math.PI) / 360;
        const referenceHeight = 2 * Math.tan(fovRad) * 4.2;
        const referenceWidth = referenceHeight * aspect;
        const [nx, ny, nz] = getNodePosition(selectedNode.id, referenceWidth, referenceHeight);
        targetPos.current.set(nx, ny, 1.5);
        lookAtPos.current.set(nx, ny, nz);
      } else {
        // Hexagonal ring overview of the locations
        targetPos.current.set(0, 0, 4.2);
        lookAtPos.current.set(0, 0, 0);
      }

      // Gentle mouse parallax (subtler once in the menu area)
      tempVec.copy(targetPos.current);
      if (!selectedNode) {
        tempVec.x += pointer.x * 0.4;
        tempVec.y += pointer.y * 0.3;
      }
      camera.position.lerp(tempVec, 0.05);

      // Interpolate lookAt focus target smoothly to avoid snapping
      if (!state.cameraLookTarget) {
        state.cameraLookTarget = new THREE.Vector3(0, 0, 0);
      }
      state.cameraLookTarget.lerp(lookAtPos.current, 0.05);
      camera.lookAt(state.cameraLookTarget);
    }
  });

  return null;
}

export default function UniverseScene({ transitionState, setTransitionState, selectedNode, onNodeClick }) {
  
  // Triggers when user clicks the center planet
  const handlePlanetClick = () => {
    if (transitionState === "IDLE") {
      setTransitionState("ZOOMING");
    }
  };

  return (
    <group>
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.8} castShadow />
      <pointLight position={[-5, -3, -5]} intensity={0.6} color="#3b82f6" />

      {/* Layer 3: Faint background nebulae (10-12% opacity) */}
      <NebulaCloud position={[-3, 1.5, -12]} color="#A855F7" size={14} opacity={0.09} />
      <NebulaCloud position={[4, -2.0, -14]} color="#00E5FF" size={16} opacity={0.08} />
      <NebulaCloud position={[-1, -1.8, -10]} color="#FF7F1F" size={10} opacity={0.05} />

      {/* 3D Scene Components */}
      <EtherviaPlanet
        transitionState={transitionState}
        onPlanetClick={handlePlanetClick}
      />

      <DestinationHubs
        transitionState={transitionState}
        selectedNode={selectedNode}
        onNodeClick={onNodeClick}
      />

      {/* Custom Camera Rig */}
      <CameraController
        transitionState={transitionState}
        setTransitionState={setTransitionState}
        selectedNode={selectedNode}
      />
    </group>
  );
}
