/**
 * AryanVersePlanet Component — AryanVerse
 * 
 * Renders the centerpiece 3D planet using procedural textures (diffuse, bump, and emissive)
 * and a custom Fresnel Atmosphere Shader for a glowing rim.
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Custom Atmosphere Shader definition (Fresnel Effect)
const AtmosphereShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vNormal = normalize(normalMatrix * normal);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    uniform vec3 color;
    uniform float coefficient;
    uniform float power;
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      // Fresnel calculation: glow is brighter at the silhouette edges
      float intensity = pow(coefficient - max(dot(normal, viewDir), 0.0), power);
      gl_FragColor = vec4(color, intensity);
    }
  `
};

export default function AryanVersePlanet({ onPlanetClick, transitionState }) {
  const planetRef = useRef();
  const atmosphereRef = useRef();

  // Generate procedural canvases for planet textures on load
  const textures = useMemo(() => {
    // 1. Color Map Canvas
    const colorCanvas = document.createElement('canvas');
    colorCanvas.width = 1024;
    colorCanvas.height = 512;
    const cCtx = colorCanvas.getContext('2d');
    
    // Deep dark violet base
    cCtx.fillStyle = '#060410';
    cCtx.fillRect(0, 0, 1024, 512);

    // Layer organic noise patches
    for (let i = 0; i < 45; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const radius = 60 + Math.random() * 120;
      const grad = cCtx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, 'rgba(123, 47, 190, 0.2)');
      grad.addColorStop(0.5, 'rgba(59, 130, 246, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      cCtx.fillStyle = grad;
      cCtx.beginPath();
      cCtx.arc(x, y, radius, 0, Math.PI * 2);
      cCtx.fill();
    }

    // 2. Emissive Map Canvas (Glowing veins in shadow parts)
    const emissiveCanvas = document.createElement('canvas');
    emissiveCanvas.width = 1024;
    emissiveCanvas.height = 512;
    const eCtx = emissiveCanvas.getContext('2d');
    eCtx.fillStyle = '#000000';
    eCtx.fillRect(0, 0, 1024, 512);

    // 3. Bump Map Canvas (Surface heights/craters)
    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 1024;
    bumpCanvas.height = 512;
    const bCtx = bumpCanvas.getContext('2d');
    bCtx.fillStyle = '#808080'; // Neutral gray
    bCtx.fillRect(0, 0, 1024, 512);

    // Draw neural continent grid lines
    cCtx.strokeStyle = 'rgba(168, 85, 247, 0.8)';
    eCtx.strokeStyle = '#c084fc';
    bCtx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
    cCtx.lineWidth = 1.5;
    eCtx.lineWidth = 1.5;
    bCtx.lineWidth = 3.0;

    // Draw glowing planetary veins
    for (let i = 0; i < 18; i++) {
      let x = Math.random() * 1024;
      let y = Math.random() * 512;
      cCtx.beginPath();
      eCtx.beginPath();
      bCtx.beginPath();

      cCtx.moveTo(x, y);
      eCtx.moveTo(x, y);
      bCtx.moveTo(x, y);

      for (let j = 0; j < 10; j++) {
        x += (Math.random() - 0.5) * 80;
        y += (Math.random() - 0.5) * 50;

        // Wrap edges horizontally
        if (x < 0) x += 1024;
        if (x > 1024) x -= 1024;

        cCtx.lineTo(x, y);
        eCtx.lineTo(x, y);
        bCtx.lineTo(x, y);
      }
      cCtx.stroke();
      eCtx.stroke();
      bCtx.stroke();
    }

    // Draw crater overlays on Bump canvas
    for (let i = 0; i < 150; i++) {
      const cx = Math.random() * 1024;
      const cy = Math.random() * 512;
      const cr = 2 + Math.random() * 8;
      
      const bGrad = bCtx.createRadialGradient(cx, cy, 0, cx, cy, cr);
      bGrad.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
      bGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
      bGrad.addColorStop(1, 'rgba(128, 128, 128, 0)');
      
      bCtx.fillStyle = bGrad;
      bCtx.beginPath();
      bCtx.arc(cx, cy, cr, 0, Math.PI * 2);
      bCtx.fill();
    }

    // Convert canvases to ThreeJS textures
    const colorTex = new THREE.CanvasTexture(colorCanvas);
    const emissiveTex = new THREE.CanvasTexture(emissiveCanvas);
    const bumpTex = new THREE.CanvasTexture(bumpCanvas);

    return { colorTex, emissiveTex, bumpTex };
  }, []);

  // Spin the planet and rotate atmosphere
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.04;
    }
    if (atmosphereRef.current) {
      // Rotate atmosphere slightly slower to create cloud parallax
      atmosphereRef.current.rotation.y = -time * 0.015;
    }
  });

  // Scale down or hide the planet sphere once inside the world state
  const isWorld = transitionState === "WORLD";
  const planetScale = isWorld ? 0.001 : 1.2;

  return (
    <group>
      {/* Main Planet Sphere */}
      <mesh
        ref={planetRef}
        scale={[planetScale, planetScale, planetScale]}
        onClick={onPlanetClick}
        onPointerOver={(e) => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          map={textures.colorTex}
          bumpMap={textures.bumpTex}
          bumpScale={0.06}
          emissiveMap={textures.emissiveTex}
          emissive={new THREE.Color('#c084fc')}
          emissiveIntensity={1.8}
          roughness={0.7}
          metalness={0.25}
          clearcoat={0.3}
          clearcoatRoughness={0.4}
        />
      </mesh>

      {/* Atmospheric Glow Shell */}
      {!isWorld && (
        <mesh
          ref={atmosphereRef}
          scale={[1.25, 1.25, 1.25]}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <shaderMaterial
            vertexShader={AtmosphereShader.vertexShader}
            fragmentShader={AtmosphereShader.fragmentShader}
            uniforms={{
              color: { value: new THREE.Color('#c084fc') },
              coefficient: { value: 1.05 },
              power: { value: 4.5 }
            }}
            transparent={true}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  );
}
