"use client";

import React, { useEffect, useRef } from "react";

// vsStars Vertex Shader
const vsStars = `
  attribute vec2  aPos;
  attribute float aSize;
  attribute vec3  aColor;
  attribute float aPhase;
  attribute float aSpeed;
  varying   vec3  vColor;
  varying   float vTwinkle;
  varying   float vSize;
  varying   float vPhase;
  uniform   float uTime;

  void main(){
    float twinkle = sin(uTime * aSpeed + aPhase) * 0.5 + 0.5;
    float shimmer = sin(uTime * aSpeed * 1.618 + aPhase * 2.39) * 0.5 + 0.5;
    vTwinkle = twinkle * 0.7 + shimmer * 0.3;

    float pulsedSize = aSize * (0.6 + vTwinkle * 0.8) * 1.34;
    vSize = pulsedSize;

    float hShift = sin(uTime * aSpeed * 0.4 + aPhase) * 0.5 + 0.5;
    vec3 shifted = vec3(
      aColor.b * hShift + aColor.r * (1.0 - hShift),
      aColor.r * hShift + aColor.g * (1.0 - hShift),
      aColor.g * hShift + aColor.b * (1.0 - hShift)
    );
    vColor = mix(aColor, shifted, 0.55 * vTwinkle);
    vPhase = aPhase;

    gl_Position  = vec4(aPos, 0.0, 1.0);
    gl_PointSize = pulsedSize;
  }
`;

// fsStars Fragment Shader (Accepts uEntrance for smooth startup fade)
const fsStars = `
  precision mediump float;
  varying vec3  vColor;
  varying float vTwinkle;
  varying float vSize;
  varying float vPhase;
  uniform float uEntrance;

  void main(){
    vec2  pc  = gl_PointCoord - 0.5;
    float d   = length(pc) * 2.0;

    float core = 1.0 - smoothstep(0.0, 0.55, d);
    float halo = pow(max(0.0, 1.0 - d), 3.5) * 0.6;

    float spikeX = pow(max(0.0, 1.0 - abs(pc.y) * 8.0), 2.5)
                   * pow(max(0.0, 1.0 - abs(pc.x) * 0.8), 0.5);
    float spikeY = pow(max(0.0, 1.0 - abs(pc.x) * 8.0), 2.5)
                   * pow(max(0.0, 1.0 - abs(pc.y) * 0.8), 0.5);

    vec2 rot45  = vec2(pc.x + pc.y, pc.x - pc.y) * 0.7071;
    float spikeD1 = pow(max(0.0, 1.0 - abs(rot45.y) * 10.0), 2.2)
                    * pow(max(0.0, 1.0 - abs(rot45.x) * 0.9), 0.5);
    float spikeD2 = pow(max(0.0, 1.0 - abs(rot45.x) * 10.0), 2.2)
                    * pow(max(0.0, 1.0 - abs(rot45.y) * 0.9), 0.5);

    float spikeMask = clamp((vSize - 1.5) / 2.5, 0.0, 1.0) * vTwinkle;
    float spikes = (spikeX + spikeY) * 0.45 * spikeMask
                 + (spikeD1 + spikeD2) * 0.25 * spikeMask;

    float brightness = (vTwinkle * 0.5 + 0.5) * 1.3;
    float alpha = clamp((core + halo + spikes) * brightness * 1.25, 0.0, 1.0);

    if(alpha < 0.01) discard;

    vec3 col = mix(vColor, vec3(1.0), core * 0.45 * vTwinkle);
    gl_FragColor = vec4(col, alpha * uEntrance);
  }
`;

// vsGalaxy Vertex Shader
const vsGalaxy = `
  attribute vec2 aPos;
  varying vec2 vUV;
  uniform vec2 uResolution;
  uniform vec2 uGalCenter;
  uniform vec2 uGalSize;
  uniform float uGalAngle;

  void main(){
    vUV = aPos * 0.5 + 0.5;
    
    float cosA = cos(uGalAngle);
    float sinA = sin(uGalAngle);
    vec2 rotPos = vec2(
      aPos.x * cosA - aPos.y * sinA,
      aPos.x * sinA + aPos.y * cosA
    );

    vec2 pixelPos = rotPos * uGalSize * 0.5;
    vec2 finalPixelPos = uGalCenter + pixelPos;
    vec2 ndcPos = (finalPixelPos / uResolution) * 2.0 - 1.0;
    gl_Position = vec4(ndcPos.x, -ndcPos.y, 0.0, 1.0);
  }
`;

// fsGalaxy Fragment Shader
const fsGalaxy = `
  precision mediump float;
  varying vec2 vUV;
  uniform sampler2D uTexture;
  uniform float uOpacity;

  void main(){
    vec4 texCol = texture2D(uTexture, vUV);
    gl_FragColor = vec4(texCol.rgb * uOpacity, texCol.a * uOpacity);
  }
`;

// vsPlanet Vertex Shader
const vsPlanet = `
  attribute vec2 aPos;
  varying vec2 vUV;
  void main(){
    vUV = aPos * 0.5 + 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
  }
`;

// fsPlanet Fragment Shader (Modified for dynamic hover glows/bloom)
const fsPlanet = `
  precision highp float;
  varying vec2 vUV;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uCenter;
  uniform float uRadius;
  uniform float uOpacity;
  uniform float uHover; // 0.0 (idle) to 1.0 (hovered)

  vec3 hash33(vec3 p){
    p = fract(p * vec3(443.8975, 397.2973, 491.1871));
    p += dot(p.zxy, p.yxz + 19.19);
    return fract(vec3(p.x*p.y, p.y*p.z, p.z*p.x));
  }
  float h21(vec2 p){
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float h31(vec3 p){
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
  }

  float vn2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(h21(i),           h21(i+vec2(1,0)), u.x),
               mix(h21(i+vec2(0,1)), h21(i+vec2(1,1)), u.x), u.y);
  }

  float vn3(vec3 p){
    vec3 i = floor(p), f = fract(p);
    vec3 u = f*f*(3.0-2.0*f);
    return mix(
      mix(mix(h31(i),              h31(i+vec3(1,0,0)), u.x),
          mix(h31(i+vec3(0,1,0)), h31(i+vec3(1,1,0)), u.x), u.y),
      mix(mix(h31(i+vec3(0,0,1)), h31(i+vec3(1,0,1)), u.x),
          mix(h31(i+vec3(0,1,1)), h31(i+vec3(1,1,1)), u.x), u.y),
      u.z);
  }

  float fbm3(vec3 p, int oct){
    float v=0.0, a=0.5, t=0.0;
    int maxOct = oct;
    if(maxOct > 4) maxOct = 4; // Cap maximum octaves to 4 for performance
    for(int i=0;i<4;i++){
      if(i>=maxOct) break;
      v += a*vn3(p); t+=a; p*=2.03; a*=0.5;
    }
    return v/t;
  }

  float warpedCloud(vec3 p){
    vec3 q = vec3(vn3(p),
                  vn3(p+vec3(5.2,1.3,3.1)),
                  vn3(p+vec3(1.7,9.2,0.5)));
    vec3 r = vec3(vn3(p + 2.0*q + vec3(1.7,9.2,5.1)),
                  vn3(p + 2.0*q + vec3(8.3,2.8,1.2)),
                  vn3(p + 2.0*q + vec3(0.3,6.1,4.4)));
    return vn3(p + 2.0*r);
  }

  float cloudBands(vec3 p){
    float lat   = p.y;
    float band1 = sin(lat * 8.0  + vn3(p*1.5)*3.0) * 0.5 + 0.5;
    float band2 = sin(lat * 14.0 + vn3(p*2.5+vec3(3.0))*2.5) * 0.5 + 0.5;
    float band3 = sin(lat * 5.0  + vn3(p*0.8+vec3(7.0))*4.0) * 0.5 + 0.5;
    float swirl = warpedCloud(p * 1.2);
    return band1*0.35 + band2*0.25 + band3*0.20 + swirl*0.20;
  }

  float craterField(vec3 p){
    // Pseudo-crater shader using fast noise subtraction to avoid nested 3D Voronoi search loops
    float n1 = vn3(p * 3.5);
    float rim1 = smoothstep(0.40, 0.45, n1) - smoothstep(0.45, 0.52, n1);
    float bowl1 = smoothstep(0.52, 0.40, n1) * 0.35;
    
    float n2 = vn3(p * 6.0 + vec3(1.7, 4.3, 0.8));
    float rim2 = smoothstep(0.38, 0.42, n2) - smoothstep(0.42, 0.50, n2);
    float bowl2 = smoothstep(0.50, 0.38, n2) * 0.25;
    
    return (rim1 + bowl1) * 0.45 + (rim2 + bowl2) * 0.20;
  }

  void main(){
    vec2  px   = vUV * uResolution;
    vec2  d    = px - uCenter;
    float dist = length(d);
    float r    = uRadius;

    if(dist > r * 1.50){
      gl_FragColor = vec4(0.0);
      return;
    }
    if(dist > r){
      // uHover increases the glow size envelope (blooms outward)
      float t = (dist - r) / (r * (0.50 + uHover * 0.18));
      // uHover softens the glow decay to make it feel brighter
      float glow = pow(1.0 - clamp(t, 0.0, 1.0), 1.8 - uHover * 0.45);
      
      vec3 innerColor = vec3(0.85 + uHover * 0.08, 0.65 + uHover * 0.05, 1.00);
      vec3 outerColor = vec3(0.45 + uHover * 0.12, 0.15 + uHover * 0.08, 0.95);
      vec3 color = mix(outerColor, innerColor, glow);
      float alpha = glow * 0.25 * uOpacity;
      gl_FragColor = vec4(color, alpha);
      return;
    }

    float nd     = dist / r;
    vec2  dn     = d / r;
    float zVal   = sqrt(max(0.0, 1.0 - nd*nd));
    vec3  normal = normalize(vec3(dn.x, -dn.y, zVal));

    float spin = uTime * 0.08;
    float cosS = cos(spin), sinS = sin(spin);
    vec3 rotN  = vec3(
      normal.x*cosS - normal.z*sinS,
      normal.y,
      normal.x*sinS + normal.z*cosS
    );

    vec3  lightDir   = normalize(vec3(-0.5, 0.4, 0.7));
    float diffuse    = dot(normal, lightDir);
    float terminator = smoothstep(-0.15, 0.25, diffuse);
    float shadowMask = terminator;

    vec3  sp      = rotN * 3.5;
    float clouds  = cloudBands(sp);
    float terrain = fbm3(sp * 1.8, 7);
    float craters = craterField(rotN * 2.5);

    vec3 rockDark      = vec3(0.05, 0.02, 0.12);
    vec3 rockMid       = vec3(0.18, 0.06, 0.38);
    vec3 rockLight     = vec3(0.42, 0.18, 0.72);
    vec3 rockHighlight = vec3(0.60, 0.40, 0.88);
    vec3 cloudBase     = vec3(0.30, 0.10, 0.60);
    vec3 cloudMid      = vec3(0.55, 0.30, 0.85);
    vec3 cloudBright   = vec3(0.78, 0.62, 0.97);
    vec3 craterDark    = vec3(0.08, 0.03, 0.20);
    vec3 craterRim     = vec3(0.50, 0.28, 0.80);

    vec3 col  = mix(rockDark, rockMid,   smoothstep(0.2, 0.6, terrain));
    col       = mix(col,      rockLight,  smoothstep(0.5, 0.8, terrain));

    vec3 cloudCol = mix(cloudBase, cloudMid,    smoothstep(0.3, 0.6, clouds));
    cloudCol      = mix(cloudCol,  cloudBright,  smoothstep(0.6, 0.85, clouds));
    col = mix(col, cloudCol, smoothstep(0.25, 0.65, clouds) * 0.75);

    col = mix(col, craterDark, craters * 0.55);
    col = mix(col, craterRim,  craters * craters * 0.40);

    float detail = fbm3(sp * 4.5, 5);
    col = mix(col, col * (0.7 + detail * 0.6), 0.35);

    float ambient   = 0.06;
    vec3  litCol    = col;
    float specAngle = max(0.0, dot(reflect(-lightDir, normal), vec3(0,0,1)));
    litCol += vec3(0.85,0.70,1.00) * pow(specAngle, 18.0) * 0.35;
    litCol  = mix(litCol, rockHighlight, smoothstep(0.65,0.90,terrain)*shadowMask*0.40);
    vec3 shadowCol  = col * vec3(0.5,0.4,0.7) * ambient;
    col = mix(shadowCol, litCol*(ambient+(1.0-ambient)*shadowMask), shadowMask);

    float rimDot  = 1.0 - dot(normal, vec3(0.0,0.0,1.0));
    float rimMask = pow(rimDot, 2.8);
    float rimLit  = smoothstep(-0.1, 0.4, diffuse);
    col += vec3(0.70,0.50,1.00) * rimMask * rimLit * 0.55;

    float limb = pow(1.0 - nd*nd, 0.35);
    col *= (0.50 + 0.50*limb);

    float atmEdge = pow(max(0.0, 1.0 - nd), 0.5);
    col = mix(col, vec3(0.45,0.15,0.80), atmEdge*0.18*shadowMask);

    col = col / (col + 0.55);
    col = pow(col, vec3(0.90));
    col = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, uOpacity);
  }
`;

// vsShootingStar Vertex Shader
const vsShootingStar = `
  attribute vec2 aPos;
  uniform vec2 uResolution;
  void main() {
    vec2 ndcPos = (aPos / uResolution) * 2.0 - 1.0;
    gl_Position = vec4(ndcPos.x, -ndcPos.y, 0.0, 1.0);
  }
`;

// fsShootingStar Fragment Shader
const fsShootingStar = `
  precision mediump float;
  uniform float uOpacity;
  void main() {
    gl_FragColor = vec4(0.85, 0.75, 1.0, uOpacity); // soft lavender-white
  }
`;

// Helper: Compile Shaders
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// Helper: Link Shader Program
function createProgram(gl, vsSource, fsSource) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

// Helper: Create Array Buffer
function createBuffer(gl, data) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buffer;
}

// Helper: Generate Procedural Galaxy Texture (as high-quality fallback)
function createProceduralGalaxyTexture(gl) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // Draw a spiral galaxy on 2D canvas
  const cx = size / 2;
  const cy = size / 2;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, size, size);

  // Generate spiral arms
  const numParticles = 4500;
  for (let i = 0; i < numParticles; i++) {
    const r = Math.random() * (size / 2 - 15);
    const numArms = 2;
    const arm = i % numArms;
    const spin = r * 0.045;
    const angle = (arm * Math.PI) + spin + (Math.random() - 0.5) * (0.35 / (r / 60 + 0.15));
    
    const px = cx + Math.cos(angle) * r;
    const py = cy + Math.sin(angle) * r;
    
    let color;
    const opacityFactor = Math.max(0.0, 1 - r / (size / 2));
    if (r < size / 6) {
      color = `rgba(255, 138, 101, ${0.45 * opacityFactor * (1 - r / (size / 6))})`;
    } else if (r < size / 3) {
      color = `rgba(168, 85, 247, ${0.35 * opacityFactor})`;
    } else {
      color = `rgba(59, 130, 246, ${0.3 * opacityFactor})`;
    }
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(px, py, Math.random() * 1.8 + 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw a bright core glow
  const grad = ctx.createRadialGradient(cx, cy, 1, cx, cy, size / 4);
  grad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
  grad.addColorStop(0.15, "rgba(255, 138, 101, 0.7)");
  grad.addColorStop(0.45, "rgba(168, 85, 247, 0.3)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, size / 4, 0, Math.PI * 2);
  ctx.fill();

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  return texture;
}

export default function PlanetBackground({ transitionState, onPlanetClick }) {
  const canvasRef = useRef(null);
  const flashRef = useRef(null);

  // Sync transitionState via ref to prevent stale closures in loops
  const transitionStateRef = useRef(transitionState);
  useEffect(() => {
    transitionStateRef.current = transitionState;
  }, [transitionState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      console.warn("WebGL not supported in this browser.");
      return;
    }

    const getPlanetRadius = (w, h) => {
      return w < 640 ? Math.min(w, h) * 0.22 : w < 1024 ? Math.min(w, h) * 0.25 : Math.min(w, h) * 0.28;
    };

    const getPlanetCenter = (w, h, easedX, easedY) => {
      const baseX = w < 640 ? w * 0.65 : w < 1024 ? w * 0.58 : w * 0.5;
      const baseY = h * 0.5;
      return {
        x: baseX + (easedX - 0.5) * 20,
        y: baseY - (easedY - 0.5) * 15
      };
    };

    let W = window.innerWidth;
    let H = window.innerHeight;
    const t0 = performance.now();
    let lastTime = t0;

    const mouse = { x: 0.5, y: 0.5 };
    const easedMouse = { x: 0.5, y: 0.5 };
    let planetRadius = getPlanetRadius(W, H);

    // Transition values
    let currentScale = 1.0;
    let currentOpacity = 1.0;
    let hoverFactor = 0.0;
    let spinAngle = 0.0;

    // Shooting Star state variables
    let shootingStar = {
      active: false,
      startX: 0,
      startY: 0,
      angle: 0,
      speed: 0,
      length: 0,
      duration: 0,
      progress: 0,
      timer: 15.0 // Trigger first star after 15 seconds
    };

    // WebGL Program Setup
    const starProgram = createProgram(gl, vsStars, fsStars);
    const galaxyProgram = createProgram(gl, vsGalaxy, fsGalaxy);
    const planetProgram = createProgram(gl, vsPlanet, fsPlanet);
    const shootingStarProgram = createProgram(gl, vsShootingStar, fsShootingStar);

    if (!starProgram || !galaxyProgram || !planetProgram || !shootingStarProgram) {
      console.error("Failed to compile WebGL shaders.");
      return;
    }

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    // Star data buffer generation
    const N = isMobile ? 250 : 800;
    const starPos = new Float32Array(N * 2);
    const starSizes = new Float32Array(N);
    const starColors = new Float32Array(N * 3);
    const starPhases = new Float32Array(N);
    const starSpeeds = new Float32Array(N);

    const palette = [
      [1.00, 0.95, 0.95],
      [0.85, 0.90, 1.00],
      [1.00, 1.00, 1.00],
      [0.40, 0.60, 1.00],
      [0.30, 0.80, 1.00],
      [0.90, 0.20, 1.00],
      [0.60, 0.20, 1.00],
      [1.00, 0.30, 0.60],
      [0.95, 0.50, 0.85],
    ];

    for (let i = 0; i < N; i++) {
      starPos[i * 2] = Math.random() * 2 - 1;
      starPos[i * 2 + 1] = Math.random() * 2 - 1;

      const isHero = Math.random() < 0.015;
      if (isHero) {
        starSizes[i] = (Math.random() * 2.0 + 2.8) * 3.0;
      } else {
        const sizeBias = Math.random();
        if (sizeBias < 0.55) {
          starSizes[i] = Math.random() * 1.2 + 0.4;
        } else if (sizeBias < 0.75) {
          starSizes[i] = Math.random() * 1.5 + 1.4;
        } else {
          starSizes[i] = Math.random() * 2.0 + 2.8;
        }
      }

      const color = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = Math.min(1.0, color[0] + (Math.random() - 0.5) * 0.15);
      starColors[i * 3 + 1] = Math.min(1.0, color[1] + (Math.random() - 0.5) * 0.15);
      starColors[i * 3 + 2] = Math.min(1.0, color[2] + (Math.random() - 0.5) * 0.15);

      starPhases[i] = Math.random() * Math.PI * 2;
      starSpeeds[i] = 0.4 + Math.random() * 3.5;
    }

    const posBuffer = createBuffer(gl, starPos);
    const sizeBuffer = createBuffer(gl, starSizes);
    const colBuffer = createBuffer(gl, starColors);
    const phaseBuffer = createBuffer(gl, starPhases);
    const speedBuffer = createBuffer(gl, starSpeeds);

    const quadCoords = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const quadBuffer = createBuffer(gl, quadCoords);

    // Buffer for shooting star lines
    const shootingStarPos = new Float32Array([0, 0, 0, 0]);
    const shootingStarBuffer = gl.createBuffer();

    // Galaxy texture loading
    let galaxyTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, galaxyTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));

    const galaxyImg = new Image();
    galaxyImg.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, galaxyTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, galaxyImg);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    galaxyImg.onerror = () => {
      console.warn("Galaxy texture image not found. Using procedural fallback.");
      gl.deleteTexture(galaxyTexture);
      galaxyTexture = createProceduralGalaxyTexture(gl);
    };
    galaxyImg.src = "/textures/galaxy-texture.png";

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Resize handling
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      const isMobile = W < 768;
      const dpr = 1;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      planetRadius = getPlanetRadius(W, H);
    };
    resize();
    window.addEventListener("resize", resize);

    // Parallax mouse movements
    const handleMouseMove = (e) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Planet click detection mapped to WebGL coordinates
    const handleWindowClick = (e) => {
      const state = transitionStateRef.current;
      if (state !== "IDLE") return;

      const clickX = e.clientX;
      const clickY = e.clientY;

      const center = getPlanetCenter(W, H, easedMouse.x, easedMouse.y);
      const cx = center.x;
      const cy = center.y;
      const dx = clickX - cx;
      const dy = clickY - cy;

      const activeRadius = planetRadius * currentScale;

      if (Math.sqrt(dx * dx + dy * dy) < activeRadius) {
        // Trigger click transition radial flash
        const flash = flashRef.current;
        if (flash) {
          flash.classList.remove("active");
          void flash.offsetWidth; // Force CSS reflow
          flash.classList.add("active");
        }
        
        if (onPlanetClick) {
          onPlanetClick();
        }
      }
    };
    window.addEventListener("pointerdown", handleWindowClick);

    let animationFrameId;

    // WebGL Frame rendering
    const render = () => {
      const currentTime = performance.now();
      const time = (currentTime - t0) * 0.001;
      const deltaTime = (currentTime - lastTime) * 0.001;
      lastTime = currentTime;

      gl.clearColor(0.05, 0.05, 0.08, 1.0); // Clean brand dark clear
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Lerp mouse parallax offsets
      easedMouse.x += (mouse.x - easedMouse.x) * 0.04;
      easedMouse.y += (mouse.y - easedMouse.y) * 0.04;

      const center = getPlanetCenter(W, H, easedMouse.x, easedMouse.y);
      const cx = center.x;
      const cy = center.y;

      // Sequenced WebGL entrance fades (stars -> galaxy -> planet)
      const starEntrance = Math.min(1.0, time / 0.8);
      const galaxyEntrance = Math.max(0.0, Math.min(1.0, (time - 0.5) / 1.3));
      const planetEntrance = Math.max(0.0, Math.min(1.0, (time - 1.0) / 1.2));

      // Scale and fade transitions based on transition state
      const currentState = transitionStateRef.current;
      let targetScale = 1.0;
      let targetOpacity = 1.0;

      if (currentState === "IDLE") {
        targetScale = 1.0;
        targetOpacity = 1.0;
      } else if (currentState === "ZOOMING") {
        targetScale = 3.5;
        targetOpacity = 0.0;
      } else {
        targetScale = 4.0;
        targetOpacity = 0.0;
      }

      currentScale += (targetScale - currentScale) * 0.035;
      currentOpacity += (targetOpacity - currentOpacity) * 0.05;

      // Hover disabled as requested
      const isHovered = false;
      hoverFactor = 0.0;

      // Accumulate spin dynamically to prevent snap shifts (disabled hover acceleration)
      spinAngle += deltaTime * 0.08;

      // 1. Draw Twinkling Starfield
      gl.useProgram(starProgram);
      gl.uniform1f(gl.getUniformLocation(starProgram, "uTime"), time);
      gl.uniform1f(gl.getUniformLocation(starProgram, "uEntrance"), starEntrance);

      const aPosS = gl.getAttribLocation(starProgram, "aPos");
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.enableVertexAttribArray(aPosS);
      gl.vertexAttribPointer(aPosS, 2, gl.FLOAT, false, 0, 0);

      const aSizeS = gl.getAttribLocation(starProgram, "aSize");
      gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
      gl.enableVertexAttribArray(aSizeS);
      gl.vertexAttribPointer(aSizeS, 1, gl.FLOAT, false, 0, 0);

      const aColS = gl.getAttribLocation(starProgram, "aColor");
      gl.bindBuffer(gl.ARRAY_BUFFER, colBuffer);
      gl.enableVertexAttribArray(aColS);
      gl.vertexAttribPointer(aColS, 3, gl.FLOAT, false, 0, 0);

      const aPhaseS = gl.getAttribLocation(starProgram, "aPhase");
      gl.bindBuffer(gl.ARRAY_BUFFER, phaseBuffer);
      gl.enableVertexAttribArray(aPhaseS);
      gl.vertexAttribPointer(aPhaseS, 1, gl.FLOAT, false, 0, 0);

      const aSpeedS = gl.getAttribLocation(starProgram, "aSpeed");
      gl.bindBuffer(gl.ARRAY_BUFFER, speedBuffer);
      gl.enableVertexAttribArray(aSpeedS);
      gl.vertexAttribPointer(aSpeedS, 1, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.POINTS, 0, N);

      // 2. Draw Galaxy (faded slightly inside the world nodes grid, blurred/ambient blend)
      const baseGalaxyOpacity = currentState === "WORLD" ? 0.25 : 0.65; // Faded for environmental depth
      const galaxyOpacity = galaxyEntrance * baseGalaxyOpacity;

      gl.useProgram(galaxyProgram);
      const aPosG = gl.getAttribLocation(galaxyProgram, "aPos");
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(aPosG);
      gl.vertexAttribPointer(aPosG, 2, gl.FLOAT, false, 0, 0);

      const galWidth = 7 * 0.7619 * planetRadius * 0.67;
      const galHeight = galWidth * (571 / 1022);
      const galCenterX = cx + 1.3714 * planetRadius;
      const galCenterY = cy + 0.7619 * planetRadius;
      const galAngle = time * 0.018;

      gl.uniform2f(gl.getUniformLocation(galaxyProgram, "uResolution"), W, H);
      gl.uniform2f(gl.getUniformLocation(galaxyProgram, "uGalCenter"), galCenterX, galCenterY);
      gl.uniform2f(gl.getUniformLocation(galaxyProgram, "uGalSize"), galWidth, galHeight);
      gl.uniform1f(gl.getUniformLocation(galaxyProgram, "uGalAngle"), galAngle);
      gl.uniform1f(gl.getUniformLocation(galaxyProgram, "uOpacity"), galaxyOpacity);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, galaxyTexture);
      gl.uniform1i(gl.getUniformLocation(galaxyProgram, "uTexture"), 0);

      gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // Additive blend for softer natural merge
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      // 3. Draw WebGL Shooting Stars
      shootingStar.timer -= deltaTime;
      if (shootingStar.timer <= 0.0 && !shootingStar.active && currentState === "IDLE") {
        shootingStar.active = true;
        shootingStar.progress = 0.0;
        shootingStar.startX = Math.random() * W;
        shootingStar.startY = Math.random() * H * 0.45;
        shootingStar.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.15;
        shootingStar.speed = Math.min(W, H) * (1.2 + Math.random() * 0.6);
        shootingStar.length = 80 + Math.random() * 70;
        shootingStar.duration = 0.4 + Math.random() * 0.25;
        shootingStar.timer = 15.0 + Math.random() * 5.0; // Trigger again in 15-20s
      }

      if (shootingStar.active) {
        shootingStar.progress += deltaTime / shootingStar.duration;
        if (shootingStar.progress >= 1.0) {
          shootingStar.active = false;
        } else {
          const dxS = Math.cos(shootingStar.angle);
          const dyS = Math.sin(shootingStar.angle);
          const headX = shootingStar.startX + dxS * shootingStar.speed * shootingStar.progress * shootingStar.duration;
          const headY = shootingStar.startY + dyS * shootingStar.speed * shootingStar.progress * shootingStar.duration;
          const tailX = headX - dxS * shootingStar.length;
          const tailY = headY - dyS * shootingStar.length;

          shootingStarPos[0] = tailX;
          shootingStarPos[1] = tailY;
          shootingStarPos[2] = headX;
          shootingStarPos[3] = headY;

          gl.bindBuffer(gl.ARRAY_BUFFER, shootingStarBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, shootingStarPos, gl.DYNAMIC_DRAW);

          gl.useProgram(shootingStarProgram);
          gl.bindBuffer(gl.ARRAY_BUFFER, shootingStarBuffer);
          const aPosSS = gl.getAttribLocation(shootingStarProgram, "aPos");
          gl.enableVertexAttribArray(aPosSS);
          gl.vertexAttribPointer(aPosSS, 2, gl.FLOAT, false, 0, 0);

          gl.uniform2f(gl.getUniformLocation(shootingStarProgram, "uResolution"), W, H);
          const ssOpacity = Math.sin(shootingStar.progress * Math.PI) * 0.85; // Soft fade-in and fade-out
          gl.uniform1f(gl.getUniformLocation(shootingStarProgram, "uOpacity"), ssOpacity);

          gl.drawArrays(gl.LINES, 0, 2);
        }
      }

      // 4. Draw Procedural Planet
      const currentPlanetOpacity = planetEntrance * currentOpacity;
      if (currentPlanetOpacity > 0.005) {
        gl.useProgram(planetProgram);
        const aPosP = gl.getAttribLocation(planetProgram, "aPos");
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
        gl.enableVertexAttribArray(aPosP);
        gl.vertexAttribPointer(aPosP, 2, gl.FLOAT, false, 0, 0);

        // Pass spinAngle instead of time * 0.08 to enable hover spin acceleration
        gl.uniform1f(gl.getUniformLocation(planetProgram, "uTime"), spinAngle / 0.08);
        gl.uniform2f(gl.getUniformLocation(planetProgram, "uResolution"), W, H);
        gl.uniform2f(gl.getUniformLocation(planetProgram, "uCenter"), cx, cy);
        
        // Planet scales slightly on hover (1.03 scale)
        const hoverScaleFactor = 1.0 + hoverFactor * 0.03;
        gl.uniform1f(gl.getUniformLocation(planetProgram, "uRadius"), planetRadius * currentScale * hoverScaleFactor);
        gl.uniform1f(gl.getUniformLocation(planetProgram, "uOpacity"), currentPlanetOpacity);
        gl.uniform1f(gl.getUniformLocation(planetProgram, "uHover"), hoverFactor);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Clean up WebGL assets on component unmount
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handleWindowClick);
      cancelAnimationFrame(animationFrameId);

      gl.deleteShader(gl.getAttachedShaders(starProgram)[0]);
      gl.deleteShader(gl.getAttachedShaders(starProgram)[1]);
      gl.deleteProgram(starProgram);

      gl.deleteShader(gl.getAttachedShaders(galaxyProgram)[0]);
      gl.deleteShader(gl.getAttachedShaders(galaxyProgram)[1]);
      gl.deleteProgram(galaxyProgram);

      gl.deleteShader(gl.getAttachedShaders(planetProgram)[0]);
      gl.deleteShader(gl.getAttachedShaders(planetProgram)[1]);
      gl.deleteProgram(planetProgram);

      gl.deleteShader(gl.getAttachedShaders(shootingStarProgram)[0]);
      gl.deleteShader(gl.getAttachedShaders(shootingStarProgram)[1]);
      gl.deleteProgram(shootingStarProgram);

      gl.deleteBuffer(posBuffer);
      gl.deleteBuffer(sizeBuffer);
      gl.deleteBuffer(colBuffer);
      gl.deleteBuffer(phaseBuffer);
      gl.deleteBuffer(speedBuffer);
      gl.deleteBuffer(quadBuffer);
      gl.deleteBuffer(shootingStarBuffer);
      gl.deleteTexture(galaxyTexture);
    };
  }, []);

  return (
    <>
      {/* 1. Raw WebGL Canvas (Stars + FBM Planet + Galaxy) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#050508] cursor-pointer"
        style={{ pointerEvents: "none" }}
      />

      {/* 2. Self-contained Click Transition Radial Flash */}
      <div
        ref={flashRef}
        className="fixed inset-0 z-40 pointer-events-none opacity-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(160,80,255,0.5) 0%, rgba(0,0,0,0) 70%)"
        }}
      />

      {/* Dynamic Keyframe Injection for the Radial Flash */}
      <style jsx global>{`
        @keyframes flashAnim {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .active {
          animation: flashAnim 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
}
