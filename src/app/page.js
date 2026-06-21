"use client";

/**
 * AryanVerse Page Component — Client-Side Core
 * 
 * Manages the state machine: IDLE (space view) -> ZOOMING -> ATMOSPHERE (entry) -> WORLD (inner navigation).
 * Renders the 3D Fiber Canvas alongside responsive screen-space glassmorphism HUD overlays,
 * cinematic blur flashes, and location information modals.
 */

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as Icons from "lucide-react";
import { useRouter } from "next/navigation";
import UniverseScene from "../scenes/UniverseScene";
import { destinations } from "../data/destinations";

export default function Home() {
  const [transitionState, setTransitionState] = useState("IDLE"); // IDLE | ZOOMING | ATMOSPHERE | WORLD
  const [selectedNode, setSelectedNode] = useState(null); // Active destination structure
  const [overlayActive, setOverlayActive] = useState(false); // Controls CSS transition glows
  const router = useRouter();

  // Sync transition state changes with overlay animation triggers
  useEffect(() => {
    if (transitionState === "ZOOMING") {
      setOverlayActive(true);
    }
    if (transitionState === "WORLD") {
      // Fade out entry overlay once inside core world
      const timer = setTimeout(() => setOverlayActive(false), 800);
      return () => clearTimeout(timer);
    }
  }, [transitionState]);

  // Read URL query parameters to restore state on navigation return
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("state") === "WORLD") {
        setTransitionState("WORLD");
        const nodeId = params.get("node");
        if (nodeId) {
          const found = destinations.find(n => n.id === nodeId);
          if (found) setSelectedNode(found);
        }
        // Clean URL to prevent re-triggering on reload
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  // Reset core back to Space view
  const handleExitWorld = () => {
    setSelectedNode(null);
    setTransitionState("IDLE");
  };

  // Helper to render Lucide Icons dynamically based on location configs
  const renderNodeIcon = (iconName, color) => {
    const IconComp = Icons[iconName];
    if (!IconComp) return null;
    return <IconComp className="w-7 h-7" style={{ color }} />;
  };

  // Get dynamic classes for atmospheric transition effects
  const getAtmosphereOverlayClass = () => {
    if (transitionState === "ZOOMING") {
      return "opacity-30 backdrop-blur-[2px] pointer-events-none scale-100";
    }
    if (transitionState === "ATMOSPHERE") {
      return "opacity-100 backdrop-blur-md pointer-events-none scale-110";
    }
    if (overlayActive) {
      return "opacity-40 backdrop-blur-[1px] pointer-events-none scale-100";
    }
    return "opacity-0 backdrop-blur-none pointer-events-none scale-95";
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-brand-bg select-none">
      
      {/* 3D RENDER CANVAS BACKGROUND LAYER */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <UniverseScene
            transitionState={transitionState}
            setTransitionState={setTransitionState}
            selectedNode={selectedNode}
            onNodeClick={(node) => setSelectedNode(node)}
          />
        </Canvas>
      </div>

      {/* CSS Centered Planet Overlay */}
      {transitionState !== "WORLD" && transitionState !== "ATMOSPHERE" && (
        <div 
          onClick={() => {
            if (transitionState === "IDLE") {
              setTransitionState("ZOOMING");
            }
          }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer transition-all duration-[2000ms] ease-in-out z-10 ${
            transitionState === "ZOOMING" 
              ? "scale-[2.5] opacity-0 blur-[10px] pointer-events-none" 
              : "scale-100 opacity-100"
          }`}
          style={{
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 0 40px 10px rgba(123,47,190,0.6), 0 0 80px 20px rgba(123,47,190,0.3), 0 0 120px 30px rgba(123,47,190,0.15)',
          }}
        >
          <img 
            src="/planet.png" 
            alt="Ethervia Planet" 
            className="select-none pointer-events-none"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              clipPath: 'circle(48.5%)',
              animation: 'rotatePlanet 60s linear infinite'
            }}
          />
          {/* 3D Depth Shadow Overlay */}
          <div 
            style={{
              background: 'radial-gradient(circle at 35% 35%, transparent 40%, rgba(0,0,0,0.5) 100%)',
              borderRadius: '50%',
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none'
            }}
          />
        </div>
      )}

      {/* 1. CINEMATIC ATMOSPHERE ENTRY FLASH OVERLAY */}
      <div 
        className={`fixed inset-0 z-40 flex items-center justify-center transition-all duration-[1000ms] ease-out ${getAtmosphereOverlayClass()}`}
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(5, 5, 8, 0.95) 80%)'
        }}
      >
        <div className="flex flex-col items-center">
          <div className="font-orbitron text-xs tracking-[0.4em] text-glow-purple animate-pulse mb-2">
            [ ATMOSPHERIC ENTRY ]
          </div>
          <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-glow-purple to-transparent animate-pulse" />
        </div>
      </div>

      {/* 2. SPACE HUD & HERO STACK (IDLE State) */}
      <div 
        className={`absolute inset-0 z-20 pointer-events-none transition-all duration-700 ease-in-out ${
          transitionState === "IDLE" ? "opacity-100" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Top-Left HUD Logo & Status */}
        <div className="absolute top-8 left-8 flex flex-col gap-4 pointer-events-auto">
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* Outer Spinning Ring */}
            <div className="absolute inset-0 rounded-full border-[1.5px] border-electric-blue border-t-transparent animate-spin shadow-[0_0_12px_#3B82F6]" style={{ animationDuration: '3.5s' }} />
            <span className="font-orbitron text-xl font-bold text-white tracking-widest drop-shadow-[0_0_8px_#3B82F6]">A</span>
          </div>
          <div className="font-mono text-[9px] leading-relaxed">
            <div className="text-muted-text tracking-widest font-semibold">&gt; SYSTEM STATUS</div>
            <div className="text-status-green font-bold flex items-center gap-1.5 mt-0.5">
              — ONLINE <span className="w-2 h-2 bg-status-green rounded-full shadow-[0_0_6px_#22C55E]" />
            </div>
          </div>
        </div>

        {/* Top-Right HUD JARVIS Panel */}
        <div className="absolute top-8 right-8 pointer-events-auto">
          <div className="border border-dashed border-primary-purple/40 bg-card-bg/75 p-4 rounded-lg font-mono text-[9px] w-64 shadow-[0_0_15px_rgba(123,47,190,0.25)]">
            <div className="text-primary-purple font-bold text-xs mb-1 tracking-wider">JARVIS SYSTEM</div>
            <div className="text-status-green mb-3 font-semibold">INITIALIZING ARYANVERSE...</div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-muted-text">CONNECTING IDEAS</span>
              <span className="flex-grow border-b border-dotted border-white/10 mx-2" />
              <span className="text-white font-bold">100%</span>
            </div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-muted-text">FUELING CREATIVITY</span>
              <span className="flex-grow border-b border-dotted border-white/10 mx-2" />
              <span className="text-white font-bold">100%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-text">BUILDING THE FUTURE</span>
              <span className="flex-grow border-b border-dotted border-white/10 mx-2" />
              <span className="text-white font-bold">27%</span>
            </div>
          </div>
        </div>

        {/* Left-Center Hero Text Stack */}
        <div className="absolute left-8 md:left-20 top-1/2 -translate-y-1/2 max-w-xl flex flex-col items-start gap-2">
          <div className="font-orbitron text-[11px] font-bold text-white tracking-[0.35em]">BUILDING SOMETHING</div>
          <h1 className="font-orbitron text-7xl md:text-8xl font-black tracking-wider leading-none bg-gradient-to-r from-primary-purple via-accent-purple to-glow-purple bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]">
            SPECIAL
          </h1>
          <div className="font-orbitron text-lg md:text-xl font-bold tracking-[0.2em] text-white/95 mt-1">— ARYAN VERSE —</div>
          <div className="mt-4 border border-dashed border-accent-purple bg-card-bg/60 px-5 py-2.5 rounded shadow-[0_0_12px_rgba(168,85,247,0.25)] font-mono text-[10px] text-white/90">
            NOT JUST A PROJECT. IT'S A UNIVERSE.
          </div>
        </div>

        {/* Bottom Centered Planet Click Prompt */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="font-mono text-[9px] tracking-[0.25em] text-glow-purple uppercase animate-pulse drop-shadow-[0_0_8px_#C084FC]">
            &lt;&lt; Click the Planet to Enter &gt;&gt;
          </div>
        </div>
      </div>

      {/* 3. INNER WORLD NAVIGATION SYSTEM HUD (WORLD State) */}
      <div 
        className={`absolute inset-0 z-30 pointer-events-none transition-all duration-700 ease-in-out ${
          transitionState === "WORLD" ? "opacity-100" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Top Nav Bar controls */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-accent-purple rounded-full shadow-[0_0_8px_#A855F7] animate-pulse" />
            <span className="font-mono text-[10px] font-bold text-glow-purple tracking-widest">
              ARYANVERSE CORE SYSTEM // ACTIVE
            </span>
          </div>
          
          <button 
            onClick={handleExitWorld}
            className="font-mono text-[9px] tracking-widest text-muted-text border border-white/10 bg-card-bg/40 px-3.5 py-1.5 rounded hover:border-glow-purple hover:text-white transition-all duration-300"
          >
            &lt; EXIT UNIVERSE
          </button>
        </div>



        {/* 4. DESTINATION SLIDE-IN MODAL (Right Side Overlay) */}
        <div 
          className={`absolute top-0 right-0 h-full w-full md:w-[450px] bg-brand-bg/85 backdrop-blur-md border-l border-white/5 shadow-2xl p-8 pt-24 flex flex-col justify-between transition-all duration-500 ease-in-out pointer-events-auto z-50 ${
            selectedNode ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {selectedNode && (
            <>
              {/* Top details */}
              <div className="flex flex-col gap-6">
                
                {/* Header structure layout */}
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg shadow-lg">
                    {renderNodeIcon(selectedNode.icon, selectedNode.color)}
                  </div>
                  <div>
                    <div 
                      className="font-mono text-[9px] tracking-widest font-bold uppercase mb-0.5"
                      style={{ color: selectedNode.color }}
                    >
                      SYSTEM / ACCESS / {selectedNode.id}_DIRECT
                    </div>
                    <h2 className="font-orbitron text-2xl font-black text-white tracking-wide uppercase">
                      {selectedNode.label}
                    </h2>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-white/10" />

                {/* Sub description */}
                <p className="font-sans text-sm leading-relaxed text-muted-text">
                  {selectedNode.description}
                </p>

                {/* Location Environment Visual Mockup Details */}
                <div 
                  className="border p-5 rounded-lg bg-card-bg/35 flex flex-col gap-4 shadow-inner"
                  style={{ borderColor: selectedNode.color + '22' }}
                >
                  <div className="font-mono text-[10px] text-white/90 font-bold tracking-wider uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedNode.color }} />
                    Structure Diagnostic Overview
                  </div>
                  
                  {/* Dynamic mock diagnostic details based on page */}
                  {selectedNode.id === "about" && (
                    <div className="font-mono text-[9px] text-muted-text space-y-1.5 leading-relaxed">
                      <div>// IDENTITY: Aryan Chauhan (Data Science Student)</div>
                      <div>// LOCATION: Bennett University, Greater Noida, IN</div>
                      <div>// BIO: Driven to link interactive 3D arts with machine learning.</div>
                    </div>
                  )}

                  {selectedNode.id === "skills" && (
                    <div className="font-mono text-[9px] text-muted-text space-y-1.5 leading-relaxed">
                      <div>// DATA SCIENCE: Python, Pandas, Numpy, Scikit-learn</div>
                      <div>// WEB SYSTEMS: React, NextJS, TailwindCSS, Node.js</div>
                      <div>// 3D GRAPHICS: ThreeJS, React Three Fiber, WebGL</div>
                    </div>
                  )}

                  {selectedNode.id === "projects" && (
                    <div className="font-mono text-[9px] text-muted-text space-y-1.5 leading-relaxed">
                      <div>// ACTIVE CORES: 3 Projects Initialized</div>
                      <div>// PROJECT ALPHA: Real-Time Stream Anomaly Detector</div>
                      <div>// PROJECT BETA: Graph Tree Network Decentr-Map</div>
                    </div>
                  )}

                  {selectedNode.id === "journey" && (
                    <div className="font-mono text-[9px] text-muted-text space-y-1.5 leading-relaxed">
                      <div>// TIMELINE LOGS: 4 Main Epochs Found</div>
                      <div>// CURRENT: B.Tech Data Science (Bennett, 2024-2028)</div>
                      <div>// MILESTONE: Formulating the 3D AryanVerse System (2025)</div>
                    </div>
                  )}

                  {selectedNode.id === "blog" && (
                    <div className="font-mono text-[9px] text-muted-text space-y-1.5 leading-relaxed">
                      <div>// REPOSITORY: 3 Articles Published in Database</div>
                      <div>// CAT-01: Vector Math in 3D Web Rendering</div>
                      <div>// CAT-02: Predictive AI pipelines for Beginners</div>
                    </div>
                  )}

                  {selectedNode.id === "future" && (
                    <div className="font-mono text-[9px] text-muted-text space-y-1.5 leading-relaxed">
                      <div>// VECTOR OBJECTIVES: Research Paths & Ambitions</div>
                      <div>// GOAL-1: Deep Learning applications in Genomics</div>
                      <div>// GOAL-2: High fidelity shaders and spatial systems</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Back controls */}
              <div className="flex flex-col gap-3">
                <button
                  className="w-full font-mono text-[10px] font-bold text-white tracking-widest py-3 border rounded text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow-btn-pulse cursor-pointer"
                  style={{ 
                    borderColor: selectedNode.color,
                    backgroundColor: selectedNode.color + '1F',
                    textShadow: `0 0 5px ${selectedNode.color}`
                  }}
                  onClick={() => {
                    if (selectedNode.id === "about") {
                      router.push("/about");
                    } else if (selectedNode.id === "skills") {
                      router.push("/skills");
                    } else if (selectedNode.id === "journey") {
                      router.push("/journey");
                    } else {
                      alert(`Connecting to ${selectedNode.label} interface...`);
                    }
                  }}
                >
                  ACCESS ENVIRONMENT DATA
                </button>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="w-full font-mono text-[9px] tracking-widest text-muted-text border border-white/5 py-2.5 rounded text-center hover:border-white/20 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  CLOSE CORE HUB
                </button>
              </div>
            </>
          )}
        </div>

      </div>

    </main>
  );
}
