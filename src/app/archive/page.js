"use client";

/**
 * The Archive — AryanVerse
 * 
 * Redesigned as a Stylized 2.5D Spider-Verse Creator's Studio.
 * Incorporates:
 * 1. STATE 1: Handcrafted Vector Room (Dark space, thick outlines, cel-shaded color zones,
 *    pulsing markers, rotating reels, scrolling terminal code, drifting book sheets, constellation stars).
 * 2. STATE 2: Chamber Editorial View (Warm off-white, high-contrast, serif typography, split layout, theme selector, recent entries).
 */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { 
  ArrowLeft, 
  ArrowRight, 
  Activity, 
  Unlock, 
  Compass, 
  Eye, 
  BookOpen, 
  Terminal, 
  Brain, 
  Rocket, 
  Star, 
  Award, 
  PenTool, 
  Shield, 
  Database,
  Quote,
  CheckCircle,
  Lock,
  Layers,
  Calendar,
  Globe,
  Wrench,
  Film,
  Tv,
  Sparkles
} from "lucide-react";

// ==========================================
// Twinkling Space Starfield Component
// ==========================================
function CanvasStarfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const isMobile = window.innerWidth < 768;
    const particlesCount = isMobile ? 15 : 60;
    const particles = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.4 + 0.1,
        speedX: isMobile ? 0 : (Math.random() - 0.5) * 0.04,
        speedY: isMobile ? 0 : -Math.random() * 0.06 - 0.01,
        twinkleSpeed: Math.random() * 0.005 + 0.001,
        factor: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        p.alpha += p.twinkleSpeed * p.factor;
        if (p.alpha > 0.7) {
          p.alpha = 0.7;
          p.factor = -1;
        } else if (p.alpha < 0.1) {
          p.alpha = 0.1;
          p.factor = 1;
        }

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[-2] pointer-events-none opacity-40 transition-opacity duration-700"
    />
  );
}

// ==========================================
// SOLID-COLORED 2D CHAMBER GRAPHICS (SVG)
// ==========================================

function CinemaVaultSVG({ className = "" }) {
  return (
    <svg className={`w-full h-full overflow-visible ${className}`} viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="purpleSolidGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="reelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
        <linearGradient id="posterGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8B4FE" />
          <stop offset="100%" stopColor="#6B21A8" />
        </linearGradient>
        <linearGradient id="posterGrad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
        <linearGradient id="purpleBeam" x1="0.1" y1="0.9" x2="0.9" y2="0.1">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="75" cy="75" r="70" fill="url(#purpleSolidGlow)" />

      {/* Volumetric projector spotlight cone */}
      <polygon points="35,115 140,25 148,60 48,125" fill="url(#purpleBeam)" className="animate-pulse-light" />

      {/* Movie Wall - Comic panels and posters */}
      {/* Poster 1 */}
      <rect x="25" y="20" width="30" height="42" rx="2" fill="url(#posterGrad1)" stroke="#111116" strokeWidth="2.5" />
      <line x1="30" y1="30" x2="50" y2="30" stroke="#111116" strokeWidth="1.5" />
      <line x1="30" y1="35" x2="45" y2="35" stroke="#111116" strokeWidth="1.5" />
      <circle cx="40" cy="50" r="4" fill="#E9D5FF" stroke="#111116" strokeWidth="1" />

      {/* Poster 2 */}
      <rect x="62" y="15" width="26" height="38" rx="2" fill="url(#posterGrad2)" stroke="#111116" strokeWidth="2.5" transform="rotate(-5 75 34)" />
      <path d="M 68 28 L 74 24 L 80 32" stroke="#111116" strokeWidth="1.5" fill="none" />
      
      {/* Projector Body */}
      <rect x="20" y="100" width="35" height="24" rx="3" fill="#3B0764" stroke="#111116" strokeWidth="2.5" />
      <circle cx="28" cy="112" r="3" fill="#E9D5FF" stroke="#111116" strokeWidth="1" />
      <circle cx="45" cy="112" r="4.5" fill="#A855F7" stroke="#111116" strokeWidth="1.5" />
      {/* Projector Lens light source */}
      <polygon points="48,110 52,107 52,117 48,114" fill="#E9D5FF" stroke="#111116" strokeWidth="1.5" />

      {/* Spinning Film Reels */}
      {/* Large Reel */}
      <g transform="translate(30, 85)" className="animate-spin-clockwise" style={{ transformOrigin: "center center" }}>
        <circle cx="0" cy="0" r="18" fill="url(#reelGrad)" stroke="#111116" strokeWidth="2" />
        <circle cx="0" cy="0" r="5" fill="#0F0F12" stroke="#111116" strokeWidth="1.5" />
        <circle cx="0" cy="-10" r="2.5" fill="#0F0F12" stroke="#111116" strokeWidth="1" />
        <circle cx="0" cy="10" r="2.5" fill="#0F0F12" stroke="#111116" strokeWidth="1" />
        <circle cx="-10" cy="0" r="2.5" fill="#0F0F12" stroke="#111116" strokeWidth="1" />
        <circle cx="10" cy="0" r="2.5" fill="#0F0F12" stroke="#111116" strokeWidth="1" />
      </g>
      {/* Small Reel */}
      <g transform="translate(56, 92)" className="animate-spin-counter" style={{ transformOrigin: "center center" }}>
        <circle cx="0" cy="0" r="12" fill="url(#reelGrad)" stroke="#111116" strokeWidth="2" />
        <circle cx="0" cy="0" r="3.5" fill="#0F0F12" stroke="#111116" strokeWidth="1.5" />
        <circle cx="0" cy="-6" r="1.5" fill="#0F0F12" stroke="#111116" strokeWidth="1" />
        <circle cx="0" cy="6" r="1.5" fill="#0F0F12" stroke="#111116" strokeWidth="1" />
        <circle cx="-6" cy="0" r="1.5" fill="#0F0F12" stroke="#111116" strokeWidth="1" />
        <circle cx="6" cy="0" r="1.5" fill="#0F0F12" stroke="#111116" strokeWidth="1" />
      </g>

      {/* Film Strip Winding */}
      <path d="M 12 112 Q -5 85 25 72 T 80 82 T 135 60" stroke="#111116" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M 12 112 Q -5 85 25 72 T 80 82 T 135 60" stroke="#C084FC" strokeWidth="4.2" strokeLinecap="round" fill="none" />
      <path d="M 12 112 Q -5 85 25 72 T 80 82 T 135 60" stroke="#FAF5FF" strokeWidth="2.8" strokeDasharray="1.2 3.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function UnscriptedLoveSVG({ className = "" }) {
  return (
    <svg className={`w-full h-full overflow-visible ${className}`} viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="redSolidGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="deskWood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7F1D1D" />
          <stop offset="50%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#581C1C" />
        </linearGradient>
        <linearGradient id="lampGlowBeam" x1="0.8" y1="0.2" x2="0.2" y2="0.8">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#F87171" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#F87171" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="75" cy="75" r="70" fill="url(#redSolidGlow)" />

      {/* Red Drafting Table Surface */}
      <polygon points="20,105 110,85 130,125 40,145" fill="url(#deskWood)" stroke="#111116" strokeWidth="2.5" />
      <line x1="20" y1="105" x2="40" y2="145" stroke="#111116" strokeWidth="3" />
      {/* Desk legs */}
      <line x1="30" y1="125" x2="30" y2="148" stroke="#111116" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="120" y1="105" x2="120" y2="135" stroke="#111116" strokeWidth="2.5" strokeLinecap="round" />

      {/* Glowing Desk Lamp */}
      <path d="M 112 80 L 105 40 L 90 35" fill="none" stroke="#111116" strokeWidth="2.5" strokeLinecap="round" />
      {/* Lamp Head */}
      <path d="M 82 28 C 82 28 88 40 98 38 C 102 36 96 22 96 22 Z" fill="#EF4444" stroke="#111116" strokeWidth="2" />
      {/* Spotlight Cone */}
      <polygon points="90,36 15,115 75,135 96,38" fill="url(#lampGlowBeam)" className="animate-pulse-light" />

      {/* Open Manuscript Book */}
      <g transform="translate(56, 102) rotate(-12.5)" style={{ transformOrigin: "center center" }}>
        {/* Cover */}
        <path d="M -24 0 Q -12 -3 0 0 Q 12 -3 24 0 L 24 16 Q 12 13 0 16 Q -12 13 -24 16 Z" fill="#7F1D1D" stroke="#111116" strokeWidth="2.5" />
        {/* Pages */}
        <path d="M -22 -2 Q -11 -5 0 -2 Q 11 -5 22 -2 L 22 13 Q 11 10 0 13 Q -11 10 -22 13 Z" fill="#F9FAFB" stroke="#111116" strokeWidth="1.2" />
        <line x1="0" y1="-2" x2="0" y2="13" stroke="#111116" strokeWidth="1.5" />
        {/* Text lines */}
        <line x1="-16" y1="2" x2="-4" y2="2" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <line x1="-16" y1="6" x2="-6" y2="6" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <line x1="-16" y1="10" x2="-10" y2="10" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <line x1="4" y1="2" x2="16" y2="2" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <line x1="4" y1="6" x2="14" y2="6" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <line x1="4" y1="10" x2="12" y2="10" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
      </g>

      {/* Floating sheets/paper fragments */}
      <rect x="35" y="65" width="10" height="13" fill="#FFFFFF" stroke="#111116" strokeWidth="1.2" rx="0.5" className="animate-float-paper-1" />
      <rect x="80" y="50" width="9" height="11" fill="#FFFFFF" stroke="#111116" strokeWidth="1.2" rx="0.5" className="animate-float-paper-2" />

      {/* Character Dossier Pinned behind */}
      <rect x="35" y="22" width="22" height="26" fill="#FCA5A5" stroke="#111116" strokeWidth="2" transform="rotate(-8 46 35)" />
      <line x1="38" y1="30" x2="52" y2="30" stroke="#111116" strokeWidth="1.2" />
      <line x1="38" y1="35" x2="48" y2="35" stroke="#111116" strokeWidth="1.2" />
      <circle cx="48" cy="18" r="1.5" fill="#EF4444" stroke="#111116" strokeWidth="0.8" />

      {/* Floating red ink/sparks */}
      <circle cx="50" cy="50" r="2.5" fill="#EF4444" className="animate-ping" style={{ animationDuration: "2s" }} />
      <circle cx="75" cy="40" r="1.5" fill="#EF4444" />
      <circle cx="95" cy="65" r="2" fill="#F87171" />
    </svg>
  );
}

function BuilderLogsSVG({ className = "" }) {
  return (
    <svg className={`w-full h-full overflow-visible ${className}`} viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="blueSolidGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="monitorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B1329" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="holoGlow" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
        <clipPath id="monitorClip">
          <rect x="44" y="40" width="62" height="44" rx="2" />
        </clipPath>
      </defs>
      <circle cx="75" cy="75" r="70" fill="url(#blueSolidGlow)" />

      {/* Blueprint Floor Grid line under desk */}
      <polygon points="10,135 140,135 120,110 30,110" fill="url(#holoGlow)" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="3 3" />

      {/* Desk Base */}
      <polygon points="25,120 125,120 115,135 35,135" fill="#1E293B" stroke="#111116" strokeWidth="2.5" />

      {/* Left angled monitor */}
      <polygon points="12,50 42,42 42,90 12,98" fill="url(#monitorGrad)" stroke="#3B82F6" strokeWidth="2.5" />
      <line x1="18" y1="58" x2="35" y2="53" stroke="#60A5FA" strokeWidth="1" opacity="0.6" />
      <line x1="18" y1="65" x2="35" y2="60" stroke="#60A5FA" strokeWidth="1" opacity="0.6" />
      <line x1="18" y1="72" x2="30" y2="68" stroke="#60A5FA" strokeWidth="1" opacity="0.6" />

      {/* Right angled monitor */}
      <polygon points="108,42 138,50 138,98 108,90" fill="url(#monitorGrad)" stroke="#3B82F6" strokeWidth="2.5" />
      {/* Diagonal grid blueprint representation */}
      <line x1="114" y1="52" x2="132" y2="58" stroke="#93C5FD" strokeWidth="1" opacity="0.6" />
      <line x1="114" y1="64" x2="132" y2="70" stroke="#93C5FD" strokeWidth="1" opacity="0.6" />
      <line x1="114" y1="76" x2="132" y2="82" stroke="#93C5FD" strokeWidth="1" opacity="0.6" />

      {/* Center Holographic Code Monitor */}
      <rect x="42" y="38" width="66" height="48" rx="3" fill="url(#monitorGrad)" stroke="#3B82F6" strokeWidth="3" />
      
      {/* Code Text scrolling container */}
      <g clipPath="url(#monitorClip)">
        <g className="animate-scroll-code">
          <text x="48" y="48" fill="#60A5FA" fontSize="5" fontFamily="monospace" fontWeight="bold">&gt; npm run dev</text>
          <text x="48" y="56" fill="#3B82F6" fontSize="5" fontFamily="monospace">&gt; compiling nodes...</text>
          <text x="48" y="64" fill="#22C55E" fontSize="5" fontFamily="monospace" fontWeight="bold">&gt; success in 1.4s</text>
          <text x="48" y="72" fill="#60A5FA" fontSize="5" fontFamily="monospace">&gt; listening on port 3000</text>
          
          {/* Loop clone for seamless scrolling */}
          <text x="48" y="88" fill="#60A5FA" fontSize="5" fontFamily="monospace" fontWeight="bold">&gt; npm run dev</text>
          <text x="48" y="96" fill="#3B82F6" fontSize="5" fontFamily="monospace">&gt; compiling nodes...</text>
          <text x="48" y="104" fill="#22C55E" fontSize="5" fontFamily="monospace" fontWeight="bold">&gt; success in 1.4s</text>
          <text x="48" y="112" fill="#60A5FA" fontSize="5" fontFamily="monospace">&gt; listening on port 3000</text>
        </g>
      </g>
      
      {/* Monitor stand */}
      <rect x="70" y="86" width="10" height="20" fill="#1E293B" stroke="#111116" strokeWidth="2.5" />
      <polygon points="55,106 95,106 90,112 60,112" fill="#0F172A" stroke="#111116" strokeWidth="2" />

      {/* Blueprints on desk */}
      <polygon points="46,118 72,118 68,126 42,126" fill="#93C5FD" stroke="#111116" strokeWidth="1.5" />
      <line x1="45" y1="122" x2="65" y2="122" stroke="#2563EB" strokeWidth="1" />
    </svg>
  );
}

function ThoughtObservatorySVG({ className = "" }) {
  return (
    <svg className={`w-full h-full overflow-visible ${className}`} viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="greenSolidGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="observatorySpace" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#065F46" />
          <stop offset="70%" stopColor="#022C22" />
          <stop offset="100%" stopColor="#050508" />
        </radialGradient>
        <clipPath id="windowClip">
          <circle cx="75" cy="75" r="54" />
        </clipPath>
      </defs>
      <circle cx="75" cy="75" r="70" fill="url(#greenSolidGlow)" />

      {/* Outer iron window frame */}
      <circle cx="75" cy="75" r="58" fill="#111827" stroke="#111116" strokeWidth="4" />

      {/* Space view inside window */}
      <g clipPath="url(#windowClip)">
        <circle cx="75" cy="75" r="54" fill="url(#observatorySpace)" />
        
        {/* Soft Nebula dust */}
        <path d="M 30 50 Q 60 20 90 40 T 130 90" fill="none" stroke="#10B981" strokeWidth="20" opacity="0.15" filter="blur(8px)" />
        <path d="M 40 100 Q 80 120 110 80" fill="none" stroke="#34D399" strokeWidth="15" opacity="0.1" filter="blur(6px)" />

        {/* Twinkling Constellation Stars */}
        <circle cx="45" cy="45" r="1.5" fill="#FFFFFF" className="animate-pulse" />
        <circle cx="70" cy="35" r="2" fill="#34D399" className="animate-pulse" />
        <circle cx="95" cy="40" r="1.5" fill="#FFFFFF" />
        <circle cx="105" cy="65" r="2" fill="#FFFFFF" className="animate-pulse" />
        <circle cx="85" cy="95" r="1.5" fill="#34D399" />
        <circle cx="50" cy="85" r="2" fill="#FFFFFF" className="animate-pulse" />

        {/* Constellation Lines */}
        <line x1="45" y1="45" x2="70" y2="35" stroke="#10B981" strokeWidth="0.8" opacity="0.4" />
        <line x1="70" y1="35" x2="95" y2="40" stroke="#10B981" strokeWidth="0.8" opacity="0.4" />
        <line x1="95" y1="40" x2="105" y2="65" stroke="#10B981" strokeWidth="0.8" opacity="0.4" />
        <line x1="105" y1="65" x2="85" y2="95" stroke="#10B981" strokeWidth="0.8" opacity="0.4" />
        <line x1="85" y1="95" x2="50" y2="85" stroke="#10B981" strokeWidth="0.8" opacity="0.4" />
        <line x1="50" y1="85" x2="45" y2="45" stroke="#10B981" strokeWidth="0.8" opacity="0.4" />

        {/* Small Planet */}
        <circle cx="110" cy="42" r="4.5" fill="#34D399" stroke="#111116" strokeWidth="1" />
        <ellipse cx="110" cy="42" rx="8" ry="1.5" fill="none" stroke="#111116" strokeWidth="1" transform="rotate(-15 110 42)" />
      </g>

      {/* Window Frame Panes dividers */}
      <line x1="75" y1="17" x2="75" y2="133" stroke="#111116" strokeWidth="2.5" />
      <line x1="17" y1="75" x2="133" y2="75" stroke="#111116" strokeWidth="2.5" />

      {/* Astronomy Telescope silhouette */}
      <g transform="translate(68, 88) rotate(-25)" style={{ transformOrigin: "center center" }}>
        {/* Stand tripod */}
        <line x1="0" y1="0" x2="-15" y2="25" stroke="#111116" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="15" y2="25" stroke="#111116" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="0" y2="28" stroke="#111116" strokeWidth="2" />
        {/* Scope cylinder */}
        <rect x="-24" y="-5" width="48" height="10" rx="1.5" fill="#047857" stroke="#111116" strokeWidth="2" />
        <rect x="20" y="-7" width="6" height="14" fill="#34D399" stroke="#111116" strokeWidth="1.5" />
        <rect x="-28" y="-3" width="6" height="6" fill="#111827" stroke="#111116" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function BookVaultSVG({ className = "" }) {
  return (
    <svg className={`w-full h-full overflow-visible ${className}`} viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="orangeSolidGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="woodFinish" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C2410C" />
          <stop offset="100%" stopColor="#7C2D12" />
        </linearGradient>
      </defs>
      <circle cx="75" cy="75" r="70" fill="url(#orangeSolidGlow)" />

      {/* Bookshelf Frame */}
      <rect x="20" y="20" width="110" height="110" rx="3" fill="url(#woodFinish)" stroke="#111116" strokeWidth="3" />
      
      {/* Shelves divider lines */}
      <line x1="20" y1="58" x2="130" y2="58" stroke="#111116" strokeWidth="3" />
      <line x1="20" y1="95" x2="130" y2="95" stroke="#111116" strokeWidth="3" />

      {/* Neon Light Tubes on sides */}
      <line x1="24" y1="24" x2="24" y2="126" stroke="#FB923C" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse" />
      <line x1="126" y1="24" x2="126" y2="126" stroke="#FB923C" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse" />

      {/* Row 1 Books */}
      <rect x="35" y="32" width="7" height="26" fill="#F97316" stroke="#111116" strokeWidth="1.5" />
      <rect x="42" y="28" width="9" height="30" fill="#EA580C" stroke="#111116" strokeWidth="1.5" />
      <rect x="51" y="34" width="6" height="24" fill="#FDBA74" stroke="#111116" strokeWidth="1.5" />
      
      <rect x="68" y="30" width="8" height="28" fill="#FB923C" stroke="#111116" strokeWidth="1.5" transform="rotate(10 72 44)" style={{ transformOrigin: "bottom left" }} />
      <rect x="76" y="32" width="8" height="26" fill="#F97316" stroke="#111116" strokeWidth="1.5" transform="rotate(12 80 45)" style={{ transformOrigin: "bottom left" }} />

      <rect x="100" y="28" width="10" height="30" fill="#C2410C" stroke="#111116" strokeWidth="1.5" />
      <rect x="110" y="34" width="8" height="24" fill="#FDBA74" stroke="#111116" strokeWidth="1.5" />

      {/* Row 2 Books */}
      <rect x="30" y="65" width="8" height="30" fill="#EA580C" stroke="#111116" strokeWidth="1.5" />
      <rect x="38" y="71" width="9" height="24" fill="#FDBA74" stroke="#111116" strokeWidth="1.5" />
      <rect x="47" y="67" width="7" height="28" fill="#F97316" stroke="#111116" strokeWidth="1.5" />

      <rect x="65" y="63" width="9" height="32" fill="#FB923C" stroke="#111116" strokeWidth="1.5" />
      <rect x="74" y="69" width="8" height="26" fill="#C2410C" stroke="#111116" strokeWidth="1.5" />
      
      <rect x="95" y="71" width="7" height="24" fill="#EA580C" stroke="#111116" strokeWidth="1.5" transform="rotate(-15 98 83)" style={{ transformOrigin: "bottom right" }} />
      <rect x="102" y="67" width="8" height="28" fill="#FDBA74" stroke="#111116" strokeWidth="1.5" transform="rotate(-15 106 81)" style={{ transformOrigin: "bottom right" }} />

      {/* Row 3 Books & Cozy chair silhouette */}
      <rect x="85" y="102" width="9" height="28" fill="#EA580C" stroke="#111116" strokeWidth="1.5" />
      <rect x="94" y="106" width="7" height="24" fill="#F97316" stroke="#111116" strokeWidth="1.5" />
      <rect x="101" y="104" width="8" height="26" fill="#FDBA74" stroke="#111116" strokeWidth="1.5" />

      {/* Cozy Reading Chair Silhouette on the left of bottom shelf */}
      <g transform="translate(30, 98)">
        <path d="M5 28 L5 20 C5 17 8 15 12 15 L22 15 C26 15 29 17 29 20 L29 28" fill="none" stroke="#111116" strokeWidth="2.5" />
        {/* Cushion back */}
        <path d="M8 26 L8 14 C8 11 11 9 17 9 C23 9 26 11 26 14 L26 26 Z" fill="#7C2D12" stroke="#111116" strokeWidth="2" />
        {/* Arm rests */}
        <rect x="3" y="19" width="6" height="10" rx="2" fill="#EA580C" stroke="#111116" strokeWidth="1.8" />
        <rect x="25" y="19" width="6" height="10" rx="2" fill="#EA580C" stroke="#111116" strokeWidth="1.8" />
        {/* Seat cushion */}
        <rect x="7" y="22" width="20" height="6" rx="1.5" fill="#FB923C" stroke="#111116" strokeWidth="2" />
      </g>
    </svg>
  );
}

function FutureFilesSVG({ className = "" }) {
  return (
    <svg className={`w-full h-full overflow-visible ${className}`} viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="goldSolidGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EAB308" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="doorLightBeam" x1="0.3" y1="0.3" x2="0.8" y2="0.8">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.55" />
          <stop offset="40%" stopColor="#FDE047" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="75" cy="75" r="70" fill="url(#goldSolidGlow)" />

      {/* Gateway outlines in 2.5D perspective */}
      {/* Outer Door Frame */}
      <path d="M 40 120 L 40 35 C 40 22 100 22 100 35 L 100 120" fill="#854D0E" stroke="#111116" strokeWidth="3" />

      {/* Inner gateway light aperture */}
      <path d="M 46 120 L 46 38 C 46 27 94 27 94 38 L 94 120" fill="#CA8A04" stroke="#111116" strokeWidth="1.5" />
      <path d="M 50 120 L 50 42 C 50 32 90 32 90 42 L 90 120" fill="#FEF08A" />

      {/* Door panel slightly open, angled outwards */}
      <polygon points="90,42 115,46 115,116 90,120" fill="#EAB308" stroke="#111116" strokeWidth="2.5" />
      <circle cx="98" cy="80" r="2.5" fill="#854D0E" stroke="#111116" strokeWidth="1" />

      {/* Volumetric glowing light beams emerging */}
      <polygon points="50,42 10,140 145,140 90,120" fill="url(#doorLightBeam)" className="animate-pulse-light" />

      {/* Blueprint rolls leaning on wall next to door */}
      <g transform="translate(24, 95) rotate(-8)">
        <rect x="0" y="0" width="8" height="28" rx="1.5" fill="#FEF08A" stroke="#111116" strokeWidth="1.8" />
        <ellipse cx="4" cy="0" rx="4" ry="1.5" fill="#CA8A04" stroke="#111116" strokeWidth="1.5" />
        <line x1="3" y1="4" x2="3" y2="24" stroke="#854D0E" strokeWidth="1.2" opacity="0.6" />
      </g>
      <g transform="translate(32, 92) rotate(12)">
        <rect x="0" y="0" width="8" height="30" rx="1.5" fill="#FDE047" stroke="#111116" strokeWidth="1.8" />
        <ellipse cx="4" cy="0" rx="4" ry="1.5" fill="#CA8A04" stroke="#111116" strokeWidth="1.5" />
        <line x1="3" y1="4" x2="3" y2="26" stroke="#854D0E" strokeWidth="1.2" opacity="0.6" />
      </g>

      {/* Sparkles / Gold particles rising */}
      <circle cx="58" cy="65" r="2" fill="#FDE047" className="animate-ping" style={{ animationDuration: "1.5s" }} />
      <circle cx="82" cy="55" r="1.5" fill="#FEF08A" />
      <circle cx="118" cy="72" r="2" fill="#EAB308" />
    </svg>
  );
}

function UnknownFileSVG({ className = "" }) {
  return (
    <svg className={`w-full h-full overflow-visible ${className}`} viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="indigoSolidGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#818CF8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vortexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C7D2FE" />
          <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#312E81" />
        </linearGradient>
      </defs>
      <circle cx="75" cy="75" r="70" fill="url(#indigoSolidGlow)" />

      {/* Solid outlined locked drawer box */}
      <rect x="35" y="55" width="80" height="52" rx="4" fill="#1E1B4B" stroke="#111116" strokeWidth="3" />
      
      {/* Front drawer panel with outlines */}
      <rect x="42" y="62" width="66" height="38" rx="2" fill="#312E81" stroke="#111116" strokeWidth="2" />

      {/* Swirling vortex rising from drawer center */}
      <g transform="translate(75, 52)">
        <ellipse cx="0" cy="0" rx="32" ry="12" fill="url(#vortexGrad)" stroke="#111116" strokeWidth="2" className="animate-rotate-vortex" style={{ transformOrigin: "0px 0px" }} />
        <ellipse cx="0" cy="0" rx="20" ry="8" fill="#1E1B4B" stroke="#111116" strokeWidth="1.5" />
        <ellipse cx="0" cy="0" rx="8" ry="3" fill="#818CF8" className="animate-pulse" />
      </g>

      {/* Mechanical Lock Dial */}
      <circle cx="75" cy="81" r="9" fill="#4F46E5" stroke="#111116" strokeWidth="2" />
      <circle cx="75" cy="81" r="5" fill="#EEF2F6" stroke="#111116" strokeWidth="1.5" />
      <line x1="75" y1="76" x2="75" y2="81" stroke="#111116" strokeWidth="1.5" />

      {/* Floating encryption runes / nodes */}
      <circle cx="38" cy="35" r="2.5" fill="#818CF8" className="animate-pulse" />
      <circle cx="112" cy="38" r="2" fill="#C7D2FE" />
      <line x1="38" y1="35" x2="52" y2="48" stroke="#4F46E5" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
      <line x1="112" y1="38" x2="98" y2="52" stroke="#4F46E5" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
    </svg>
  );
}

// ==========================================
// Handcrafted CSS Gradient Cover Thumbnails
// ==========================================
function EntryThumbnail({ code, imageFit, imagePosition, imageZoom }) {
  if (code && (code.startsWith("data:") || code.startsWith("http:") || code.startsWith("https:") || code.startsWith("/"))) {
    return (
      <img 
        src={code} 
        alt="Entry Thumbnail" 
        className="w-full h-full rounded-xl" 
        style={{
          objectFit: imageFit || "cover",
          objectPosition: `center ${imagePosition ?? 50}%`,
          transform: `scale(${(imageZoom ?? 100) / 100})`,
          transformOrigin: "center center"
        }}
      />
    );
  }
  if (code === "stranger-things") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0c0507] via-[#240a0f] to-[#050102] relative overflow-hidden flex items-center justify-center rounded-xl border border-red-500/10">
        <div className="absolute w-32 h-32 rounded-full bg-red-600/10 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute w-1 h-1 rounded-full bg-red-400 opacity-60 top-1/4 left-1/3 animate-pulse" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-red-500 opacity-80 top-2/3 right-1/4 animate-ping" style={{ animationDuration: "4s" }} />
        <div className="absolute w-1 h-1 rounded-full bg-white opacity-40 bottom-1/3 left-1/2 animate-pulse" style={{ animationDuration: "5s" }} />
        <div className="font-orbitron text-[9px] font-black text-red-500/60 tracking-widest border border-red-500/20 px-2.5 py-1.5 rounded bg-black/40 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
          THE UPSIDE DOWN
        </div>
      </div>
    );
  }
  if (code === "true-detective") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0a0c0a] via-[#151c14] to-[#040604] relative overflow-hidden flex items-center justify-center rounded-xl border border-lime-500/10">
        <div className="absolute w-36 h-36 rounded-full bg-lime-600/5 blur-3xl top-1/3 left-1/3" />
        <div className="absolute w-28 h-28 rounded-full bg-emerald-700/5 blur-2xl bottom-1/4 right-1/4" />
        <div className="font-space-mono text-[9px] font-bold text-lime-400/50 tracking-wider uppercase border border-lime-500/15 px-3 py-1 bg-black/30 rounded">
          Carcosa // Yellow King
        </div>
      </div>
    );
  }
  if (code === "dark") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0b0816] via-[#16112c] to-[#050308] relative overflow-hidden flex items-center justify-center rounded-xl border border-purple-500/10">
        <div className="absolute w-24 h-24 rounded-full border border-purple-500/10 animate-spin" style={{ animationDuration: "12s" }} />
        <div className="absolute w-24 h-24 rounded-full border border-blue-500/5 translate-x-2 animate-spin" style={{ animationDuration: "16s", animationDirection: "reverse" }} />
        <div className="absolute w-12 h-12 rounded-full bg-purple-600/10 blur-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="font-orbitron text-[9px] font-black text-purple-400/60 tracking-widest border border-purple-500/20 px-2.5 py-1.5 rounded bg-black/40 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          SIC MUNDUS CREATUS EST
        </div>
      </div>
    );
  }
  if (code === "interstellar") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0c0d16] via-[#1a1b35] to-[#050508] relative overflow-hidden flex items-center justify-center rounded-xl border border-black/5">
        <div className="absolute w-24 h-24 rounded-full bg-purple-500/10 blur-xl top-4 left-4" />
        <div className="absolute w-12 h-12 rounded-full bg-blue-500/10 blur-lg bottom-4 right-4" />
        <div className="absolute text-[8px] text-slate-500/40 font-mono top-3 left-4">CONST_ID: 9942</div>
        <div className="absolute w-1 h-1 rounded-full bg-white opacity-80 top-1/3 left-1/4 animate-pulse" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-purple-400 opacity-90 top-1/4 left-1/2 animate-ping" style={{ animationDuration: "3s" }} />
        <div className="font-orbitron text-[9px] font-black text-white/50 tracking-widest border border-white/10 px-2.5 py-1.5 rounded bg-black/30">
          SPATIAL COORD
        </div>
      </div>
    );
  }
  if (code === "darkknight") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#111116] via-[#20202d] to-[#0a0a0c] relative overflow-hidden flex items-center justify-center rounded-xl border border-black/5">
        <div className="absolute w-28 h-28 rounded-full bg-slate-500/5 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <svg className="w-10 h-10 opacity-30 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M12 4C10 4 8 7 6 7C4 7 2 6 2 6C2 6 3 10 7 12C9 13 11 16 12 18C13 16 15 13 17 12C21 10 22 6 22 6C22 6 20 7 18 7C16 7 14 4 12 4Z" fill="currentColor"/>
        </svg>
        <div className="absolute text-[8px] text-slate-500/40 font-mono bottom-3 right-4">Gotham City Ledger</div>
      </div>
    );
  }
  if (code === "unscripted_log1") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#1d1416] via-[#2d1b1f] to-[#120d0e] relative overflow-hidden flex items-center justify-center rounded-xl border border-black/5">
        <div className="absolute top-3 left-4 w-4 h-[1px] bg-red-500/30" />
        <div className="font-space-mono text-[9px] font-bold text-red-400/50 tracking-wider">
          CH.01: INITIALIZE
        </div>
      </div>
    );
  }
  if (code === "unscripted_log2") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#201012] via-[#35151a] to-[#0f0708] relative overflow-hidden flex items-center justify-center rounded-xl border border-black/5">
        <div className="font-space-mono text-[9px] font-bold text-rose-400/50 tracking-wider">
          CH.07: DUAL_VIEW
        </div>
      </div>
    );
  }
  if (code === "builder_log1") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0b101d] via-[#141b30] to-[#050810] relative overflow-hidden flex items-center justify-center rounded-xl border border-black/5 font-mono text-[8px] text-blue-400/40 p-4">
        <div className="text-left w-full space-y-1 select-none">
          <div>&gt; R3F_ENGINE.COMPILE()</div>
          <div className="text-[#3b82f6]/60">&gt; PLANET_MESH: RENDERED</div>
        </div>
      </div>
    );
  }
  if (code === "builder_log2") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#080d19] via-[#0f182c] to-[#04060d] relative overflow-hidden flex items-center justify-center rounded-xl border border-black/5 font-mono text-[8px] text-sky-400/40 p-4">
        <div className="text-left w-full space-y-1 select-none">
          <div>&gt; FS_ROOT: /DECENTRALIZED</div>
          <div className="text-amber-500/60">&gt; BUFFER_LIMIT: WARN</div>
        </div>
      </div>
    );
  }
  if (code === "thought_log1") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#091510] via-[#10241b] to-[#040a07] relative overflow-hidden flex items-center justify-center rounded-xl border border-black/5 font-space-mono text-[9px] text-[#10B981]/50 tracking-wider">
        HUMAN_POTENTIAL.MAP()
      </div>
    );
  }
  if (code === "thought_log2") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#051610] via-[#0d2b1f] to-[#020b08] relative overflow-hidden flex items-center justify-center rounded-xl border border-black/5 font-space-mono text-[9px] text-[#34d399]/50 tracking-wider">
        INCREMENT_FACTOR: 1.01
      </div>
    );
  }
  if (code === "book_log1") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#1a0e08] via-[#2d190f] to-[#0c0603] relative overflow-hidden flex items-center justify-center rounded-xl border border-black/5 font-space-mono text-[9px] text-[#F97316]/50 tracking-wider">
        ESC_SCRIPT.EXE
      </div>
    );
  }
  if (code === "book_log2") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#150b06] via-[#281308] to-[#0a0402] relative overflow-hidden flex items-center justify-center rounded-xl border border-black/5 font-space-mono text-[9px] text-amber-500/50 tracking-wider">
        BUILD_IN_PUBLIC.LOG
      </div>
    );
  }
  if (code === "future_log1") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#191508] via-[#2d240e] to-[#0b0a03] relative overflow-hidden flex items-center justify-center rounded-xl border border-black/5 font-space-mono text-[9px] text-[#EAB308]/50 tracking-wider">
        B.TECH CS: 2024-2028
      </div>
    );
  }
  if (code === "future_log2") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#151206] via-[#281e08] to-[#080702] relative overflow-hidden flex items-center justify-center rounded-xl border border-black/5 font-space-mono text-[9px] text-yellow-500/50 tracking-wider">
        NOVEL_PUBLISH: 2027
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center rounded-xl border border-black/5 text-white/20 text-xs font-bold">
      ARCHIVE
    </div>
  );
}

// ==========================================
// 6 CHAMBERS DATABASE CONFIGURATION
// ==========================================
const chambersConfig = [
  {
    title: "Cinema Vault",
    num: "01",
    subtitle: "Stories on Screen. Lessons for Life.",
    description: "Cinema has always been more than entertainment for me. It's where I learn, unlearn and see the world through different lenses. Every film I love leaves behind a thought, a feeling or a lesson that stays with me long after the credits roll.",
    quote: "A great movie isn't just one you watch, it's one you carry with you.",
    color: "#A855F7",
    lightBg: "#FAF5FF",
    textAccent: "#7B2FBE",
    glowColor: "rgba(168, 85, 247, 0.4)",
    stats: "320+ Logged • 5 Active Analyses",
    svg: <CinemaVaultSVG />,
    // Hotspot percentages inside the master studio SVG viewport (1200 x 600)
    cx: 320,
    cy: 190,
    tooltipTagline: "Stories that changed the way I see the world.",
    objectLabel: "Cinema Corner",
    objectDesc: "Stylized projection unit, spinning film reels, and volumetric beam accents.",
    floatingTexts: [
      { text: "\"Relativity is emotional gravity.\"", x: -60, y: -45, speed: "6s" },
      { text: "\"A great movie stays with you.\"", x: 50, y: 55, speed: "8s" }
    ],
    themes: [
      { name: "Movies", icon: <Film className="w-4 h-4" /> },
      { name: "Series", icon: <Tv className="w-4 h-4" /> },
      { name: "Characters", icon: <Brain className="w-4 h-4" /> },
      { name: "Directors", icon: <Award className="w-4 h-4" /> },
      { name: "Favourites", icon: <Star className="w-4 h-4" /> }
    ],
    entries: [
      {
        title: "Stranger Things",
        thumbnailCode: "stranger-things",
        tag: "Series",
        category: "Series",
        date: "2026-06-29",
        rating: 8.6,
        description: "Stranger Things is one of my all-time favorite series. The first four seasons were a perfect blend of mystery, horror, adventure, and unforgettable characters—I would've easily rated it 10/10 after Season 4. However, the final season didn't live up to the incredible standards the show had set, making the ending feel a bit disappointing. Even so, the journey, the nostalgia, and the emotional moments make it a series I'll always recommend."
      },
      {
        title: "True Detective",
        thumbnailCode: "true-detective",
        tag: "Series",
        category: "Series",
        date: "2026-06-29",
        rating: 9.1,
        description: "True Detective (Season 1) is one of the finest crime thrillers ever made. The slow-burn storytelling, haunting atmosphere, and phenomenal performances by Matthew McConaughey and Woody Harrelson make every episode unforgettable. It's not just about solving a murder—it's a deep exploration of human nature, philosophy, and morality. Dark, intelligent, and brilliantly written, this season is a masterpiece that stays with you long after it ends."
      },
      {
        title: "Dark",
        thumbnailCode: "dark",
        tag: "Series",
        category: "Series",
        date: "2026-06-29",
        rating: 10,
        description: "Dark is easily one of the greatest TV series I've ever watched. It's not just a show—it's a puzzle that demands your full attention, rewarding you with one of the most brilliantly written stories ever created. Every episode adds another layer, making the plot deeper and more fascinating. The atmosphere, performances, soundtrack, and mind-blowing time-travel concept are executed flawlessly. Unlike many series, Dark delivers a powerful and satisfying ending that ties everything together beautifully. If you enjoy intelligent storytelling that challenges your mind, this is an absolute masterpiece and a perfect 10/10."
      }
    ]
  },
  {
    title: "Unscript Love",
    num: "02",
    subtitle: "Teenage Hearts. Unwritten Rules.",
    description: "Unscripted Love is a raw, poetic chronicle of teenage youth—an exploration of rebel hearts and tender connections left missing in the rigid script of Indian society. It is a canvas of growing up amidst expectations, capturing the chaotic frequency of emotions that only Gen Z can truly feel and relate to.",
    quote: "Some rules are meant to be broken, especially the ones written by a society that forgot what it felt like to be young.",
    color: "#EF4444",
    lightBg: "#FEF2F2",
    textAccent: "#DC2626",
    glowColor: "rgba(239, 68, 68, 0.4)",
    stats: "32,460 Words • 5/12 Chapters Written",
    svg: <UnscriptedLoveSVG />,
    cx: 600,
    cy: 80,
    tooltipTagline: "The stories I am writing and the worlds I am building.",
    objectLabel: "Writing Desk",
    objectDesc: "Drafting desk containing manuscripts, handwritten pages, and characters.",
    floatingTexts: [
      { text: "\"Rebel hearts...\"", x: -75, y: -45, speed: "7s" },
      { text: "\"Only Gen Z can relate...\"", x: 60, y: 55, speed: "9s" }
    ],
    themes: [
      { name: "Book Progress", icon: <CheckCircle className="w-4 h-4" /> },
      { name: "Character Files", icon: <Brain className="w-4 h-4" /> },
      { name: "Writer Notes", icon: <PenTool className="w-4 h-4" /> },
      { name: "Story Fragments", icon: <Layers className="w-4 h-4" /> },
      { name: "Behind The Story", icon: <Compass className="w-4 h-4" /> },
      { name: "World Building", icon: <Globe className="w-4 h-4" /> }
    ],
    entries: []
  },
  {
    title: "Builder Logs",
    num: "03",
    subtitle: "System Architecture. Software Missions.",
    description: "Builder Logs compile my engineering voyages. These are detailed reports of software systems, web graphics engines, and hackathon prototypes I've built, outlining the architectural triumphs and debugging battles.",
    quote: "We build not just to solve problems, but to manifest ideas into reality.",
    color: "#3B82F6",
    lightBg: "#EFF6FF",
    textAccent: "#2563EB",
    glowColor: "rgba(59, 130, 246, 0.4)",
    stats: "12 Systems • 4 Hackathons",
    svg: <BuilderLogsSVG />,
    cx: 320,
    cy: 560,
    tooltipTagline: "Projects, experiments and lessons from creation.",
    objectLabel: "Builder Station",
    objectDesc: "Holographic setup displaying blueprints, code repositories, and systems logs.",
    floatingTexts: [
      { text: "01001001 01000100 01000101 01000001", x: -80, y: -45, speed: "5s" },
      { text: "blueprint loading...", x: 65, y: 55, speed: "7s" }
    ],
    themes: [
      { name: "Web Graphics", icon: <Globe className="w-4 h-4" /> },
      { name: "Decentralized Systems", icon: <Database className="w-4 h-4" /> },
      { name: "Hackathons", icon: <Award className="w-4 h-4" /> },
      { name: "UI/UX Research", icon: <Eye className="w-4 h-4" /> },
      { name: "Compilers & Parsers", icon: <Terminal className="w-4 h-4" /> },
      { name: "Active Projects", icon: <Rocket className="w-4 h-4" /> }
    ],
    entries: [
      {
        title: "AryanVerse Planetarium Engine",
        thumbnailCode: "builder_log1",
        tag: "Web Graphics",
        category: "Web Graphics",
        date: "2026-06-22",
        rating: "9.8/10",
        description: "Rebuilding the 3D planetarium engine with React Three Fiber and GSAP to construct an explorable digital universe. Handled viewport reflows, dynamic rendering pipelines, and custom fragment shaders."
      },
      {
        title: "Graph-Tree Directory Visualizer",
        thumbnailCode: "builder_log2",
        tag: "Decentralized Systems",
        category: "Decentralized Systems",
        date: "2026-05-04",
        rating: "9.5/10",
        description: "A tool built for the Bennett Hackathon to map folder structures and import graphs dynamically, preventing recursion crashes using web worker clustering."
      }
    ]
  },
  {
    title: "Internal Thoughts",
    num: "04",
    subtitle: "Internal Musings. Personal Blogs.",
    description: "Internal Thoughts is a space for my mental models, blogs, and personal reflections. Here, I analyze the habits, systems, and ideas that direct my learning, coding, and decision making.",
    quote: "Blogs are the mirrors of internal thoughts, written to make sense of a chaotic world.",
    color: "#10B981",
    lightBg: "#ECFDF5",
    textAccent: "#059669",
    glowColor: "rgba(16, 185, 129, 0.3)",
    stats: "8 Blogs • 15 Musings",
    svg: <ThoughtObservatorySVG />,
    cx: 140,
    cy: 440,
    tooltipTagline: "Internal thoughts and blogs.",
    objectLabel: "Observatory Window",
    objectDesc: "Celestial comic glass panes framing starry constellations and drifting thoughts.",
    floatingTexts: [
      { text: "compounding curiosity...", x: -70, y: 55, speed: "8s" },
      { text: "the resume fallacy...", x: 60, y: -45, speed: "6s" }
    ],
    themes: [
      { name: "Mental Models", icon: <Brain className="w-4 h-4" /> },
      { name: "Discipline", icon: <Shield className="w-4 h-4" /> },
      { name: "Systems Thinking", icon: <Layers className="w-4 h-4" /> },
      { name: "Personal Philosophy", icon: <Compass className="w-4 h-4" /> },
      { name: "Curiosity", icon: <Eye className="w-4 h-4" /> },
      { name: "Career & Growth", icon: <Activity className="w-4 h-4" /> }
    ],
    entries: []
  },
  {
    title: "Book Vault",
    num: "05",
    subtitle: "The Takeaway Ledger. Escaping Scripts.",
    description: "The Book Vault is my ledger of compounding literacy. I summarize the critical takeouts, direct quotes, and intellectual impact of books that have fundamentally shaped my mindset.",
    quote: "Do not choose a life scripted by others. Escaped scripts are written by producers.",
    color: "#F97316",
    lightBg: "#FFF7ED",
    textAccent: "#EA580C",
    glowColor: "rgba(249, 115, 22, 0.3)",
    stats: "54 Books • 182 Takeaways",
    svg: <BookVaultSVG />,
    cx: 1060,
    cy: 440,
    tooltipTagline: "Books that shaped who I became.",
    objectLabel: "Library Wall",
    objectDesc: "Solid-outlined bookshelves filled with reading notes and escape-tome ledgers.",
    floatingTexts: [
      { text: "\"Escape the script.\"", x: -65, y: 55, speed: "9s" },
      { text: "\"Become a producer.\"", x: 60, y: -45, speed: "7s" }
    ],
    themes: [
      { name: "Novel", icon: <BookOpen className="w-4 h-4" /> },
      { name: "Creativity", icon: <PenTool className="w-4 h-4" /> },
      { name: "Psychology", icon: <Brain className="w-4 h-4" /> },
      { name: "Biography", icon: <Layers className="w-4 h-4" /> },
      { name: "Philosophy", icon: <Globe className="w-4 h-4" /> },
      { name: "Fantasy", icon: <Sparkles className="w-4 h-4" /> }
    ],
    entries: []
  },
  {
    title: "Future Files",
    num: "06",
    subtitle: "Unfinished Blueprints. Stealth Ambitions.",
    description: "Future Files store my unfinished blueprints. These represent active roadmaps, research goals, stealth startups, and long-term ambitions outlining where I want to focus my creation energy.",
    quote: "The best way to predict the future is to design and build it ourselves.",
    color: "#EAB308",
    lightBg: "#FEF9C3",
    textAccent: "#CA8A04",
    glowColor: "rgba(234, 179, 8, 0.3)",
    stats: "3 Active Missions • 2029 Vision",
    svg: <FutureFilesSVG />,
    cx: 880,
    cy: 190,
    tooltipTagline: "Dreams, missions and future ambitions.",
    objectLabel: "Future Door",
    objectDesc: "Mysterious portal gateway, emitting golden beams of possibilities.",
    floatingTexts: [
      { text: "stealth startup...", x: -70, y: 55, speed: "8s" },
      { text: "2029 cosmic vision...", x: 60, y: -45, speed: "6s" }
    ],
    themes: [
      { name: "Current Missions", icon: <CheckCircle className="w-4 h-4" /> },
      { name: "Future Books", icon: <PenTool className="w-4 h-4" /> },
      { name: "Stealth Startup", icon: <Rocket className="w-4 h-4" /> },
      { name: "2029 Vision", icon: <Compass className="w-4 h-4" /> },
      { name: "Research", icon: <Terminal className="w-4 h-4" /> }
    ],
    entries: []
  }
];

// Special Mystery Hotspot (Locked Box / Vortex)
const mysteryChamber = {
  title: "Unknown File",
  num: "???",
  description: "Some stories are not ready to be told yet.",
  color: "#818CF8",
  glowColor: "rgba(129, 140, 248, 0.4)",
  stats: "Encrypted • Locked Node",
  svg: <UnknownFileSVG />,
  cx: 880,
  cy: 560,
  tooltipTagline: "Some stories are not ready to be told.",
  objectLabel: "Locked Vault",
  objectDesc: "A small locked cabinet, emitting indigo space swirls.",
  isMystery: true,
  floatingTexts: [
    { text: "encrypted logs...", x: -55, y: 40, speed: "9s" }
  ]
};

export default function ArchivePage() {
  const [viewMode, setViewMode] = useState("ORBIT"); // "ORBIT" or "CHAMBER"
  const [activeChamberIdx, setActiveChamberIdx] = useState(0);
  const [hoveredHotspotIdx, setHoveredHotspotIdx] = useState(null);
  const [showMystery, setShowMystery] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("All");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [customEntries, setCustomEntries] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aryan_archive_custom_entries");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("admin") === "true") {
        localStorage.setItem("aryan_archive_is_admin", "true");
        setIsAdmin(true);
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (params.get("admin") === "false") {
        localStorage.setItem("aryan_archive_is_admin", "false");
        setIsAdmin(false);
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        const savedAdmin = localStorage.getItem("aryan_archive_is_admin");
        setIsAdmin(savedAdmin === "true");
      }
    }
  }, []);

  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  const [isChaptersUnlocked, setIsChaptersUnlocked] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("aryan_unscripted_unlocked") === "true";
    }
    return false;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Movies");
  const [newDate, setNewDate] = useState("");
  const [newRating, setNewRating] = useState(9.0);
  const [editingEntry, setEditingEntry] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");
  const [newBlogImageFit, setNewBlogImageFit] = useState("cover");
  const [newBlogImagePos, setNewBlogImagePos] = useState(50);
  const [newBlogImageZoom, setNewBlogImageZoom] = useState(100);
  const [selectedBlogEntry, setSelectedBlogEntry] = useState(null);

  const openAddModal = (categoryName) => {
    setEditingEntry(null);
    setNewTitle("");
    const defaultCat = 
      activeChamberIdx === 0 
        ? "Movies" 
        : activeChamberIdx === 1
          ? "Book Progress"
          : activeChamberIdx === 4 
            ? "Novel" 
            : "Current Missions";
    const selectedCat = categoryName || defaultCat;
    setNewCategory(selectedCat);
    setNewDate(new Date().toISOString().split("T")[0]);
    setNewRating(selectedCat === "Current Missions" ? 5 : 9.0);
    setNewDescription("");
    setNewImage("");
    setNewImageUrl("");
    setNewBlogContent("");
    setNewBlogImageFit("cover");
    setNewBlogImagePos(50);
    setNewBlogImageZoom(100);
    setIsAddModalOpen(true);
  };

  const openEditModal = (entry) => {
    setEditingEntry(entry);
    setNewTitle(entry.title);
    setNewCategory(entry.category);
    setNewDate(entry.date);
    setNewRating(entry.rating);
    setNewDescription(entry.description);
    setNewImage(entry.thumbnailCode);
    setNewImageUrl(entry.imageUrl || "");
    setNewBlogContent(entry.content || "");
    setNewBlogImageFit(entry.imageFit || "cover");
    setNewBlogImagePos(entry.imagePosition || 50);
    setNewBlogImageZoom(entry.imageZoom || 100);
    setIsAddModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEntry = () => {
    if (editingEntry) {
      const chamberCustoms = customEntries[activeChamberIdx] || [];
      const updatedChamberCustoms = chamberCustoms.map((entry) => {
        if (entry === editingEntry || (entry.title === editingEntry.title && entry.description === editingEntry.description && entry.date === editingEntry.date)) {
          return {
            ...entry,
            title: newTitle,
            thumbnailCode: newImage || "interstellar",
            tag: newCategory === "Favorite Films" ? "Favorite Film" : newCategory,
            category: newCategory,
            date: newDate,
            rating: newRating,
            description: newDescription,
            content: activeChamberIdx === 3 ? newBlogContent : "",
            imageFit: activeChamberIdx === 3 ? newBlogImageFit : "cover",
            imagePosition: activeChamberIdx === 3 ? newBlogImagePos : 50,
            imageZoom: activeChamberIdx === 3 ? newBlogImageZoom : 100,
          };
        }
        return entry;
      });

      const updated = {
        ...customEntries,
        [activeChamberIdx]: updatedChamberCustoms
      };

      setCustomEntries(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("aryan_archive_custom_entries", JSON.stringify(updated));
      }
      setEditingEntry(null);
    } else {
      const newEntry = {
        title: newTitle,
        thumbnailCode: newImage || "interstellar",
        tag: newCategory === "Favorite Films" ? "Favorite Film" : newCategory,
        category: newCategory,
        date: newDate,
        rating: newRating,
        description: newDescription,
        content: activeChamberIdx === 3 ? newBlogContent : "",
        imageFit: activeChamberIdx === 3 ? newBlogImageFit : "cover",
        imagePosition: activeChamberIdx === 3 ? newBlogImagePos : 50,
        imageZoom: activeChamberIdx === 3 ? newBlogImageZoom : 100,
        isCustom: true
      };

      const updated = {
        ...customEntries,
        [activeChamberIdx]: [newEntry, ...(customEntries[activeChamberIdx] || [])]
      };

      setCustomEntries(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("aryan_archive_custom_entries", JSON.stringify(updated));
      }
    }
    setIsAddModalOpen(false);
  };

  const handleDeleteEntry = (entryToDelete) => {
    const chamberCustoms = customEntries[activeChamberIdx] || [];
    const updatedChamberCustoms = chamberCustoms.filter(
      (entry) => entry !== entryToDelete && 
                !(entry.title === entryToDelete.title && entry.description === entryToDelete.description && entry.date === entryToDelete.date)
    );

    const updated = {
      ...customEntries,
      [activeChamberIdx]: updatedChamberCustoms
    };

    setCustomEntries(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("aryan_archive_custom_entries", JSON.stringify(updated));
    }
  };

  const getRatingStyle = (ratingVal) => {
    let num = 10;
    if (typeof ratingVal === "string") {
      if (ratingVal.includes("/")) {
        num = parseFloat(ratingVal.split("/")[0]) || 10;
      } else {
        num = parseFloat(ratingVal) || 10;
      }
    } else {
      num = parseFloat(ratingVal) || 10;
    }

    if (num >= 10.0) {
      return {
        text: `${num}/10`,
        label: "Beyond Universe",
        color: "#c084fc",
        bg: "rgba(192,132,252,0.15)",
        border: "rgba(192,132,252,0.4)",
        glow: "0 0 15px rgba(192,132,252,0.3)"
      };
    } else if (num >= 9.0) {
      return {
        text: `${num}/10`,
        label: "Masterpiece",
        color: "#00ff88",
        bg: "rgba(0,255,136,0.1)",
        border: "rgba(0,255,136,0.3)",
        glow: "0 0 12px rgba(0,255,136,0.2)"
      };
    } else if (num >= 7.0) {
      return {
        text: `${num}/10`,
        label: "Highly Recommended",
        color: "#a3e635",
        bg: "rgba(163,230,53,0.1)",
        border: "rgba(163,230,53,0.3)",
        glow: "0 0 10px rgba(163,230,53,0.15)"
      };
    } else if (num >= 5.0) {
      return {
        text: `${num}/10`,
        label: "Decent / Good",
        color: "#fbbf24",
        bg: "rgba(251,191,36,0.1)",
        border: "rgba(251,191,36,0.3)",
        glow: "0 0 10px rgba(251,191,36,0.15)"
      };
    } else if (num >= 3.0) {
      return {
        text: `${num}/10`,
        label: "Mediocre",
        color: "#fb923c",
        bg: "rgba(251,146,60,0.1)",
        border: "rgba(251,146,60,0.3)",
        glow: "0 0 10px rgba(251,146,60,0.15)"
      };
    } else {
      return {
        text: `${num}/10`,
        label: "Avoid",
        color: "#ef4444",
        bg: "rgba(239,68,68,0.1)",
        border: "rgba(239,68,68,0.3)",
        glow: "0 0 10px rgba(239,68,68,0.15)"
      };
    }
  };

  const [suggestTitle, setSuggestTitle] = useState("");
  const [suggestSender, setSuggestSender] = useState("");
  const [suggestRating, setSuggestRating] = useState("");
  const [suggestReview, setSuggestReview] = useState("");
  const [suggestions, setSuggestions] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aryan_archive_suggestions");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [bookSuggestions, setBookSuggestions] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aryan_archive_book_suggestions");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [unscriptedSuggestions, setUnscriptedSuggestions] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aryan_archive_unscripted_suggestions");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [futureSuggestions, setFutureSuggestions] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aryan_archive_future_suggestions");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const handleSuggestSubmit = () => {
    if (!suggestTitle.trim() || !suggestSender.trim()) return;
    const newSuggestion = {
      title: suggestTitle,
      sender: suggestSender,
      rating: suggestRating,
      review: suggestReview,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };
    
    if (activeChamberIdx === 0) {
      const updated = [newSuggestion, ...suggestions];
      setSuggestions(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("aryan_archive_suggestions", JSON.stringify(updated));
      }
    } else if (activeChamberIdx === 1) {
      const updated = [newSuggestion, ...unscriptedSuggestions];
      setUnscriptedSuggestions(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("aryan_archive_unscripted_suggestions", JSON.stringify(updated));
      }
    } else if (activeChamberIdx === 4) {
      const updated = [newSuggestion, ...bookSuggestions];
      setBookSuggestions(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("aryan_archive_book_suggestions", JSON.stringify(updated));
      }
    } else {
      const updated = [newSuggestion, ...futureSuggestions];
      setFutureSuggestions(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("aryan_archive_future_suggestions", JSON.stringify(updated));
      }
    }
    setSuggestTitle("");
    setSuggestSender("");
    setSuggestRating("");
    setSuggestReview("");
  };

  const mainRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setSelectedTheme(activeChamberIdx === 5 ? "Current Missions" : "All");
    setShowAllReviews(false);
  }, [activeChamberIdx]);

  // Mouse Parallax movements
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (viewMode !== "ORBIT") return;
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 90;
      const y = (clientY - window.innerHeight / 2) / 90;
      mouseRef.current = { x, y };

      gsap.to(".studio-parallax", {
        x: x * 0.8,
        y: y * 0.8,
        duration: 0.95,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [viewMode]);

  const handleHotspotClick = (idx, e) => {
    const targetElement = document.querySelector(".studio-parallax");
    if (!targetElement) return;
    const rect = targetElement.getBoundingClientRect();
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || rect.left + rect.width / 2;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || rect.top + rect.height / 2;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const originX = (x / rect.width) * 100;
    const originY = (y / rect.height) * 100;

    // Zoom camera animation on the Studio Parallax Container
    gsap.to(".studio-parallax", {
      scale: 6.0,
      transformOrigin: `${originX}% ${originY}%`,
      opacity: 0,
      duration: 1.25,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(".studio-parallax", { scale: 1, opacity: 1, transformOrigin: "center center" });
        if (idx === 6) {
          setShowMystery(true);
        } else {
          setActiveChamberIdx(idx);
          setViewMode("CHAMBER");
          if (mainRef.current) mainRef.current.scrollTop = 0;
        }
      }
    });
  };

  const allHotspots = [...chambersConfig, mysteryChamber];
  const getChamberDisplayNum = (idx) => {
    if (idx === 0) return "01";
    if (idx === 1) return "02";
    if (idx === 3) return "03";
    if (idx === 4) return "04";
    if (idx === 5) return "05";
    return "";
  };
  const activeChamber = chambersConfig[activeChamberIdx];

  const getRatingValue = (ratingVal) => {
    if (typeof ratingVal === "number") return ratingVal;
    if (typeof ratingVal === "string") {
      if (ratingVal.includes("/")) {
        return parseFloat(ratingVal.split("/")[0]) || 0;
      }
      return parseFloat(ratingVal) || 0;
    }
    return 0;
  };

  const chamberEntries = [
    ...(customEntries[activeChamberIdx] || []),
    ...activeChamber.entries
  ];

  const filteredEntries = chamberEntries.filter((entry) => {
    if (selectedTheme === "Favourites") {
      const ratingVal = getRatingValue(entry.rating);
      return entry.category === "Favourites" || (activeChamberIdx === 0 && ratingVal > 9);
    }
    return selectedTheme === "All" || entry.category === selectedTheme;
  });

  const displayedEntries = showAllReviews ? filteredEntries : filteredEntries.slice(0, 4);

  return (
    <main
      ref={mainRef}
      className={`relative w-screen h-screen overflow-x-hidden transition-colors duration-750 select-none scrollbar-thin ${
        viewMode === "ORBIT" 
          ? "bg-[#050508] text-white overflow-y-hidden" 
          : "bg-[#050508] text-slate-200 overflow-y-auto"
      }`}
    >
      {/* Background Starfield only in Studio mode */}
      <div className={`transition-opacity duration-700 ${viewMode === "ORBIT" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <CanvasStarfield />
      </div>

      {/* ==========================================
          STATE 1: THE SPIDER-VERSE CREATOR'S STUDIO (DARK 2.5D ILLUSTRATION)
          ========================================== */}
      <div
        className={`w-full min-h-screen flex flex-col items-center justify-between p-8 transition-all duration-700 ease-in-out ${
          viewMode === "ORBIT"
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-125 pointer-events-none absolute inset-0 w-0 h-0 overflow-hidden"
        }`}
      >
        {/* Top-Left Back Button */}
        <div className="absolute top-8 left-8 z-30 pointer-events-auto">
          <Link
            href="/?state=WORLD&node=blog"
            className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/60 hover:border-purple-500/40 hover:text-white transition-all duration-300 rounded font-space-mono text-xs tracking-wider cursor-pointer text-[#94A3B8] shadow-md group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span> Back to Universe
          </Link>
        </div>

        {/* Minimal Centered Headers */}
        <div className="z-10 text-center flex flex-col gap-2 mt-[-12px] max-w-xl select-none">
          <h1 className="font-orbitron text-3xl md:text-5xl font-black tracking-[0.25em] text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] animate-pulse">
            THE ARCHIVE
          </h1>
          <div className="font-space-mono text-[9px] md:text-[10px] text-purple-400 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <span>Thoughts</span>
            <span className="opacity-45">•</span>
            <span>Stories</span>
            <span className="opacity-45">•</span>
            <span>Creations</span>
          </div>
        </div>

        {styleBlock()}

        {/* Desktop View: Handcrafted Master 2.5D Holographic Ideas Vault */}
        <div 
          className="w-full max-w-6xl relative studio-parallax my-auto hidden md:block"
          style={{ aspectRatio: "1200 / 600" }}
        >
          {/* Spatial Mind Core Overlay Canvas */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <svg 
              className="w-full h-full overflow-visible studio-svg filter drop-shadow-[0_10px_30px_rgba(59,130,246,0.15)]"
              viewBox="0 0 1200 600" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="energyBeamGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="30%" stopColor="#8B5CF6" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                </linearGradient>
                <filter id="beamGlow">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* The main beam path with glow (Removed to clear line over hand) */}
            </svg>
          </div>

          {/* Symmetrical Floating Chambers */}
          {allHotspots.map((hs, idx) => {
            if (idx === 2 || idx === 6) return null; // Skip Builder Logs and Unknown File
            const isHovered = hoveredHotspotIdx === idx;
            const leftPct = `${(hs.cx / 1200) * 100}%`;
            const topPct = `${(hs.cy / 600) * 100}%`;

            return (
              <button
                key={hs.objectLabel}
                onClick={(e) => handleHotspotClick(idx, e)}
                onMouseEnter={() => setHoveredHotspotIdx(idx)}
                onMouseLeave={() => setHoveredHotspotIdx(null)}
                className="absolute pointer-events-auto group/chamber focus:outline-none transition-all duration-300 select-none flex flex-col items-center justify-center"
                style={{
                  left: leftPct,
                  top: topPct,
                  transform: isHovered ? "translate(-50%, -50%) scale(1.1)" : "translate(-50%, -50%) scale(1)",
                  zIndex: isHovered ? 40 : 10
                }}
              >
                {/* Floating animated chamber visual wrapper */}
                <div className="flex flex-col items-center text-center relative studio-item-float">
                  {/* Glowing Animated SVG Icon */}
                  <div 
                    className="w-24 h-24 flex items-center justify-center relative transition-all duration-300"
                    style={{
                      filter: isHovered 
                        ? `drop-shadow(0 0 25px ${hs.color}) drop-shadow(0 0 10px ${hs.color})` 
                        : `drop-shadow(0 0 12px ${hs.color}45)`
                    }}
                  >
                    {hs.svg}
                  </div>

                  {/* Large dominant Orbitron Title */}
                  <h3 
                    className="font-orbitron text-xs md:text-sm font-black uppercase tracking-wider mt-3 transition-colors duration-300"
                    style={{ 
                      color: isHovered ? "white" : hs.color,
                      textShadow: isHovered 
                        ? `0 0 15px ${hs.color}, 0 0 5px ${hs.color}` 
                        : `0 0 8px ${hs.color}35`,
                      letterSpacing: "0.2em"
                    }}
                  >
                    {hs.title.split(" ").map((word, wIdx) => (
                      <span key={wIdx} className="block text-center">{word}</span>
                    ))}
                  </h3>

                  {/* Dynamic Hover Tooltip */}
                  {isHovered && (
                    <div 
                      className={`absolute left-1/2 -translate-x-1/2 z-50 w-72 p-4.5 rounded-2xl backdrop-blur-2xl bg-slate-950/90 border shadow-2xl text-center pointer-events-none animate-fadeIn ${
                         hs.cy > 450 ? "bottom-full mb-5" : "top-full mt-5"
                       }`}
                      style={{ 
                        borderColor: `${hs.color}40`,
                        boxShadow: `0 15px 35px -5px ${hs.color}30, 0 0 20px 0 ${hs.color}15`
                      }}
                    >
                      <h4 
                        className="font-orbitron text-xs font-black uppercase tracking-widest mb-1.5"
                        style={{ color: hs.color }}
                      >
                        {hs.title}
                      </h4>
                      <p className="font-serif italic text-[11px] text-slate-200 leading-relaxed font-normal">
                        {hs.tooltipTagline}
                      </p>
                    </div>
                  )}
                </div>
              </button>
            );
          })}

          {/* Cinematic floating hand at bottom-center */}
          <img 
            src="/creator_hand_v4.png" 
            alt="Creator Hand"
            className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 pointer-events-none select-none w-[500px] object-contain opacity-85"
            style={{ filter: "drop-shadow(0 0 45px rgba(59, 130, 246, 0.15))" }}
          />
        </div>

        {/* Mobile View: Simplified Symmetrical List */}
        <div className="w-full flex flex-col gap-5 md:hidden px-4 z-10 py-6 max-h-[70vh] overflow-y-auto scrollbar-none relative">
          {allHotspots.map((hs, idx) => {
            if (idx === 2 || idx === 6) return null; // Skip Builder Logs and Unknown File
            return (
            <button
              key={hs.objectLabel + "-mobile"}
              onClick={(e) => {
                if (idx === 6) {
                  setShowMystery(true);
                } else {
                  setActiveChamberIdx(idx);
                  setViewMode("CHAMBER");
                  if (mainRef.current) mainRef.current.scrollTop = 0;
                }
              }}
              className="relative w-full max-w-sm mx-auto p-4.5 bg-black/60 border border-slate-800/60 hover:border-slate-700 rounded-2xl flex items-center gap-4 text-left pointer-events-auto transition-all shadow-xl active:scale-98"
              style={{
                boxShadow: `0 0 15px ${hs.color}10`,
                borderColor: `${hs.color}25`
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl bg-black/55 flex items-center justify-center p-2 shrink-0 border relative overflow-hidden"
                style={{ 
                  borderColor: `${hs.color}40`,
                  filter: `drop-shadow(0 0 8px ${hs.color}40)`
                }}
              >
                <div className="w-full h-full relative z-10">
                  {hs.svg}
                </div>
              </div>
              <div className="flex flex-col gap-0.5 w-full overflow-hidden">
                <span className="font-space-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Chamber {getChamberDisplayNum(idx)}
                </span>
                <h3 
                  className="font-orbitron text-sm font-black uppercase tracking-widest truncate"
                  style={{ color: hs.color }}
                >
                  {hs.title}
                </h3>
              </div>
            </button>
          ); })}
        </div>
      </div>

      {/* ==========================================
          STATE 2: SINGLE IMMERSIVE CHAMBER SUBVIEW (LIGHT JOURNAL EDITORIAL)
          ========================================== */}
      {viewMode === "CHAMBER" && (
        <div className="w-full flex flex-col animate-fadeIn">
          
          {/* Sticky Header Bar Navigation */}
          <div className="sticky top-0 z-30 bg-[#050508]/80 backdrop-blur-md border-b border-white/10 w-full py-4.5 px-6 md:px-12">
            <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
              
              <button
                onClick={() => setViewMode("ORBIT")}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 bg-black/60 hover:border-white/20 hover:text-white text-slate-200 rounded-lg font-space-mono text-[12px] tracking-wider uppercase font-bold cursor-pointer transition-colors shadow-sm"
              >
                ← Return to Archive
              </button>

              <div className="flex flex-col items-center gap-1">
                <span className="font-space-mono text-[11px] text-slate-300 uppercase tracking-widest font-black">
                  Chamber {getChamberDisplayNum(activeChamberIdx)} of 05
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {chambersConfig.map((ch, idx) => {
                    if (idx === 2) return null; // Skip Builder Logs
                    return (
                    <button
                      key={ch.num}
                      onClick={() => handleHotspotClick(idx, { clientX: window.innerWidth/2, clientY: window.innerHeight/2 })}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeChamberIdx === idx
                          ? "w-3 scale-110 shadow-[0_0_8px_currentColor]"
                          : "bg-slate-700 hover:bg-slate-500"
                      }`}
                      style={{ 
                        backgroundColor: activeChamberIdx === idx ? activeChamber.color : "" 
                      }}
                    />
                  ); })}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (activeChamberIdx > 0) {
                      let prevIdx = activeChamberIdx - 1;
                      if (prevIdx === 2) prevIdx = 1;
                      handleHotspotClick(prevIdx, { clientX: window.innerWidth/2, clientY: window.innerHeight/2 });
                    }
                  }}
                  disabled={activeChamberIdx === 0}
                  className="px-3 py-1.5 border border-white/10 bg-black/60 hover:border-white/20 text-[12px] font-space-mono font-bold text-slate-200 hover:text-white rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-sm"
                >
                  ← Prev
                </button>

                <button
                  onClick={() => {
                    if (activeChamberIdx < 5) {
                      let nextIdx = activeChamberIdx + 1;
                      if (nextIdx === 2) nextIdx = 3;
                      handleHotspotClick(nextIdx, { clientX: window.innerWidth/2, clientY: window.innerHeight/2 });
                    }
                  }}
                  disabled={activeChamberIdx === 5}
                  className="px-3 py-1.5 border border-white/10 bg-black/60 hover:border-white/20 text-[12px] font-space-mono font-bold text-slate-200 hover:text-white rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-sm"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          {/* Main content grid section */}
          <div className="max-w-6xl w-full mx-auto px-6 md:px-12 py-16 md:py-24">
            
            {/* Upper Split Area: Intro & floating graphic (solid 2D vectors) */}
            <div className="grid lg:grid-cols-12 gap-12 items-center pb-16 border-b border-white/10">
              
              {/* Left Column: Heading + Journal entries */}
              <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                <div className="flex flex-col gap-2">
                  <span 
                    className="font-space-mono text-xs uppercase tracking-[0.25em] font-black"
                    style={{ color: activeChamber.color }}
                  >
                    {getChamberDisplayNum(activeChamberIdx)}. {activeChamber.title}
                  </span>
                  <h1 className="font-orbitron text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
                    {activeChamber.subtitle}
                  </h1>
                </div>

                <p className="font-inter text-slate-100 text-lg leading-relaxed font-normal">
                  {activeChamber.description}
                </p>

                {/* Highlight Quote callout card */}
                <div 
                  className="p-6 rounded-2xl border flex items-start gap-4 relative overflow-hidden mt-2 bg-white/5 backdrop-blur-md"
                  style={{ 
                    borderColor: `${activeChamber.color}40`,
                    boxShadow: `0 10px 30px -10px ${activeChamber.color}20`
                  }}
                >
                  <Quote 
                    className="w-8 h-8 shrink-0 rotate-180" 
                    style={{ color: activeChamber.color }}
                  />
                  <blockquote 
                    className="font-inter italic text-[17px] leading-relaxed font-semibold text-white"
                  >
                    "{activeChamber.quote}"
                  </blockquote>
                </div>
              </div>

              {/* Right Column: Massive rotating SVG Artwork - Solid 2D structures */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <div 
                  className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full flex items-center justify-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl relative group transition-transform duration-500 hover:scale-105"
                  style={{ 
                    boxShadow: `0 20px 50px -15px ${activeChamber.glowColor}` 
                  }}
                >
                  <div className="w-full h-full animate-[spin_100s_linear_infinite_reverse] absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
                  <div className="w-[90%] h-[90%] pointer-events-none drop-shadow-2xl">
                    {activeChamber.svg}
                  </div>
                </div>
              </div>
            </div>



            {/* Special Section: Book progress statistics bar only for Unscripted Love */}
            {activeChamberIdx === 1 && (
              <div className="py-12 border-b border-white/10 text-left flex flex-col gap-3">
                <h3 className="font-orbitron text-xs font-black uppercase text-slate-400 tracking-widest">
                  Manuscript wordcount ledger
                </h3>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col gap-3.5">
                  <div className="flex justify-between items-center text-xs font-space-mono text-slate-300">
                    <span>Draft Progression:</span>
                    <span className="text-red-400 font-bold font-space-mono drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]">5 / 12 chapters complete (32,460 words)</span>
                  </div>
                  <div className="w-full bg-black/50 h-2.5 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-gradient-to-r from-red-500 to-rose-600 h-full rounded-full shadow-[0_0_10px_rgba(244,63,94,0.8)]" style={{ width: "41.67%" }} />
                  </div>
                  <div className="flex justify-between items-center text-xs font-space-mono mt-0.5 border-t border-white/5 pt-3">
                    <span className="text-slate-400">Official Release Date:</span>
                    <span className="text-red-500 font-black font-orbitron text-sm tracking-wider uppercase drop-shadow-[0_0_12px_rgba(239,68,68,0.9)] animate-pulse">12 Sep 2027</span>
                  </div>
                </div>
              </div>
            )}

            {activeChamberIdx !== 1 && activeChamberIdx !== 3 && (
              /* Bottom Area: Explore by Theme Grid */
              <div className="py-12 text-left">
                  <h3 className="font-space-mono text-xs text-slate-200 uppercase tracking-[0.25em] font-black mb-6 border-b border-white/10 pb-2">
                    Explore by Theme
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-x-10 gap-y-4 font-space-mono text-sm md:text-base">
                    {activeChamberIdx !== 5 && (
                      <button
                        onClick={() => setSelectedTheme("All")}
                        className="transition-all duration-300 cursor-pointer uppercase tracking-wider relative py-1 focus:outline-none text-sm md:text-[15px]"
                        style={{
                          fontWeight: selectedTheme === "All" ? "900" : "500",
                          color: activeChamber.color,
                          opacity: selectedTheme === "All" ? 1 : 0.75,
                          textShadow: selectedTheme === "All" ? `0 0 12px ${activeChamber.color}` : "none"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.fontWeight = "900";
                          e.currentTarget.style.opacity = "1";
                          e.currentTarget.style.textShadow = `0 0 12px ${activeChamber.color}`;
                        }}
                        onMouseLeave={(e) => {
                          if (selectedTheme !== "All") {
                            e.currentTarget.style.fontWeight = "500";
                            e.currentTarget.style.opacity = "0.75";
                            e.currentTarget.style.textShadow = "none";
                          }
                        }}
                      >
                        All Categories
                      </button>
                    )}

                    {activeChamber.themes.map((th) => {
                      const isSelected = selectedTheme === th.name;
                      return (
                        <button
                          key={th.name}
                          onClick={() => setSelectedTheme(th.name)}
                          className="transition-all duration-300 cursor-pointer uppercase tracking-wider relative py-1 focus:outline-none text-sm md:text-[15px] flex items-center gap-1.5"
                          style={{
                            fontWeight: isSelected ? "900" : "500",
                            color: activeChamber.color,
                            opacity: isSelected ? 1 : 0.75,
                            textShadow: isSelected ? `0 0 12px ${activeChamber.color}` : "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.fontWeight = "900";
                            e.currentTarget.style.opacity = "1";
                            e.currentTarget.style.textShadow = `0 0 12px ${activeChamber.color}`;
                          }}
                          onMouseLeave={(e) => {
                            if (selectedTheme !== th.name) {
                              e.currentTarget.style.fontWeight = "500";
                              e.currentTarget.style.opacity = "0.75";
                              e.currentTarget.style.textShadow = "none";
                            }
                          }}
                        >
                          {th.name}
                        </button>
                      );
                    })}

                    {(activeChamberIdx === 0 || activeChamberIdx === 1 || activeChamberIdx === 3 || activeChamberIdx === 4 || activeChamberIdx === 5) && isAdmin && (
                      <button
                        onClick={() => {
                          let defaultCat = "Movies";
                          if (activeChamberIdx === 1) defaultCat = "Book Progress";
                          if (activeChamberIdx === 3) defaultCat = "Mental Models";
                          if (activeChamberIdx === 4) defaultCat = "Novel";
                          if (activeChamberIdx === 5) defaultCat = "Current Missions";
                          openAddModal(selectedTheme === "All" ? defaultCat : selectedTheme);
                        }}
                        className="w-7 h-7 rounded-full text-white flex items-center justify-center text-sm font-black transition-all cursor-pointer border ml-4 shadow-sm"
                        style={{ 
                          backgroundColor: activeChamber.color,
                          borderColor: `${activeChamber.color}50`,
                          boxShadow: `0 0 10px ${activeChamber.color}80`
                        }}
                        title="Add Entry"
                      >
                        +
                      </button>
                    )}
                  </div>
                </div>
            )}

            {activeChamberIdx !== 1 && (
              <div className="text-left py-4">
                  <h3 className="font-space-mono text-xs text-slate-200 uppercase tracking-[0.2em] font-black mb-8 border-b border-white/10 pb-2 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span>{activeChamberIdx === 3 ? "Thoughts & Blogs Feed" : "Recent Entries"}</span>
                      {(activeChamberIdx === 0 || activeChamberIdx === 1 || activeChamberIdx === 3 || activeChamberIdx === 4 || activeChamberIdx === 5) && isAdmin && (
                        <button
                          onClick={() => {
                            let defaultCat = "Movies";
                            if (activeChamberIdx === 1) defaultCat = "Book Progress";
                            if (activeChamberIdx === 3) defaultCat = "Mental Models";
                            if (activeChamberIdx === 4) defaultCat = "Novel";
                            if (activeChamberIdx === 5) defaultCat = "Current Missions";
                            openAddModal(selectedTheme === "All" ? defaultCat : selectedTheme);
                          }}
                          className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg border text-white transition-all cursor-pointer text-[10px] font-space-mono font-bold tracking-wider uppercase ml-2"
                          style={{ 
                            borderColor: `${activeChamber.color}50`,
                            backgroundColor: `${activeChamber.color}15`,
                            boxShadow: `0 0 10px ${activeChamber.color}30`
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = activeChamber.color;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = `${activeChamber.color}15`;
                          }}
                          title={
                            activeChamberIdx === 0 
                              ? "Add Movie/Series Entry" 
                              : activeChamberIdx === 1
                                ? "Add Story Entry"
                                : activeChamberIdx === 3
                                  ? "Write a New Blog"
                                  : activeChamberIdx === 4 
                                    ? "Add Book Entry" 
                                    : "Add Future Ambition"
                          }
                        >
                          {activeChamberIdx === 3 ? "+ Create Blog" : "+ Add Entry"}
                        </button>
                      )}
                    </div>
                    {activeChamberIdx !== 3 && (
                      <span className="text-slate-300 font-normal flex items-center gap-1">theme: {selectedTheme}</span>
                    )}
                  </h3>

                  {filteredEntries.length === 0 ? (
                    <div className="py-12 border border-dashed border-white/20 rounded-2xl text-center text-slate-300 font-inter italic text-sm bg-white/5 w-full">
                      {activeChamberIdx === 3 ? "No blog posts published yet." : "No reflections logged under this theme yet. More memory data coming soon."}
                    </div>
                  ) : activeChamberIdx === 3 ? (
                    /* Beautiful 2-Column Blog Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                      {filteredEntries.map((entry, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedBlogEntry(entry)}
                          className="bg-[#090d16]/80 border border-white/10 hover:border-emerald-500/30 rounded-2xl flex flex-col gap-5 transition-all duration-300 shadow-sm hover:shadow-2xl cursor-pointer group overflow-hidden"
                          style={{
                            boxShadow: `0 10px 30px -15px rgba(0,0,0,0.7)`
                          }}
                        >
                          {/* Banner image wrapper */}
                          <div className="w-full h-44 shrink-0 overflow-hidden relative border-b border-white/5 bg-slate-950">
                            <EntryThumbnail code={entry.thumbnailCode} imageFit={entry.imageFit} imagePosition={entry.imagePosition} imageZoom={entry.imageZoom} />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10" />
                            <span 
                              className="absolute top-4 left-4 font-space-mono text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded border text-white z-20"
                              style={{ 
                                backgroundColor: `rgba(16,185,129,0.3)`,
                                borderColor: `rgba(16,185,129,0.5)`
                              }}
                            >
                              {entry.tag}
                            </span>
                            {activeChamberIdx === 0 && getRatingValue(entry.rating) > 9 && (
                              <span 
                                className="absolute top-4 right-4 font-space-mono text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded border text-yellow-400 z-20 flex items-center gap-1 bg-yellow-500/20 border-yellow-500/40 shadow-[0_0_10px_rgba(234,179,8,0.25)]"
                              >
                                <Star className="w-3 h-3 fill-yellow-400 animate-pulse" />
                                Favourite
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col justify-between flex-grow px-6 pb-6 gap-4">
                            <div className="flex flex-col gap-2.5 text-left">
                              <span className="font-space-mono text-[10px] text-slate-300">{entry.date}</span>
                              <h4 className="font-orbitron text-lg font-black text-white leading-snug group-hover:text-emerald-400 transition-colors">
                                {entry.title}
                              </h4>
                              <p className="font-inter text-slate-200 text-sm leading-relaxed font-normal line-clamp-3">
                                {entry.content || entry.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5 w-full z-20">
                              <span 
                                className="font-space-mono text-[9px] font-black uppercase tracking-wider flex items-center gap-1 group/btn text-emerald-400 hover:underline"
                              >
                                Read Thought <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                              </span>

                              {entry.isCustom && isAdmin && (
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openEditModal(entry);
                                    }}
                                    className="font-space-mono text-[9px] font-black uppercase tracking-wider text-emerald-400 hover:text-emerald-300 cursor-pointer hover:underline transition-colors"
                                  >
                                    Edit Post
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteEntry(entry);
                                    }}
                                    className="font-space-mono text-[9px] font-black uppercase tracking-wider text-red-500 hover:text-red-400 cursor-pointer hover:underline transition-colors"
                                  >
                                    Delete Post
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Existing vertical list for other chambers */
                    <div className="flex flex-col gap-6 w-full">
                      {displayedEntries.map((entry, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            if (activeChamberIdx === 3) {
                              setSelectedBlogEntry(entry);
                            }
                          }}
                          className={`bg-white/5 border border-white/10 hover:border-white/20 p-6 rounded-2xl flex flex-col md:flex-row gap-6 transition-all duration-300 shadow-sm hover:shadow-lg group ${
                            activeChamberIdx === 3 ? "cursor-pointer hover:shadow-2xl" : ""
                          }`}
                          style={{
                            boxShadow: `0 5px 15px -10px ${activeChamber.color}30`
                          }}
                        >
                          <div className="w-full md:w-36 h-24 shrink-0 rounded-xl overflow-hidden border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity">
                            <EntryThumbnail code={entry.thumbnailCode} imageFit={entry.imageFit} imagePosition={entry.imagePosition} imageZoom={entry.imageZoom} />
                          </div>

                          <div className="flex flex-col justify-between gap-4 w-full">
                            <div className="flex justify-between items-start flex-wrap gap-2">
                              <div className="flex items-center gap-2.5">
                                <span 
                                  className="font-space-mono text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded border text-white"
                                  style={{ 
                                    backgroundColor: `${activeChamber.color}30`,
                                    borderColor: `${activeChamber.color}50`
                                  }}
                                >
                                  {entry.tag}
                                </span>
                                <span className="font-space-mono text-[8px] text-slate-400">{entry.date}</span>
                              </div>
                              
                              <div className="flex flex-col items-end gap-1 leading-none">
                                {activeChamberIdx === 5 ? (
                                  <div 
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded border text-[8px] font-black uppercase tracking-wider font-space-mono shadow-sm"
                                    style={{
                                      color: entry.rating === 5 ? "#EF4444" : entry.rating === 3 ? "#EAB308" : "#10B981",
                                      borderColor: entry.rating === 5 ? "rgba(239,68,68,0.3)" : entry.rating === 3 ? "rgba(234,179,8,0.3)" : "rgba(16,185,129,0.3)",
                                      backgroundColor: entry.rating === 5 ? "rgba(239,68,68,0.1)" : entry.rating === 3 ? "rgba(234,179,8,0.1)" : "rgba(16,185,129,0.1)",
                                      boxShadow: entry.rating === 5 ? "0 0 10px rgba(239,68,68,0.1)" : entry.rating === 3 ? "0 0 10px rgba(234,179,8,0.1)" : "0 0 10px rgba(16,185,129,0.1)"
                                    }}
                                  >
                                    <span 
                                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                                      style={{
                                        backgroundColor: entry.rating === 5 ? "#EF4444" : entry.rating === 3 ? "#EAB308" : "#10B981"
                                      }}
                                    />
                                    {entry.rating === 5 ? "High Priority" : entry.rating === 3 ? "Medium Priority" : "Low Priority"}
                                  </div>
                                ) : (
                                  (() => {
                                    const style = getRatingStyle(entry.rating);
                                    return (
                                      <div className="flex flex-col items-end gap-1.5">
                                        <div 
                                          className="font-orbitron text-xs font-black px-2.5 py-1 rounded border tracking-wider shadow-sm flex items-center gap-1.5"
                                          style={{
                                            color: style.color,
                                            borderColor: style.border,
                                            backgroundColor: style.bg,
                                            boxShadow: style.glow
                                          }}
                                        >
                                          {style.text}
                                        </div>
                                        <span className="font-space-mono text-[7px] text-slate-500 uppercase tracking-widest mt-0.5">
                                          {style.label}
                                        </span>
                                      </div>
                                    );
                                  })()
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col gap-1.5 text-left">
                              <h4 className="font-orbitron text-lg font-black text-white leading-snug">
                                {entry.title}
                              </h4>
                              <p className="font-inter text-slate-100 text-sm leading-relaxed font-normal">
                                {entry.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-1 w-full">
                              <span 
                                className="font-space-mono text-[9px] font-black uppercase tracking-wider flex items-center gap-1 group/btn cursor-pointer hover:underline text-white"
                                style={{ textShadow: `0 0 10px ${activeChamber.color}` }}
                              >
                                {activeChamberIdx === 3 ? "Read Blog Post" : "Read Reflection"} <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                              </span>

                              {entry.isCustom && isAdmin && (
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => openEditModal(entry)}
                                    className="font-space-mono text-[9px] font-black uppercase tracking-wider text-emerald-400 hover:text-emerald-300 cursor-pointer hover:underline transition-colors"
                                    style={{ textShadow: "0 0 10px rgba(16, 185, 129, 0.4)" }}
                                  >
                                    Edit Entry
                                  </button>
                                  <button
                                    onClick={() => handleDeleteEntry(entry)}
                                    className="font-space-mono text-[9px] font-black uppercase tracking-wider text-red-500 hover:text-red-400 cursor-pointer hover:underline transition-colors"
                                    style={{ textShadow: "0 0 10px rgba(239, 68, 68, 0.4)" }}
                                  >
                                    Delete Entry
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {!showAllReviews && filteredEntries.length > 4 && (
                        <div className="flex justify-center mt-6 w-full shrink-0">
                          <button
                            onClick={() => setShowAllReviews(true)}
                            className="px-6 py-2.5 rounded-xl font-space-mono text-xs font-black uppercase tracking-wider border border-white/10 bg-white/5 hover:bg-white/10 text-white cursor-pointer transition-all hover:border-emerald-500/30 hover:scale-[1.03]"
                            style={{
                              boxShadow: `0 0 15px rgba(255,255,255,0.05)`,
                              textShadow: `0 0 8px rgba(255,255,255,0.3)`
                            }}
                          >
                            Show All ({filteredEntries.length} Reviews)
                          </button>
                        </div>
                      )}
                      
                      {showAllReviews && filteredEntries.length > 4 && (
                        <div className="flex justify-center mt-6 w-full shrink-0">
                          <button
                            onClick={() => setShowAllReviews(false)}
                            className="px-6 py-2.5 rounded-xl font-space-mono text-xs font-black uppercase tracking-wider border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-all hover:border-red-500/20 hover:scale-[1.03]"
                            style={{
                              boxShadow: `0 0 15px rgba(255,255,255,0.02)`
                            }}
                          >
                            Show Less
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
            )}

            {activeChamberIdx === 1 && (
              /* Chapters section only for Unscripted Love */
              <div className="py-16 text-left border-t border-white/10 mt-8 flex flex-col gap-8 animate-fadeIn">
                <h3 className="font-space-mono text-xs text-slate-200 uppercase tracking-[0.2em] font-black border-b border-white/10 pb-2 flex justify-between items-center">
                  <span>Draft Manuscript Chapters</span>
                  <span className="text-slate-300 font-normal">Passcode Protected</span>
                </h3>

                <div className="grid md:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Chapters vertical line list */}
                  <div className="md:col-span-7 flex flex-col gap-6 relative pl-6 border-l border-white/10">
                    {[
                      { num: "Chapter 01", title: "The First Brushstroke", teaser: "When rigid code meets spontaneous paint, Kabir's orderly world begins to blur." },
                      { num: "Chapter 02", title: "Compile-Time Coincidence", teaser: "An accidental meeting at a local art store throws off Kabir's predictable algorithms." },
                      { num: "Chapter 03", title: "Color Palettes & Algorithms", teaser: "Avni challenges Kabir to view the world through colors instead of variables." },
                      { num: "Chapter 04", title: "Debugging the Heart", teaser: "A sudden system crash forces Kabir to confront emotional logs he cannot delete." },
                      { num: "Chapter 05", title: "Spontaneous Synthesis", teaser: "An unscripted canvas that changes their lifepaths forever." }
                    ].map((chap, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => {
                          if (!isChaptersUnlocked) {
                            const inputElem = document.getElementById("passcode-input");
                            if (inputElem) {
                              inputElem.focus();
                              inputElem.scrollIntoView({ behavior: "smooth", block: "center" });
                            }
                          }
                        }}
                        className={`group relative p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-2 transition-all duration-300 ${
                          !isChaptersUnlocked 
                            ? "cursor-pointer hover:border-red-500/30 hover:bg-white/[0.02]" 
                            : "hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-space-mono text-[9px] font-bold text-red-500 uppercase tracking-widest">{chap.num}</span>
                          {!isChaptersUnlocked ? (
                            <Lock className="w-3.5 h-3.5 text-red-500/60 group-hover:text-red-500 transition-colors animate-pulse" />
                          ) : (
                            <Unlock className="w-3.5 h-3.5 text-emerald-500" />
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-1.5 mt-0.5">
                          <h4 
                            className={`font-orbitron text-sm font-black text-white uppercase tracking-wider transition-all duration-500 select-none ${
                              !isChaptersUnlocked ? "blur-[5px] select-none pointer-events-none opacity-50" : ""
                            }`}
                          >
                            {chap.title}
                          </h4>
                          <p 
                            className={`font-inter text-xs text-slate-300 leading-relaxed font-light transition-all duration-500 ${
                              !isChaptersUnlocked ? "blur-[4px] select-none pointer-events-none opacity-30" : ""
                            }`}
                          >
                            {chap.teaser}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Code unlock ledger */}
                  <div className="md:col-span-5 bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-5 shadow-sm relative overflow-hidden" style={{ borderColor: isChaptersUnlocked ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)" }}>
                    <div className="flex flex-col gap-1">
                      <span className="font-space-mono text-[8px] text-red-500 tracking-[0.25em] uppercase font-black">Manuscript Decryptor</span>
                      <h4 className="font-orbitron text-sm font-black text-white uppercase tracking-widest">Passcode Access</h4>
                    </div>

                    <div className="h-[1px] bg-white/10 w-full" />

                    {!isChaptersUnlocked ? (
                      <div className="flex flex-col gap-4 text-xs font-space-mono text-slate-300">
                        <p className="font-inter text-xs text-slate-400 leading-relaxed">
                          The chapter titles and drafts of <strong className="text-white">Unscripted Love</strong> are encrypted. Request the key from the author or enter it below to decrypt.
                        </p>
                        
                        <div className="flex flex-col gap-1.5">
                          <label className="text-slate-400 font-bold uppercase tracking-wider">Access Passcode</label>
                          <div className="flex gap-2">
                            <input 
                              type="password" 
                              id="passcode-input"
                              placeholder="Enter Code"
                              value={passcodeInput}
                              onChange={(e) => {
                                setPasscodeInput(e.target.value);
                                setPasscodeError(false);
                              }}
                              className={`bg-[#050508] border rounded-lg p-2.5 text-slate-200 outline-none flex-1 focus:border-red-500 font-space-mono text-center tracking-[0.3em] font-bold ${
                                passcodeError ? "border-red-500 animate-shake" : "border-white/10"
                              }`}
                            />
                            <button
                              onClick={() => {
                                if (passcodeInput === "1209") {
                                  setIsChaptersUnlocked(true);
                                  if (typeof window !== "undefined") {
                                    localStorage.setItem("aryan_unscripted_unlocked", "true");
                                  }
                                } else {
                                  setPasscodeError(true);
                                }
                              }}
                              className="px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.3)] uppercase tracking-wider text-[10px]"
                            >
                              Decrypt
                            </button>
                          </div>
                          {passcodeError && (
                            <span className="text-[9px] text-red-500 font-bold mt-1 text-center">✕ Decryption failed. Incorrect code.</span>
                          )}
                        </div>

                        <div className="h-[1px] bg-white/5 my-1" />

                        <div className="flex flex-col gap-3">
                          <span className="text-[9px] text-slate-500 uppercase text-center font-bold tracking-wider">Request key from author</span>
                          <a 
                            href="https://wa.me/917827087385?text=Hi%20Aryan%2C%20I%20am%20visiting%20your%20site%20and%20would%20love%20to%20request%20the%20access%20passcode%20to%20decrypt%20the%20chapters%20of%20Unscripted%20Love."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-center py-2.5 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500 text-white transition-all cursor-pointer font-bold tracking-wider uppercase text-[9px]"
                          >
                            Request Access Key
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 text-xs font-space-mono text-slate-300 text-center py-4">
                        <Unlock className="w-8 h-8 text-emerald-500 mx-auto animate-bounce" />
                        <div className="flex flex-col gap-1 mt-2">
                          <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Access Granted</span>
                          <p className="font-inter text-xs text-slate-400 leading-relaxed mt-1">
                            The manuscript has been decrypted. You can now preview all 5 completed chapter titles!
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setIsChaptersUnlocked(false);
                            if (typeof window !== "undefined") {
                              localStorage.setItem("aryan_unscripted_unlocked", "false");
                            }
                            setPasscodeInput("");
                          }}
                          className="mt-2 text-slate-500 hover:text-red-400 transition-colors uppercase tracking-wider text-[9px] font-bold hover:underline cursor-pointer"
                        >
                          Lock Manuscript
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {(activeChamberIdx === 0 || activeChamberIdx === 4 || activeChamberIdx === 5) && (
              <div className="py-16 text-left border-t border-white/10 mt-16 animate-fadeIn">
                <h3 className="font-space-mono text-xs text-slate-200 uppercase tracking-[0.2em] font-black mb-8 border-b border-white/10 pb-2 flex justify-between items-center">
                  <span>Community Suggestions</span>
                  <span className="text-slate-300 font-normal flex items-center gap-1">Leave a Recommendation</span>
                </h3>
                
                {/* Form and List Grid */}
                <div className="grid md:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Simple Suggestion Form */}
                  <div className="md:col-span-5 bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-4 shadow-sm" style={{ borderColor: `${activeChamber.color}20` }}>
                    <h4 className="font-orbitron text-sm font-black text-white uppercase tracking-wider">Suggest a Title</h4>
                    
                    <div className="flex flex-col gap-3 text-xs font-space-mono text-slate-300">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-400 font-bold uppercase tracking-wider">
                          {activeChamberIdx === 0 
                            ? "Movie or Series Name" 
                            : activeChamberIdx === 1 
                              ? "Story / Character Suggestion" 
                              : activeChamberIdx === 4 
                                ? "Book Title" 
                                : "Ambition / Goal Title"}
                        </label>
                        <input 
                          type="text" 
                          value={suggestTitle} 
                          onChange={(e) => setSuggestTitle(e.target.value)} 
                          placeholder={
                            activeChamberIdx === 0 
                              ? "e.g. Inception" 
                              : activeChamberIdx === 1
                                ? "e.g. A painter friend character"
                                : activeChamberIdx === 4 
                                  ? "e.g. Unscripted" 
                                  : "e.g. Build an AI Startup"
                          }
                          className="w-full bg-[#050508] border border-white/10 rounded-lg p-2.5 text-slate-200 outline-none focus:border-white/30"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-400 font-bold uppercase tracking-wider">Your Name</label>
                        <input 
                          type="text" 
                          value={suggestSender} 
                          onChange={(e) => setSuggestSender(e.target.value)} 
                          placeholder="e.g. Anonymous Friend"
                          className="w-full bg-[#050508] border border-white/10 rounded-lg p-2.5 text-slate-200 outline-none focus:border-white/30"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-400 font-bold uppercase tracking-wider">Your Rating (1 - 10)</label>
                        <input 
                          type="number" 
                          min="1"
                          max="10"
                          step="0.1"
                          value={suggestRating} 
                          onChange={(e) => setSuggestRating(e.target.value)} 
                          placeholder="e.g. 9.0 (Optional)"
                          className="w-full bg-[#050508] border border-white/10 rounded-lg p-2.5 text-slate-200 outline-none focus:border-white/30 font-orbitron font-bold"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-400 font-bold uppercase tracking-wider">Your Review / Thoughts</label>
                        <textarea 
                          value={suggestReview} 
                          onChange={(e) => setSuggestReview(e.target.value)} 
                          placeholder="e.g. A masterpiece of cinematography... (Optional)"
                          rows={3}
                          className="w-full bg-[#050508] border border-white/10 rounded-lg p-2.5 text-slate-200 outline-none focus:border-white/30 resize-none font-inter"
                        />
                      </div>
                      
                      <button
                        onClick={handleSuggestSubmit}
                        disabled={!suggestTitle.trim() || !suggestSender.trim()}
                        className="w-full mt-2 py-2.5 rounded-lg font-space-mono text-xs text-white disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                        style={{
                          backgroundColor: activeChamber.color,
                          boxShadow: `0 0 15px ${activeChamber.color}50`
                        }}
                      >
                        Submit Suggestion
                      </button>
                    </div>
                  </div>
                  
                  {/* Right Column: Suggestions List */}
                  <div className="md:col-span-7 flex flex-col gap-4">
                    <h4 className="font-orbitron text-sm font-black text-white uppercase tracking-wider mb-1">Recent Suggestions</h4>
                    {(
                      activeChamberIdx === 0 
                        ? suggestions 
                        : activeChamberIdx === 1
                          ? unscriptedSuggestions
                          : activeChamberIdx === 4 
                            ? bookSuggestions 
                            : futureSuggestions
                    ).length === 0 ? (
                      <div className="py-12 border border-dashed border-white/20 rounded-2xl text-center text-slate-500 font-inter italic text-sm bg-white/5">
                        No suggestions left yet. Be the first to recommend!
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
                        {(
                          activeChamberIdx === 0 
                            ? suggestions 
                            : activeChamberIdx === 1
                              ? unscriptedSuggestions
                              : activeChamberIdx === 4 
                                ? bookSuggestions 
                                : futureSuggestions
                        ).map((s, idx) => (
                          <div 
                            key={idx} 
                            className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col gap-3 transition-all hover:border-white/20 text-left"
                            style={{ borderColor: `${activeChamber.color}15` }}
                          >
                            <div className="flex items-start justify-between w-full gap-4">
                              <div className="flex flex-col gap-1 overflow-hidden">
                                <span className="font-orbitron text-sm font-black text-white">{s.title}</span>
                                <span className="font-space-mono text-[9px] uppercase tracking-wider font-bold" style={{ color: activeChamber.color }}>
                                  Suggested by: {s.sender}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {s.rating && (
                                  (() => {
                                    const style = getRatingStyle(s.rating);
                                    return (
                                      <div 
                                        className="font-orbitron text-[10px] font-black px-2 py-0.5 rounded border tracking-wider shadow-sm"
                                        style={{
                                          color: style.color,
                                          borderColor: style.border,
                                          backgroundColor: style.bg,
                                          boxShadow: style.glow
                                        }}
                                      >
                                        {style.text}
                                      </div>
                                    );
                                  })()
                                )}
                                <span className="font-space-mono text-[8px] text-slate-500">{s.date}</span>
                              </div>
                            </div>
                            {s.review && (
                              <p className="font-inter text-slate-300 text-xs italic leading-relaxed border-l-2 border-white/10 pl-3 py-0.5 bg-white/[0.01]">
                                "{s.review}"
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          STATE 3: LOCK MYSTERY OVERLAY MODAL (UNKNOWN FILE)
          ========================================== */}
      {showMystery && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl transition-all duration-300 animate-fadeIn"
          onClick={() => setShowMystery(false)}
        >
          <div
            className="relative max-w-md w-full bg-[#090d16]/95 border border-purple-500/20 p-8 rounded-2xl shadow-[0_0_50px_rgba(129,140,248,0.2)] flex flex-col gap-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowMystery(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 transition-colors cursor-pointer font-space-mono text-xs border border-white/5 bg-white/5 rounded-full w-8 h-8 flex items-center justify-center hover:border-purple-500/30"
            >
              ✕
            </button>
            <Lock className="w-8 h-8 text-[#818CF8] mx-auto animate-bounce mt-2" />
            <span className="font-space-mono text-[8px] text-[#818CF8] tracking-[0.25em] uppercase font-black">Encrypted Memory File</span>
            <div className="h-[1px] bg-white/10 w-12 mx-auto my-0.5" />
            <h3 className="font-serif text-lg italic text-white leading-relaxed">
              "Some stories are not ready to be told yet."
            </h3>
            <p className="font-mono text-[9px] text-slate-500 leading-relaxed uppercase tracking-wider">
              Node Locked. Awaiting future creations.
            </p>
          </div>
        </div>
      )}

      {/* Blog Post / Word Document Reader Modal */}
      {selectedBlogEntry && activeChamberIdx === 3 ? (
        /* Full-screen immersive Blog Reader */
        <div
          className="fixed inset-0 z-50 bg-white overflow-y-auto flex flex-col text-slate-800 animate-fadeIn"
          onClick={() => setSelectedBlogEntry(null)}
        >
          {/* Cover image banner */}
          <div className="w-full h-64 md:h-[40vh] shrink-0 overflow-hidden relative bg-slate-950">
            <EntryThumbnail code={selectedBlogEntry.thumbnailCode} imageFit={selectedBlogEntry.imageFit} imagePosition={selectedBlogEntry.imagePosition} imageZoom={selectedBlogEntry.imageZoom} />
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Close Button overlay */}
            <button
              onClick={() => setSelectedBlogEntry(null)}
              className="absolute top-6 left-6 md:left-12 bg-white/90 hover:bg-white text-slate-800 hover:text-black p-2.5 transition-all cursor-pointer font-bold shadow-lg rounded-full w-10 h-10 flex items-center justify-center border border-slate-200"
              title="Back to feed"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Immersive Reading Container */}
          <div className="max-w-3xl mx-auto w-full px-6 py-12 md:py-20 flex flex-col gap-6 text-left">
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-6">
              <span className="font-space-mono text-xs font-bold text-emerald-700 uppercase tracking-widest">
                {selectedBlogEntry.tag}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {selectedBlogEntry.title}
              </h1>
              <div className="flex items-center gap-2 text-slate-500 font-space-mono text-[11px] uppercase tracking-wider mt-2">
                <span>{selectedBlogEntry.date}</span>
                <span>•</span>
                <span>{Math.max(1, Math.ceil((selectedBlogEntry.content || selectedBlogEntry.description || "").split(/\s+/).length / 200))} min read</span>
              </div>
            </div>

            {/* Document Content */}
            <div 
              className="whitespace-pre-line text-base md:text-lg leading-[1.95] text-slate-800 font-serif select-text space-y-6"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {selectedBlogEntry.content || selectedBlogEntry.description}
            </div>
            
            {/* End indicator */}
            <div className="flex items-center justify-center gap-3 my-12">
              <div className="h-[1px] bg-slate-200 w-16" />
              <span className="font-serif italic text-slate-400 text-sm">Aryan</span>
              <div className="h-[1px] bg-slate-200 w-16" />
            </div>

            {/* Footer Back Button */}
            <div className="flex justify-start">
              <button
                onClick={() => setSelectedBlogEntry(null)}
                className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-space-mono text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to thoughts
              </button>
            </div>
          </div>
        </div>
      ) : selectedBlogEntry ? (
        /* Original reader modal for other chambers */
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl transition-all duration-300 animate-fadeIn"
          onClick={() => setSelectedBlogEntry(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 border border-white/10 p-1 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-slideUp max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              borderColor: `${activeChamber.color}30`
            }}
          >
            {/* Dark Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#090d16]/40">
              <div className="flex flex-col text-left gap-1">
                <span className="font-space-mono text-[9px] font-bold text-red-500 uppercase tracking-widest" style={{ color: activeChamber.color }}>
                  {selectedBlogEntry.tag}
                </span>
                <h4 className="font-orbitron text-sm font-black text-white uppercase tracking-wider">
                  Read Blog Entry
                </h4>
              </div>
              <button
                onClick={() => setSelectedBlogEntry(null)}
                className="text-slate-400 hover:text-white p-2 transition-colors cursor-pointer font-space-mono text-xs border border-white/5 bg-white/5 rounded-full w-8 h-8 flex items-center justify-center hover:border-red-500/30"
              >
                ✕
              </button>
            </div>

            {/* Word Sheet Content Container */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950 flex justify-center max-h-[70vh] scrollbar-thin">
              <div 
                className="w-full max-w-2xl bg-white text-slate-800 shadow-2xl rounded-xl p-8 md:p-12 flex flex-col gap-5 text-left border-l-[6px]"
                style={{ 
                  fontFamily: "'Georgia', serif",
                  borderColor: activeChamber.color
                }}
              >
                <div className="flex flex-col gap-2 border-b border-slate-100 pb-4">
                  <span className="font-space-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider">{selectedBlogEntry.tag}</span>
                  <h2 className="font-orbitron text-xl md:text-2xl font-black text-slate-900 uppercase tracking-wide leading-normal">
                    {selectedBlogEntry.title}
                  </h2>
                  <div className="text-slate-400 font-space-mono text-[8px] uppercase tracking-wider mt-0.5">{selectedBlogEntry.date}</div>
                </div>

                <div 
                  className="whitespace-pre-line text-sm md:text-base leading-[1.8] text-slate-700 font-normal mt-2 select-text"
                  style={{ wordBreak: "break-word" }}
                >
                  {selectedBlogEntry.content || selectedBlogEntry.description}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#090d16]/40 flex justify-end">
              <button
                onClick={() => setSelectedBlogEntry(null)}
                className="px-5 py-2 rounded-lg font-space-mono text-xs text-white transition-all cursor-pointer font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: activeChamber.color,
                  boxShadow: `0 0 15px ${activeChamber.color}50`
                }}
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* ==========================================
          ADD MOVIE/BOOK ENTRY MODAL
          ========================================== */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl transition-all duration-300 animate-fadeIn"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-[#090d16]/95 border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden max-h-[90vh]"
            style={{ 
              borderColor: `${activeChamber.color}30`,
              boxShadow: `0 0 30px ${activeChamber.color}35`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 shrink-0">
              <h3 className="font-orbitron text-sm font-black text-white uppercase tracking-widest">
                {editingEntry 
                  ? "Edit Review Entry" 
                  : activeChamberIdx === 0 
                    ? "Add Movie Entry" 
                    : activeChamberIdx === 1 
                      ? "Add Story Entry" 
                      : activeChamberIdx === 3
                        ? "Add Blog Post"
                        : activeChamberIdx === 4 
                          ? "Add Book Entry" 
                          : "Add Future Ambition"}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-2 transition-colors cursor-pointer font-space-mono text-xs border border-white/5 bg-white/5 rounded-full w-8 h-8 flex items-center justify-center hover:border-red-500/30"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Fields Body */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 text-xs font-space-mono text-slate-300 scrollbar-thin">
              {/* Title input */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-slate-400 font-bold uppercase tracking-wider">
                  {activeChamberIdx === 0 
                    ? "Movie Title" 
                    : activeChamberIdx === 1 
                      ? "Story Title" 
                      : activeChamberIdx === 3
                        ? "Blog Title"
                        : activeChamberIdx === 4 
                          ? "Book Title" 
                          : "Ambition Title"}
                </label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  placeholder={
                    activeChamberIdx === 0 
                      ? "e.g. Inception" 
                      : activeChamberIdx === 1
                        ? "e.g. Chapter 9 Sketching"
                        : activeChamberIdx === 3
                          ? "e.g. Building an interactive planetarium..."
                          : activeChamberIdx === 4 
                            ? "e.g. Unscripted" 
                            : "e.g. Build an AI Startup"
                  }
                  className="w-full bg-[#050508] border border-white/10 rounded-lg p-2.5 text-slate-200 outline-none focus:border-white/30"
                />
              </div>

              {/* Theme/Category select */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-slate-400 font-bold uppercase tracking-wider">Category</label>
                {activeChamberIdx === 3 ? (
                  <input 
                    type="text" 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="e.g. Life, Tech, Philosophy, Musings..."
                    className="w-full bg-[#050508] border border-white/10 rounded-lg p-2.5 text-slate-200 outline-none focus:border-white/30"
                  />
                ) : (
                  <select 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#050508] border border-white/10 rounded-lg p-2.5 text-slate-200 outline-none focus:border-white/30 cursor-pointer"
                  >
                    {activeChamber.themes.map((th) => (
                      <option key={th.name} value={th.name}>{th.name}</option>
                    ))}
                  </select>
                )}
              </div>

              {activeChamberIdx !== 3 ? (
                <div className="grid grid-cols-2 gap-4 text-left">
                  {/* Date input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-400 font-bold uppercase tracking-wider">Date Logged</label>
                    <input 
                      type="date" 
                      value={newDate} 
                      onChange={(e) => setNewDate(e.target.value)} 
                      className="w-full bg-[#050508] border border-white/10 rounded-lg p-2.5 text-slate-200 outline-none focus:border-white/30"
                    />
                  </div>

                  {/* Rating input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-400 font-bold uppercase tracking-wider">
                      {activeChamberIdx === 5 
                        ? "Priority Level" 
                        : activeChamberIdx === 1 
                          ? "Excitement / Impact" 
                          : "Rating"}
                    </label>
                    {activeChamberIdx === 5 ? (
                      <div className="flex items-center gap-2 h-10 mt-1">
                        <button
                          type="button"
                          onClick={() => setNewRating(1)}
                          className={`px-3 py-1.5 rounded-lg border font-bold text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                            newRating === 1
                              ? "border-green-500 bg-green-500/20 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.3)] font-black"
                              : "border-white/10 bg-transparent text-slate-400 hover:text-white"
                          }`}
                        >
                          Low
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewRating(3)}
                          className={`px-3 py-1.5 rounded-lg border font-bold text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                            newRating === 3
                              ? "border-yellow-500 bg-yellow-500/20 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.3)] font-black"
                              : "border-white/10 bg-transparent text-slate-400 hover:text-white"
                          }`}
                        >
                          Medium
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewRating(5)}
                          className={`px-3 py-1.5 rounded-lg border font-bold text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                            newRating === 5
                              ? "border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.3)] font-black"
                              : "border-white/10 bg-transparent text-slate-400 hover:text-white"
                          }`}
                        >
                          High
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 mt-1.5">
                        <input
                          type="number"
                          min="1"
                          max="10"
                          step="0.1"
                          value={newRating}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            if (!isNaN(val)) {
                              setNewRating(Math.max(1, Math.min(10, val)));
                            } else {
                              setNewRating("");
                            }
                          }}
                          placeholder="e.g. 9.5"
                          className="w-24 bg-[#050508] border border-white/10 rounded-lg p-2 text-slate-200 outline-none focus:border-white/30 font-orbitron font-bold text-center"
                        />
                        {newRating !== "" && (() => {
                          const style = getRatingStyle(newRating);
                          return (
                            <div className="flex items-center gap-2">
                              <div 
                                className="font-orbitron text-xs font-black px-2.5 py-0.5 rounded border tracking-wider shadow-sm"
                                style={{
                                  color: style.color,
                                  borderColor: style.border,
                                  backgroundColor: style.bg,
                                  boxShadow: style.glow
                                }}
                              >
                                {style.text}
                              </div>
                              <span className="font-space-mono text-[8px] text-slate-400 uppercase tracking-widest">
                                — {style.label}
                              </span>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-slate-400 font-bold uppercase tracking-wider">Date Logged</label>
                  <input 
                    type="date" 
                    value={newDate} 
                    onChange={(e) => setNewDate(e.target.value)} 
                    className="w-full bg-[#050508] border border-white/10 rounded-lg p-2.5 text-slate-200 outline-none focus:border-white/30"
                  />
                </div>
              )}

              {activeChamberIdx !== 3 ? (
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-slate-400 font-bold uppercase tracking-wider">
                    {activeChamberIdx === 0 
                      ? "Movie Reflection" 
                      : activeChamberIdx === 1 
                        ? "Story Fragment / Note" 
                        : activeChamberIdx === 4 
                          ? "Book Reflection" 
                          : "Ambition Roadmap"}
                  </label>
                  <textarea 
                    value={newDescription} 
                    onChange={(e) => setNewDescription(e.target.value)} 
                    placeholder={
                      activeChamberIdx === 0 
                        ? "Write your thoughts about the movie..." 
                        : activeChamberIdx === 1 
                          ? "Write drafts, outline, or character concepts..." 
                          : activeChamberIdx === 4 
                            ? "Write the key takeaways and thoughts from the book..." 
                            : "Write details, milestones, and roadmaps for this goal..."
                    }
                    rows={4}
                    className="w-full bg-[#050508] border border-white/10 rounded-lg p-2.5 text-slate-200 outline-none font-inter text-sm focus:border-white/30"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-slate-400 font-bold uppercase tracking-wider">Blog Document / Word Editor</label>
                  <textarea 
                    value={newBlogContent} 
                    onChange={(e) => setNewBlogContent(e.target.value)} 
                    placeholder="Type your blog post or musings here... (e.g. This week I built a procedural starfield...)"
                    rows={12}
                    className="w-full bg-white text-slate-800 font-serif p-6 border border-slate-200 shadow-inner rounded-xl resize-y outline-none leading-relaxed text-sm"
                    style={{ fontFamily: "'Georgia', serif", borderLeft: "3px solid #10B981" }}
                  />
                </div>
              )}

              {/* Image Input Options */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-slate-400 font-bold uppercase tracking-wider">
                  {activeChamberIdx === 0 
                    ? "Movie Poster / Image" 
                    : activeChamberIdx === 1 
                      ? "Story Illustration / Image" 
                      : activeChamberIdx === 3
                        ? "Blog Cover Image"
                        : activeChamberIdx === 4 
                          ? "Book Cover / Image" 
                          : "Ambition / Goal Graphic"}
                </label>
                <div className="flex gap-2">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    id="entry-img-file"
                    className="hidden"
                  />
                  <label 
                    htmlFor="entry-img-file" 
                    className="px-4 py-2 border border-white/10 bg-black/40 hover:bg-black/60 rounded-lg text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-center flex-1 text-center"
                  >
                    Upload Image
                  </label>
                  <div className="text-slate-500 flex items-center justify-center font-bold px-2">OR</div>
                  <input 
                    type="text" 
                    value={newImageUrl} 
                    onChange={(e) => {
                      setNewImageUrl(e.target.value);
                      setNewImage(e.target.value);
                    }} 
                    placeholder="Paste Image URL"
                    className="bg-[#050508] border border-white/10 rounded-lg p-2 text-slate-200 outline-none flex-1 focus:border-white/30"
                  />
                </div>
                
                {/* Image preview */}
                {newImage && (
                  <div className="mt-2 w-full h-24 rounded-lg overflow-hidden border border-white/10 bg-black flex items-center justify-center relative group">
                    <img 
                      src={newImage} 
                      alt="Preview" 
                      className="w-full h-full" 
                      style={{
                        objectFit: activeChamberIdx === 3 ? newBlogImageFit : "cover",
                        objectPosition: activeChamberIdx === 3 ? `center ${newBlogImagePos}%` : "center",
                        transform: activeChamberIdx === 3 ? `scale(${newBlogImageZoom / 100})` : "none",
                        transformOrigin: "center center"
                      }}
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        setNewImage("");
                        setNewImageUrl("");
                      }}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-600 transition-colors text-xs z-30"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Crop & Zoom Alignment sliders */}
                {newImage && activeChamberIdx === 3 && (
                  <div className="flex flex-col gap-3 p-3 bg-white/5 border border-white/5 rounded-xl mt-2 text-left">
                    <span className="font-space-mono text-[9px] text-slate-400 uppercase tracking-widest font-black">Image Layout & Crop Options</span>
                    
                    {/* Fit Mode Toggle */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Size Fit:</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setNewBlogImageFit("cover")}
                          className={`px-3 py-1 text-[9px] font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                            newBlogImageFit === "cover" 
                              ? "border-emerald-500 bg-emerald-500/20 text-white" 
                              : "border-white/10 bg-transparent text-slate-400 hover:text-white"
                          }`}
                        >
                          Cover (Fill)
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewBlogImageFit("contain")}
                          className={`px-3 py-1 text-[9px] font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                            newBlogImageFit === "contain" 
                              ? "border-emerald-500 bg-emerald-500/20 text-white" 
                              : "border-white/10 bg-transparent text-slate-400 hover:text-white"
                          }`}
                        >
                          Contain (Fit)
                        </button>
                      </div>
                    </div>

                    {/* Vertical Crop Alignment Slider */}
                    {newBlogImageFit === "cover" && (
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          <span>Vertical Shift (Crop Alignment):</span>
                          <span className="text-emerald-400 font-space-mono">{newBlogImagePos}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={newBlogImagePos}
                          onChange={(e) => setNewBlogImagePos(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-ew-resize bg-black/40 h-1 rounded-full outline-none"
                        />
                      </div>
                    )}

                    {/* Zoom / Scale Slider */}
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>Crop Zoom:</span>
                        <span className="text-emerald-400 font-space-mono">{newBlogImageZoom}%</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="200"
                        value={newBlogImageZoom}
                        onChange={(e) => setNewBlogImageZoom(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-ew-resize bg-black/40 h-1 rounded-full outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#090d16]/40 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-lg font-space-mono text-xs border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEntry}
                disabled={!newTitle.trim() || (activeChamberIdx === 3 ? !newBlogContent.trim() : !newDescription.trim())}
                className="px-4 py-2 rounded-lg font-space-mono text-xs text-white disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                style={{
                  backgroundColor: activeChamber.color,
                  boxShadow: `0 0 15px ${activeChamber.color}60`
                }}
              >
                {editingEntry 
                  ? "Save Changes" 
                  : activeChamberIdx === 0 
                    ? "Add Movie" 
                    : activeChamberIdx === 1 
                      ? "Add Story" 
                      : activeChamberIdx === 3
                        ? "Publish Blog"
                        : activeChamberIdx === 4 
                          ? "Add Book" 
                          : "Add Ambition"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// Inline CSS style injection helper for animations
function styleBlock() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes floatChamberItem {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-7px) rotate(0.8deg); }
      }
      .studio-item-float {
        animation: floatChamberItem 5.5s infinite ease-in-out;
      }
      
      @keyframes floatTextAnim {
        0%, 100% { transform: translate(0, 0); opacity: 0.75; }
        33% { transform: translate(-2px, -3px); opacity: 0.95; }
        66% { transform: translate(2px, 3px); opacity: 0.6; }
      }
      .float-text {
        animation: floatTextAnim 6s infinite ease-in-out;
      }

      @keyframes spin-clockwise {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .animate-spin-clockwise {
        animation: spin-clockwise 15s linear infinite;
      }

      @keyframes spin-counter {
        from { transform: rotate(0deg); }
        to { transform: rotate(-360deg); }
      }
      .animate-spin-counter {
        animation: spin-counter 12s linear infinite;
      }

      @keyframes scroll-code {
        0% { transform: translateY(0px); }
        100% { transform: translateY(-40px); }
      }
      .animate-scroll-code {
        animation: scroll-code 12s linear infinite;
      }

      @keyframes float-paper-1 {
        0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translate(15px, -45px) rotate(45deg); opacity: 0; }
      }
      .animate-float-paper-1 {
        animation: float-paper-1 6s ease-in-out infinite;
      }

      @keyframes float-paper-2 {
        0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
        15% { opacity: 1; }
        85% { opacity: 1; }
        100% { transform: translate(-20px, -35px) rotate(-35deg); opacity: 0; }
      }
      .animate-float-paper-2 {
        animation: float-paper-2 7s ease-in-out infinite;
      }

      @keyframes pulse-light {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.45; }
      }
      .animate-pulse-light {
        animation: pulse-light 4s ease-in-out infinite;
      }

      @keyframes rotate-vortex {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .animate-rotate-vortex {
        animation: rotate-vortex 6s linear infinite;
      }

      @keyframes data-stream-flow {
        from { stroke-dashoffset: 50; }
        to { stroke-dashoffset: 0; }
      }
      .animate-data-stream {
        stroke-dasharray: 8 6;
        animation: data-stream-flow 3s linear infinite;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .animate-fadeIn {
        animation: fadeIn 0.4s ease-out forwards;
      }

      @keyframes panelFadeIn {
        from { opacity: 0; transform: translate(-50%, -48%) scale(0.95); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }
      .animate-panel-fadeIn {
        animation: panelFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    ` }} />
  );
}
