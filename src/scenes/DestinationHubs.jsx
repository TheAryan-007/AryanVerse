/**
 * DestinationHubs Component — AryanVerse
 * 
 * Renders the 6 custom 3D holographic destination structures:
 * - About Headquarters: Double shell sphere
 * - Skills District: Torus knot with orbital ring
 * - Projects Lab: Dodecahedron core with active satellite probes
 * - Journey Archive: Ascending timeline cylinders
 * - Blog Library: Crystal octahedron with scanner ring
 * - Future Command Center: Vertical spire beacon with pulse light
 */

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { destinations } from '../data/destinations';

export default function DestinationHubs({ onNodeClick, transitionState }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  if (transitionState !== "WORLD") return null;

  return (
    <group>
      {destinations.map((node, index) => (
        <HubNode
          key={node.id}
          node={node}
          isHovered={hoveredNode === node.id}
          setHovered={(val) => setHoveredNode(val ? node.id : null)}
          onClick={() => onNodeClick(node)}
        />
      ))}
    </group>
  );
}

function HubNode({ node, isHovered, setHovered, onClick }) {
  const meshRef = useRef();
  const subGroupRef = useRef();
  const scale = isHovered ? 1.3 : 1.0;

  // Spin each node on its own axis
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = elapsed * 0.5;
      meshRef.current.rotation.x = elapsed * 0.2;
    }
    if (subGroupRef.current) {
      subGroupRef.current.rotation.z = -elapsed * 0.8;
      subGroupRef.current.rotation.y = elapsed * 0.4;
    }
  });

  // Render specific geometry based on destination details
  const renderGeometry = () => {
    switch (node.geometryType) {
      case "sphere": // About Headquarters
        return (
          <group>
            {/* Inner Core */}
            <mesh>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.7} />
            </mesh>
            {/* Outer Wireframe Shell */}
            <mesh ref={meshRef}>
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshStandardMaterial color={node.color} wireframe emissive={node.color} emissiveIntensity={0.8} />
            </mesh>
          </group>
        );

      case "torusKnot": // Skills District
        return (
          <group>
            {/* Core Knot */}
            <mesh ref={meshRef}>
              <torusKnotGeometry args={[0.18, 0.05, 64, 8]} />
              <meshStandardMaterial color={node.color} wireframe emissive={node.color} emissiveIntensity={0.6} />
            </mesh>
            {/* Orbiting ring */}
            <mesh ref={subGroupRef} rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[0.38, 0.012, 8, 32]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.4} />
            </mesh>
          </group>
        );

      case "dodecahedron": // Projects Lab
        return (
          <group>
            {/* Main Core */}
            <mesh ref={meshRef}>
              <dodecahedronGeometry args={[0.25]} />
              <meshStandardMaterial color={node.color} wireframe emissive={node.color} emissiveIntensity={0.5} />
            </mesh>
            {/* Orbiting Probes */}
            <group ref={subGroupRef}>
              <mesh position={[0.42, 0, 0]}>
                <boxGeometry args={[0.06, 0.06, 0.06]} />
                <meshBasicMaterial color={node.color} />
              </mesh>
              <mesh position={[-0.42, 0, 0]}>
                <boxGeometry args={[0.06, 0.06, 0.06]} />
                <meshBasicMaterial color={node.color} />
              </mesh>
            </group>
          </group>
        );

      case "cylinder": // Journey Archive
        return (
          <group ref={meshRef}>
            {/* Ascending cylinder columns */}
            <mesh position={[-0.15, -0.15, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.25, 8]} />
              <meshStandardMaterial color={node.color} wireframe emissive={node.color} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.38, 8]} />
              <meshStandardMaterial color={node.color} wireframe emissive={node.color} emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.15, 0.15, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
              <meshStandardMaterial color={node.color} wireframe emissive={node.color} emissiveIntensity={0.9} />
            </mesh>
          </group>
        );

      case "octahedron": // Blog Library
        return (
          <group>
            {/* Crystal Core */}
            <mesh ref={meshRef}>
              <octahedronGeometry args={[0.26]} />
              <meshStandardMaterial color={node.color} wireframe emissive={node.color} emissiveIntensity={0.6} />
            </mesh>
            {/* Scanner ring */}
            <mesh ref={subGroupRef} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.36, 0.01, 8, 32]} />
              <meshBasicMaterial color={node.color} />
            </mesh>
          </group>
        );

      case "spire": // Future Command Center
        return (
          <group>
            {/* Tall Beacon Spire */}
            <mesh ref={meshRef}>
              <coneGeometry args={[0.12, 0.55, 6]} />
              <meshStandardMaterial color={node.color} wireframe emissive={node.color} emissiveIntensity={0.6} />
            </mesh>
            {/* Pulse base */}
            <mesh position={[0, -0.25, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.05, 8]} />
              <meshBasicMaterial color={node.color} transparent opacity={0.3} />
            </mesh>
          </group>
        );

      default:
        return null;
    }
  };

  return (
    <group
      position={node.position}
      scale={[scale, scale, scale]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* Light glow point source in center */}
      <pointLight color={node.color} intensity={isHovered ? 2.5 : 1.0} distance={1.5} />

      {/* Render the core 3D geometry shape */}
      {renderGeometry()}

      {/* 2D HTML Label overlay projected above the structure */}
      <Html
        position={[0, 0.65, 0]}
        center
        distanceFactor={6}
        className="pointer-events-none select-none"
      >
        <div 
          className={`flex flex-col items-center justify-center transition-all duration-300 ${
            isHovered ? 'scale-110 opacity-100' : 'scale-95 opacity-80'
          }`}
          style={{ width: '180px' }}
        >
          {/* Neon Grid Border Title */}
          <div 
            className="px-3 py-1 font-mono text-[10px] font-bold text-center tracking-wider border uppercase rounded shadow-lg transition-colors duration-300"
            style={{
              borderColor: node.color,
              color: isHovered ? '#FFFFFF' : node.color,
              backgroundColor: isHovered ? node.color + '4D' : 'rgba(5, 5, 8, 0.85)',
              boxShadow: isHovered ? `0 0 15px ${node.color}` : 'none'
            }}
          >
            {node.label}
          </div>
          
          {/* Action indicator */}
          {isHovered && (
            <div 
              className="mt-1 font-mono text-[8px] tracking-widest text-white/90 animate-pulse"
              style={{ textShadow: `0 0 5px ${node.color}` }}
            >
              [ CLICK TO ENTER ]
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
