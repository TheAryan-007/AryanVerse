import { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Box, Icosahedron, Octahedron, Dodecahedron, Cylinder, Sphere, meshBounds } from '@react-three/drei';
import * as THREE from 'three';
import { destinations, getNodePosition } from '../data/destinations';

// Parametric Bernoulli Lemniscate (Infinity Loop) Curve class
class LemniscateCurve extends THREE.Curve {
  constructor(scale = 1) {
    super();
    this.scale = scale;
  }
  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const angle = t * Math.PI * 2;
    const denom = 1 + Math.sin(angle) * Math.sin(angle);
    const x = (this.scale * 1.5 * Math.cos(angle)) / denom;
    const y = (this.scale * 1.8 * Math.sin(angle) * Math.cos(angle)) / denom;
    const z = 0;
    return optionalTarget.set(x, y, z);
  }
}

export default function DestinationHubs({ onNodeClick, transitionState, selectedNode }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera);

  // Render nodes only if in WORLD or LEAVING transition states
  if (transitionState !== "WORLD" && transitionState !== "LEAVING") return null;

  const aspect = size.width / size.height;
  const fovRad = (camera.fov * Math.PI) / 360;
  const referenceHeight = 2 * Math.tan(fovRad) * 4.2;
  const referenceWidth = referenceHeight * aspect;

  return (
    <group>
      {destinations.map((node) => (
        <HubNode
          key={node.id}
          node={node}
          position={getNodePosition(node.id, referenceWidth, referenceHeight)}
          isHovered={hoveredNode === node.id}
          isSelected={selectedNode && selectedNode.id === node.id}
          setHovered={(val) => setHoveredNode(val ? node.id : null)}
          onClick={() => onNodeClick(node)}
          transitionState={transitionState}
        />
      ))}
    </group>
  );
}

function HubNode({ node, position, isHovered, isSelected, setHovered, onClick, transitionState }) {
  const outerGroupRef = useRef();
  const meshRef = useRef();
  const floatGroupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const sat1Ref = useRef();
  const sat2Ref = useRef();
  const particlesRef = useRef();
  const pointLightRef = useRef();

  const isLeaving = transitionState === "LEAVING";

  // Compute base color and hover color (25% brighter)
  const baseColor = useMemo(() => new THREE.Color(node.color), [node.color]);
  const hoverColor = useMemo(() => new THREE.Color(node.color).multiplyScalar(1.25), [node.color]);
  const currentColor = isHovered ? hoverColor : baseColor;
  const hexColor = useMemo(() => '#' + currentColor.getHexString(), [currentColor]);

  // Bernoulli Lemniscate curve definition for infinity loop
  const loopCurve = useMemo(() => new LemniscateCurve(0.24), []);

  // Generate 35 tiny stars/dust particles in a sphere shell around the gem
  const localStars = useMemo(() => {
    const count = 35;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 0.3 + Math.random() * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // Handle slow gem rotations, floating idle cycles, and ring acceleration
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // 0. Smooth outer group scale animation (handles hover scaling and exit transition shrinking)
    if (outerGroupRef.current) {
      let targetScaleVal = isHovered ? 1.25 : 1.0;
      if (isLeaving) {
        targetScaleVal = isSelected ? 1.0 : 0.0;
      }
      const s = outerGroupRef.current.scale;
      const lerpSpeed = isLeaving ? 0.15 : 0.08;
      s.x = THREE.MathUtils.lerp(s.x, targetScaleVal, lerpSpeed);
      s.y = THREE.MathUtils.lerp(s.y, targetScaleVal, lerpSpeed);
      s.z = THREE.MathUtils.lerp(s.z, targetScaleVal, lerpSpeed);

      // If scale is practically zero, turn off visibility to remove drawing overhead completely
      if (isLeaving && !isSelected && s.x < 0.01) {
        outerGroupRef.current.visible = false;
      }
    }

    if (isLeaving) return; // Freeze rotation and motion on route exit

    // 1. Slow Y-axis rotation
    if (meshRef.current) {
      meshRef.current.rotation.y = elapsed * 0.35;
      meshRef.current.rotation.x = Math.sin(elapsed * 0.2) * 0.15;
    }

    // 2. Slow desynchronized floating cycle
    if (floatGroupRef.current) {
      const freq = 1.0 + (node.label.length % 3) * 0.15;
      const amp = 0.04;
      floatGroupRef.current.position.y = Math.sin(elapsed * freq) * amp;
    }

    // 3. Relic specific rotations and path animations (speed up on hover)
    const speedMult = isHovered ? 2.5 : 1.0;

    if (node.geometryType === "teardrop") {
      // ABOUT HEADQUARTERS
      if (ring1Ref.current) {
        ring1Ref.current.rotation.z = -elapsed * 0.18 * speedMult;
      }
      if (ring2Ref.current) {
        // Spindle vertical pulse
        ring2Ref.current.position.y = Math.sin(elapsed * 3.0 * speedMult) * 0.02;
      }
    }
    else if (node.geometryType === "oval") {
      // SKILLS DISTRICT
      if (ring1Ref.current) {
        ring1Ref.current.rotation.z = elapsed * 0.3 * speedMult;
      }
      if (particlesRef.current) {
        particlesRef.current.rotation.y = -elapsed * 0.2 * speedMult;
      }
    }
    else if (node.geometryType === "oblong") {
      // PROJECTS LAB
      if (sat1Ref.current) {
        sat1Ref.current.position.y = 0.24 + Math.sin(elapsed * 2.5 * speedMult) * 0.02;
        sat1Ref.current.rotation.y = elapsed * 1.2 * speedMult;
      }
      if (sat2Ref.current) {
        sat2Ref.current.position.y = -0.24 - Math.sin(elapsed * 2.5 * speedMult) * 0.02;
        sat2Ref.current.rotation.y = -elapsed * 1.2 * speedMult;
      }
    }
    else if (node.geometryType === "emeraldCut") {
      // JOURNEY ARCHIVE
      if (ring1Ref.current) ring1Ref.current.rotation.x = elapsed * 0.5 * speedMult;
      if (ring2Ref.current) ring2Ref.current.rotation.y = elapsed * 0.7 * speedMult;
      if (ring3Ref.current) ring3Ref.current.rotation.z = elapsed * 0.4 * speedMult;
      if (sat1Ref.current) {
        const angle = elapsed * 1.5 * speedMult;
        sat1Ref.current.position.set(Math.cos(angle) * 0.28, Math.sin(angle) * 0.28, 0);
      }
    }
    else if (node.geometryType === "rubyShard") {
      // THE ARCHIVE
      if (ring1Ref.current) {
        ring1Ref.current.rotation.z = elapsed * 0.6 * speedMult;
      }
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsed * 0.3 * speedMult;
      }
    }
    else if (node.geometryType === "cube") {
      // COLLABORATION HUB
      if (sat1Ref.current) {
        const t1 = (elapsed * 0.12 * speedMult) % 1.0;
        const pt = loopCurve.getPoint(t1);
        sat1Ref.current.position.copy(pt);
      }
      if (sat2Ref.current) {
        const t2 = (elapsed * 0.12 * speedMult + 0.5) % 1.0;
        const pt = loopCurve.getPoint(t2);
        sat2Ref.current.position.copy(pt);
      }
    }

    // Dynamic point light intensity modulation (breathing energy pulse)
    if (pointLightRef.current) {
      pointLightRef.current.intensity = (isLeaving ? 6.0 : (isHovered ? 2.5 : 1.2)) + Math.sin(elapsed * 4.5) * 0.25;
    }
  });

  // Calculate dynamic emissive intensity
  const currentEmissive = isLeaving ? 4.5 : (isHovered ? 1.6 : 0.8);

  // Consolidated pointer event handlers to be attached strictly to the visible crystal meshes
  const pointerHandlers = {
    onPointerOver: (e) => {
      if (isLeaving) return;
      e.stopPropagation();
      setHovered(true);
      document.body.style.cursor = 'pointer';
    },
    onPointerOut: (e) => {
      if (isLeaving) return;
      e.stopPropagation();
      setHovered(false);
      document.body.style.cursor = 'default';
    },
    onClick: (e) => {
      if (isLeaving) return;
      e.stopPropagation();
      console.log("DestinationHubs.jsx Clicked ID:", node.id);
      console.log("DestinationHubs.jsx Clicked Route:", node.route);
      onClick();
    }
  };

  // Render specific gemstone characteristics (outer physical shell, inner glowing core, wireframe lattice)
  const renderGeometry = () => {
    switch (node.geometryType) {
      case "teardrop": // ABOUT HEADQUARTERS (Soul Stone - Orange)
        return (
          <group>
            {/* 1. Outer Glass Cage */}
            <Icosahedron args={[0.16, 0]} ref={meshRef} {...pointerHandlers}>
              <meshPhysicalMaterial 
                color={currentColor} 
                emissive={currentColor} 
                emissiveIntensity={currentEmissive} 
                roughness={0.02} 
                metalness={0.05}
                transmission={0.95}
                thickness={1.8}
                ior={2.2}
                flatShading={true}
                clearcoat={1.0}
                clearcoatRoughness={0.02}
              />
            </Icosahedron>
            {/* 2. Inner Glowing Spindle Spire */}
            <mesh ref={ring2Ref} raycast={() => null}>
              <Cylinder args={[0.012, 0.012, 0.22, 6]}>
                <meshBasicMaterial color={node.color} />
              </Cylinder>
            </mesh>
            {/* 3. Cage Wireframe overlay */}
            <Icosahedron args={[0.16, 0]} scale={[1.015, 1.015, 1.015]} raycast={() => null}>
              <meshBasicMaterial 
                color={currentColor} 
                wireframe={true} 
                transparent={true} 
                opacity={0.25} 
              />
            </Icosahedron>
            {/* Under Ring */}
            <mesh ref={ring1Ref} position={[0, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]} raycast={() => null}>
              <torusGeometry args={[0.25, 0.006, 8, 32]} />
              <meshBasicMaterial color={currentColor} transparent opacity={0.3} />
            </mesh>
          </group>
        );

      case "oval": // SKILLS DISTRICT (Mind Stone - Yellow)
        return (
          <group>
            {/* 1. Outer Glass Double-Pyramid */}
            <Octahedron args={[0.16, 0]} scale={[1.0, 1.3, 1.0]} ref={meshRef} {...pointerHandlers}>
              <meshPhysicalMaterial 
                color={currentColor} 
                emissive={currentColor} 
                emissiveIntensity={currentEmissive} 
                roughness={0.02} 
                metalness={0.05}
                transmission={0.95}
                thickness={1.8}
                ior={2.2}
                flatShading={true}
                clearcoat={1.0}
                clearcoatRoughness={0.02}
              />
            </Octahedron>
            {/* 2. Inner Glowing Core */}
            <Octahedron args={[0.16, 0]} scale={[0.4, 0.52, 0.4]} raycast={() => null}>
              <meshBasicMaterial color={node.color} />
            </Octahedron>
            {/* 3. Double-Pyramid Wireframe overlay */}
            <Octahedron args={[0.16, 0]} scale={[1.015, 1.32, 1.015]} raycast={() => null}>
              <meshBasicMaterial 
                color={currentColor} 
                wireframe={true} 
                transparent={true} 
                opacity={0.25} 
              />
            </Octahedron>
            {/* Equatorial Ring */}
            <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0.1, 0]} raycast={() => null}>
              <torusGeometry args={[0.26, 0.005, 8, 36]} />
              <meshBasicMaterial color={currentColor} transparent opacity={0.3} />
            </mesh>
          </group>
        );

      case "oblong": // PROJECTS LAB (Power Stone - Purple)
        return (
          <group>
            {/* 1. Outer Glass Polyhedron Core */}
            <Dodecahedron args={[0.15, 0]} ref={meshRef} {...pointerHandlers}>
              <meshPhysicalMaterial 
                color={currentColor} 
                emissive={currentColor} 
                emissiveIntensity={currentEmissive} 
                roughness={0.02} 
                metalness={0.05}
                transmission={0.95}
                thickness={1.8}
                ior={2.2}
                flatShading={true}
                clearcoat={1.0}
                clearcoatRoughness={0.02}
              />
            </Dodecahedron>
            {/* 2. Inner Glowing Core */}
            <Dodecahedron args={[0.15, 0]} scale={[0.4, 0.4, 0.4]} raycast={() => null}>
              <meshBasicMaterial color={node.color} />
            </Dodecahedron>
            {/* 3. Wireframe Overlay */}
            <Dodecahedron args={[0.15, 0]} scale={[1.015, 1.015, 1.015]} raycast={() => null}>
              <meshBasicMaterial 
                color={currentColor} 
                wireframe={true} 
                transparent={true} 
                opacity={0.25} 
              />
            </Dodecahedron>
            {/* Floating Top Cube */}
            <mesh ref={sat1Ref} raycast={() => null}>
              <Box args={[0.045, 0.045, 0.045]}>
                <meshPhysicalMaterial 
                  color={currentColor} 
                  emissive={currentColor} 
                  roughness={0.02} 
                  transmission={0.9} 
                  thickness={0.5} 
                  flatShading={true}
                />
              </Box>
            </mesh>
            {/* Floating Bottom Cube */}
            <mesh ref={sat2Ref} raycast={() => null}>
              <Box args={[0.045, 0.045, 0.045]}>
                <meshPhysicalMaterial 
                  color={currentColor} 
                  emissive={currentColor} 
                  roughness={0.02} 
                  transmission={0.9} 
                  thickness={0.5} 
                  flatShading={true}
                />
              </Box>
            </mesh>
          </group>
        );

      case "emeraldCut": // JOURNEY ARCHIVE (Time Stone - Green)
        return (
          <group>
            {/* 1. Outer Glass Sphere Core */}
            <Sphere args={[0.16, 16, 16]} ref={meshRef} {...pointerHandlers}>
              <meshPhysicalMaterial 
                color={currentColor} 
                emissive={currentColor} 
                emissiveIntensity={currentEmissive} 
                roughness={0.02} 
                metalness={0.05}
                transmission={0.95}
                thickness={1.8}
                ior={2.2}
                flatShading={true}
                clearcoat={1.0}
                clearcoatRoughness={0.02}
              />
            </Sphere>
            {/* 2. Inner Glowing Core */}
            <Sphere args={[0.16, 16, 16]} scale={[0.4, 0.4, 0.4]} raycast={() => null}>
              <meshBasicMaterial color={node.color} />
            </Sphere>
            {/* Nesting Gyro Ring 1 (X rotation) */}
            <mesh ref={ring1Ref} raycast={() => null}>
              <torusGeometry args={[0.28, 0.005, 8, 48]} />
              <meshBasicMaterial color={currentColor} transparent opacity={0.35} />
              {/* Orbiter node along ring 1 */}
              <mesh ref={sat1Ref} raycast={() => null}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
            </mesh>
            {/* Nesting Gyro Ring 2 (Y rotation) */}
            <mesh ref={ring2Ref} raycast={() => null}>
              <torusGeometry args={[0.24, 0.004, 8, 48]} />
              <meshBasicMaterial color={currentColor} transparent opacity={0.25} />
            </mesh>
            {/* Nesting Gyro Ring 3 (Z rotation) */}
            <mesh ref={ring3Ref} raycast={() => null}>
              <torusGeometry args={[0.20, 0.004, 8, 48]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.2} />
            </mesh>
          </group>
        );

      case "rubyShard": // THE ARCHIVE (Reality Stone - Red)
        return (
          <group>
            {/* Group tilted down-left by -45 degrees */}
            <group rotation={[0, 0, -Math.PI / 4]} ref={meshRef}>
              {/* 1. Tapered Cylinder Spire */}
              <Cylinder args={[0.015, 0.065, 0.32, 6]} {...pointerHandlers}>
                <meshPhysicalMaterial 
                  color={currentColor} 
                  emissive={currentColor} 
                  emissiveIntensity={currentEmissive} 
                  roughness={0.02} 
                  metalness={0.05}
                  transmission={0.95}
                  thickness={1.8}
                  ior={2.2}
                  flatShading={true}
                  clearcoat={1.0}
                  clearcoatRoughness={0.02}
                />
              </Cylinder>
              {/* 2. Inner Glowing Core */}
              <Cylinder args={[0.005, 0.02, 0.30, 6]} scale={[1.0, 1.0, 1.0]} raycast={() => null}>
                <meshBasicMaterial color={node.color} />
              </Cylinder>
              {/* 3. Wireframe Overlay */}
              <Cylinder args={[0.0155, 0.066, 0.322, 6]} raycast={() => null}>
                <meshBasicMaterial color={currentColor} wireframe transparent opacity={0.25} />
              </Cylinder>
              {/* Neck Ring */}
              <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]} raycast={() => null}>
                <torusGeometry args={[0.09, 0.005, 6, 24]} />
                <meshBasicMaterial color={currentColor} transparent opacity={0.3} />
              </mesh>
            </group>

            {/* Orbiting base nodes */}
            <group ref={particlesRef} raycast={() => null}>
              <mesh position={[0.12, -0.15, 0.06]}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshBasicMaterial color={currentColor} />
              </mesh>
              <mesh position={[-0.12, -0.15, -0.06]}>
                <sphereGeometry args={[0.012, 8, 8]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              <mesh position={[0, -0.15, -0.12]}>
                <sphereGeometry args={[0.013, 8, 8]} />
                <meshBasicMaterial color={currentColor} />
              </mesh>
              {/* reality halo ring */}
              <mesh ref={ring1Ref} position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]} raycast={() => null}>
                <torusGeometry args={[0.26, 0.005, 8, 24]} />
                <meshBasicMaterial color={currentColor} transparent opacity={0.2} />
              </mesh>
            </group>
          </group>
        );

      case "cube": // COLLABORATION HUB (Space Stone - Blue)
        return (
          <group>
            {/* Click/Hover Target Sphere (Invisible, 15-20% larger than symbol boundary) */}
            <mesh {...pointerHandlers}>
              <sphereGeometry args={[0.42, 32, 32]} />
              <meshBasicMaterial transparent={true} opacity={0} depthWrite={false} />
            </mesh>
            {/* 1. Outer Glass Lemniscate Infinity Tube */}
            <mesh ref={meshRef} raycast={() => null}>
              <tubeGeometry args={[loopCurve, 64, 0.03, 8, true]} />
              <meshPhysicalMaterial 
                color={currentColor} 
                emissive={currentColor} 
                emissiveIntensity={currentEmissive} 
                roughness={0.02} 
                metalness={0.05}
                transmission={0.95}
                thickness={1.8}
                ior={2.2}
                flatShading={true}
                clearcoat={1.0}
                clearcoatRoughness={0.02}
              />
            </mesh>
            {/* 2. Inner Glowing Core Tube */}
            <mesh raycast={() => null}>
              <tubeGeometry args={[loopCurve, 64, 0.012, 6, true]} />
              <meshBasicMaterial color="#00FFFF" />
            </mesh>
            {/* 3. Wireframe Overlay */}
            <mesh raycast={() => null}>
              <tubeGeometry args={[loopCurve, 64, 0.0315, 8, true]} />
              <meshBasicMaterial color={currentColor} wireframe transparent opacity={0.25} />
            </mesh>
            {/* Satellite 1 orbiting along infinity path */}
            <mesh ref={sat1Ref} raycast={() => null}>
              <sphereGeometry args={[0.016, 8, 8]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
            {/* Satellite 2 orbiting along infinity path */}
            <mesh ref={sat2Ref} raycast={() => null}>
              <sphereGeometry args={[0.016, 8, 8]} />
              <meshBasicMaterial color={currentColor} />
            </mesh>
          </group>
        );

      default:
        return null;
    }
  };

  return (
    <group
      ref={outerGroupRef}
      position={position}
    >
      {/* Local Ambient Light Coloring */}
      <pointLight 
        ref={pointLightRef} 
        color={currentColor} 
        intensity={isLeaving ? 6.0 : (isHovered ? 2.5 : 1.2)} 
        distance={2.5} 
        decay={2}
      />

      {/* Floating local group */}
      <group ref={floatGroupRef}>
        {renderGeometry()}
        
        {/* Soft, glowing atmospheric halo */}
        {isHovered && (
          <mesh scale={[1.15, 1.15, 1.15]} raycast={() => null}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshBasicMaterial color={currentColor} transparent opacity={0.08} blending={THREE.AdditiveBlending} />
          </mesh>
        )}

        {/* Local Stars/Dust System */}
        <points raycast={() => null}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[localStars, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color={currentColor}
            size={0.015}
            sizeAttenuation={true}
            transparent
            opacity={isHovered ? 0.95 : 0.4}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>

      {/* 2D HTML Label overlay projected above the structure */}
      {!isLeaving && (
        <Html
          position={[0, 0.42, 0]}
          center
          distanceFactor={6}
          pointerEvents="none"
          style={{ pointerEvents: 'none' }}
          className="pointer-events-none select-none"
        >
          <div 
            className={`flex flex-col items-center justify-center transition-all duration-500 ease-out ${
              isHovered ? 'scale-105 opacity-100' : 'scale-95 opacity-75'
            }`}
            style={{ width: '12vw', minWidth: '150px', maxWidth: '220px' }}
          >
            {/* Glassmorphic Capsule Label */}
            <div 
              className="px-4 py-1.5 font-sans text-[10px] md:text-[11px] font-semibold text-center tracking-[0.2em] uppercase rounded-full shadow-xl transition-all duration-500 border"
              style={{
                borderColor: isHovered ? hexColor : 'rgba(255, 255, 255, 0.05)',
                color: '#FFFFFF',
                backgroundColor: isHovered ? 'rgba(5, 5, 8, 0.9)' : 'rgba(5, 5, 8, 0.7)',
                backdropFilter: 'blur(12px)',
                boxShadow: isHovered ? `0 0 20px ${hexColor}33, inset 0 0 12px ${hexColor}22` : '0 10px 30px rgba(0,0,0,0.5)'
              }}
            >
              {node.label}
            </div>
            
            {/* Pointer Stem connecting label to the 3D element */}
            <div 
              className="w-[1px] h-4 mt-2 transition-all duration-500"
              style={{
                backgroundColor: isHovered ? hexColor : 'rgba(255, 255, 255, 0.15)',
                boxShadow: isHovered ? `0 0 8px ${hexColor}` : 'none'
              }}
            />

            {/* Action indicator */}
            {isHovered && (
              <div 
                className="mt-1 font-sans text-[8px] font-medium tracking-[0.25em] text-white/70 uppercase animate-pulse"
                style={{ textShadow: `0 0 4px ${hexColor}` }}
              >
                Click to Enter
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}
