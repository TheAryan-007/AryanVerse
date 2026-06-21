"use client";

/**
 * Journey Archive Environment — AryanVerse
 * 
 * A story-driven cinematic scroll timeline for Chapter 1 (Foundations) and Chapter 2 (The Shift).
 * Alternate-aligns moments on desktop (text left, SVGs right, and vice versa)
 * and collapses to a single-column stack on mobile.
 * 
 * Features smooth continuous CSS idle animations on abstract vector illustrations,
 * dynamic image fallback loaders, and staggered GSAP ScrollTrigger transitions.
 */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Twinkle stars + slow drifting space particles canvas backdrop
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

    const particlesCount = 80;
    const particles = [];
    for (let i = 0; i < particlesCount; i++) {
      const isFloating = Math.random() > 0.4;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.6 + 0.15,
        speedX: isFloating ? (Math.random() - 0.5) * 0.15 : 0,
        speedY: isFloating ? -Math.random() * 0.15 - 0.05 : 0,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
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
        if (p.alpha > 0.75) {
          p.alpha = 0.75;
          p.factor = -1;
        } else if (p.alpha < 0.15) {
          p.alpha = 0.15;
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
      className="absolute inset-0 w-full h-full z-[-2] pointer-events-none opacity-40"
    />
  );
}

// ==========================================
// CHAPTER 1 ILLUSTRATIONS
// ==========================================

// 1. Chapter Title Illustration - Sunrise glow
function TitleIllustration() {
  return (
    <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4"/>
            <stop offset="50%" stopColor="#7B2FBE" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="#050508" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="url(#sunGlow)" className="animate-[breathe_6s_infinite]"/>
        <circle cx="50" cy="50" r="28" stroke="#3B82F6" strokeWidth="0.25" strokeOpacity="0.25" strokeDasharray="2,2" className="animate-[spin_60s_linear_infinite]"/>
        <circle cx="50" cy="50" r="35" stroke="#A855F7" strokeWidth="0.25" strokeOpacity="0.4" className="animate-[spin_40s_linear_infinite_reverse]"/>
        <circle cx="50" cy="50" r="16" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.15"/>
        <circle cx="50" cy="50" r="3" fill="#fff" className="animate-ping" style={{ animationDuration: "4s" }}/>
        <circle cx="50" cy="50" r="2" fill="#A855F7"/>
      </svg>
    </div>
  );
}

// 2. Meerut Skyline Illustration
function MeerutIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0d0d1a]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="meerutSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#4c1d95" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.1"/>
          </linearGradient>
          <linearGradient id="homeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0f172a"/>
            <stop offset="100%" stopColor="#1e293b"/>
          </linearGradient>
        </defs>
        <rect width="100" height="80" rx="4" fill="url(#meerutSky)"/>
        
        <circle cx="15" cy="18" r="0.4" fill="#fff" className="animate-pulse" style={{ animationDuration: "2s" }}/>
        <circle cx="55" cy="10" r="0.6" fill="#fff" className="animate-pulse" style={{ animationDuration: "3s" }}/>
        <circle cx="80" cy="20" r="0.5" fill="#fff" className="animate-pulse" style={{ animationDuration: "4s" }}/>
        <circle cx="35" cy="30" r="0.4" fill="#fff" className="animate-pulse" style={{ animationDuration: "5.5s" }}/>
        
        <path d="M10 25 Q15 22 20 25 T30 25" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeLinecap="round" className="animate-[starsDrift_40s_linear_infinite]" style={{ animationDelay: "-5s" }}/>
        <path d="M60 15 Q68 11 76 15 T88 15" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" strokeLinecap="round" className="animate-[starsDrift_60s_linear_infinite]" style={{ animationDelay: "-20s" }}/>
        
        <path d="M-5 80 L5 68 L18 68 L24 60 L32 60 L38 68 L50 68 L56 60 L66 60 L72 68 L85 68 L92 58 L105 58 L105 80 Z" fill="url(#homeGrad)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
        <path d="M8 80 L14 74 L25 74 L30 80 Z" fill="#090d16" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
        <path d="M45 80 L52 72 L68 72 L75 80 Z" fill="#0a0f1d" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
        
        <rect x="28" y="65" width="3" height="4" fill="#f59e0b" fillOpacity="0.7" className="animate-pulse" style={{ animationDuration: "4s" }}/>
        <rect x="60" y="66" width="4" height="4" fill="#f59e0b" fillOpacity="0.8" className="animate-pulse" style={{ animationDuration: "6s" }}/>
        <polygon points="12,76 15,76 15,78 12,78" fill="#f59e0b" fillOpacity="0.6"/>
        <polygon points="56,76 59,76 59,78 56,78" fill="#f59e0b" fillOpacity="0.5"/>
        
        <path d="M0 0 L5 2 L1.5 3.5 Z" fill="rgba(255,255,255,0.4)" className="animate-[paperPlane_15s_linear_infinite]"/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 3. Residential Society (A New World) Illustration
function NewWorldIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0d0d1a]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rajasthanSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#082f49" stopOpacity="0.8"/>
            <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#311042" stopOpacity="0.1"/>
          </linearGradient>
          <linearGradient id="buildingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#020617"/>
            <stop offset="100%" stopColor="#0f172a"/>
          </linearGradient>
        </defs>
        <rect width="100" height="80" rx="4" fill="url(#rajasthanSky)"/>
        
        <circle cx="25" cy="15" r="0.5" fill="#fff" className="animate-pulse" style={{ animationDuration: "3.5s" }}/>
        <circle cx="68" cy="22" r="0.4" fill="#fff" className="animate-pulse" style={{ animationDuration: "2.5s" }}/>
        
        <rect x="8" y="28" width="18" height="52" rx="1" fill="url(#buildingGrad)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
        <rect x="34" y="16" width="22" height="64" rx="1" fill="url(#buildingGrad)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
        <rect x="64" y="34" width="20" height="46" rx="1" fill="url(#buildingGrad)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
        
        {/* Colorful glowing windows */}
        <rect x="38" y="22" width="3" height="3" fill="#3B82F6" fillOpacity="0.8" className="animate-pulse" style={{ animationDuration: "5s" }}/>
        <rect x="48" y="22" width="3" height="3" fill="#FFA116" fillOpacity="0.6"/>
        <rect x="38" y="30" width="3" height="3" fill="#10A37F" fillOpacity="0.7" className="animate-pulse" style={{ animationDuration: "4s" }}/>
        <rect x="48" y="38" width="3" height="3" fill="#3B82F6" fillOpacity="0.75"/>
        <rect x="38" y="46" width="3" height="3" fill="#FFA116" fillOpacity="0.8" className="animate-pulse" style={{ animationDuration: "3s" }}/>
        <rect x="48" y="54" width="3" height="3" fill="#10A37F" fillOpacity="0.6"/>
        <rect x="38" y="62" width="3" height="3" fill="#3B82F6" fillOpacity="0.8"/>
        
        <rect x="12" y="34" width="3" height="3" fill="#FFA116" fillOpacity="0.8" className="animate-pulse" style={{ animationDuration: "2.8s" }}/>
        <rect x="20" y="42" width="3" height="3" fill="#10A37F" fillOpacity="0.7"/>
        <rect x="12" y="50" width="3" height="3" fill="#3B82F6" fillOpacity="0.9" className="animate-pulse" style={{ animationDuration: "4.5s" }}/>
        <rect x="20" y="58" width="3" height="3" fill="#FFA116" fillOpacity="0.6"/>
        
        <rect x="68" y="40" width="3" height="3" fill="#3B82F6" fillOpacity="0.75" className="animate-pulse" style={{ animationDuration: "3.2s" }}/>
        <rect x="77" y="48" width="3" height="3" fill="#FFA116" fillOpacity="0.8"/>
        <rect x="68" y="56" width="3" height="3" fill="#10A37F" fillOpacity="0.7" className="animate-pulse" style={{ animationDuration: "5.5s" }}/>
        <rect x="77" y="64" width="3" height="3" fill="#3B82F6" fillOpacity="0.6"/>

        <path d="M85 10 A8 8 0 1 0 93 18 A9 9 0 1 1 85 10 Z" fill="#e2e8f0" fillOpacity="0.7" className="animate-[float_8s_infinite]"/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 4. MDVM School Image fallback
function SchoolImageOrFallback() {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0d0d1a]/45 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
        <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7B2FBE" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.05"/>
            </linearGradient>
            <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a1a2e"/>
              <stop offset="100%" stopColor="#252545"/>
            </linearGradient>
          </defs>
          
          <rect width="100" height="80" rx="6" fill="url(#skyGrad)"/>
          <path d="M-10 80 Q25 45 60 80 T110 80" fill="#050508"/>
          
          <circle cx="20" cy="15" r="0.5" fill="#fff" className="animate-pulse" style={{ animationDuration: "3s" }}/>
          <circle cx="75" cy="25" r="0.5" fill="#fff" className="animate-pulse" style={{ animationDuration: "5s" }}/>
          <circle cx="45" cy="10" r="0.5" fill="#fff" className="animate-pulse" style={{ animationDuration: "4s" }}/>
          
          <rect x="25" y="40" width="50" height="30" rx="2" fill="url(#wallGrad)" stroke="#A855F7" strokeWidth="0.5"/>
          <rect x="42" y="20" width="16" height="20" fill="url(#wallGrad)" stroke="#A855F7" strokeWidth="0.5"/>
          <path d="M40 20 L50 8 L60 20 Z" fill="#7B2FBE" stroke="#A855F7" strokeWidth="0.5"/>
          <circle cx="50" cy="15" r="2.5" fill="#0d0d1a" stroke="#A855F7" strokeWidth="0.5"/>
          <line x1="50" y1="15" x2="50" y2="13.5" stroke="#fff" strokeWidth="0.4"/>
          <line x1="50" y1="15" x2="51.5" y2="15" stroke="#fff" strokeWidth="0.4"/>
          
          <rect x="30" y="46" width="6" height="8" rx="1" fill="#FFA116" fillOpacity="0.75" className="animate-pulse" style={{ animationDelay: "0.5s" }}/>
          <rect x="40" y="46" width="6" height="8" rx="1" fill="#FFA116" fillOpacity="0.75" className="animate-pulse" style={{ animationDelay: "1.5s" }}/>
          <rect x="54" y="46" width="6" height="8" rx="1" fill="#FFA116" fillOpacity="0.75" className="animate-pulse" style={{ animationDelay: "2.5s" }}/>
          <rect x="64" y="46" width="6" height="8" rx="1" fill="#FFA116" fillOpacity="0.75" className="animate-pulse" style={{ animationDelay: "3.5s" }}/>
          
          <path d="M46 70 L46 60 Q46 58 48 58 L52 58 Q54 58 54 60 L54 70 Z" fill="#0a0a14" stroke="#A855F7" strokeWidth="0.5"/>
          <line x1="50" y1="8" x2="50" y2="2" stroke="#fff" strokeWidth="0.5"/>
          <path d="M50 2 L56 4 L50 6 Z" fill="#fb923c"/>
          
          <path d="M46 70 L20 80 H80 L54 70 Z" fill="#070710" fillOpacity="0.8"/>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#050508]/15 to-[#050508]/50 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/10 shadow-lg overflow-hidden relative group">
      <img
        src="/journey/mdvm-school.jpg"
        alt="MDVM School Mohan Lal Dayal Vinay Mandir"
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        onError={() => setImgFailed(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
      <span className="absolute bottom-4 left-4 font-space-mono text-[9px] text-[#A855F7] tracking-wider uppercase bg-black/60 px-2.5 py-1 rounded border border-[#A855F7]/30">
        Primary School
      </span>
    </div>
  );
}

// 5. The Stage (Microphone & Confetti) Illustration
function StageIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0d0d1a]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="stageSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#311042" stopOpacity="0.9"/>
            <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#090d16" stopOpacity="0.2"/>
          </linearGradient>
          <radialGradient id="spotlight" cx="50%" cy="100%" r="70%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.45"/>
            <stop offset="60%" stopColor="#7B2FBE" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        <rect width="100" height="80" rx="4" fill="url(#stageSky)"/>
        <polygon points="50,0 20,80 80,80" fill="url(#spotlight)" opacity="0.8"/>
        
        <ellipse cx="50" cy="74" rx="35" ry="6" fill="#090914" stroke="#A855F7" strokeWidth="0.5"/>
        <ellipse cx="50" cy="74" rx="25" ry="4" fill="#0f0f24" opacity="0.6"/>
        
        <ellipse cx="50" cy="70" rx="4" ry="1.2" fill="#475569" stroke="#94a3b8" strokeWidth="0.3"/>
        <line x1="50" y1="70" x2="50" y2="35" stroke="#94a3b8" strokeWidth="0.6"/>
        <circle cx="50" cy="35" r="0.9" fill="#64748b"/>
        <line x1="50" y1="35" x2="54" y2="30" stroke="#94a3b8" strokeWidth="0.5"/>
        <circle cx="54" cy="30" r="0.7" fill="#334155"/>
        <path d="M53.5 30.5 L56 27 Z" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="56.5" cy="26.5" r="1.4" fill="#94a3b8" className="animate-pulse" style={{ animationDuration: "2s" }}/>
        
        <path d="M20 20 L21 23 L24 23 L22 25 L23 28 L20 26 L17 28 L18 25 L16 23 L19 23 Z" fill="#FFA116" fillOpacity="0.6" className="animate-[float_5s_infinite]" style={{ transformOrigin: "20px 24px" }}/>
        <path d="M80 30 L80.8 32 L83 32 L81.5 33.5 L82 35.5 L80 34 H78 L78.5 33.5 L78 32 L79.2 32 Z" fill="#4ade80" fillOpacity="0.5" className="animate-[float_7s_infinite]" style={{ transformOrigin: "80px 32px", animationDelay: "1s" }}/>
        
        <circle cx="35" cy="40" r="1.2" fill="#3B82F6" fillOpacity="0.7" className="animate-[float_6s_infinite]" style={{ animationDelay: "2s" }}/>
        <circle cx="65" cy="35" r="1" fill="#A855F7" fillOpacity="0.7" className="animate-[float_8s_infinite]" style={{ animationDelay: "0.5s" }}/>
        <circle cx="45" cy="25" r="0.8" fill="#F7DF1E" fillOpacity="0.8" className="animate-[float_4s_infinite]" style={{ animationDelay: "1.5s" }}/>
        
        <path d="M25 45 C25 43.5 26.5 43.5 26.5 45 C26.5 46.5 25 46.5 25 45 M26.5 45 L26.5 38 L31 40 L31 43" stroke="#A855F7" strokeWidth="0.6" fill="none" strokeLinecap="round" className="animate-[float_7s_infinite]" style={{ animationDelay: "3s" }}/>
        <path d="M72 50 C72 48.5 73.5 48.5 73.5 50 C73.5 51.5 72 51.5 72 50 M73.5 50 L73.5 43 L78 45 L78 48" stroke="#3B82F6" strokeWidth="0.6" fill="none" strokeLinecap="round" className="animate-[float_9s_infinite]" style={{ animationDelay: "1s" }}/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 6. End of Era (Winding Path) Illustration
function EndEraIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0d0d1a]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="endSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.8"/>
            <stop offset="60%" stopColor="#311042" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#090d16" stopOpacity="0.1"/>
          </linearGradient>
          <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0.05"/>
          </linearGradient>
        </defs>
        
        <rect width="100" height="80" rx="4" fill="url(#endSky)"/>
        
        <circle cx="30" cy="15" r="0.4" fill="#fff" className="animate-pulse" style={{ animationDuration: "3s" }}/>
        <circle cx="70" cy="12" r="0.5" fill="#fff" className="animate-pulse" style={{ animationDuration: "4.5s" }}/>
        
        <rect x="42" y="38" width="4" height="12" fill="#020617" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3"/>
        <rect x="48" y="32" width="5" height="18" fill="#090d16" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3"/>
        <rect x="55" y="35" width="4" height="15" fill="#020617" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3"/>
        
        <path d="M50 50 C50 50 48 55 45 60 C42 65 52 70 50 80" stroke="url(#roadGrad)" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M50 50 C50 50 48 55 45 60 C42 65 52 70 50 80" stroke="#3B82F6" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1,2" fill="none" opacity="0.6"/>
        
        <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
        <circle cx="50" cy="48" r="8" fill="#A855F7" fillOpacity="0.15" className="blur-sm animate-[pulse_5s_infinite]"/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// ==========================================
// CHAPTER 2 ILLUSTRATIONS
// ==========================================

// 1. Chapter 2 Title Illustration - Transition Portal
function Chapter2TitleIllustration() {
  return (
    <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="portalGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4"/>
          </linearGradient>
          <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#050508" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#portalGlow)" className="animate-[breathe_5s_infinite]"/>
        <circle cx="50" cy="50" r="30" stroke="url(#portalGrad)" strokeWidth="0.5" strokeDasharray="3,3" className="animate-[spin_30s_linear_infinite]"/>
        <circle cx="50" cy="50" r="22" stroke="#3B82F6" strokeWidth="0.3" strokeOpacity="0.6" className="animate-[spin_20s_linear_infinite_reverse]"/>
        <circle cx="50" cy="50" r="14" stroke="#A855F7" strokeWidth="0.5" strokeOpacity="0.8"/>
        <circle cx="50" cy="36" r="1.5" fill="#3B82F6" className="animate-ping" style={{ animationDuration: "3s" }}/>
        <circle cx="50" cy="64" r="1.5" fill="#A855F7" className="animate-ping" style={{ animationDuration: "3.5s" }}/>
      </svg>
    </div>
  );
}

// 2. Doorway / Unfamiliar Room (Moment 1)
function FamilyDoorwayIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0d0d1a]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="doorSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0.4"/>
          </linearGradient>
          <linearGradient id="doorLight" x1="0" y1="0" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect width="100" height="80" rx="4" fill="url(#doorSky)"/>
        
        <rect x="35" y="15" width="30" height="65" fill="#090d16" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
        <line x1="35" y1="15" x2="20" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
        <line x1="65" y1="15" x2="80" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>

        <polygon points="35,15 58,18 58,80 35,80" fill="#0c1122" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
        <polygon points="58,18 65,15 65,80 58,80" fill="url(#doorLight)"/>
        
        <circle cx="54" cy="48" r="0.8" fill="#94a3b8"/>
        
        <circle cx="61" cy="30" r="0.4" fill="#fb923c" fillOpacity="0.6" className="animate-[float_5s_infinite]"/>
        <circle cx="59" cy="45" r="0.3" fill="#fb923c" fillOpacity="0.5" className="animate-[float_7s_infinite]" style={{ animationDelay: "1.5s" }}/>
        <circle cx="62" cy="60" r="0.5" fill="#fb923c" fillOpacity="0.4" className="animate-[float_6s_infinite]" style={{ animationDelay: "3s" }}/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 3. Disorientation Labyrinth (Moment 2)
function DisorientationIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0d0d1a]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="disSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#082f49" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#090d16" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
        <rect width="100" height="80" rx="4" fill="url(#disSky)"/>

        <path d="M15 15 H85 V65 H50 V45 H30 V30 H65 V55" stroke="#334155" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M25 25 H75 V55 H40 V35 H55" stroke="#475569" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M5 40 H20 V65 H10" stroke="#1e293b" strokeWidth="0.8" fill="none"/>
        <path d="M95 40 H80 V15 H90" stroke="#1e293b" strokeWidth="0.8" fill="none"/>

        <circle cx="50" cy="45" r="1.5" fill="#3B82F6" className="animate-[breathe_4s_infinite]"/>
        <circle cx="50" cy="45" r="3.5" stroke="#3B82F6" strokeWidth="0.3" strokeOpacity="0.4" className="animate-ping" style={{ animationDuration: "4s" }}/>

        <rect x="22" y="55" width="2" height="2" fill="#0284c7" fillOpacity="0.6" className="animate-[float_6s_infinite]"/>
        <rect x="78" y="22" width="1.5" height="1.5" fill="#3B82F6" fillOpacity="0.5" className="animate-[float_8s_infinite]" style={{ animationDelay: "2s" }}/>
        <polygon points="12,22 14,25 10,25" fill="#64748b" opacity="0.4" className="animate-[float_7s_infinite]"/>
        <polygon points="85,50 87,53 83,53" fill="#64748b" opacity="0.4" className="animate-[float_5s_infinite]" style={{ animationDelay: "1s" }}/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 4. High Jumper Silhouette (Moment 3)
function HighJumpIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0d0d1a]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="jumpSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2e1065" stopOpacity="0.8"/>
            <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.1"/>
          </linearGradient>
          <linearGradient id="curveGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1"/>
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0.8"/>
          </linearGradient>
        </defs>
        <rect width="100" height="80" rx="4" fill="url(#jumpSky)"/>

        <line x1="0" y1="70" x2="100" y2="70" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>

        <line x1="30" y1="70" x2="30" y2="35" stroke="#475569" strokeWidth="0.8"/>
        <line x1="70" y1="70" x2="70" y2="35" stroke="#475569" strokeWidth="0.8"/>
        
        <line x1="28" y1="38" x2="72" y2="38" stroke="#fb923c" strokeWidth="0.6" strokeDasharray="1,1" className="animate-[pulse_1.5s_infinite]"/>

        <path d="M15 70 Q35 15 50 30 T85 70" stroke="url(#curveGrad)" strokeWidth="1" strokeLinecap="round" fill="none" strokeDasharray="2,2"/>

        <g className="animate-[float_4s_infinite]" style={{ transformOrigin: "50px 30px" }}>
          <path d="M42 35 C45 28 53 28 56 34" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
          <circle cx="40" cy="36" r="1.5" fill="#fff"/>
          <path d="M43 36.5 L46 38" stroke="#cbd5e1" strokeWidth="0.8" strokeLinecap="round"/>
          <path d="M56 34 L62 42" stroke="#cbd5e1" strokeWidth="1.6" strokeLinecap="round"/>
        </g>

        <line x1="38" y1="25" x2="33" y2="28" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
        <line x1="42" y1="21" x2="38" y2="23" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 5. Nationals High Jump (Moment 4)
function HighJumpImageOrFallback() {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0d0d1a]/45 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
        <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="stadiumSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#78350f" stopOpacity="0.4"/>
              <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#050508" stopOpacity="0.05"/>
            </linearGradient>
            <linearGradient id="medalGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          <rect width="100" height="80" rx="6" fill="url(#stadiumSky)"/>
          
          <circle cx="15" cy="15" r="0.4" fill="#fff" className="animate-pulse" style={{ animationDuration: "2s" }}/>
          <circle cx="85" cy="20" r="0.4" fill="#fff" className="animate-pulse" style={{ animationDuration: "3s" }}/>
          <circle cx="50" cy="12" r="0.5" fill="#fff" className="animate-pulse" style={{ animationDuration: "4s" }}/>

          <path d="M-10 80 L10 55 H25 L40 80 Z" fill="#090d16" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5"/>
          <path d="M60 80 L75 55 H90 L110 80 Z" fill="#090d16" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5"/>
          
          <polygon points="17,55 0,0 40,0" fill="#fbbf24" opacity="0.06"/>
          <polygon points="83,55 60,0 100,0" fill="#fbbf24" opacity="0.06"/>

          <ellipse cx="50" cy="78" rx="45" ry="12" fill="#070710" stroke="#475569" strokeWidth="0.5"/>
          <ellipse cx="50" cy="78" rx="35" ry="9" fill="#120505" stroke="#b91c1c" strokeWidth="0.4"/>
          <ellipse cx="50" cy="78" rx="25" ry="6" fill="#050508"/>

          <circle cx="50" cy="35" r="16" fill="url(#medalGlow)" className="animate-[breathe_4s_infinite]"/>
          
          <circle cx="50" cy="35" r="8" fill="#0d0d1a" stroke="#fbbf24" strokeWidth="0.8"/>
          <circle cx="50" cy="35" r="5" fill="#fbbf24" fillOpacity="0.8"/>
          <polygon points="46,20 54,20 50,29" fill="#dc2626"/>
          <polygon points="48,20 52,20 50,29" fill="#3b82f6"/>

          <line x1="38" y1="52" x2="62" y2="52" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.5"/>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#050508]/15 to-[#050508]/50 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/10 shadow-lg overflow-hidden relative group">
      <img
        src="/journey/highjump.jpg"
        alt="National High Jump competition"
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        onError={() => setImgFailed(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
      <span className="absolute bottom-4 left-4 font-space-mono text-[9px] text-[#fbbf24] tracking-wider uppercase bg-black/60 px-2.5 py-1 rounded border border-[#fbbf24]/30">
        Jawaharlal Nehru Stadium
      </span>
    </div>
  );
}

// 6. Another Door Closes (Moment 5)
function WindingRoadIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0d0d1a]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="roadSky2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8"/>
            <stop offset="60%" stopColor="#0f172a" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#020617" stopOpacity="0.1"/>
          </linearGradient>
          <linearGradient id="roadPathGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0.05"/>
          </linearGradient>
        </defs>
        <rect width="100" height="80" rx="4" fill="url(#roadSky2)"/>

        <circle cx="20" cy="18" r="0.4" fill="#fff" className="animate-pulse" style={{ animationDuration: "4s" }}/>
        <circle cx="80" cy="12" r="0.5" fill="#fff" className="animate-pulse" style={{ animationDuration: "5s" }}/>
        
        <path d="M-10 55 L20 40 L45 55 Z" fill="#090d16" stroke="rgba(255,255,255,0.02)" strokeWidth="0.3"/>
        <path d="M35 55 L65 38 L90 55 Z" fill="#0c101b" stroke="rgba(255,255,255,0.02)" strokeWidth="0.3"/>

        <path d="M50 48 C50 48 46 54 41 60 C36 66 54 70 50 80" stroke="url(#roadPathGrad)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <path d="M50 48 C50 48 46 54 41 60 C36 66 54 70 50 80" stroke="#0ea5e9" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1.5,2.5" fill="none" opacity="0.6"/>

        <line x1="0" y1="55" x2="100" y2="55" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
        
        <circle cx="50" cy="47" r="6" fill="#38bdf8" fillOpacity="0.15" className="blur-sm animate-[pulse_4s_infinite]"/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export default function JourneyPage() {
  const mainRef = useRef(null);
  const [currentChapter, setCurrentChapter] = useState({
    title: "CHAPTER 1 — FOUNDATIONS",
    subtitle: "Birth to Class 6",
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in animation for each moment block
    gsap.utils.toArray(".scroll-animate-moment").forEach((moment) => {
      gsap.fromTo(
        moment,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: moment,
            scroller: mainRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // ScrollTrigger to detect Chapter 1 in viewport
    ScrollTrigger.create({
      trigger: "#chapter1-container",
      scroller: mainRef.current,
      start: "top 40%",
      end: "bottom 40%",
      onToggle: (self) => {
        if (self.isActive) {
          setCurrentChapter({
            title: "CHAPTER 1 — FOUNDATIONS",
            subtitle: "Birth to Class 6",
          });
        }
      },
    });

    // ScrollTrigger to detect Chapter 2 in viewport
    ScrollTrigger.create({
      trigger: "#chapter2-container",
      scroller: mainRef.current,
      start: "top 40%",
      end: "bottom 40%",
      onToggle: (self) => {
        if (self.isActive) {
          setCurrentChapter({
            title: "CHAPTER 2 — THE SHIFT",
            subtitle: "Class 7 to Class 9",
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main
      ref={mainRef}
      className="relative w-screen h-screen overflow-y-auto overflow-x-hidden bg-[#050508] text-white flex flex-col items-center justify-start select-none scrollbar-thin"
    >
      <CanvasStarfield />
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes breathe {
          0% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.08); opacity: 0.55; }
          100% { transform: scale(1); opacity: 0.35; }
        }
        @keyframes starsDrift {
          0% { transform: translateX(-20px); }
          100% { transform: translateX(120px); }
        }
        @keyframes paperPlane {
          0% { transform: translate(-10px, 60px) rotate(-15deg) scale(0.5); opacity: 0; }
          12% { opacity: 0.7; }
          88% { opacity: 0.7; }
          100% { transform: translate(120px, 10px) rotate(10deg) scale(0.5); opacity: 0; }
        }
        @keyframes goldPulse {
          0% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.2); border-color: rgba(251, 191, 36, 0.2); }
          50% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.5); border-color: rgba(251, 191, 36, 0.6); }
          100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.2); border-color: rgba(251, 191, 36, 0.2); }
        }
      `}} />

      <div 
        className="absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full bg-[#3B82F6]/5 blur-[130px] z-[-1] pointer-events-none" 
      />
      <div 
        className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#A855F7]/5 blur-[120px] z-[-1] pointer-events-none" 
      />

      {/* TOP HEADER CONTROLS */}
      <Link
        href="/?state=WORLD&node=journey"
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/60 hover:border-[#A855F7] hover:text-white transition-all duration-300 rounded font-space-mono text-xs tracking-wider cursor-pointer text-[#94A3B8] shadow-[0_0_15px_rgba(0,0,0,0.5)] group"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span> Back to Universe
      </Link>

      <div className="fixed top-8 right-8 z-50 flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2 border border-white/5 rounded shadow-lg pointer-events-auto">
        <span className="font-space-mono text-[10px] tracking-[0.2em] text-[#A855F7] uppercase font-bold">
          {currentChapter.title}
        </span>
        <div className="w-[1px] h-3 bg-white/10" />
        <span className="font-space-mono text-[9px] tracking-wider text-slate-500 uppercase">
          {currentChapter.subtitle}
        </span>
      </div>

      {/* MOMENT STRUCTURE CONTAINER */}
      <div className="w-full flex flex-col z-10">

        {/* ==========================================
            CHAPTER 1: FOUNDATIONS
            ========================================== */}
        <div id="chapter1-container" className="w-full flex flex-col">
          
          {/* OPENING MOMENT: CHAPTER TITLE */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
            <div className="flex flex-col items-center gap-4 max-w-2xl">
              <span className="font-space-mono text-xs md:text-sm tracking-[0.3em] text-[#3B82F6] uppercase font-bold">
                Chapter 1
              </span>
              <h1 className="font-orbitron text-5xl md:text-7xl font-black tracking-widest mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#A855F7] drop-shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                Foundations
              </h1>
              <p className="font-inter text-xs md:text-sm text-slate-400 max-w-md mt-4 leading-relaxed italic">
                "Every foundation has a beginning, and mine began with love, values, and dreams."
              </p>
            </div>
            <div className="mt-12">
              <TitleIllustration />
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 animate-bounce">
              <span className="font-space-mono text-[8px] tracking-widest text-slate-500 uppercase">Scroll Story</span>
              <span className="text-xs text-slate-400">↓</span>
            </div>
          </section>

          {/* MOMENT 1 — Born in Meerut */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <div className="flex items-center gap-3">
                  <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                    August 2nd
                  </h2>
                  <span className="font-space-mono text-[9px] text-slate-500 line-through mt-2">
                    August 3rd
                  </span>
                </div>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  My story began on the morning of August in Meerut, Uttar Pradesh. My early childhood was spent with my mother and grandparents while my father worked in Rajasthan as a librarian at an aeronautical college. During those years, life was simple, protected, and centered around family. I completed my early schooling in Meerut under the ICSE curriculum before one of the first major turning points of my life arrived.
                </p>
              </div>
              {/* Illustration column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full">
                <MeerutIllustration />
              </div>
            </div>
          </section>

          {/* MOMENT 2 — A New World */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Illustration column - Left */}
              <div className="flex items-center justify-center order-1 w-full">
                <NewWorldIllustration />
              </div>
              {/* Text column - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  A New World
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  Once my father felt settled enough in Rajasthan, he brought us to live with him. For the first time, I moved from a traditional family home into a residential society. It may have seemed like a small change, but to a child, it felt like entering an entirely new world. The freedom, the open spaces, the new environment, and the opportunity to explore independently became some of my favorite childhood memories.
                </p>
              </div>
            </div>
          </section>

          {/* MOMENT 3 — MDVM School */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  MDVM School
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  Soon after, I joined Mohan Lal Dayal Vinay Mandir School (MDVM), one of the most respected schools in the region. The transition was surprisingly easy. Many people already knew my father through his work at the college, and the school was only about a kilometer away from our home. It quickly became one of the happiest chapters of my childhood. Even today, it remains one of my favorite schools.
                </p>
              </div>
              {/* Illustration column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full">
                <SchoolImageOrFallback />
              </div>
            </div>
          </section>

          {/* MOMENT 4 — Never Wanted to Disappoint */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Stat Callouts column - Left */}
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center order-1 w-full max-w-[420px] mx-auto">
                <div className="w-full sm:w-1/2 bg-[#0d0d1a]/55 border border-purple-500/20 p-5 rounded-2xl flex flex-col gap-1.5 text-center shadow-lg relative group overflow-hidden">
                  <span className="font-orbitron font-black text-4xl text-[#A855F7] drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                    98/100
                  </span>
                  <span className="font-space-mono text-[9px] text-slate-400 mt-1 uppercase tracking-wide">
                    Hindi, after the comeback
                  </span>
                </div>
                <div className="w-full sm:w-1/2 bg-[#0d0d1a]/55 border border-white/5 p-5 rounded-2xl flex flex-col gap-1.5 text-center shadow-lg relative group overflow-hidden">
                  <span className="font-orbitron font-black text-4xl text-slate-500">
                    63/80
                  </span>
                  <span className="font-space-mono text-[9px] text-slate-500 mt-1 uppercase tracking-wide">
                    Social Studies, Class 5 — the lesson
                  </span>
                </div>
              </div>
              {/* Text column - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-2xl md:text-3xl font-black tracking-wide text-white">
                  Never Wanted to Disappoint
                </h2>
                <p className="font-inter text-slate-300 text-xs md:text-sm leading-relaxed mt-2.5">
                  As a child, I wasn't obsessed with marks. What mattered more to me was making my teachers proud. I worked hard because I genuinely disliked being scolded. I still remember one incident when my Hindi teacher was disappointed with my performance. Instead of accepting it, I became determined to improve. The result was one of my proudest childhood achievements — scoring 98 out of 100 in Hindi and becoming one of the top performers in the class.
                </p>
                <p className="font-inter text-slate-400 text-xs md:text-sm leading-relaxed mt-1">
                  Academically, I was known as a disciplined and bright student. The lowest marks I remember receiving during those years were 63 out of 80 in Social Studies during Class 5. At the time, it felt like a huge setback. Looking back, it taught me that improvement comes from effort, not perfection.
                </p>
              </div>
            </div>
          </section>

          {/* MOMENT 5 — Name Change (Small Intimate Aside) */}
          <section className="scroll-animate-moment w-full min-h-[50vh] flex flex-col items-center justify-center text-center px-6 border-b border-white/5 relative">
            <div className="absolute inset-0 bg-[#A855F7]/3 blur-[80px] z-[-1] pointer-events-none rounded-full max-w-sm mx-auto" />
            <div className="max-w-2xl flex flex-col items-center gap-3">
              <h2 className="font-orbitron text-2xl md:text-3xl font-black tracking-wide text-[#A855F7] drop-shadow-[0_0_12px_rgba(168,85,247,0.25)]">
                Ritik Became Aryan
              </h2>
              <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2 max-w-md">
                "In Class 2, I changed my name from Ritik to Aryan — and my birth date from August 3rd to August 2nd. Simply because the new ones felt right."
              </p>
            </div>
          </section>

          {/* MOMENT 6 — The Stage */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  The Stage
                </h2>
                <p className="font-inter text-slate-300 text-xs md:text-sm leading-relaxed mt-2">
                  While studies were important, they were never my only interest. My father's college became a second playground for me. I loved participating in cultural events, performances, and fresher celebrations. Despite being much younger than the college students around me, I always wanted to be part of the action. The college director often noticed my enthusiasm and confidence.
                </p>
                <p className="font-inter text-slate-400 text-xs md:text-sm leading-relaxed mt-1">
                  One thing I especially loved was speaking on a microphone. In fact, one of my childhood obsessions was birthday celebrations. Not because of the cake. Not because of the gifts. But because the birthday child got to speak on the microphone. I enjoyed it so much that I ended up celebrating my birthday multiple times just to experience that feeling again. Without realizing it, those moments were building the confidence and public speaking skills that would later help me become a leader.
                </p>
              </div>
              {/* Illustration column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full">
                <StageIllustration />
              </div>
            </div>
          </section>

          {/* MOMENT 7 — End of Chapter 1 */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Illustration column - Left */}
              <div className="flex items-center justify-center order-1 w-full">
                <EndEraIllustration />
              </div>
              {/* Text column - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  The End of an Era
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  Life felt stable. School was going well. I had friends, activities, and a routine I loved. Then everything changed. Due to my grandfather's declining health, my family decided to move again. This time, the destination was Noida. As Class 6 approached, I said goodbye to Rajasthan and to one of the happiest chapters of my childhood. I didn't know it then, but the next phase of my journey would be very different. The story was only beginning.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ==========================================
            CHAPTER 2: THE SHIFT
            ========================================== */}
        <div id="chapter2-container" className="w-full flex flex-col">
          
          {/* TITLE MOMENT: CHAPTER 2 */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
            {/* Color morphing glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#A855F7]/3 to-[#3B82F6]/3 blur-[100px] z-[-1] pointer-events-none rounded-full max-w-md mx-auto" />
            
            <div className="flex flex-col items-center gap-4 max-w-2xl">
              <span className="font-space-mono text-xs md:text-sm tracking-[0.3em] text-[#3B82F6] uppercase font-bold">
                Chapter 2
              </span>
              <h1 className="font-orbitron text-5xl md:text-7xl font-black tracking-widest mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-slate-100 to-[#3B82F6] drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                The Shift
              </h1>
              <p className="font-inter text-xs md:text-sm text-slate-400 max-w-md mt-4 leading-relaxed italic">
                Shifting between childhood roots and the unfamiliar horizons of Noida.
              </p>
            </div>
            <div className="mt-12">
              <Chapter2TitleIllustration />
            </div>
          </section>

          {/* MOMENT 1 — Strangers Who Were Family */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Cool indigo background glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-[#1e1b4b]/5 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  Strangers Who Were Family
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  Noida didn't feel like home. It felt like a guest room in someone else's life. For the first weeks, I stayed with relatives I barely knew — faces I'd seen maybe once or twice before, now suddenly the people I ate breakfast with every morning. It was unfamiliar, a little awkward, but also strangely interesting — like meeting family for the first time, twice.
                </p>
              </div>
              {/* Illustration column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full">
                <FamilyDoorwayIllustration />
              </div>
            </div>
          </section>

          {/* MOMENT 2 — The Drastic Change */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Cooler disoriented dark slate glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-[#082f49]/5 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Illustration column - Left */}
              <div className="flex items-center justify-center order-1 w-full">
                <DisorientationIllustration />
              </div>
              {/* Text column - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  The Drastic Change
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  The new school didn't ease me in — it dropped me in. Everything about it felt drastic compared to what I'd left behind. I missed Rajasthan more than I expected to — not just the place, but the rhythm of a life I'd finally gotten comfortable in. For a while, I was just surviving the days, not living them.
                </p>
              </div>
            </div>
          </section>

          {/* MOMENT 3 — Finding My Footing */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Turning point - Warm purple/orange entering */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-[#4c1d95]/5 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  Finding My Footing
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  Slowly, something shifted. I found sports — and sports found a part of me I didn't know was there. High jump became mine. Not because I was the most naturally gifted, but because every attempt at clearing that bar felt like proof I could still climb out of anything, including the homesickness.
                </p>
              </div>
              {/* Illustration column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full">
                <HighJumpIllustration />
              </div>
            </div>
          </section>

          {/* MOMENT 4 — Nationals (Jawaharlal Nehru Stadium) */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Golden glow behind Nationals */}
            <div className="absolute inset-0 w-[550px] h-[400px] rounded-full bg-gradient-to-tr from-[#fb923c]/10 to-[#fbbf24]/5 blur-[130px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Image / Fallback Column - Left */}
              <div className="flex items-center justify-center order-1 w-full">
                <HighJumpImageOrFallback />
              </div>
              {/* Text column - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  Nationals
                </h2>
                <span className="font-space-mono text-[9px] text-[#fbbf24] tracking-widest uppercase">
                  Jawaharlal Nehru Stadium, Delhi
                </span>

                {/* Prominent Gold Badge */}
                <div 
                  className="self-start px-4 py-2 border rounded-full font-orbitron font-bold text-xs text-[#fbbf24] bg-[#fbbf24]/10 shadow-[0_0_15px_rgba(251,191,36,0.15)] animate-[goldPulse_3s_infinite]"
                >
                  🏅 2ND PRIZE — NATIONALS
                </div>

                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  The work paid off in a way I didn't see coming. I qualified for nationals, competing at Jawaharlal Nehru Stadium in Delhi. And on that day, something clicked — I cleared a height I had never managed even once in practice.
                </p>
                <p className="font-inter text-slate-400 text-xs md:text-sm italic leading-relaxed mt-1">
                  "I walked away with a silver, and with it, the first real proof that adaptation wasn't just survival — it could lead somewhere."
                </p>
              </div>
            </div>
          </section>

          {/* MOMENT 5 — Another Door Closes */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 relative">
            {/* Neutral gray glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-slate-500/3 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  Another Door Closes
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  Just as I'd found my footing, my father saw something I couldn't yet — that the school's academic record wasn't strong enough heading into Class 10. He wanted a stronger foundation for what was coming, so he made the call to move me again, this time to a stricter, more academically rigorous school. I left behind a place where I had finally found success — not in the classroom, but on a track, clearing bars no one expected me to clear. The medal stayed with me. The school didn't.
                </p>
                
                <div className="mt-8 flex flex-col gap-1.5 self-start">
                  <span className="font-space-mono text-[9px] text-[#3B82F6] tracking-[0.25em] uppercase font-bold">
                    Chapter 3
                  </span>
                  <span className="font-orbitron text-xs text-slate-500 uppercase tracking-widest font-black">
                    Coming Soon
                  </span>
                </div>
              </div>
              {/* Illustration column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full">
                <WindingRoadIllustration />
              </div>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}
