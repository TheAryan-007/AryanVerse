/**
 * UniverseScene Component — AryanVerse
 * 
 * The main 3D scene rendering inside the R3F Canvas.
 * Combines Starfield, Galaxy, Planet, Warp Speed Particles, and Destination Hubs.
 * Controls the cinematic camera zoom, noise shake (turbulence), and node-focus states.
 */

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Starfield from './Starfield';
import Galaxy from './Galaxy';
import EtherviaPlanet from './EtherviaPlanet';
import WarpParticles from './WarpParticles';
import DestinationHubs from './DestinationHubs';
import { getNodePosition } from '../data/destinations';

// Camera Management Component inside the R3F Context
function CameraController({ transitionState, setTransitionState, selectedNode }) {
  const targetPos = useRef(new THREE.Vector3(0, 0, 8)); // Starting position in space
  const lookAtPos = useRef(new THREE.Vector3(0, 0, 0)); // Point camera looks at
  const tempVec = new THREE.Vector3();
  const { viewport } = useThree();

  useFrame((state) => {
    const { pointer, camera } = state;

    if (transitionState === "IDLE") {
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
        // Zoom and center camera onto the specific hovered structure using dynamic position
        const [nx, ny, nz] = getNodePosition(selectedNode.id, viewport.width, viewport.height);
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

      {/* 3D Scene Components */}
      <Starfield />
      <Galaxy />
      
      <EtherviaPlanet
        transitionState={transitionState}
        onPlanetClick={handlePlanetClick}
      />

      <WarpParticles transitionState={transitionState} />

      <DestinationHubs
        transitionState={transitionState}
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
