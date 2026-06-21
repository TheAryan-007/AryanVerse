import { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { destinations, getNodePosition } from '../data/destinations';

export default function DestinationHubs({ onNodeClick, transitionState }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera);

  if (transitionState !== "WORLD") return null;

  const aspect = size.width / size.height;
  const fovRad = (camera.fov * Math.PI) / 360;
  const referenceHeight = 2 * Math.tan(fovRad) * 4.2;
  const referenceWidth = referenceHeight * aspect;

  return (
    <group>
      {destinations.map((node, index) => (
        <HubNode
          key={node.id}
          node={node}
          position={getNodePosition(node.id, referenceWidth, referenceHeight)}
          isHovered={hoveredNode === node.id}
          setHovered={(val) => setHoveredNode(val ? node.id : null)}
          onClick={() => onNodeClick(node)}
        />
      ))}
    </group>
  );
}

function HubNode({ node, position, isHovered, setHovered, onClick }) {
  const meshRef = useRef();
  const subGroupRef = useRef();
  const floatGroupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const particle1Ref = useRef();
  const particle2Ref = useRef();

  const scale = isHovered ? 1.3 : 1.0;

  // Compute base color and hover color (20% brighter)
  const baseColor = useMemo(() => new THREE.Color(node.color), [node.color]);
  const hoverColor = useMemo(() => {
    return new THREE.Color(node.color).multiplyScalar(1.2);
  }, [node.color]);
  const currentColor = isHovered ? hoverColor : baseColor;
  const hexColor = useMemo(() => '#' + currentColor.getHexString(), [currentColor]);

  // Generate 3D CatmullRomCurve3 infinity loop curve for Future Command Center
  const infinityCurve = useMemo(() => {
    if (node.geometryType !== "spire") return null;
    const points = [];
    for (let i = 0; i < 64; i++) {
      const t = (i / 64) * Math.PI * 2;
      const scaleVal = 0.55;
      const denom = 1 + Math.sin(t) * Math.sin(t);
      const x = (scaleVal * Math.cos(t)) / denom;
      const y = (scaleVal * Math.sin(t) * Math.cos(t)) / denom;
      const z = scaleVal * 0.25 * Math.sin(t);
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, [node.geometryType]);

  // Handle local rotation, floating animation, and custom shader/flow simulations
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    
    // Spin main mesh / cluster core
    if (meshRef.current) {
      if (node.geometryType === "spire") {
        // Infinity loop: dynamic roll rotation
        meshRef.current.rotation.y = elapsed * 0.4;
        meshRef.current.rotation.x = Math.sin(elapsed * 0.5) * 0.25;
      } else {
        meshRef.current.rotation.y = elapsed * 0.5;
        meshRef.current.rotation.x = elapsed * 0.2;
      }
    }
    
    // Secondary subgroup spinner
    if (subGroupRef.current) {
      subGroupRef.current.rotation.z = -elapsed * 0.8;
      subGroupRef.current.rotation.y = elapsed * 0.4;
    }

    // Timeline concentric rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = elapsed * 0.35;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = elapsed * 0.25;
      ring2Ref.current.rotation.y = elapsed * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = -elapsed * 0.45;
      ring3Ref.current.rotation.z = elapsed * 0.3;
    }

    // Infinity loop flowing particles animation
    if (node.geometryType === "spire" && infinityCurve) {
      const t1 = (elapsed * 0.12) % 1.0;
      const pt1 = infinityCurve.getPointAt(t1);
      if (particle1Ref.current) {
        particle1Ref.current.position.copy(pt1);
      }

      const t2 = (elapsed * 0.12 + 0.5) % 1.0;
      const pt2 = infinityCurve.getPointAt(t2);
      if (particle2Ref.current) {
        particle2Ref.current.position.copy(pt2);
      }
    }

    // Subtle desynchronized floating idle animations per landmark
    if (floatGroupRef.current) {
      const freq = 1.2 + (node.label.length % 4) * 0.18;
      const amp = 0.05;
      floatGroupRef.current.position.y = Math.sin(elapsed * freq) * amp;
    }
  });

  // Render specific premium sci-fi wireframe landmark geometry
  const renderGeometry = () => {
    switch (node.geometryType) {
      case "sphere": // About Headquarters: Holographic human avatar
        return (
          <group>
            {/* Circular Energy Base */}
            <mesh position={[0, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.28, 0.015, 8, 32]} />
              <meshBasicMaterial color={currentColor} transparent opacity={0.6} />
            </mesh>
            <mesh position={[0, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0, 0.25, 32]} />
              <meshBasicMaterial color={currentColor} transparent opacity={0.15} side={THREE.DoubleSide} />
            </mesh>
            
            {/* Humanoid Hologram mesh */}
            <group ref={meshRef} position={[0, 0.05, 0]}>
              {/* Head */}
              <mesh position={[0, 0.14, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color={currentColor} wireframe emissive={currentColor} emissiveIntensity={0.8} />
              </mesh>
              {/* Torso */}
              <mesh position={[0, -0.02, 0]}>
                <coneGeometry args={[0.07, 0.20, 4]} />
                <meshStandardMaterial color={currentColor} wireframe emissive={currentColor} emissiveIntensity={0.5} />
              </mesh>
              {/* Arms */}
              <mesh position={[0.1, 0.05, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <cylinderGeometry args={[0.012, 0.012, 0.12, 4]} />
                <meshBasicMaterial color={currentColor} wireframe />
              </mesh>
              <mesh position={[-0.1, 0.05, 0]} rotation={[0, 0, Math.PI / 4]}>
                <cylinderGeometry args={[0.012, 0.012, 0.12, 4]} />
                <meshBasicMaterial color={currentColor} wireframe />
              </mesh>
              
              {/* Outer cylinder grid scanner */}
              <mesh>
                <cylinderGeometry args={[0.2, 0.2, 0.45, 8, 3]} />
                <meshStandardMaterial color={currentColor} wireframe transparent opacity={0.25} />
              </mesh>
            </group>
          </group>
        );

      case "torusKnot": // Skills District: Crystalline diamond cluster
        return (
          <group>
            {/* Holographic grid base */}
            <mesh position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.3, 0.012, 8, 32]} />
              <meshBasicMaterial color={currentColor} transparent opacity={0.5} />
            </mesh>
            <mesh position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.25, 0.29, 6]} />
              <meshBasicMaterial color={currentColor} transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>

            {/* Clusters */}
            <group ref={meshRef}>
              {/* Main Diamond Core */}
              <mesh>
                <octahedronGeometry args={[0.22]} />
                <meshStandardMaterial color={currentColor} wireframe emissive={currentColor} emissiveIntensity={0.8} />
              </mesh>
              {/* Secondary Shards */}
              <mesh position={[0.16, 0.08, 0.1]} rotation={[0.4, 0.2, 0.8]}>
                <octahedronGeometry args={[0.09]} />
                <meshStandardMaterial color={currentColor} wireframe emissive={currentColor} emissiveIntensity={0.4} />
              </mesh>
              <mesh position={[-0.16, -0.08, -0.1]} rotation={[-0.4, -0.2, -0.8]}>
                <octahedronGeometry args={[0.09]} />
                <meshStandardMaterial color={currentColor} wireframe emissive={currentColor} emissiveIntensity={0.4} />
              </mesh>
              <mesh position={[0.1, -0.12, -0.15]} rotation={[0.2, 0.9, 0.1]}>
                <octahedronGeometry args={[0.07]} />
                <meshStandardMaterial color={currentColor} wireframe />
              </mesh>
              <mesh position={[-0.1, 0.12, 0.15]} rotation={[-0.2, -0.9, -0.1]}>
                <octahedronGeometry args={[0.07]} />
                <meshStandardMaterial color={currentColor} wireframe />
              </mesh>
            </group>
          </group>
        );

      case "dodecahedron": // Projects Lab: Dodecahedron Core with active probe sensors (rebalanced/retained)
        return (
          <group>
            {/* Main Core */}
            <mesh ref={meshRef}>
              <dodecahedronGeometry args={[0.25]} />
              <meshStandardMaterial color={currentColor} wireframe emissive={currentColor} emissiveIntensity={0.5} />
            </mesh>
            {/* Orbiting Probes */}
            <group ref={subGroupRef}>
              <mesh position={[0.42, 0, 0]}>
                <boxGeometry args={[0.06, 0.06, 0.06]} />
                <meshBasicMaterial color={currentColor} />
              </mesh>
              <mesh position={[-0.42, 0, 0]}>
                <boxGeometry args={[0.06, 0.06, 0.06]} />
                <meshBasicMaterial color={currentColor} />
              </mesh>
            </group>
          </group>
        );

      case "cylinder": // Journey Archive: Floating Timeline Rings
        return (
          <group>
            {/* 3 Rings rotating at different tilts */}
            <mesh ref={ring1Ref} rotation={[0.3, 0.1, 0]}>
              <torusGeometry args={[0.38, 0.006, 8, 48]} />
              <meshBasicMaterial color={currentColor} />
              {/* Milestone node */}
              <mesh position={[0.38, 0, 0]}>
                <sphereGeometry args={[0.032, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </mesh>
            <mesh ref={ring2Ref} rotation={[0.5, 0.5, 0]}>
              <torusGeometry args={[0.28, 0.006, 8, 48]} />
              <meshBasicMaterial color={currentColor} />
              {/* Milestone node */}
              <mesh position={[0, 0.28, 0]}>
                <sphereGeometry args={[0.032, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </mesh>
            <mesh ref={ring3Ref} rotation={[-0.4, 0.3, 0]}>
              <torusGeometry args={[0.18, 0.006, 8, 48]} />
              <meshBasicMaterial color="#ffffff" />
              {/* Milestone node */}
              <mesh position={[-0.18, 0, 0]}>
                <sphereGeometry args={[0.026, 8, 8]} />
                <meshBasicMaterial color={currentColor} />
              </mesh>
            </mesh>
          </group>
        );

      case "octahedron": // Blog Library: Futuristic Knowledge Tree
        return (
          <group>
            {/* Tree Canopy Ring */}
            <mesh ref={subGroupRef} position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.26, 0.008, 8, 32]} />
              <meshBasicMaterial color={currentColor} transparent opacity={0.3} />
            </mesh>

            {/* Tree Body */}
            <group ref={meshRef}>
              {/* Trunk */}
              <mesh position={[0, -0.05, 0]}>
                <coneGeometry args={[0.04, 0.35, 6]} />
                <meshStandardMaterial color={currentColor} wireframe emissive={currentColor} emissiveIntensity={0.6} />
              </mesh>
              {/* Branch structures */}
              <mesh position={[0.08, 0.12, 0]} rotation={[0, 0, -Math.PI / 6]}>
                <cylinderGeometry args={[0.015, 0.008, 0.2, 5]} />
                <meshBasicMaterial color={currentColor} wireframe />
              </mesh>
              <mesh position={[-0.08, 0.12, 0]} rotation={[0, 0, Math.PI / 6]}>
                <cylinderGeometry args={[0.015, 0.008, 0.2, 5]} />
                <meshBasicMaterial color={currentColor} wireframe />
              </mesh>
              <mesh position={[0, 0.16, 0.08]} rotation={[Math.PI / 6, 0, 0]}>
                <cylinderGeometry args={[0.015, 0.008, 0.2, 5]} />
                <meshBasicMaterial color={currentColor} wireframe />
              </mesh>

              {/* Floating Leaf Particles */}
              <mesh position={[0.15, 0.20, 0]}>
                <sphereGeometry args={[0.024, 6, 6]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              <mesh position={[-0.15, 0.20, 0]}>
                <sphereGeometry args={[0.024, 6, 6]} />
                <meshBasicMaterial color={currentColor} />
              </mesh>
              <mesh position={[0, 0.30, 0]}>
                <sphereGeometry args={[0.030, 6, 6]} />
                <meshBasicMaterial color={currentColor} />
              </mesh>
              <mesh position={[0.07, 0.26, 0.07]}>
                <sphereGeometry args={[0.020, 6, 6]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              <mesh position={[-0.07, 0.26, -0.07]}>
                <sphereGeometry args={[0.020, 6, 6]} />
                <meshBasicMaterial color={currentColor} />
              </mesh>
            </group>
          </group>
        );

      case "spire": // Future Command Center: Massive 3D wireframe infinity loop
        return (
          <group>
            {/* Infinity Tube */}
            <mesh ref={meshRef}>
              <tubeGeometry args={[infinityCurve, 64, 0.022, 8, true]} />
              <meshStandardMaterial color="#ffffff" wireframe emissive={currentColor} emissiveIntensity={0.7} />
            </mesh>

            {/* Orbiting / Flowing particles */}
            {infinityCurve && (
              <group>
                <mesh ref={particle1Ref}>
                  <sphereGeometry args={[0.038, 8, 8]} />
                  <meshBasicMaterial color={currentColor} />
                </mesh>
                <mesh ref={particle2Ref}>
                  <sphereGeometry args={[0.038, 8, 8]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>
            )}
          </group>
        );

      default:
        return null;
    }
  };

  return (
    <group
      position={position}
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
      <pointLight color={currentColor} intensity={isHovered ? 2.5 : 1.0} distance={1.5} />

      {/* Render the core 3D geometry shape inside floating group */}
      <group ref={floatGroupRef}>
        {renderGeometry()}
      </group>

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
          style={{ width: '10vw', minWidth: '140px', maxWidth: '200px' }}
        >
          {/* Neon Grid Border Title */}
          <div 
            className="px-3 py-1 font-mono text-[10px] font-bold text-center tracking-wider border uppercase rounded shadow-lg transition-colors duration-300"
            style={{
              borderColor: hexColor,
              color: isHovered ? '#FFFFFF' : hexColor,
              backgroundColor: isHovered ? hexColor + '4D' : 'rgba(5, 5, 8, 0.85)',
              boxShadow: isHovered ? `0 0 15px ${hexColor}` : 'none'
            }}
          >
            {node.label}
          </div>
          
          {/* Action indicator */}
          {isHovered && (
            <div 
              className="mt-1 font-mono text-[8px] tracking-widest text-white/90 animate-pulse"
              style={{ textShadow: `0 0 5px ${hexColor}` }}
            >
              [ CLICK TO ENTER ]
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
