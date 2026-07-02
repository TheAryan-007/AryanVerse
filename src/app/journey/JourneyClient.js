"use client";

/**
 * Journey Archive Environment — AryanVerse
 * 
 * A story-driven cinematic scroll timeline for:
 * - Chapter 1: Foundations
 * - Chapter 2: The Shift
 * - Chapter 3: The Transformation
 * - Chapter 4: The Leader
 * 
 * Alternate-aligns moments on desktop (text left, SVGs/Photos right, and vice versa)
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

    const isMobile = window.innerWidth < 768;
    const particlesCount = isMobile ? 15 : 80;
    const particles = [];
    for (let i = 0; i < particlesCount; i++) {
      const isFloating = !isMobile && Math.random() > 0.4;
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

// ==========================================
// CHAPTER 3 ILLUSTRATIONS
// ==========================================

// 1. Chapter 3 Title Illustration - Transition Spiral
function Chapter3TitleIllustration() {
  return (
    <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chap3Portal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.5"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="none" stroke="url(#chap3Portal)" strokeWidth="0.5" className="animate-[breathe_6s_infinite]"/>
        <path d="M50 50 Q55 35 60 50 T70 50 T80 50" stroke="#A855F7" strokeWidth="0.4" strokeOpacity="0.7" fill="none" className="animate-[spin_40s_linear_infinite]"/>
        <path d="M50 50 Q45 65 40 50 T30 50 T20 50" stroke="#64748b" strokeWidth="0.4" strokeOpacity="0.5" fill="none" className="animate-[spin_40s_linear_infinite_reverse]"/>
        <circle cx="50" cy="50" r="3" fill="#A855F7" className="animate-ping" style={{ animationDuration: "5s" }}/>
        <circle cx="50" cy="50" r="1.5" fill="#fff"/>
      </svg>
    </div>
  );
}

// 2. Muted classroom outline (Moment 1)
function RamEeshClassroomIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0b0c10]/40 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="greySky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2"/>
          </linearGradient>
          <linearGradient id="windowLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect width="100" height="80" rx="4" fill="url(#greySky)"/>

        <rect x="5" y="10" width="18" height="28" fill="#1e293b" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
        <line x1="14" y1="10" x2="14" y2="38" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
        <line x1="5" y1="24" x2="23" y2="24" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
        
        <polygon points="5,24 85,75 50,80 5,38" fill="url(#windowLight)"/>

        {/* Row 3 */}
        <rect x="35" y="45" width="14" height="4" fill="#1e293b" opacity="0.6"/>
        <line x1="42" y1="49" x2="42" y2="58" stroke="#1e293b" strokeWidth="0.8" opacity="0.6"/>
        <rect x="55" y="45" width="14" height="4" fill="#1e293b" opacity="0.6"/>
        <line x1="62" y1="49" x2="62" y2="58" stroke="#1e293b" strokeWidth="0.8" opacity="0.6"/>

        {/* Row 2 */}
        <rect x="30" y="52" width="16" height="5" fill="#1e293b" opacity="0.8"/>
        <line x1="38" y1="57" x2="38" y2="68" stroke="#1e293b" strokeWidth="1" opacity="0.8"/>
        <rect x="52" y="52" width="16" height="5" fill="#1e293b" opacity="0.8"/>
        <line x1="60" y1="57" x2="60" y2="68" stroke="#1e293b" strokeWidth="1" opacity="0.8"/>

        {/* Row 1 */}
        <rect x="25" y="60" width="18" height="6" fill="#111827"/>
        <line x1="34" y1="66" x2="34" y2="80" stroke="#111827" strokeWidth="1.2"/>
        <rect x="48" y="60" width="18" height="6" fill="#111827"/>
        <line x1="57" y1="66" x2="57" y2="80" stroke="#111827" strokeWidth="1.2"/>

        <circle cx="28" cy="40" r="0.3" fill="#cbd5e1" fillOpacity="0.4" className="animate-[float_8s_infinite]"/>
        <circle cx="42" cy="55" r="0.25" fill="#cbd5e1" fillOpacity="0.3" className="animate-[float_10s_infinite]" style={{ animationDelay: "2s" }}/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 3. Simple two figures (Moment 2)
function FriendshipIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0d0d1a]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="friendSpot" cx="50%" cy="42%" r="40%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="100" height="80" rx="4" fill="#090d16" opacity="0.3"/>
        <circle cx="50" cy="42" r="32" fill="url(#friendSpot)" className="animate-[breathe_7s_infinite]"/>

        {/* Figure 1 */}
        <g className="animate-[float_6s_infinite]" style={{ transformOrigin: "44px 44px" }}>
          <circle cx="44" cy="38" r="2.5" fill="#fff" fillOpacity="0.8"/>
          <path d="M39 46.5 C39 43 49 43 49 46.5 L47 58 H41 Z" fill="#94a3b8" fillOpacity="0.7"/>
        </g>

        {/* Figure 2 */}
        <g className="animate-[float_6s_infinite]" style={{ transformOrigin: "56px 44px", animationDelay: "1.5s" }}>
          <circle cx="56" cy="38" r="2.5" fill="#fff" fillOpacity="0.9"/>
          <path d="M51 46.5 C51 43 61 43 61 46.5 L59 58 H53 Z" fill="#64748b" fillOpacity="0.8"/>
        </g>
        
        <ellipse cx="50" cy="58" rx="14" ry="2" fill="#050508" opacity="0.6"/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 4. Glitching desaturated clock (Moment 3)
function CovidClockIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#07070d]/60 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full select-none" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="covidSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#020617" stopOpacity="0.05"/>
          </linearGradient>
          <pattern id="staticPattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="100" height="80" fill="rgba(255,255,255,0.03)"/>
          </pattern>
        </defs>
        
        <rect width="100" height="80" rx="4" fill="url(#covidSky)"/>
        <rect width="100" height="80" fill="url(#staticPattern)" className="opacity-60"/>

        <g className="animate-[glitch_2s_infinite]">
          <circle cx="50" cy="38" r="22" stroke="#475569" strokeWidth="0.8" strokeDasharray="3,2" fill="#0f172a" fillOpacity="0.3"/>
          <circle cx="50" cy="38" r="18" stroke="#334155" strokeWidth="0.5"/>

          <line x1="50" y1="38" x2="50" y2="24" stroke="#64748b" strokeWidth="1" strokeLinecap="round"/>
          <line x1="50" y1="38" x2="62" y2="44" stroke="#475569" strokeWidth="0.8" strokeLinecap="round" className="animate-[pulse_1s_infinite]"/>
          <circle cx="50" cy="38" r="1.5" fill="#94a3b8"/>

          <path d="M50 16 L48 24 L52 28 L49 38 L50 48" stroke="#090d16" strokeWidth="0.8" strokeLinecap="round"/>
          <path d="M32 38 L42 36 L50 38" stroke="#090d16" strokeWidth="0.6" strokeLinecap="round"/>
        </g>

        <rect x="15" y="25" width="22" height="1.5" fill="#334155" opacity="0.3" className="animate-[staticLines_1.8s_infinite]"/>
        <rect x="62" y="50" width="18" height="1.2" fill="#475569" opacity="0.25" className="animate-[staticLines_2.2s_infinite]" style={{ animationDelay: "0.5s" }}/>
        <rect x="35" y="58" width="30" height="0.8" fill="#1e293b" opacity="0.4" className="animate-[staticLines_3s_infinite]" style={{ animationDelay: "1s" }}/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/85 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 5. Cinema Screen & Clapperboard (Moment 4)
function CinephileIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0c0704]/40 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="screenGlow" cx="50%" cy="36%" r="55%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.45"/>
            <stop offset="50%" stopColor="#d97706" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="clapperGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fb923c"/>
            <stop offset="100%" stopColor="#f59e0b"/>
          </linearGradient>
        </defs>
        
        <rect width="100" height="80" rx="4" fill="#0c0704"/>
        <rect width="100" height="80" fill="url(#screenGlow)" className="animate-[breathe_8s_infinite]"/>

        <polygon points="50,0 20,80 80,80" fill="#fb923c" opacity="0.04"/>

        <rect x="22" y="16" width="56" height="30" rx="2" fill="#0d0d1a" stroke="#d97706" strokeWidth="0.8" className="shadow-[0_0_20px_rgba(251,146,60,0.25)]"/>
        <path d="M26 40 L38 30 L48 36 L62 25 L74 40 Z" fill="#b45309" fillOpacity="0.3"/>
        <circle cx="62" cy="24" r="2.5" fill="#f59e0b" fillOpacity="0.5"/>

        <path d="M12 55 Q20 30 14 20 T10 8" stroke="#fb923c" strokeWidth="1.5" strokeOpacity="0.25" fill="none" strokeDasharray="1,1.5" className="animate-[float_6s_infinite]" style={{ transformOrigin: "12px 30px" }}/>
        
        <g className="animate-[float_5s_infinite]" style={{ transformOrigin: "82px 48px", animationDelay: "1s" }}>
          <rect x="76" y="44" width="12" height="9" rx="0.5" fill="#0d0a08" stroke="url(#clapperGrad)" strokeWidth="0.5"/>
          <polygon points="76,41 88,40 88,43 76,44" fill="#0d0a08" stroke="url(#clapperGrad)" strokeWidth="0.5"/>
          <line x1="79" y1="41.2" x2="81" y2="43.8" stroke="#fb923c" strokeWidth="0.6"/>
          <line x1="83" y1="40.8" x2="85" y2="43.4" stroke="#fb923c" strokeWidth="0.6"/>
        </g>

        <circle cx="32" cy="55" r="0.6" fill="#fb923c" className="animate-ping" style={{ animationDuration: "3s" }}/>
        <circle cx="68" cy="62" r="0.5" fill="#f59e0b" className="animate-ping" style={{ animationDuration: "4s", animationDelay: "1.5s" }}/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0704]/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 6. Split Doors (Moment 5)
function DoorsIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0d0d1a]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="splitSky" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0f172a"/>
            <stop offset="50%" stopColor="#020617"/>
            <stop offset="100%" stopColor="#1c1917"/>
          </linearGradient>
          <linearGradient id="openDoorLight" x1="68" y1="20" x2="90" y2="70">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        <rect width="100" height="80" rx="4" fill="url(#splitSky)"/>

        <line x1="50" y1="10" x2="50" y2="70" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="2,2"/>

        {/* LEFT SIDE: Closed Door */}
        <g className="opacity-60">
          <rect x="18" y="20" width="20" height="50" fill="#090d16" stroke="#334155" strokeWidth="0.5"/>
          <rect x="18" y="20" width="20" height="50" fill="#020617" stroke="#1e293b" strokeWidth="0.3"/>
          <line x1="28" y1="20" x2="28" y2="70" stroke="rgba(255,255,255,0.03)" strokeWidth="0.3"/>
          <circle cx="34" cy="45" r="0.6" fill="#475569"/>
        </g>

        {/* RIGHT SIDE: Open Door */}
        <g>
          <polygon points="68,20 95,15 95,75 68,70" fill="url(#openDoorLight)"/>
          <rect x="62" y="20" width="20" height="50" fill="#090d16" stroke="#b45309" strokeWidth="0.5"/>
          <polygon points="62,20 74,16 74,66 62,70" fill="#1c1917" stroke="#fb923c" strokeWidth="0.5" className="animate-[float_5s_infinite]" style={{ transformOrigin: "62px 45px" }}/>
          <circle cx="70" cy="43" r="0.6" fill="#fb923c"/>
        </g>
      </svg>
      <span className="absolute bottom-5 left-10 font-space-mono text-[8px] text-slate-500 uppercase tracking-widest">
        Elite
      </span>
      <span className="absolute bottom-5 right-10 font-space-mono text-[8px] text-orange-400 uppercase tracking-widest">
        Family
      </span>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 7. Teacher Blackboard (Moment 6)
function WarmClassroomIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#170f07]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="warmClassroomSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#451a03" stopOpacity="0.8"/>
            <stop offset="60%" stopColor="#1c1917" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#0c0a09" stopOpacity="0.1"/>
          </linearGradient>
          <radialGradient id="deskLampGlow" cx="50%" cy="20%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4"/>
            <stop offset="50%" stopColor="#d97706" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        <rect width="100" height="80" rx="4" fill="url(#warmClassroomSky)"/>
        <circle cx="50" cy="20" r="35" fill="url(#deskLampGlow)" className="animate-[breathe_6s_infinite]"/>

        <rect x="25" y="15" width="50" height="26" fill="#14532d" stroke="#f59e0b" strokeWidth="0.6" strokeOpacity="0.5" className="shadow-[0_0_15px_rgba(245,158,11,0.15)]"/>
        <path d="M30 22 H50 M30 26 H45 M30 30 H60" stroke="#fef08a" strokeWidth="0.4" strokeLinecap="round" opacity="0.6"/>
        <path d="M54 24 Q58 28 62 24 T70 24" stroke="#fef08a" strokeWidth="0.4" strokeLinecap="round" opacity="0.5"/>

        <line x1="50" y1="0" x2="50" y2="12" stroke="#d97706" strokeWidth="0.8"/>
        <polygon points="46,12 54,12 50,18" fill="#fbbf24"/>
        
        <g className="animate-[float_7s_infinite]" style={{ transformOrigin: "50px 38px", animationDelay: "1s" }}>
          <circle cx="50" cy="46" r="2" fill="#fff" fillOpacity="0.8"/>
          <path d="M46 54 C46 51 54 51 54 54 L52 68 H48 Z" fill="#d97706" fillOpacity="0.7"/>
          <path d="M52 52.5 C55 50 56 46 56 46" stroke="#d97706" strokeWidth="1.2" strokeLinecap="round" fill="none" fillOpacity="0.7"/>
        </g>

        <line x1="10" y1="72" x2="90" y2="72" stroke="rgba(251,191,36,0.1)" strokeWidth="0.8"/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 8. Mentors structured grid (Moment 8)
function MaverickMentorsIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0b141a]/40 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="coachingSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#115e59" stopOpacity="0.5"/>
            <stop offset="60%" stopColor="#0f172a" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#020617" stopOpacity="0.1"/>
          </linearGradient>
          <radialGradient id="focusSpot" cx="50%" cy="40%" r="45%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        <rect width="100" height="80" rx="4" fill="url(#coachingSky)"/>
        <circle cx="50" cy="40" r="32" fill="url(#focusSpot)"/>

        <line x1="15" y1="15" x2="85" y2="15" stroke="rgba(255,255,255,0.02)" strokeWidth="0.4"/>
        <line x1="15" y1="30" x2="85" y2="30" stroke="rgba(255,255,255,0.02)" strokeWidth="0.4"/>
        <line x1="15" y1="45" x2="85" y2="45" stroke="rgba(255,255,255,0.02)" strokeWidth="0.4"/>
        <line x1="15" y1="60" x2="85" y2="60" stroke="rgba(255,255,255,0.02)" strokeWidth="0.4"/>
        <line x1="30" y1="10" x2="30" y2="65" stroke="rgba(255,255,255,0.02)" strokeWidth="0.4"/>
        <line x1="50" y1="10" x2="50" y2="65" stroke="rgba(255,255,255,0.02)" strokeWidth="0.4"/>
        <line x1="70" y1="10" x2="70" y2="65" stroke="rgba(255,255,255,0.02)" strokeWidth="0.4"/>

        <path d="M42 22 L45 25 L50 20" stroke="#0ea5e9" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" className="animate-pulse"/>
        <path d="M52 24 H56 M52 26 H56" stroke="#0ea5e9" strokeWidth="0.6" opacity="0.6"/>
        <ellipse cx="61" cy="23" rx="2.5" ry="1.5" stroke="#0ea5e9" strokeWidth="0.5" fill="none" opacity="0.6"/>

        <g className="animate-[float_5s_infinite]" style={{ transformOrigin: "42px 42px" }}>
          <circle cx="42" cy="38" r="2.5" fill="#fff" fillOpacity="0.8"/>
          <path d="M37 46 C37 43 47 43 47 46 L45 62 H39 Z" fill="#0d9488" fillOpacity="0.75"/>
        </g>
        <g className="animate-[float_5s_infinite]" style={{ transformOrigin: "58px 42px", animationDelay: "1s" }}>
          <circle cx="58" cy="38" r="2.5" fill="#fff" fillOpacity="0.9"/>
          <path d="M53 46 C53 43 63 43 63 46 L61 62 H55 Z" fill="#0284c7" fillOpacity="0.8"/>
        </g>

        <ellipse cx="50" cy="62" rx="16" ry="2" fill="#0ea5e9" fillOpacity="0.2" className="blur-sm"/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// ==========================================
// CHAPTER 4 ILLUSTRATIONS
// ==========================================

// 1. Chapter 4 Title Illustration - Golden Seal
function Chapter4TitleIllustration() {
  return (
    <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="chap4Portal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.4"/>
          </linearGradient>
          <radialGradient id="portalGoldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#050508" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#portalGoldGlow)" className="animate-[breathe_5s_infinite]"/>
        <circle cx="50" cy="50" r="32" stroke="url(#chap4Portal)" strokeWidth="0.8" strokeDasharray="4,2" className="animate-[spin_25s_linear_infinite]"/>
        <circle cx="50" cy="50" r="20" stroke="#fbbf24" strokeWidth="0.4" strokeOpacity="0.7" className="animate-[spin_15s_linear_infinite_reverse]"/>
        <polygon points="42,56 46,45 50,52 54,45 58,56" stroke="#fbbf24" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="42" y1="58" x2="58" y2="58" stroke="#fbbf24" strokeWidth="0.8"/>
        <circle cx="50" cy="30" r="1.5" fill="#fbbf24" className="animate-ping" style={{ animationDuration: "3s" }}/>
      </svg>
    </div>
  );
}

// 2. Fork in road steep path (Moment 1)
function DifficultRoadIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0b0c10]/40 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="roadSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2"/>
          </linearGradient>
          <linearGradient id="steepPath" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82f6"/>
            <stop offset="100%" stopColor="#fbbf24"/>
          </linearGradient>
        </defs>
        <rect width="100" height="80" rx="4" fill="url(#roadSky)"/>

        <path d="M15 75 Q35 75 45 68" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M45 68 Q65 68 85 72" stroke="#334155" strokeWidth="2.5" strokeDasharray="1.5,2" fill="none" opacity="0.6"/>
        <path d="M45 68 Q55 50 68 30 T88 12" stroke="url(#steepPath)" strokeWidth="2" fill="none" strokeLinecap="round" className="animate-[pulse_2s_infinite]"/>

        <g className="animate-[float_5s_infinite]" style={{ transformOrigin: "66px 32px" }}>
          <circle cx="66" cy="30" r="1.2" fill="#fff"/>
          <path d="M64 34 Q66 31 68 34 L66 40 Z" fill="#3b82f6"/>
        </g>

        <circle cx="88" cy="12" r="1.5" fill="#fbbf24" className="animate-ping" style={{ animationDuration: "2s" }}/>
        <circle cx="88" cy="12" r="0.8" fill="#fff"/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 3. Section A classroom (Moment 2)
function SectionAIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#17120a]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="intenseSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78350f" stopOpacity="0.6"/>
            <stop offset="60%" stopColor="#1c1917" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#0c0a09" stopOpacity="0.1"/>
          </linearGradient>
          <radialGradient id="deskFocusSpot" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        <rect width="100" height="80" rx="4" fill="url(#intenseSky)"/>
        
        <circle cx="25" cy="40" r="15" fill="url(#deskFocusSpot)" opacity="0.8"/>
        <circle cx="75" cy="40" r="15" fill="url(#deskFocusSpot)" opacity="0.8"/>

        <polygon points="12,50 32,50 30,58 10,58" fill="#1e1b18" stroke="#fbbf24" strokeWidth="0.4" strokeOpacity="0.4"/>
        <polygon points="8,62 30,62 27,72 5,72" fill="#141210" stroke="#fbbf24" strokeWidth="0.5" strokeOpacity="0.6"/>
        
        <polygon points="68,50 88,50 90,58 70,58" fill="#1e1b18" stroke="#fbbf24" strokeWidth="0.4" strokeOpacity="0.4"/>
        <polygon points="70,62 92,62 95,72 73,72" fill="#141210" stroke="#fbbf24" strokeWidth="0.5" strokeOpacity="0.6"/>

        <rect x="25" y="10" width="50" height="22" fill="#0d0e12" stroke="#a855f7" strokeWidth="0.6" strokeOpacity="0.4"/>
        <path d="M30 18 H45 M30 22 H40 M55 18 L60 22 L65 18" stroke="#cbd5e1" strokeWidth="0.4" opacity="0.6"/>
        <text x="48" y="24" fill="#a855f7" fontSize="3.5" fontFamily="monospace" opacity="0.8">A</text>

        <polygon points="25,0 12,50 38,50" fill="#fbbf24" opacity="0.04"/>
        <polygon points="75,0 62,50 88,50" fill="#fbbf24" opacity="0.04"/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 4. Populating courtyard courtyard (Moment 4)
function SchoolYardIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0d0d1a]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="yardSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.6"/>
            <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#78350f" stopOpacity="0.2"/>
          </linearGradient>
          <radialGradient id="yardLightGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        <rect width="100" height="80" rx="4" fill="url(#yardSky)"/>
        <circle cx="50" cy="40" r="30" fill="url(#yardLightGlow)"/>

        <path d="M10 50 L10 30 H25 L30 20 H70 L75 30 H90 L90 50 Z" fill="#090a14" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
        <rect x="38" y="28" width="24" height="22" fill="#05060b" opacity="0.8"/>
        
        <rect x="42" y="32" width="4" height="6" fill="#fbbf24" fillOpacity="0.7" className="animate-pulse" style={{ animationDuration: "3s" }}/>
        <rect x="54" y="32" width="4" height="6" fill="#fbbf24" fillOpacity="0.7" className="animate-pulse" style={{ animationDuration: "5s" }}/>

        <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>

        <g className="animate-[float_4s_infinite]" style={{ transformOrigin: "75px 56px" }}>
          <circle cx="75" cy="50" r="1" fill="#fbbf24"/>
          <path d="M73 51.5 L77 51 L75 58 L73 58 Z" fill="#fbbf24"/>
          <line x1="75" y1="54" x2="78" y2="56" stroke="#fbbf24" strokeWidth="0.6"/>
          <line x1="75" y1="54" x2="71" y2="55" stroke="#fbbf24" strokeWidth="0.6"/>
        </g>

        <g className="animate-[float_5s_infinite]" style={{ transformOrigin: "50px 58px", animationDelay: "1.5s" }}>
          <circle cx="50" cy="52" r="1" fill="#a855f7"/>
          <path d="M49 53.5 H51 L51 60 H49 Z" fill="#a855f7"/>
        </g>

        <circle cx="64" cy="56" r="0.8" fill="#fff" className="animate-bounce" style={{ animationDuration: "1.2s" }}/>
        
        <path d="M30 20 L40 18 L50 20 L60 18 L70 20" stroke="#a855f7" strokeWidth="0.3" strokeDasharray="1,1"/>
        <polygon points="34,19 37,21 34,22" fill="#fbbf24"/>
        <polygon points="44,18 47,20 44,21" fill="#a855f7"/>
        <polygon points="54,19 57,21 54,22" fill="#fbbf24"/>
        <polygon points="64,18 67,20 64,21" fill="#a855f7"/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 5. Sports Day Participation (Moment 5)
function SportsDayIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0c0d17]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sportsSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#431407" stopOpacity="0.5"/>
            <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#020617" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        
        <rect width="100" height="80" rx="4" fill="url(#sportsSky)"/>
        
        <polygon points="15,70 25,50 35,50 45,70" fill="#090a14" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
        <polygon points="25,50 35,50 35,70 25,70" fill="#040409" stroke="#fbbf24" strokeWidth="0.4" opacity="0.4"/>
        <text x="28" y="62" fill="#fbbf24" fontSize="5" fontFamily="monospace" opacity="0.6">3</text>

        <path d="M0 70 Q45 45 100 70" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        <path d="M0 74 Q45 48 100 74" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2"/>

        <g className="animate-[float_6s_infinite]" style={{ transformOrigin: "18px 46px" }}>
          <circle cx="18" cy="40" r="1.2" fill="#fff" fillOpacity="0.8"/>
          <path d="M15 42 H21 L20 48 H16 Z" fill="#a855f7" fillOpacity="0.7"/>
          <line x1="15.5" y1="42.5" x2="15.5" y2="47" stroke="#cbd5e1" strokeWidth="0.6"/>
          <line x1="20.5" y1="42.5" x2="20.5" y2="47" stroke="#cbd5e1" strokeWidth="0.6"/>
        </g>

        <g className="animate-[float_4s_infinite]" style={{ transformOrigin: "60px 48px", animationDelay: "1s" }}>
          <circle cx="60" cy="46" r="1.2" fill="#fbbf24"/>
          <path d="M57 48.5 L63 47.5 L61 54 L58 55 Z" fill="#fbbf24"/>
          <line x1="59" y1="54" x2="57" y2="59" stroke="#fbbf24" strokeWidth="0.8"/>
          <line x1="60" y1="54" x2="63" y2="58" stroke="#fbbf24" strokeWidth="0.8"/>
        </g>
        
        <line x1="52" y1="47" x2="48" y2="47" stroke="rgba(251,191,36,0.3)" strokeWidth="0.6"/>
        <line x1="51" y1="51" x2="46" y2="51" stroke="rgba(251,191,36,0.3)" strokeWidth="0.6"/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 6. Figure standing between two groups (Moment 6)
function BridgeIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0d0d1a]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bridgeSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#311042" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#050508" stopOpacity="0.2"/>
          </linearGradient>
          <radialGradient id="bridgeGlow" cx="50%" cy="38%" r="40%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        <rect width="100" height="80" rx="4" fill="url(#bridgeSky)"/>
        <circle cx="50" cy="38" r="30" fill="url(#bridgeGlow)"/>

        <g className="animate-[float_5s_infinite]" style={{ transformOrigin: "50px 38px" }}>
          <circle cx="50" cy="32" r="1.8" fill="#fff"/>
          <path d="M46 39.5 C46 36.5 54 36.5 54 39.5 L52 56 H48 Z" fill="#A855F7"/>
          <path d="M50 36.5 L34 33.5" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M50 36.5 L66 33.5" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round"/>
        </g>

        <g opacity="0.6">
          <circle cx="22" cy="42" r="1.2" fill="#cbd5e1"/>
          <path d="M19 47.5 C19 45 25 45 25 47.5 L24 58 H20 Z" fill="#475569"/>
          <circle cx="16" cy="44" r="1.2" fill="#cbd5e1"/>
          <path d="M13 49 C13 47 19 47 19 49 L18 58 H14 Z" fill="#334155"/>
        </g>

        <g opacity="0.6">
          <circle cx="78" cy="42" r="1.2" fill="#cbd5e1"/>
          <path d="M75 47.5 C75 45 81 45 81 47.5 L80 58 H76 Z" fill="#475569"/>
          <circle cx="84" cy="44" r="1.2" fill="#cbd5e1"/>
          <path d="M81 49 C81 47 87 47 87 49 L86 58 H82 Z" fill="#334155"/>
        </g>

        <ellipse cx="50" cy="56" rx="22" ry="2" fill="#090914" stroke="#A855F7" strokeWidth="0.3" opacity="0.7"/>
      </svg>
      <span className="absolute bottom-5 left-10 font-space-mono text-[8px] text-slate-500 uppercase tracking-widest">
        Students
      </span>
      <span className="absolute bottom-5 right-10 font-space-mono text-[8px] text-purple-400 uppercase tracking-widest">
        Teachers
      </span>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 7. Paint brushes + code circuits (Moment 7)
function FineArtsIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#0a0815]/30 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="artSky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4"/>
            <stop offset="50%" stopColor="#db2777" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0.2"/>
          </linearGradient>
          <linearGradient id="brushGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#db2777"/>
            <stop offset="50%" stopColor="#a855f7"/>
            <stop offset="100%" stopColor="#06b6d4"/>
          </linearGradient>
        </defs>
        
        <rect width="100" height="80" rx="4" fill="url(#artSky)"/>

        <path d="M15 15 H40 L45 20 V35" stroke="#06b6d4" strokeWidth="0.5" strokeOpacity="0.4" fill="none"/>
        <circle cx="15" cy="15" r="1.2" fill="#06b6d4" fillOpacity="0.5"/>
        <rect x="38" y="35" width="14" height="14" rx="1" fill="#020617" stroke="#06b6d4" strokeWidth="0.4" strokeOpacity="0.5"/>
        
        <path d="M85 65 H60 L55 60 V45" stroke="#fb923c" strokeWidth="0.5" strokeOpacity="0.4" fill="none"/>
        <circle cx="85" cy="65" r="1.2" fill="#fb923c" fillOpacity="0.5"/>

        <path d="M10 65 Q35 15 70 32 T95 15" stroke="url(#brushGrad)" strokeWidth="4" strokeLinecap="round" fill="none" strokeOpacity="0.75" className="animate-[breathe_8s_infinite]"/>
        <path d="M5 58 Q25 22 55 35 T85 28" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.6" className="animate-[float_6s_infinite]" style={{ animationDelay: "1s" }}/>

        <text x="20" y="32" fill="#06b6d4" fontSize="3.5" fontFamily="monospace" opacity="0.5">01</text>
        <text x="75" y="48" fill="#fb923c" fontSize="3.5" fontFamily="monospace" opacity="0.5">10</text>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 8. Confident figure looking at golden sunrise horizon (Moment 9)
function HorizonIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#05050b]/40 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="horizonSky" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4"/>
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#05050b" stopOpacity="0.05"/>
          </linearGradient>
          <radialGradient id="sunRiseGlow" cx="50%" cy="58%" r="45%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        <rect width="100" height="80" rx="4" fill="url(#horizonSky)"/>
        <circle cx="50" cy="58" r="28" fill="url(#sunRiseGlow)" className="animate-[breathe_7s_infinite]"/>

        <circle cx="15" cy="15" r="0.4" fill="#fff" className="animate-pulse" style={{ animationDuration: "3s" }}/>
        <circle cx="85" cy="22" r="0.4" fill="#fff" className="animate-pulse" style={{ animationDuration: "4s" }}/>
        <circle cx="50" cy="12" r="0.5" fill="#fff" className="animate-pulse" style={{ animationDuration: "5s" }}/>

        <path d="M-5 80 L35 55 Q50 52 65 55 L105 80 Z" fill="#090a14" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5"/>

        <g className="animate-[float_5s_infinite]" style={{ transformOrigin: "50px 52px" }}>
          <circle cx="50" cy="46.5" r="1.3" fill="#fff"/>
          <path d="M47.5 52 C47.5 49.5 52.5 49.5 52.5 52 L51.5 62 H48.5 Z" fill="#fbbf24"/>
        </g>
        
        <circle cx="50" cy="57" r="5" fill="#fbbf24" className="blur-xs"/>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// Chapter 5 Title Illustration - The Crossroads (Double Arrow Portal)
function Chapter5TitleIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#05050b]/40 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="portalLeftGlow" cx="30%" cy="40%" r="35%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="portalRightGlow" cx="70%" cy="40%" r="35%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="splitPathGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        
        {/* Left Portal Glow */}
        <circle cx="30" cy="35" r="18" fill="url(#portalLeftGlow)" className="animate-[breathe_6s_infinite]" />
        <circle cx="30" cy="35" r="6" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" className="animate-spin" style={{ animationDuration: "12s" }} />
        
        {/* Right Portal Glow */}
        <circle cx="70" cy="35" r="18" fill="url(#portalRightGlow)" className="animate-[breathe_8s_infinite]" />
        <circle cx="70" cy="35" r="6" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 3" className="animate-spin" style={{ animationDuration: "15s" }} />
        
        {/* Split Path */}
        <path d="M50 75 V55 Q50 45 30 35" stroke="url(#splitPathGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M50 75 V55 Q50 45 70 35" stroke="url(#splitPathGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        
        {/* Tiny traveler shape in middle */}
        <circle cx="50" cy="62" r="1.5" fill="#fff" className="animate-[float_4s_infinite]" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 1. Pressed desk with books and a clock in cold blue-grey tones (Moment 1)
function RaceBeginsIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#05050b]/40 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="coolSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#050508" stopOpacity="0.05"/>
          </linearGradient>
        </defs>
        <rect width="100" height="80" rx="4" fill="url(#coolSky)" />
        {/* Desk line */}
        <line x1="10" y1="65" x2="90" y2="65" stroke="#475569" strokeWidth="1.5" />
        {/* Books stack */}
        <rect x="25" y="55" width="22" height="10" rx="1" fill="#334155" stroke="#475569" strokeWidth="0.5" />
        <rect x="27" y="47" width="18" height="8" rx="1" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
        <rect x="26" y="41" width="20" height="6" rx="1" fill="#475569" stroke="#64748b" strokeWidth="0.5" />
        {/* Desk lamp light cone (subtle blue-grey) */}
        <polygon points="75,25 60,65 90,65" fill="#38bdf8" fillOpacity="0.05" />
        {/* Clock */}
        <circle cx="75" cy="35" r="10" stroke="#475569" strokeWidth="1" fill="#0f172a" />
        <circle cx="75" cy="35" r="8" fill="#1e293b" />
        <line x1="75" y1="35" x2="75" y2="30" stroke="#64748b" strokeWidth="1" strokeLinecap="round" /> {/* hour hand */}
        <g style={{ transformOrigin: "75px 35px", animation: "clockTick 60s linear infinite" }}>
          <line x1="75" y1="35" x2="79" y2="35" stroke="#38bdf8" strokeWidth="0.75" strokeLinecap="round" /> {/* minute hand */}
        </g>
        {/* Tiny details */}
        <circle cx="75" cy="35" r="1" fill="#38bdf8" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 2. Physics vs Chemistry side-by-side elements (Moment 2)
function PhysicsChemistryIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#05050b]/40 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="physicsGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="chemGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        {/* Physics side - Left (Warm) */}
        <circle cx="30" cy="40" r="15" fill="url(#physicsGlow)" className="animate-[breathe_6s_infinite]" />
        <circle cx="30" cy="40" r="6" fill="#fbbf24" className="animate-[float_5s_infinite]" />
        <ellipse cx="30" cy="40" rx="12" ry="4" stroke="#fbbf24" strokeWidth="0.5" strokeOpacity="0.3" transform="rotate(30 30 40)" />
        <ellipse cx="30" cy="40" rx="12" ry="4" stroke="#fbbf24" strokeWidth="0.5" strokeOpacity="0.3" transform="rotate(-30 30 40)" />
        
        {/* Chemistry side - Right (Cold/Sharp) */}
        <circle cx="70" cy="40" r="15" fill="url(#chemGlow)" className="animate-[breathe_8s_infinite]" />
        <g className="animate-[float_6s_infinite]" style={{ transformOrigin: "70px 40px", animationDelay: "1s" }}>
          {/* Jagged crystal/hexagon structure */}
          <polygon points="70,28 79,33 79,47 70,52 61,47 61,33" stroke="#06b6d4" strokeWidth="1" fill="#0c4a6e" fillOpacity="0.4" />
          <line x1="70" y1="28" x2="70" y2="52" stroke="#06b6d4" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="61" y1="33" x2="79" y2="47" stroke="#06b6d4" strokeWidth="0.5" strokeOpacity="0.5" />
          <line x1="61" y1="47" x2="79" y2="33" stroke="#06b6d4" strokeWidth="0.5" strokeOpacity="0.5" />
          <circle cx="70" cy="28" r="1" fill="#22d3ee" />
          <circle cx="79" cy="33" r="1" fill="#22d3ee" />
          <circle cx="79" cy="47" r="1" fill="#22d3ee" />
          <circle cx="70" cy="52" r="1" fill="#22d3ee" />
          <circle cx="61" cy="47" r="1" fill="#22d3ee" />
          <circle cx="61" cy="33" r="1" fill="#22d3ee" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 3. Greyed-out outlines of previous milestones fading away (Moment 3)
function SacrificeIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#05050b]/40 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Runner outline - fading */}
        <g opacity="0.15" className="animate-[float_8s_infinite]">
          <path d="M20 55 L25 50 L23 42 L28 40 L31 46" stroke="#94a3b8" strokeWidth="0.8" strokeLinecap="round" />
          <circle cx="28" cy="37" r="1.5" stroke="#94a3b8" strokeWidth="0.8" />
          <line x1="23" y1="42" x2="18" y2="46" stroke="#94a3b8" strokeWidth="0.8" />
        </g>
        {/* Headboy star outline - fading */}
        <g opacity="0.15" className="animate-[breathe_7s_infinite]">
          <path d="M50 20 L53 27 H60 L55 32 L57 39 L50 35 L43 39 L45 32 L40 27 H47 Z" stroke="#94a3b8" strokeWidth="0.8" fill="none" />
        </g>
        {/* Two friends outline - fading */}
        <g opacity="0.15" className="animate-[float_6s_infinite]" style={{ animationDelay: "2s" }}>
          <circle cx="72" cy="48" r="2" stroke="#94a3b8" strokeWidth="0.8" />
          <path d="M68 58 C68 53 76 53 76 58" stroke="#94a3b8" strokeWidth="0.8" />
          
          <circle cx="82" cy="46" r="2" stroke="#94a3b8" strokeWidth="0.8" />
          <path d="M78 58 C78 51 86 51 86 58" stroke="#94a3b8" strokeWidth="0.8" />
        </g>
        
        {/* Centered minimal cross layout */}
        <line x1="50" y1="10" x2="50" y2="70" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="10" y1="40" x2="90" y2="40" stroke="#334155" strokeWidth="0.5" strokeDasharray="3 3" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 4. Exam hall with distressed and one smiling figures (Moment 4)
function PhysicsPaperIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#05050b]/40 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="logicGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        {/* Distressed desks (Left and Right) */}
        <g opacity="0.3">
          {/* Left desk */}
          <line x1="15" y1="55" x2="35" y2="55" stroke="#475569" strokeWidth="1" />
          <path d="M22 55 C22 51 28 51 28 55" stroke="#475569" strokeWidth="1" />
          <circle cx="25" cy="46" r="2" fill="#475569" />
          {/* Head down line */}
          <path d="M25 44 L23 48" stroke="#475569" strokeWidth="1" />
          
          {/* Right desk */}
          <line x1="65" y1="55" x2="85" y2="55" stroke="#475569" strokeWidth="1" />
          <path d="M72 55 C72 51 78 51 78 55" stroke="#475569" strokeWidth="1" />
          <circle cx="75" cy="46" r="2" fill="#475569" />
          <path d="M75 44 L77 48" stroke="#475569" strokeWidth="1" />
        </g>
        
        {/* Smiling student in center */}
        <circle cx="50" cy="45" r="20" fill="url(#logicGlow)" className="animate-[breathe_6s_infinite]" />
        
        <g className="animate-[float_5s_infinite]">
          <line x1="40" y1="60" x2="60" y2="60" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Student chest and head */}
          <path d="M44 60 C44 54 56 54 56 60" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" />
          <circle cx="50" cy="49" r="3.5" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1" />
          {/* Smiling curves */}
          <path d="M49.5 49 Q50 49.5 50.5 49" stroke="#38bdf8" strokeWidth="0.5" />
          
          {/* Logic/physics symbols floating */}
          <text x="35" y="32" fill="#38bdf8" fontSize="5" fontFamily="monospace" opacity="0.75" className="animate-pulse">E=mc²</text>
          <path d="M60 25 Q64 30 68 25 T72 30" stroke="#38bdf8" strokeWidth="0.8" fill="none" opacity="0.6" />
          <text x="58" y="38" fill="#38bdf8" fontSize="6" fontFamily="monospace" opacity="0.75" className="animate-pulse" style={{ animationDelay: "1.5s" }}>∫</text>
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 5. Blurred math equations behind frosted glass (Moment 5)
function MathStoryIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#05050b]/40 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
          </pattern>
        </defs>
        
        {/* Grid background */}
        <rect width="100" height="80" fill="url(#grid)" />
        
        {/* Some complex math formulas blurred */}
        <g opacity="0.4" className="blur-[2px]">
          <text x="20" y="25" fill="#a855f7" fontSize="4" fontFamily="monospace">f(x) = sin(x) + cos(x)</text>
          <text x="35" y="45" fill="#6366f1" fontSize="4" fontFamily="monospace">{"dy/dx = lim(h->0)..."}</text>
          <text x="15" y="60" fill="#a855f7" fontSize="4" fontFamily="monospace">x² + y² = z²</text>
        </g>
        
        {/* Frosted Glass Overlay */}
        <rect x="10" y="10" width="80" height="60" rx="6" fill="#0d0d1a" fillOpacity="0.75" stroke="#334155" strokeWidth="0.75" className="backdrop-blur-sm" />
        
        {/* Glitch noise elements inside the glass */}
        <g className="animate-[glitch_3s_infinite]">
          <line x1="15" y1="30" x2="85" y2="30" stroke="#a855f7" strokeWidth="1" strokeDasharray="5 20" opacity="0.6" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="#6366f1" strokeWidth="0.8" strokeDasharray="10 15" opacity="0.5" />
        </g>
        
        <g className="animate-[staticLines_5s_infinite]">
          <rect x="25" y="20" width="50" height="2" fill="#a855f7" opacity="0.2" />
          <rect x="15" y="45" width="70" height="1" fill="#6366f1" opacity="0.3" />
        </g>
        
        {/* Central Question mark */}
        <text x="50" y="48" fill="#a855f7" fontSize="16" fontFamily="monospace" textAnchor="middle" opacity="0.25" className="animate-[breathe_4s_infinite] font-bold">?</text>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 6. Paint stroke cosmic nebula representing creativity (Moment 6)
function ArtistInsideIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#05050b]/40 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="artGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <radialGradient id="nebulaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.15"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        {/* Background glow */}
        <circle cx="50" cy="40" r="30" fill="url(#nebulaGlow)" className="animate-[breathe_8s_infinite]" />
        
        {/* Swirling color paths */}
        <path d="M15 55 Q35 15 65 30 T85 45" stroke="url(#artGrad1)" strokeWidth="5" strokeLinecap="round" fill="none" strokeOpacity="0.8" className="animate-[float_6s_infinite]" />
        <path d="M10 40 Q40 60 70 35 T90 25" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.6" className="animate-[breathe_5s_infinite]" style={{ animationDelay: "1s" }} />
        
        {/* Easel/palette minimal silhouettes */}
        <g className="animate-[float_7s_infinite]" style={{ transformOrigin: "50px 40px", animationDelay: "0.5s" }}>
          {/* Palette */}
          <path d="M45 45 C40 45 35 48 35 53 C35 58 45 61 53 58 C57 56 60 52 58 48 C56 44 50 45 45 45 Z" fill="#1e293b" stroke="#fbbf24" strokeWidth="0.75" />
          {/* Thumb hole */}
          <circle cx="39" cy="51" r="1.5" fill="#05050b" />
          {/* Tiny color spots on palette */}
          <circle cx="45" cy="49" r="1" fill="#ec4899" />
          <circle cx="50" cy="51" r="1" fill="#f97316" />
          <circle cx="48" cy="55" r="1" fill="#fbbf24" />
          {/* Paintbrush */}
          <line x1="33" y1="62" x2="52" y2="43" stroke="#e2e8f0" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M52 43 L54 41 L53 43 Z" fill="#ec4899" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// 7. School pillars fading down into starry space (Moment 8)
function FinalBellIllustration() {
  return (
    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl border border-white/5 bg-[#05050b]/40 flex items-center justify-center p-6 shadow-inner relative overflow-hidden group">
      <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="spaceOpening" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#050508" />
            <stop offset="40%" stopColor="#090d16" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="portalGlow" cx="50%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
          </radialGradient>
        </defs>
        
        {/* Space background */}
        <rect width="100" height="80" fill="url(#spaceOpening)" />
        
        {/* Glowing portal above */}
        <circle cx="50" cy="25" r="20" fill="url(#portalGlow)" className="animate-[breathe_8s_infinite]" />
        <circle cx="50" cy="25" r="8" stroke="#a855f7" strokeWidth="0.5" strokeOpacity="0.5" className="animate-[float_6s_infinite]" />
        
        {/* Stars */}
        <circle cx="20" cy="15" r="0.5" fill="#fff" className="animate-pulse" style={{ animationDuration: "2s" }} />
        <circle cx="80" cy="20" r="0.4" fill="#fff" className="animate-pulse" style={{ animationDuration: "3s" }} />
        <circle cx="35" cy="35" r="0.6" fill="#fff" className="animate-pulse" style={{ animationDuration: "4s" }} />
        <circle cx="65" cy="10" r="0.5" fill="#fff" className="animate-pulse" style={{ animationDuration: "5s" }} />
        
        {/* School pillars/doors at the bottom fading into black */}
        <g opacity="0.6">
          {/* Ground line */}
          <line x1="5" y1="70" x2="95" y2="70" stroke="#334155" strokeWidth="1.5" />
          {/* Left pillar */}
          <rect x="15" y="45" width="8" height="25" fill="#0f172a" stroke="#1e293b" strokeWidth="0.75" />
          <rect x="13" y="42" width="12" height="3" fill="#1e293b" />
          
          {/* Right pillar */}
          <rect x="77" y="45" width="8" height="25" fill="#0f172a" stroke="#1e293b" strokeWidth="0.75" />
          <rect x="75" y="42" width="12" height="3" fill="#1e293b" />
          
          {/* Archway joining them */}
          <path d="M23 45 Q50 32 77 45" stroke="#1e293b" strokeWidth="2.5" fill="none" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// Walking boy SVG character
function WalkingBoy() {
  return (
    <g>
      <defs>
        {/* Subtle gradient for the body/torso */}
        <linearGradient id="boyBodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a4e" />
          <stop offset="100%" stopColor="#0d0d2b" />
        </linearGradient>
        {/* Backpack gradient (blue/purple accent) */}
        <linearGradient id="boyBackpackGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        {/* Helmet/Head radial gradient for 3D effect */}
        <radialGradient id="boyHeadGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        {/* Blur filter for the drop shadow */}
        <filter id="shadowBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
      </defs>

      {/* Subtle drop shadow/glow underneath the character */}
      <ellipse cx="10" cy="25.5" rx="5" ry="0.8" fill="#a855f7" fillOpacity="0.3" filter="url(#shadowBlur)" />

      {/* The bobbing group wraps everything else */}
      <g className="boy-bob-group">
        {/* Far Leg (Left Leg) pivoted at hip joint (9, 17) */}
        <g style={{ transformOrigin: "9px 17px" }} className="left-leg-group">
          <line x1="9" y1="17" x2="9" y2="25" stroke="#0d0d2b" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
          <circle cx="9" cy="25" r="0.7" fill="#3B82F6" opacity="0.75" />
        </g>

        {/* Backpack group */}
        <g style={{ transformOrigin: "4.75px 12.25px" }} className="boy-backpack-group">
          <rect x="2.5" y="8" width="4.5" height="8.5" rx="1.5" fill="url(#boyBackpackGrad)" />
          <rect x="3.5" y="9.5" width="2.5" height="5.5" rx="0.5" fill="#0d0d2b" fillOpacity="0.3" />
          <line x1="2.5" y1="11" x2="7" y2="11" stroke="#ffffff" strokeWidth="0.4" opacity="0.4" />
          <line x1="2.5" y1="14" x2="7" y2="14" stroke="#ffffff" strokeWidth="0.4" opacity="0.4" />
        </g>

        {/* Torso */}
        <path d="M 7.5 7.5 Q 6.5 12 7.8 17 H 11.5 Q 12 12 11 7.5 Z" fill="url(#boyBodyGrad)" />

        {/* Near Leg (Right Leg) pivoted at hip joint (11, 17) */}
        <g style={{ transformOrigin: "11px 17px" }} className="right-leg-group">
          <line x1="11" y1="17" x2="11" y2="25" stroke="#1a1a4e" strokeWidth="2" strokeLinecap="round" />
          <circle cx="11" cy="25" r="0.8" fill="#A855F7" />
        </g>

        {/* Head/Helmet group */}
        <g style={{ transformOrigin: "10px 4.5px" }} className="boy-helmet-group">
          <circle cx="10" cy="4.5" r="2.5" fill="url(#boyHeadGrad)" />
          <path d="M 11 3.2 Q 12.5 4.2 12.5 5.2 Q 12.5 6.2 11.2 6.7 Z" fill="#93c5fd" fillOpacity="0.85" />
        </g>

        <path d="M 6.5 8 Q 8 8 9 9 Q 8 12 7.5 14" stroke="#3b82f6" strokeWidth="0.6" fill="none" opacity="0.8" />

        {/* Arm group */}
        <g style={{ transformOrigin: "10px 9px" }} className="arm-group">
          <line x1="10" y1="9" x2="12" y2="14.5" stroke="#1a1a4e" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="10.3" y1="9.8" x2="11.8" y2="14" stroke="#3b82f6" strokeWidth="0.5" strokeLinecap="round" />
          <circle cx="12" cy="14.5" r="0.7" fill="#ffffff" />
        </g>
      </g>

      {/* Ambient foot particles group */}
      <g className="foot-particles-group">
        <circle cx="7" cy="25" r="0.4" fill="#a855f7" className="foot-p-1" />
        <circle cx="10" cy="25.5" r="0.3" fill="#3b82f6" className="foot-p-2" />
        <circle cx="13" cy="25" r="0.5" fill="#a855f7" className="foot-p-3" />
      </g>
    </g>
  );
}

// Journey Map Selector
function JourneyMap({ activeChapterIdx, hoveredChapterIdx, setHoveredChapterIdx, onNodeClick, activeModalFragment, setActiveModalFragment }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredFragmentIdx, setHoveredFragmentIdx] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const bgColors = [
    "radial-gradient(circle at 30% 40%, rgba(251, 191, 36, 0.07) 0%, #050508 70%)",
    "radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.07) 0%, #030712 70%)",
    "radial-gradient(circle at 50% 50%, rgba(16, 163, 127, 0.07) 0%, #020617 70%)",
    "radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.07) 0%, #05050b 70%)",
    "radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.07) 0%, #030712 70%)",
    "radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.05) 0%, #020204 70%)"
  ];

  const nodes = [
    { 
      num: "Ch.1", 
      name: "Foundations", 
      id: "chapter-1", 
      cx: 150, cy: 480, mcx: 35, mcy: 60,
      ageRange: "0–12 Years",
      theme: "Roots, family values, and early speech presence.",
      milestones: ["Born in Meerut", "Moving to Rajasthan Society", "First Stage Speech (Class 3)"],
      quote: "Every foundation has a beginning, and mine began with love, values, and dreams.",
      fragments: [
        { id: "hindi-98", label: "98/100 Hindi", hoverText: "Achieved an outstanding score of 98/100 in Hindi, establishing early academic excellence.", isModal: false },
        { id: "early-speech", label: "Stage Performance", hoverText: "Early experiences speaking and performing in front of audiences, building confidence.", isModal: false }
      ]
    },
    { 
      num: "Ch.2", 
      name: "The Shift", 
      id: "chapter-2", 
      cx: 320, cy: 390, mcx: 100, mcy: 72,
      ageRange: "12–14 Years",
      theme: "Moving to Noida, discovering athletics, and adapting to change.",
      milestones: ["Discovering high jump training", "Jawaharlal Nehru Stadium representation"],
      quote: "Change is the only constant, and the best way to handle it is to jump right in.",
      fragments: [
        { id: "national-high-jump", label: "National High Jump ↗", hoverText: "Click to explore the full story of representing my school at the National High Jump Championship.", isModal: true },
        { id: "stadium", label: "Jawaharlal Nehru Stadium", hoverText: "Competing at New Delhi's iconic Jawaharlal Nehru Stadium, learning to perform under pressure.", isModal: false }
      ]
    },
    { 
      num: "Ch.3", 
      name: "Transformation", 
      id: "chapter-3", 
      cx: 490, cy: 320, mcx: 165, mcy: 75,
      ageRange: "14–16 Years",
      theme: "Academic comebacks, film culture, and lifelong friendships.",
      milestones: ["Highest marks in school English exam", "Solving physics problems with Vibhor", "COVID Board preparation days"],
      quote: "It is during our quietest moments of transformation that we find our true strength.",
      fragments: [
        { id: "vibhor", label: "Vibhor", hoverText: "My high school bench partner and best friend who challenged me to grow intellectually.", isModal: false },
        { id: "money-heist", label: "Money Heist Days", hoverText: "Late night movie talks and codename assignments with my high school section circle.", isModal: false },
        { id: "class-10-fam", label: "Class 10 Section", hoverText: "The tight-knit high school family that survived virtual board preparation and pandemic challenges.", isModal: false },
        { id: "maverick", label: "Maverick Guru", hoverText: "Earning my nickname for hosting late night study whiteboard explanation sessions.", isModal: false }
      ]
    },
    { 
      num: "Ch.4", 
      name: "The Leader", 
      id: "chapter-4", 
      cx: 650, cy: 240, mcx: 230, mcy: 55,
      ageRange: "16–17 Years",
      theme: "Student government responsibility, public service, and Sports Day revival.",
      milestones: ["Appointed School Head Boy", "Led student council of 30+", "Organized first Sports Day in 3 years"],
      quote: "A leader is not defined by their title, but by the fire they light in others.",
      fragments: [
        { id: "head-boy", label: "Head Boy Office ↗", hoverText: "Click to read about leading the student body and organizing the major Sports Day event.", isModal: true },
        { id: "dawn", label: "DAWN Foundation ↗", hoverText: "Click to read about coordinating graphic design campaigns for student wellness programs.", isModal: true },
        { id: "academic-74", label: "Academic 74%", hoverText: "A hard lesson in balancing leadership duties with high school final board preparations.", isModal: false }
      ]
    },
    { 
      num: "Ch.5", 
      name: "Crossroads", 
      id: "chapter-5", 
      cx: 800, cy: 160, mcx: 295, mcy: 45,
      ageRange: "17–18 Years",
      theme: "CBSE board examinations, creative escapes, and freelance projects.",
      milestones: ["Scored 81% in CBSE Board exams", "A perfect 100/100 in Fine Arts Landscape project", "Earned first freelance web dev income"],
      quote: "When paths diverge, the hardest choice is usually the one that sets you free.",
      fragments: [
        { id: "first-business", label: "First Business (₹84k) ↗", hoverText: "Click to read about graphic branding and web development projects that earned my first ₹84k.", isModal: true },
        { id: "fine-arts-100", label: "100/100 Fine Arts ↗", hoverText: "Click to see details on my perfect score Class 12 landscape artwork validation.", isModal: true },
        { id: "physics-paper", label: "Physics Exam", hoverText: "Overcoming CBSE Class 12's notoriously difficult physics paper under high pressure.", isModal: false },
        { id: "boards-81", label: "81% CBSE Boards", hoverText: "Conquering CBSE Class 12 graduation board exams after high-stress coffee prep nights.", isModal: false }
      ]
    },
    { 
      num: "Ch.6", 
      name: "Future", 
      id: "chapter-6-future", 
      cx: 920, cy: 80, mcx: 365, mcy: 60,
      ageRange: "Ongoing",
      theme: "College, coding, stealth companies, and the untold next pages.",
      milestones: ["Building AryanVerse digital ecosystem", "Studying B.Tech Computer Science at Bennett University"],
      quote: "The next chapter is yours to write, and yours to live.",
      fragments: []
    }
  ];

  const handleNodeClick = (id) => {
    onNodeClick(id);
  };

  return (
    <div 
      className="relative w-full h-full flex flex-col justify-between items-center py-6 lg:py-12 px-4 select-none overflow-hidden"
      style={{ background: bgColors[activeChapterIdx] || bgColors[0], transition: "background 1.5s ease-in-out" }}
    >
      <div id="map-header" className="text-center flex flex-col gap-2.5 opacity-100 z-10">
        <h1 className="font-orbitron text-2xl lg:text-3xl font-black tracking-widest text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] uppercase">
          JOURNEY MAP
        </h1>
        <p className="font-inter text-[10px] lg:text-xs text-slate-400 italic">
          The story of our universe's hero — Aryan.
        </p>
      </div>

      <div className="hidden lg:block w-full max-w-5xl aspect-[5/3] relative my-6">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="pathGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>

          {/* Elevated terrains */}
          <g transform="translate(0,0)">
            <path d="M 100 510 Q 150 535 200 510 Q 150 485 100 510" fill="#090d16" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.4" />
            <path d="M 125 500 L 132 493 L 139 500 Z" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="0.4" />
            <rect x="127" y="500" width="10" height="8" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="0.4" />
            <path d="M 141 497 L 146 492 L 151 497 Z" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="0.4" />
            <rect x="143" y="497" width="7" height="6" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="0.4" />
            <rect x="156" y="498" width="10" height="2" rx="0.5" fill="#3b82f6" fillOpacity="0.8" />
            <rect x="155" y="501" width="12" height="2" rx="0.5" fill="#a855f7" fillOpacity="0.8" />
          </g>

          <g transform="translate(0,0)">
            <path d="M 270 420 Q 320 440 370 420 Q 320 400 270 420" fill="#090d16" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.4" />
            <polygon points="290,420 310,380 330,420" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="0.4" />
            <polygon points="315,420 335,370 355,420" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="0.4" />
            <path d="M 285 395 Q 292 388 299 395 Q 306 395 303 402 Z" fill="#0f172a" opacity="0.3" />
            <path d="M 335 385 Q 341 379 347 385 Q 353 385 350 391 Z" fill="#0f172a" opacity="0.3" />
          </g>

          <g transform="translate(0,0)">
            <path d="M 440 350 Q 490 370 540 350 Q 490 330 440 350" fill="#090d16" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.4" />
            <rect x="465" y="305" width="8" height="40" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="0.4" />
            <rect x="477" y="295" width="12" height="50" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="0.4" />
            <rect x="495" y="312" width="8" height="33" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="0.4" />
            <circle cx="473" cy="336" r="5" stroke="#a855f7" strokeWidth="0.4" />
            <circle cx="503" cy="336" r="4" stroke="#3b82f6" strokeWidth="0.4" />
          </g>

          <g transform="translate(0,0)">
            <path d="M 600 270 Q 650 290 700 270 Q 650 250 600 270" fill="#090d16" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.4" />
            <rect x="622" y="225" width="8" height="35" fill="#1e1b4b" stroke="#a855f7" strokeWidth="0.4" />
            <polygon points="620,225 626,217 632,225" fill="#1e1b4b" stroke="#a855f7" strokeWidth="0.4" />
            <rect x="655" y="225" width="8" height="35" fill="#1e1b4b" stroke="#a855f7" strokeWidth="0.4" />
            <polygon points="653,225 659,217 665,225" fill="#1e1b4b" stroke="#a855f7" strokeWidth="0.4" />
            <rect x="630" y="235" width="25" height="25" fill="#1e1b4b" stroke="#a855f7" strokeWidth="0.4" />
            <path d="M 637 260 L 637 250 Q 642 245 647 250 L 647 260 Z" fill="#0d0d1a" stroke="#a855f7" strokeWidth="0.4" />
            <path d="M 636 210 L 639 215 L 642 210 L 645 215 L 648 210 L 648 218 L 636 218 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.4" />
          </g>

          <g transform="translate(0,0)">
            <path d="M 750 190 Q 800 210 850 190 Q 800 170 750 190" fill="#090d16" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.4" />
            <line x1="785" y1="190" x2="785" y2="165" stroke="#94a3b8" strokeWidth="0.5" />
            <rect x="774" y="167" width="11" height="6" rx="0.5" fill="#1e1b4b" stroke="#94a3b8" strokeWidth="0.4" />
            <rect x="785" y="174" width="12" height="6" rx="0.5" fill="#1e1b4b" stroke="#94a3b8" strokeWidth="0.4" />
            <rect x="805" y="176" width="14" height="9" rx="0.5" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="0.4" />
          </g>

          <g transform="translate(0,0)">
            <path d="M 870 110 Q 920 130 970 110 Q 920 90 870 110" fill="#090d16" stroke="#fbbf24" strokeWidth="0.5" strokeOpacity="0.3" />
            <circle cx="920" cy="80" r="16" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="3 3" className="animate-[spin_40s_linear_infinite]" style={{ transformOrigin: "920px 80px" }} />
            <circle cx="920" cy="80" r="11" stroke="#a855f7" strokeWidth="0.6" strokeDasharray="2 2" className="animate-[spin_25s_linear_infinite_reverse]" style={{ transformOrigin: "920px 80px" }} />
            <circle cx="920" cy="80" r="3" fill="#fbbf24" className="animate-pulse" />
          </g>

          <path
            d="M 150 480 C 230 470, 260 400, 320 390 C 400 370, 430 310, 490 320 C 560 290, 590 260, 650 240 C 720 210, 750 180, 800 160 C 860 130, 890 100, 920 80"
            stroke="url(#pathGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeOpacity="0.45"
            filter="url(#purpleGlow)"
          />

          <path
            d="M 150 480 C 230 470, 260 400, 320 390 C 400 370, 430 310, 490 320 C 560 290, 590 260, 650 240 C 720 210, 750 180, 800 160 C 860 130, 890 100, 920 80"
            stroke="url(#pathGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="6 20"
            className="animate-[flowParticles_3.5s_linear_infinite]"
            opacity="0.95"
            filter="url(#purpleGlow)"
          />

          <path
            id="desktop-path"
            d="M 150 480 C 230 470, 260 400, 320 390 C 400 370, 430 310, 490 320 C 560 290, 590 260, 650 240 C 720 210, 750 180, 800 160 C 860 130, 890 100, 920 80"
            stroke="url(#pathGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="8 8"
            strokeOpacity="0.35"
          />

          <path
            d="M 800 160 C 840 170, 880 180, 920 185"
            stroke="url(#pathGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="6 8"
            strokeOpacity="0.2"
          />
          <text x="925" y="190" fill="#a855f7" className="font-space-mono text-xs font-bold animate-pulse">?</text>

          {/* Walking Boy Character Desktop */}
          <g id="desktop-boy">
            <g transform="scale(2.5)">
              <WalkingBoy />
            </g>
          </g>

          {nodes.map((node, cIdx) => {
            const isFuturePortal = node.id === "chapter-6-future";
            const isActive = activeChapterIdx === cIdx;
            const isCompleted = activeChapterIdx > cIdx;
            
            if (isFuturePortal) {
              return (
                <g
                  key={node.id}
                  className="map-node-group-future cursor-pointer group"
                  onClick={() => handleNodeClick("chapter-6-future")}
                  onMouseEnter={() => setHoveredChapterIdx(cIdx)}
                  onMouseLeave={() => setHoveredChapterIdx(null)}
                >
                  <circle cx={node.cx} cy={node.cy} r="25" className="stroke-[#fbbf24]/30 stroke-dasharray-4 strokeWidth-1 fill-none animate-[spin_30s_linear_infinite]" style={{ transformOrigin: `${node.cx}px ${node.cy}px` }} />
                  <circle cx={node.cx} cy={node.cy} r="18" className="stroke-[#fbbf24]/50 stroke-dasharray-3 strokeWidth-1.5 fill-none animate-[spin_20s_linear_infinite_reverse]" style={{ transformOrigin: `${node.cx}px ${node.cy}px` }} />
                  <circle cx={node.cx} cy={node.cy} r="12" className="stroke-[#fbbf24] strokeWidth-1 fill-none animate-pulse" />
                  <circle cx={node.cx} cy={node.cy} r="5" className="fill-[#fbbf24] shadow-[0_0_10px_#fbbf24]" />
                  <text x={node.cx} y={node.cy - 30} textAnchor="middle" className="font-space-mono text-[9px] fill-[#fbbf24] font-bold uppercase tracking-wider animate-pulse">{node.num}</text>
                  <text x={node.cx} y={node.cy + 34} textAnchor="middle" className="font-orbitron text-[10px] font-black fill-white tracking-widest uppercase transition-colors duration-300 group-hover:text-[#fbbf24]">{node.name}</text>
                </g>
              );
            }

            return (
              <g
                key={node.id}
                className="map-node-group cursor-pointer group"
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => setHoveredChapterIdx(cIdx)}
                onMouseLeave={() => setHoveredChapterIdx(null)}
              >
                {isCompleted && (
                  <circle cx={node.cx} cy={node.cy} r="16" fill="none" stroke="#a855f7" strokeWidth="1.5" className="completed-node-ring" style={{ transformOrigin: `${node.cx}px ${node.cy}px` }} />
                )}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="16"
                  className={`fill-[#050508] stroke-[#a855f7] strokeWidth-2 transition-all duration-300 group-hover:stroke-white ${
                    isActive ? "stroke-white scale-110" : ""
                  }`}
                  style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="5"
                  className={`${isCompleted ? "fill-[#10A37F]" : isActive ? "fill-white" : "fill-[#a855f7] group-hover:fill-white"} transition-colors duration-300`}
                />
                <text x={node.cx} y={node.cy - 24} textAnchor="middle" className={`font-space-mono text-[9px] font-bold uppercase tracking-wider ${isActive ? "fill-white" : "fill-slate-400"}`}>{node.num}</text>
                <text x={node.cx} y={node.cy + 30} textAnchor="middle" className={`font-orbitron text-[10px] font-black tracking-widest uppercase transition-colors duration-300 ${isActive ? "text-purple-400" : isCompleted ? "text-[#10A37F]" : "text-white group-hover:text-purple-400"}`}>{node.name}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="block lg:hidden w-full max-w-sm aspect-[2/1] relative my-2">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            id="mobile-path"
            d="M 35 60 Q 115 80 200 60 Q 280 40 365 60"
            stroke="#a855f7"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="6 6"
            strokeOpacity="0.5"
            fill="none"
          />

          {/* Walking Boy Character Mobile */}
          <g id="mobile-boy">
            <g transform="scale(2.5)">
              <WalkingBoy />
            </g>
          </g>

          {nodes.map((node, cIdx) => {
            const mx = node.mcx;
            const my = node.mcy;
            
            const isFuturePortal = node.id === "chapter-6-future";
            const isActive = activeChapterIdx === cIdx;
            const isCompleted = activeChapterIdx > cIdx;
            
            if (isFuturePortal) {
              return (
                <g
                  key={node.id}
                  className="map-node-group-mobile cursor-pointer group"
                  onClick={() => handleNodeClick("chapter-6-future")}
                  onMouseEnter={() => setHoveredChapterIdx(cIdx)}
                  onMouseLeave={() => setHoveredChapterIdx(null)}
                >
                  <circle cx={mx} cy={my} r="10" className="stroke-[#fbbf24] strokeWidth-1 fill-none animate-pulse" />
                  <circle cx={mx} cy={my} r="3" className="fill-[#fbbf24]" />
                  <text x={mx} y={my - 16} textAnchor="middle" className="font-space-mono text-[8px] fill-[#fbbf24] font-bold">{node.num}</text>
                  <text x={mx} y={my + 20} textAnchor="middle" className="font-orbitron text-[8px] font-black fill-white uppercase tracking-wider">{node.name}</text>
                </g>
              );
            }

            return (
              <g
                key={node.id}
                className="map-node-group-mobile cursor-pointer group"
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => setHoveredChapterIdx(cIdx)}
                onMouseLeave={() => setHoveredChapterIdx(null)}
              >
                <circle
                  cx={mx}
                  cy={my}
                  r="12"
                  className={`fill-[#050508] stroke-[#a855f7] strokeWidth-1.5 transition-all duration-300 group-hover:stroke-white ${
                    isActive ? "stroke-white scale-110" : ""
                  }`}
                />
                <circle cx={mx} cy={my} r="4" className={`${isCompleted ? "fill-[#10A37F]" : isActive ? "fill-white" : "fill-[#a855f7]"}`} />
                <text x={mx} y={my - 18} textAnchor="middle" className={`font-space-mono text-[8px] font-bold ${isActive ? "fill-white" : "fill-slate-400"}`}>{node.num}</text>
                <text x={mx} y={my + 22} textAnchor="middle" className={`font-orbitron text-[8px] font-black tracking-wider uppercase ${isActive ? "text-purple-400" : isCompleted ? "text-[#10A37F]" : "text-white"}`}>{node.name}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {hoveredChapterIdx !== null && (
        <div 
          className="absolute z-40 pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: isMobile ? "50%" : `${(nodes[hoveredChapterIdx].cx > 500) ? (nodes[hoveredChapterIdx].cx - 300) : (nodes[hoveredChapterIdx].cx + 20)}px`,
            top: isMobile ? "auto" : `${nodes[hoveredChapterIdx].cy - 110}px`,
            bottom: isMobile ? "10px" : "auto",
            transform: isMobile ? "translateX(-50%)" : "none",
            width: "260px"
          }}
        >
          <div className="bg-slate-950/80 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4 shadow-[0_0_30px_rgba(168,85,247,0.25)] flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <span className="font-space-mono text-[8px] text-purple-400 font-bold uppercase tracking-wider">{nodes[hoveredChapterIdx].num}</span>
              <span className="font-space-mono text-[8px] text-slate-500 font-bold uppercase">{nodes[hoveredChapterIdx].ageRange}</span>
            </div>
            <h3 className="font-orbitron text-xs font-black text-white tracking-widest uppercase">{nodes[hoveredChapterIdx].name}</h3>
            <div className="h-[1px] bg-white/10 my-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="font-space-mono text-[7px] text-slate-500 uppercase font-bold">Theme</span>
              <p className="font-inter text-[10px] text-slate-300 leading-normal">{nodes[hoveredChapterIdx].theme}</p>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-space-mono text-[7px] text-slate-500 uppercase font-bold">Milestones</span>
              <ul className="list-none flex flex-col gap-0.5">
                {nodes[hoveredChapterIdx].milestones.slice(0, 2).map((m, i) => (
                  <li key={i} className="font-inter text-[9px] text-slate-400 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-purple-500" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <p className="font-inter text-[9px] text-slate-400 italic border-l border-purple-500/40 pl-2 py-0.5 mt-1 leading-normal">
              "{nodes[hoveredChapterIdx].quote}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const importantMemories = {
  "national-high-jump": {
    title: "National High Jump Championship",
    subtitle: "Class 8 Athletics Achievement",
    image: "/certificates/cert-1.jpg",
    story: "After moving to Rajasthan, I discovered sports. The high jump became my obsession. I spent hours practicing landing techniques on sandbeds. In Class 8, I qualified for the National High Jump Championship, representing my school and region, proving that adaptability is key to success.",
    achievements: ["National Level Athlete Qualification", "Inter-School High Jump Gold", "Rajasthan Regional Representative"],
    context: "Class 8 Athletics, Rajasthan Campus"
  },
  "head-boy": {
    title: "Appointed School Head Boy",
    subtitle: "Student Council Leadership",
    image: "/headboy-photo.jpg",
    story: "Being appointed Head Boy was the peak of my school journey. I was responsible for leading a student council of 30, organizing morning assemblies, and coordinating inter-school meets. It taught me that real leadership is about empathy, service, and lifting others.",
    achievements: ["Student Council leadership of 30+ peers", "Revival and organization of Sports Day", "CBSE leadership medal recipient"],
    context: "Class 11, Student Council Noida"
  },
  "fine-arts-100": {
    title: "100/100 Perfect Fine Arts Score",
    subtitle: "CBSE Class 12 Creativity Milestone",
    image: "/certificates/cert-5.jpg",
    story: "Art has always been my escape. For my Class 12 Fine Arts project, I painted a detailed landscape capturing the theme of perspective and horizon. The external examiner awarded me a perfect score of 100/100, a proud moment validating my creative soul.",
    achievements: ["Perfect score in CBSE Class 12 Board", "Best landscape painting award"],
    context: "Class 12 Boards, Noida"
  },
  "first-business": {
    title: "First Independent Income: Freelance Web Development",
    subtitle: "Earning ₹84k from Scratch",
    image: "/certificates/cert-2.jpg",
    story: "During the high school transitions, I started designing graphic assets and coding websites for small businesses. Working late nights, I successfully completed a set of branding and development projects, earning my first major independent income of ₹84,000. It proved to me that the ability to create value out of nothing is the ultimate skill.",
    achievements: ["Developed 5 client websites", "Earned ₹84,000 independent income", "Mastered UI design and web stacks"],
    context: "Class 12 Crossroads"
  },
  "dawn-foundation": {
    title: "Volunteering with DAWN Foundation",
    subtitle: "Graphic Design Campaign Lead",
    image: "/certificates/cert-3.jpg",
    story: "I joined the DAWN Foundation as a graphic designer to help coordinate digital campaigns and raise awareness for student wellness programs. Designing visual narratives taught me how to communicate powerful messages through layout, typography, and color, bridging design and social impact.",
    achievements: ["Designed campaigns reaching 5,000+ students", "Created educational social flyers", "Appreciation award from organization trustees"],
    context: "Class 11-12 Community Service"
  }
};

function MemoryModal({ fragmentId, onClose }) {
  const data = importantMemories[fragmentId];
  if (!data) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl transition-all duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full bg-[#090d16]/90 border border-purple-500/30 p-6 md:p-8 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-y-auto max-h-[90vh] flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 transition-colors cursor-pointer font-space-mono text-xs border border-white/5 bg-white/5 rounded-full w-8 h-8 flex items-center justify-center hover:border-purple-500/30"
        >
          ✕
        </button>

        <div className="flex flex-col gap-1 text-left">
          <span className="font-space-mono text-[9px] text-purple-400 font-bold uppercase tracking-widest">
            {data.context}
          </span>
          <h3 className="font-orbitron text-xl md:text-2xl font-black text-white uppercase tracking-wider">
            {data.title}
          </h3>
          <span className="font-space-mono text-[10px] text-slate-500 font-bold uppercase mt-0.5">
            {data.subtitle}
          </span>
        </div>

        <div className="h-[1px] bg-white/10" />

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="flex flex-col gap-4 text-left">
            <p className="font-inter text-sm text-slate-300 leading-relaxed">
              {data.story}
            </p>
            
            <div className="flex flex-col gap-2 mt-2">
              <span className="font-space-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Key Achievements</span>
              <ul className="list-none flex flex-col gap-1.5">
                {data.achievements.map((item, idx) => (
                  <li key={idx} className="font-inter text-xs text-slate-400 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0 shadow-[0_0_4px_#a855f7]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center">
            {data.image && (
              <div className="w-full aspect-[4/3] rounded-2xl border border-white/10 overflow-hidden bg-slate-900 flex items-center justify-center relative group">
                <img 
                  src={data.image} 
                  alt={data.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FuturePortalModal({ onClose }) {
  const missions = [
    { name: "AryanVerse", desc: "Crafting the immersive, next-gen virtual universe." },
    { name: "Data Science", desc: "Analyzing high-dimensional neural networks and patterns." },
    { name: "Unessa Foundation", desc: "Leading tech and design infrastructure for positive social impact." },
    { name: "Unscripted Love", desc: "Writing the emotional script of life, code, and relationship notes." },
    { name: "Future Company", desc: "Laying foundations for a stealth startup team." }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl transition-all duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-xl w-full bg-[#050508]/95 border border-[#fbbf24]/30 p-6 md:p-8 rounded-3xl shadow-[0_0_50px_rgba(251,191,36,0.2)] flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 transition-colors cursor-pointer font-space-mono text-xs border border-white/5 bg-white/5 rounded-full w-8 h-8 flex items-center justify-center hover:border-[#fbbf24]/30"
        >
          ✕
        </button>

        <div className="flex flex-col gap-1 text-left">
          <span className="font-space-mono text-[9px] text-[#fbbf24] font-bold uppercase tracking-widest">
            Future Beacon Active
          </span>
          <h3 className="font-orbitron text-xl md:text-2xl font-black text-white uppercase tracking-wider">
            "The story is still being written."
          </h3>
          <span className="font-space-mono text-[10px] text-slate-500 font-bold uppercase mt-0.5">
            Chapter 6 Missions & Objectives
          </span>
        </div>

        <div className="h-[1px] bg-white/10" />

        <div className="flex flex-col gap-4 text-left">
          <span className="font-space-mono text-[9px] text-slate-400 uppercase tracking-wider font-bold">Current Missions</span>
          <div className="flex flex-col gap-3">
            {missions.map((m, idx) => (
              <div key={idx} className="bg-white/5 border border-white/5 p-3.5 rounded-xl flex flex-col gap-1 hover:border-[#fbbf24]/20 transition-all duration-300">
                <span className="font-orbitron text-xs font-black text-white tracking-widest uppercase">
                  {m.name}
                </span>
                <p className="font-inter text-[11px] text-slate-400 leading-normal">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="font-inter text-xs text-slate-500 italic text-center mt-2 leading-relaxed">
          "The best way to predict the future is to build it."
        </p>
      </div>
    </div>
  );
}

function ChapterStats({ age, location, themes, achievement, mentors }) {
  return (
    <div className="scroll-animate-moment w-full py-6 px-6 md:px-16 border-b border-white/5 bg-[#05050b]/20 relative z-10">
      <div className="max-w-4xl mx-auto bg-slate-950/60 border border-white/5 backdrop-blur-xl p-5 rounded-2xl grid grid-cols-2 md:grid-cols-5 gap-4 text-center shadow-[0_0_20px_rgba(255,255,255,0.02)]">
        <div className="flex flex-col gap-1 justify-center">
          <span className="font-space-mono text-[8px] text-slate-500 uppercase tracking-widest font-bold">Age</span>
          <span className="font-orbitron text-base font-black text-white">{age}</span>
        </div>
        <div className="flex flex-col gap-1 justify-center border-l border-white/5">
          <span className="font-space-mono text-[8px] text-slate-500 uppercase tracking-widest font-bold">Key Location</span>
          <span className="font-orbitron text-xs font-black text-white leading-normal">{location}</span>
        </div>
        <div className="flex flex-col gap-1 justify-center border-l border-white/5 col-span-2 md:col-span-1">
          <span className="font-space-mono text-[8px] text-slate-500 uppercase tracking-widest font-bold">Major Themes</span>
          <span className="font-inter text-[10px] text-slate-300 leading-normal">{themes}</span>
        </div>
        <div className="flex flex-col gap-1 justify-center border-l border-white/5">
          <span className="font-space-mono text-[8px] text-slate-500 uppercase tracking-widest font-bold">Key Achievement</span>
          <span className="font-inter text-[10px] text-[#fbbf24] font-bold leading-normal">{achievement}</span>
        </div>
        <div className="flex flex-col gap-1 justify-center border-l border-white/5">
          <span className="font-space-mono text-[8px] text-slate-500 uppercase tracking-widest font-bold">Key People</span>
          <span className="font-inter text-[10px] text-slate-400 leading-normal">{mentors}</span>
        </div>
      </div>
    </div>
  );
}

function ChapterCompletionCard({ title, lessons, quote, onNextClick }) {
  return (
    <div className="scroll-animate-moment w-full py-12 px-6 md:px-16 border-b border-white/5 bg-[#05050b]/35 relative z-10">
      <div className="max-w-xl mx-auto bg-gradient-to-br from-[#0d0d1a]/80 to-[#1e1b4b]/20 border border-purple-500/20 backdrop-blur-2xl p-6 rounded-3xl flex flex-col gap-4 shadow-[0_0_30px_rgba(168,85,247,0.1)] text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#fbbf24]/5 rounded-full blur-xl" />

        <span className="font-space-mono text-[9px] text-purple-400 tracking-[0.25em] uppercase font-bold">
          Chapter Completed
        </span>
        <h3 className="font-orbitron text-xl md:text-2xl font-black text-white tracking-widest uppercase">
          {title}
        </h3>
        
        <div className="h-[1px] bg-white/10 w-20 mx-auto" />
        
        <div className="flex flex-col gap-1.5">
          <span className="font-space-mono text-[8px] text-slate-500 uppercase tracking-widest font-bold">
            Lessons Learned
          </span>
          <div className="flex flex-wrap gap-2 justify-center mt-1">
            {lessons.map((lesson, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-inter text-[10px] text-slate-300 font-medium">
                {lesson}
              </span>
            ))}
          </div>
        </div>

        <p className="font-inter text-xs text-slate-400 italic mt-2 leading-relaxed border-l-2 border-purple-500/30 pl-4 py-1 text-left max-w-md mx-auto">
          "{quote}"
        </p>

        {onNextClick && (
          <button 
            onClick={onNextClick}
            className="mt-3 mx-auto flex items-center gap-2 px-4 py-2 border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-white rounded-xl font-space-mono text-[10px] tracking-wider transition-all duration-300 hover:border-purple-400/50 group cursor-pointer"
          >
            CONTINUE STORY <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
        )}
      </div>
    </div>
  );
}

function TheAryanLayer({ onBeginClick }) {
  return (
    <section id="intro-section" className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-12 px-6 md:px-16 border-b border-white/5 relative z-10">
      <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-gradient-to-tr from-[#3b82f6]/5 via-[#a855f7]/5 to-transparent blur-[140px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-3xl mx-auto flex flex-col gap-5 w-full text-left">
        <span className="font-space-mono text-xs tracking-[0.3em] text-[#3B82F6] uppercase font-bold">
          Introduction
        </span>
        <h1 className="font-orbitron text-4xl md:text-6xl font-black tracking-widest text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] leading-tight">
          ARYAN CHAUHAN
        </h1>
        <div className="flex flex-wrap gap-x-3 gap-y-1 font-space-mono text-[10px] md:text-xs text-slate-400 uppercase tracking-widest font-bold">
          <span>Builder</span>
          <span className="text-[#a855f7]">•</span>
          <span>Storyteller</span>
          <span className="text-[#a855f7]">•</span>
          <span>Student</span>
          <span className="text-[#a855f7]">•</span>
          <span>Future Founder</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 bg-slate-950/60 border border-white/5 p-5 rounded-xl backdrop-blur-xl shadow-inner">
          <div className="flex flex-col gap-1 border-r border-white/5 pr-4">
            <span className="font-space-mono text-[8px] text-slate-500 uppercase tracking-wider font-bold">Age</span>
            <span className="font-orbitron text-lg font-black text-white">18</span>
          </div>
          <div className="flex flex-col gap-1 md:border-r border-white/5 px-2">
            <span className="font-space-mono text-[8px] text-slate-500 uppercase tracking-wider font-bold">Mission</span>
            <span className="font-orbitron text-xs font-black text-[#fbbf24] leading-normal uppercase">Building AryanVerse</span>
          </div>
          <div className="flex flex-col gap-1 border-r border-white/5 px-2 col-span-2 md:col-span-1 mt-2 md:mt-0">
            <span className="font-space-mono text-[8px] text-slate-500 uppercase tracking-wider font-bold">Location</span>
            <span className="font-orbitron text-xs font-black text-white leading-normal uppercase">Bennett University</span>
          </div>
          <div className="flex flex-col gap-1 pl-4 mt-2 md:mt-0">
            <span className="font-space-mono text-[8px] text-slate-500 uppercase tracking-wider font-bold">Obsession</span>
            <span className="font-inter text-xs text-slate-300 font-semibold leading-normal">Creating from scratch</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 max-w-2xl mt-6 border-l-2 border-[#3b82f6]/40 pl-5 py-1.5">
          <p className="font-inter text-sm md:text-base text-slate-300 leading-relaxed italic">
            "I don't believe people are defined by a resume."
          </p>
          <p className="font-inter text-sm md:text-base text-slate-300 leading-relaxed italic">
            "I believe they are defined by the stories they collect, the people they become, and the things they choose to build."
          </p>
          <p className="font-inter text-sm md:text-base text-slate-300 leading-relaxed italic">
            "This archive is my story so far."
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={onBeginClick}
            className="flex items-center gap-2 px-5 py-2.5 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#3b82f6] text-white rounded-xl font-space-mono text-[10px] tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.02)] group cursor-pointer"
          >
            BEGIN JOURNEY <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function JourneyProgress({ activeIdx }) {
  const chs = [
    { num: 1, name: "Foundations" },
    { num: 2, name: "The Shift" },
    { num: 3, name: "Transformation" },
    { num: 4, name: "The Leader" },
    { num: 5, name: "Crossroads" },
    { num: 6, name: "Future" }
  ];

  return (
    <div className="fixed top-8 right-8 z-40 hidden xl:flex flex-col gap-2 bg-slate-950/60 backdrop-blur-xl border border-white/5 p-4.5 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.5)] select-none">
      <span className="font-space-mono text-[8px] text-slate-500 uppercase tracking-widest font-black text-center border-b border-white/5 pb-2">
        Journey Progress
      </span>
      <div className="flex flex-col gap-1.5 mt-2">
        {chs.map((c, i) => {
          const isActive = activeIdx === i;
          const isCompleted = activeIdx > i;
          
          return (
            <div key={i} className="flex items-center gap-2.5">
              <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center font-space-mono text-[8px] font-bold border transition-all duration-300 ${
                isActive 
                  ? "bg-purple-500/20 border-purple-400 text-purple-200 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                  : isCompleted
                    ? "bg-[#10A37F]/10 border-[#10A37F]/40 text-[#10A37F]"
                    : "bg-slate-900/40 border-white/5 text-slate-500"
              }`}>
                {isCompleted ? "✓" : c.num}
              </span>
              <span className={`font-orbitron text-[8px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                isActive 
                  ? "text-purple-300 font-extrabold"
                  : isCompleted
                    ? "text-slate-400"
                    : "text-slate-600"
              }`}>
                Ch.{c.num} {c.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Left Side biography profile card
function LeftProfileCard() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 bg-[#050508]/40 backdrop-blur-md relative overflow-hidden select-none">
      <div className="flex flex-col gap-6 items-start">
        {/* Styled Profile Image */}
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)] group shrink-0">
          <img 
            src="/aryan-photo.jpg" 
            alt="Aryan Chauhan" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "/headboy-photo.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Name and Roles */}
        <div className="flex flex-col gap-2.5 text-left">
          <h1 className="font-orbitron text-2xl lg:text-3xl font-black tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] uppercase">
            Aryan Chauhan
          </h1>
          <div className="flex flex-wrap gap-x-2 gap-y-1 font-space-mono text-[9px] text-[#A855F7] uppercase tracking-widest font-bold">
            <span>Builder</span>
            <span>•</span>
            <span>Storyteller</span>
            <span>•</span>
            <span>Explorer</span>
            <span>•</span>
            <span>Future Founder</span>
          </div>
        </div>

        <div className="h-[1px] bg-white/10 w-full" />

        {/* Small personal description */}
        <p className="font-inter text-xs text-slate-400 leading-relaxed text-left italic">
          "I don't believe people are defined by a resume. I believe they are defined by the stories they collect, the people they become, and the things they choose to build."
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3.5 w-full mt-2">
          <div className="flex flex-col gap-0.5 bg-white/5 border border-white/5 p-2.5 rounded-xl text-left">
            <span className="font-space-mono text-[7px] text-slate-500 uppercase tracking-wider font-bold">Age</span>
            <span className="font-orbitron text-xs font-black text-white">18</span>
          </div>
          <div className="flex flex-col gap-0.5 bg-white/5 border border-white/5 p-2.5 rounded-xl text-left">
            <span className="font-space-mono text-[7px] text-slate-500 uppercase tracking-wider font-bold">Location</span>
            <span className="font-orbitron text-[9px] font-black text-white leading-normal uppercase">Bennett University</span>
          </div>
          <div className="flex flex-col gap-0.5 bg-white/5 border border-white/5 p-2.5 rounded-xl text-left col-span-2">
            <span className="font-space-mono text-[7px] text-slate-500 uppercase tracking-wider font-bold">Current Mission</span>
            <span className="font-orbitron text-[9px] font-black text-[#fbbf24] leading-normal uppercase">Building AryanVerse</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-left">
        <span className="font-space-mono text-[8px] text-slate-500 uppercase tracking-widest font-bold">
          Select a destination landmark on the map
        </span>
      </div>
    </div>
  );
}

export default function JourneyPage() {
  const mainRef = useRef(null);
  const [viewMode, setViewMode] = useState("MAP"); // "MAP" or "CHAPTER"
  const [currentChapter, setCurrentChapter] = useState({
    title: "CHAPTER 1 — FOUNDATIONS",
    subtitle: "Birth to Class 6",
  });
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [hoveredChapterIdx, setHoveredChapterIdx] = useState(null);
  const [activeModalFragment, setActiveModalFragment] = useState(null);
  const prevIdxRef = useRef(0);

  const handleNodeClick = (id) => {
    const chNodes = [
      "chapter-1", "chapter-2", "chapter-3", "chapter-4", "chapter-5", "chapter-6-future"
    ];
    const idx = chNodes.indexOf(id);
    if (idx !== -1) {
      setActiveChapterIdx(idx);
      // Wait for walking boy travel before zooming in
      setTimeout(() => {
        setViewMode("CHAPTER");
      }, 1200);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial positions setup
    gsap.set("#desktop-boy", { x: 125, y: 417.5, opacity: 0 }); // Node 1 (150, 480) -> (125, 417.5)
    gsap.set("#mobile-boy", { x: 10, y: -4, opacity: 0 }); // Mobile Node 1 horizontal: (35, 60) -> (10, -4)
    gsap.set(".map-node-group", { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set(".map-node-group-mobile", { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set(".map-node-group-future", { opacity: 0, scale: 0, transformOrigin: "center center" });
    gsap.set("#map-header", { opacity: 0, y: -20 });

    const desktopPath = document.getElementById("desktop-path");
    const mobilePath = document.getElementById("mobile-path");
    let dLength = 0;
    let mLength = 0;

    if (desktopPath) {
      dLength = desktopPath.getTotalLength();
      gsap.set(desktopPath, { strokeDasharray: dLength, strokeDashoffset: dLength });
    }
    if (mobilePath) {
      mLength = mobilePath.getTotalLength();
      gsap.set(mobilePath, { strokeDasharray: mLength, strokeDashoffset: mLength });
    }

    const loadTimeline = gsap.timeline({ delay: 0.5 });
    
    // Header fades in
    loadTimeline.to("#map-header", { opacity: 1, y: 0, duration: 0.5 });

    // Path draws itself
    if (desktopPath) {
      loadTimeline.to(desktopPath, { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" }, "-=0.2");
    }
    if (mobilePath) {
      loadTimeline.to(mobilePath, { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" }, "<");
    }

    // Boy fades in at start
    loadTimeline.to(["#desktop-boy", "#mobile-boy"], { opacity: 1, duration: 0.2 }, "-=0.2");

    // Nodes pop/stagger in
    loadTimeline.to(gsap.utils.toArray(".map-node-group"), { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "elastic.out(1, 0.7)" });
    loadTimeline.to(gsap.utils.toArray(".map-node-group-mobile"), { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "elastic.out(1, 0.7)" }, "<");
    loadTimeline.to(gsap.utils.toArray(".map-node-group-future"), { opacity: 1, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.7)" }, "<");

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Update chapter details when activeChapterIdx changes
  useEffect(() => {
    const chNames = [
      { title: "CHAPTER 1 — FOUNDATIONS", subtitle: "Birth to Class 6" },
      { title: "CHAPTER 2 — THE SHIFT", subtitle: "Class 7 to Class 9" },
      { title: "CHAPTER 3 — THE TRANSFORMATION", subtitle: "Class 7 to Class 10" },
      { title: "CHAPTER 4 — THE LEADER", subtitle: "Class 11 Milestone" },
      { title: "CHAPTER 5 — THE CROSSROADS", subtitle: "Class 12 Milestone" },
      { title: "CHAPTER 6 — THE FUTURE", subtitle: "College and Beyond" }
    ];
    const info = chNames[activeChapterIdx];
    if (info) {
      setCurrentChapter(info);
    }
  }, [activeChapterIdx]);

  // Dynamically initialize and refresh ScrollTriggers for active chapter moments
  useEffect(() => {
    if (viewMode !== "CHAPTER") return;

    // Use a deferred timeout to ensure the DOM is fully painted and heights are correct
    const timer = setTimeout(() => {
      // Clean up any old scroll-animate-moment ScrollTriggers to prevent layout bugs
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger && trigger.vars.trigger.classList.contains("scroll-animate-moment")) {
          trigger.kill();
        }
      });

      const activeChapterEl = document.getElementById(`chapter-${activeChapterIdx + 1}`);
      if (!activeChapterEl) return;

      const moments = Array.from(activeChapterEl.querySelectorAll(".scroll-animate-moment"));
      if (moments.length === 0) return;

      // Split between the first 2 moments (stats banner + title screen) and the rest
      const instantMoments = moments.slice(0, 2);
      const scrollMoments = moments.slice(2);

      // 1. Animate stats banner and title screen instantly on load (no scroll required!)
      gsap.fromTo(
        instantMoments,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out"
        }
      );

      // 2. Animate the remaining moments down the page on scroll
      gsap.set(scrollMoments, { y: 50, opacity: 0 });

      scrollMoments.forEach((moment) => {
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
              start: "top 95%", // Trigger immediately when entering from the bottom
              toggleActions: "play none none none"
            }
          }
        );
      });

      ScrollTrigger.refresh();
      if (mainRef.current) mainRef.current.scrollTop = 0;
    }, 250);

    return () => clearTimeout(timer);
  }, [viewMode, activeChapterIdx]);

  // Effect to animate the boy between nodes during chapter transitions
  useEffect(() => {
    const prevIdx = prevIdxRef.current;
    prevIdxRef.current = activeChapterIdx;
    
    const chNodes = [
      { cx: 150, cy: 480, mcx: 35, mcy: 60 },
      { cx: 320, cy: 390, mcx: 100, mcy: 72 },
      { cx: 490, cy: 320, mcx: 165, mcy: 75 },
      { cx: 650, cy: 240, mcx: 230, mcy: 55 },
      { cx: 800, cy: 160, mcx: 295, mcy: 45 },
      { cx: 920, cy: 80, mcx: 365, mcy: 60 }
    ];

    const targetNode = chNodes[activeChapterIdx];
    if (!targetNode) return;
    const isMovingForward = activeChapterIdx >= prevIdx;
    
    // Desktop boy animation
    gsap.killTweensOf("#desktop-boy");
    gsap.to("#desktop-boy", {
      x: targetNode.cx - 25,
      y: targetNode.cy - 62.5,
      rotation: isMovingForward ? -20 : 10,
      scaleX: isMovingForward ? 1 : -1,
      duration: 1.2,
      ease: "power2.inOut",
      onStart: () => {
        const el = document.getElementById("desktop-boy");
        if (el) el.classList.add("is-walking");
      },
      onComplete: () => {
        const el = document.getElementById("desktop-boy");
        if (el) el.classList.remove("is-walking");
        gsap.to("#desktop-boy", { rotation: 0, duration: 0.3 });
      }
    });
    
    // Mobile boy animation
    gsap.killTweensOf("#mobile-boy");
    gsap.to("#mobile-boy", {
      x: targetNode.mcx - 25,
      y: targetNode.mcy - 64,
      scaleX: isMovingForward ? 1 : -1,
      duration: 1.2,
      ease: "power2.inOut",
      onStart: () => {
        const el = document.getElementById("mobile-boy");
        if (el) el.classList.add("is-walking");
      },
      onComplete: () => {
        const el = document.getElementById("mobile-boy");
        if (el) el.classList.remove("is-walking");
      }
    });
  }, [activeChapterIdx]);

  return (
    <main
      ref={mainRef}
      className="relative w-screen h-screen overflow-y-auto overflow-x-hidden bg-[#050508] text-white flex flex-col justify-start select-none scrollbar-thin"
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
        @keyframes glitch {
          0% { transform: translate(0, 0) skew(0deg); }
          8% { transform: translate(-1.5px, 0.5px) skew(-2deg); }
          12% { transform: translate(1.5px, -0.5px) skew(2deg); }
          16% { transform: translate(0, 0) skew(0deg); }
          100% { transform: translate(0, 0) skew(0deg); }
        }
        @keyframes staticLines {
          0% { opacity: 0; transform: translateX(-10px); }
          5% { opacity: 0.8; transform: translateX(5px); }
          10% { opacity: 0; }
          50% { opacity: 0; }
          55% { opacity: 0.6; transform: translateX(-5px); }
          60% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes textShimmer {
          0% { text-shadow: 0 0 4px rgba(168, 85, 247, 0.2); }
          50% { text-shadow: 0 0 16px rgba(168, 85, 247, 0.7), 0 0 25px rgba(59, 130, 246, 0.4); }
          100% { text-shadow: 0 0 4px rgba(168, 85, 247, 0.2); }
        }
        @keyframes goldPulseLarge {
          0% { box-shadow: 0 0 8px rgba(251, 191, 36, 0.25); border-color: rgba(251, 191, 36, 0.25); }
          50% { box-shadow: 0 0 35px rgba(251, 191, 36, 0.75); border-color: rgba(251, 191, 36, 0.85); }
          100% { box-shadow: 0 0 8px rgba(251, 191, 36, 0.25); border-color: rgba(251, 191, 36, 0.25); }
        }
        @keyframes clockTick {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slowFadeIn {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes leftLegWalk {
          0%, 100% { transform: rotate(-22deg); }
          25% { transform: rotate(0deg); }
          50% { transform: rotate(22deg); }
          75% { transform: rotate(0deg); }
        }
        @keyframes rightLegWalk {
          0%, 100% { transform: rotate(22deg); }
          25% { transform: rotate(0deg); }
          50% { transform: rotate(-22deg); }
          75% { transform: rotate(0deg); }
        }
        @keyframes armSwing {
          0%, 100% { transform: rotate(20deg); }
          25% { transform: rotate(0deg); }
          50% { transform: rotate(-20deg); }
          75% { transform: rotate(0deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .is-walking .left-leg-group {
          animation: leftLegWalk 0.8s infinite ease-in-out;
        }
        .is-walking .right-leg-group {
          animation: rightLegWalk 0.8s infinite ease-in-out;
        }
        .is-walking .arm-group {
          animation: armSwing 0.8s infinite ease-in-out;
        }
        :not(.is-walking) .boy-bob-group {
          animation: idleBob 3s infinite ease-in-out;
        }
        :not(.is-walking) .boy-backpack-group {
          animation: backpackSway 4s infinite ease-in-out;
        }
        :not(.is-walking) .boy-helmet-group {
          animation: headNod 5s infinite ease-in-out;
        }
        .is-walking .foot-particles-group {
          display: none;
        }
        .foot-p-1 {
          transform-origin: 7px 25px;
          animation: footP1 2s infinite ease-out;
        }
        .foot-p-2 {
          transform-origin: 10px 25.5px;
          animation: footP2 1.6s infinite ease-out 0.4s;
        }
        .foot-p-3 {
          transform-origin: 13px 25px;
          animation: footP3 2.4s infinite ease-out 0.8s;
        }
        @keyframes idleBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-0.8px); }
        }
        @keyframes backpackSway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-2deg); }
        }
        @keyframes headNod {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(1.5deg) translateY(0.2px); }
        }
        @keyframes footP1 {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translate(-3px, -5px) scale(0.3); opacity: 0; }
        }
        @keyframes footP2 {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translate(1px, -4px) scale(0.2); opacity: 0; }
        }
        @keyframes footP3 {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translate(3px, -6px) scale(0.4); opacity: 0; }
        }
        @keyframes completed-node-ring {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 0.4; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .completed-node-ring {
          animation: completed-node-ring 2s infinite ease-out;
        }
        @keyframes flowParticles {
          from { stroke-dashoffset: 320; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .cursor-blink {
          animation: cursorBlink 1.5s infinite;
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

      {/* Map Mode Header Info */}
      {viewMode === "MAP" && (
        <div className="fixed top-8 right-8 z-50 flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2 border border-white/5 rounded shadow-lg pointer-events-auto">
          <span className="font-space-mono text-[10px] tracking-[0.2em] text-[#A855F7] uppercase font-bold">
            {currentChapter.title}
          </span>
          <div className="w-[1px] h-3 bg-white/10" />
          <span className="font-space-mono text-[9px] tracking-wider text-slate-500 uppercase">
            {currentChapter.subtitle}
          </span>
        </div>
      )}

      {/* Chapter Mode Sticky Header Controls */}
      {viewMode === "CHAPTER" && (
        <div className="fixed top-8 left-8 right-8 z-50 flex justify-between items-center bg-black/60 backdrop-blur-md px-4.5 py-2 border border-white/10 rounded shadow-lg pointer-events-auto max-w-5xl mx-auto w-[calc(100%-4rem)]">
          <button 
            onClick={() => setViewMode("MAP")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 border border-white/15 bg-white/5 hover:bg-white/10 text-white rounded font-space-mono text-[9px] tracking-wider cursor-pointer transition-colors"
          >
            🗺️ Return to Map
          </button>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                if (activeChapterIdx > 0) {
                  setActiveChapterIdx(activeChapterIdx - 1);
                }
              }}
              disabled={activeChapterIdx === 0}
              className="px-2.5 py-1 border border-white/5 bg-white/5 text-[9px] font-space-mono text-white rounded hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              ← Prev
            </button>

            <span className="font-space-mono text-[9px] text-[#A855F7] uppercase font-black px-2">
              Ch.{activeChapterIdx + 1} / 6
            </span>

            <button 
              onClick={() => {
                if (activeChapterIdx < 5) {
                  setActiveChapterIdx(activeChapterIdx + 1);
                }
              }}
              disabled={activeChapterIdx === 5}
              className="px-2.5 py-1 border border-white/5 bg-white/5 text-[9px] font-space-mono text-white rounded hover:bg-white/10 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Two-State Containers Wrapper */}
      <div className="w-full relative z-10 flex flex-col">
        
        {/* STATE 1: World Map View */}
        <div 
          className={`w-full flex flex-col lg:flex-row transition-all duration-700 ease-in-out ${
            viewMode === "MAP" 
              ? "opacity-100 scale-100 pointer-events-auto" 
              : "opacity-0 scale-125 pointer-events-none absolute inset-0"
          }`}
        >
          {/* Left Column: Profile Card */}
          <div className="w-full lg:w-[28%] lg:h-screen lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-r border-white/5">
            <LeftProfileCard />
          </div>

          {/* Right Column: World Map */}
          <div className="w-full lg:w-[72%] h-[70vh] lg:h-screen relative flex items-center justify-center p-4">
            <JourneyMap 
              activeChapterIdx={activeChapterIdx}
              hoveredChapterIdx={hoveredChapterIdx}
              setHoveredChapterIdx={setHoveredChapterIdx}
              onNodeClick={handleNodeClick}
              activeModalFragment={activeModalFragment}
              setActiveModalFragment={setActiveModalFragment}
            />
          </div>
        </div>

        {/* STATE 2: Immersive Chapter View */}
        <div 
          className={`flex flex-col relative transition-all duration-700 ease-in-out ${
            viewMode === "CHAPTER" 
              ? "opacity-100 scale-100 pointer-events-auto w-full min-h-screen px-4 md:px-12 py-16" 
              : "opacity-0 scale-95 pointer-events-none absolute inset-0 w-0 h-0 overflow-hidden"
          }`}
        >
          
          {/* ==========================================
              CHAPTER 1: FOUNDATIONS
              ========================================== */}
          <div id="chapter-1" className={`w-full flex flex-col ${activeChapterIdx === 0 ? "" : "hidden"}`}>
            <ChapterStats
              age="0–12 Years"
              location="Meerut & Noida"
              themes="Roots, family values, and public speaking"
              achievement="98/100 Hindi"
              mentors="Grandparents & Parents"
            />
          
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
          
          <ChapterCompletionCard
            title="Foundations Complete"
            lessons={["Curiosity", "Discipline", "Confidence"]}
            quote="Every journey begins before we realize we're on one."
            onNextClick={() => handleNodeClick("chapter-2")}
          />
        </div>

        {/* ==========================================
            CHAPTER 2: THE SHIFT
            ========================================== */}
        <div id="chapter-2" className={`w-full flex flex-col ${activeChapterIdx === 1 ? "" : "hidden"}`}>
          <ChapterStats
            age="12–14 Years"
            location="Noida & Delhi"
            themes="High jump, sports stadiums, new surroundings"
            achievement="National High Jump"
            mentors="Coaches & Peers"
          />
          
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
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
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
              </div>
              {/* Illustration column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full">
                <WindingRoadIllustration />
              </div>
            </div>
          </section>
          
          <ChapterCompletionCard
            title="The Shift Complete"
            lessons={["Adaptability", "Resilience", "Competitive Drive"]}
            quote="Adaptability is not just surviving change, but finding your stride in it."
            onNextClick={() => handleNodeClick("chapter-3")}
          />
        </div>

        {/* ==========================================
            CHAPTER 3: THE TRANSFORMATION
            ========================================== */}
        <div id="chapter-3" className={`w-full flex flex-col ${activeChapterIdx === 2 ? "" : "hidden"}`}>
          <ChapterStats
            age="14–16 Years"
            location="Noida (Class 10)"
            themes="Academic comeback, film obsession, whiteboard circles"
            achievement="Maverick Explanations"
            mentors="Vibhor & Teachers"
          />
          
          {/* TITLE MOMENT: CHAPTER 3 */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
            {/* Faint grey-to-purple background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-500/3 to-[#A855F7]/3 blur-[100px] z-[-1] pointer-events-none rounded-full max-w-md mx-auto" />
            
            <div className="flex flex-col items-center gap-4 max-w-2xl">
              <span className="font-space-mono text-xs md:text-sm tracking-[0.3em] text-[#A855F7] uppercase font-bold">
                Chapter 3
              </span>
              <h1 className="font-orbitron text-5xl md:text-7xl font-black tracking-widest mt-1 text-transparent bg-clip-text bg-gradient-to-r from-slate-500 via-slate-100 to-[#A855F7] drop-shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                The Transformation
              </h1>
              <p className="font-inter text-xs md:text-sm text-slate-400 max-w-md mt-4 leading-relaxed italic">
                Growth from quiet, flat beginnings to a vibrant cinematic awakening.
              </p>
            </div>
            <div className="mt-12">
              <Chapter3TitleIllustration />
            </div>
          </section>

          {/* MOMENT 1 — Another New Beginning */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Muted grey background glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-slate-700/3 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  Another New Beginning
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  After changing schools again, I joined Ram-Eesh International School. Academically strong — but quiet in every other sense. No major events. No exciting student culture. No farewell traditions. Classes. Assignments. Home. Repeat. I wasn't unhappy. But I wasn't truly enjoying school either. For a long time, I simply felt like I was passing through.
                </p>
              </div>
              {/* Illustration column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full">
                <RamEeshClassroomIllustration />
              </div>
            </div>
          </section>

          {/* MOMENT 2 — The Friend Who Became Family */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Minimal warm grey background glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-slate-600/3 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Illustration column - Left */}
              <div className="flex items-center justify-center order-1 w-full">
                <FriendshipIllustration />
              </div>
              {/* Text column - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  The Friend Who Became Family
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  During this phase, I met Vibhor. There was nothing dramatic about our friendship. No movie-like beginning. No special moment. Just two students sharing the same classroom. But sometimes the most important people enter your life quietly. Years later, he would become far more than a school friend. He would become family. Back then, neither of us knew that.
                </p>
              </div>
            </div>
          </section>

          {/* MOMENT 3 — When Time Stopped */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Dark, cold desaturated background glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-[#030712]/5 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  When Time Stopped
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  COVID arrived. Schools closed. Classrooms disappeared. Conversations disappeared. Normal life disappeared. Class 8 became the strangest year of my life. No memories. No school life. No friendships forming. No events. No competitions. No real experiences. It felt as though someone had pressed a pause button on life. When I look back at that year, everything feels blurry. As if an entire chapter was skipped. Time moved forward. But life felt frozen.
                </p>
              </div>
              {/* Illustration column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full">
                <CovidClockIllustration />
              </div>
            </div>
          </section>

          {/* MOMENT 4 — The Birth of a Cinephile */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Extremely warm amber/orange background glow */}
            <div className="absolute inset-0 w-[550px] h-[400px] rounded-full bg-gradient-to-tr from-[#d97706]/10 to-[#b45309]/5 blur-[130px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Illustration column - Left */}
              <div className="flex items-center justify-center order-1 w-full">
                <CinephileIllustration />
              </div>
              {/* Text column - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  The Birth of a Cinephile
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  While the world was locked inside homes, I found something unexpected. Stories. Movies. Shows. Characters. Worlds. What started as entertainment slowly became fascination. I wasn't watching because everyone else was watching. I was becoming interested in how stories were created. How characters were written. How directors made audiences feel something. Shows like Money Heist and Loki became gateways into a much larger universe. Without realizing it, this was the beginning of a lifelong obsession with cinema. An obsession that would later lead me toward writing and storytelling of my own.
                </p>
              </div>
            </div>
          </section>

          {/* MOMENT 5 — Class 10 — The Year Everything Changed */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Split cool-to-warm glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-gradient-to-tr from-[#1e293b]/5 to-[#7c2d12]/5 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  Class 10 — The Year Everything Changed
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  Before the session started, students were divided into different sections. The highest-performing students were placed into the 'elite' section — the section everyone wanted. I wasn't placed there. At first, I felt disappointed. I thought I deserved it. I questioned the decision. Years later, I realize that not being selected was one of the best things that ever happened to me. Because the class I joined became something far more valuable. It became a family.
                </p>
              </div>
              {/* Illustration column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full">
                <DoorsIllustration />
              </div>
            </div>
          </section>

          {/* MOMENT 6 — Shruti Ma'am */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Warm classroom golden glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-[#f59e0b]/3 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Illustration column - Left */}
              <div className="flex items-center justify-center order-1 w-full">
                <WarmClassroomIllustration />
              </div>
              {/* Text column - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  Shruti Ma'am
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  One of the biggest reasons for that was our class teacher, Shruti Ma'am. Young. Energetic. Supportive. Genuinely invested in her students. She wasn't just teaching a subject — she was helping us grow. She understood us. Guided us. Supported us. And slowly transformed an ordinary classroom into a place where people actually wanted to be. For the first time since moving schools, I felt like I belonged.
                </p>
              </div>
            </div>
          </section>

          {/* MOMENT 7 — The Ego */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Bright purple glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-[#A855F7]/5 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white animate-[textShimmer_3s_infinite]">
                  The Ego
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  English became my strongest subject. Exam after exam. Test after test. I continued performing exceptionally well. Even though Shruti Ma'am also taught the top-performing section, nobody managed to beat my scores. I still remember one particular moment. She announced my name in front of everyone. 'Aryan Chauhan scored the highest marks.' For a teenager, moments like that feel unforgettable. My confidence grew. My ego grew too. But looking back, it wasn't arrogance. It was the feeling that hard work was finally being noticed.
                </p>
              </div>
              {/* Large Purple Stat Card Column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full max-w-[420px] mx-auto">
                <div 
                  className="w-full bg-[#0d0d1a]/55 border border-[#A855F7]/30 p-8 rounded-2xl flex flex-col gap-2 text-center shadow-[0_0_25px_rgba(168,85,247,0.1)] relative group overflow-hidden"
                >
                  <span className="font-orbitron font-black text-4xl text-[#A855F7] drop-shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                    HIGHEST MARKS
                  </span>
                  <span className="font-space-mono text-xs text-white/80 tracking-widest mt-1.5 uppercase font-bold">
                    English Subject
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* MOMENT 8 — Maverick Guru */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Structured Teal/Blue glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-gradient-to-tr from-[#0d9488]/5 to-[#0284c7]/5 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Illustration column - Left */}
              <div className="flex items-center justify-center order-1 w-full">
                <MaverickMentorsIllustration />
              </div>
              {/* Text column - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  Maverick Guru
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  Around the same time, I joined a coaching institute — Maverick Guru. Within walking distance of my home. Prince Sir and Shlok Sir didn't just teach Mathematics and Science. They taught discipline. Mindset. Character. Consistency. Success. Failure. Lessons that couldn't be found inside textbooks. Joining Maverick Guru became one of the best decisions of my school life. Because the biggest things I learned there weren't formulas. They were values.
                </p>
              </div>
            </div>
          </section>

          {/* MOMENT 9 — The First Boards */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Optimistic open sky glow */}
            <div className="absolute inset-0 w-[600px] h-[400px] rounded-full bg-gradient-to-tr from-[#A855F7]/10 via-[#3b82f6]/5 to-transparent blur-[140px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Stats Card - Left */}
              <div className="flex items-center justify-center order-1 w-full max-w-[420px] mx-auto">
                <div 
                  className="w-full bg-[#0d0d1a]/55 border border-[#3b82f6]/30 p-8 rounded-2xl flex flex-col gap-2.5 text-center shadow-[0_0_25px_rgba(59,130,246,0.1)] relative group overflow-hidden"
                >
                  <span className="font-orbitron font-black text-6xl text-[#3b82f6] drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    84%
                  </span>
                  <span className="font-inter text-xs text-slate-400 italic mt-1 leading-relaxed">
                    "The marks weren't the achievement. The growth was."
                  </span>
                </div>
              </div>
              
              {/* Text Column - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  The First Boards
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  Eventually the year reached its final challenge — the Class 10 Board Examinations. I scored 84%. Not extraordinary. Not headline-worthy. But I was satisfied. Because I knew how much effort I had invested. More importantly: the marks were not the biggest achievement of that year. The growth was. The friendships were. The experiences were. The confidence was. The memories were.
                </p>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-1">
                  I entered this phase as a student still trying to find his place. I left it with friendships that would last years, a growing love for storytelling, and a much better understanding of who I was becoming. For the first time, the future no longer felt distant. It felt like something waiting to be built.
                </p>
              </div>
            </div>
          </section>
          
          <ChapterCompletionCard
            title="Transformation Complete"
            lessons={["Intellectual Curiosity", "Deep Friendship", "Persistence"]}
            quote="True transformation happens silently, in late-night study sessions and shared dreams."
            onNextClick={() => handleNodeClick("chapter-4")}
          />
        </div>

        {/* ==========================================
            CHAPTER 4: THE LEADER
            ========================================== */}
        <div id="chapter-4" className={`w-full flex flex-col ${activeChapterIdx === 3 ? "" : "hidden"}`}>
          <ChapterStats
            age="16–17 Years"
            location="Noida (Class 11)"
            themes="Student Council, Sports Day, community campaigns"
            achievement="School Head Boy"
            mentors="Principal & Council"
          />
          
          {/* TITLE MOMENT: CHAPTER 4 */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
            {/* Rich gold-to-purple background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fbbf24]/5 to-[#A855F7]/5 blur-[100px] z-[-1] pointer-events-none rounded-full max-w-md mx-auto" />
            
            <div className="flex flex-col items-center gap-4 max-w-2xl">
              <span className="font-space-mono text-xs md:text-sm tracking-[0.3em] text-[#fbbf24] uppercase font-bold">
                Chapter 4
              </span>
              <h1 className="font-orbitron text-5xl md:text-7xl font-black tracking-widest mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-slate-100 to-[#f59e0b] drop-shadow-[0_0_30px_rgba(251,191,36,0.25)]">
                The Leader
              </h1>
              <p className="font-inter text-xs md:text-sm text-slate-400 max-w-md mt-4 leading-relaxed italic">
                Stepping into responsibility, authority, and creative self-expression in Class 11.
              </p>
            </div>
            <div className="mt-12">
              <Chapter4TitleIllustration />
            </div>
          </section>

          {/* MOMENT 1 — Choosing the Difficult Road */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Saturated blue/purple glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-gradient-to-tr from-[#3b82f6]/5 to-[#a855f7]/3 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  Choosing the Difficult Road
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  When the time came to select a stream, I chose PCM — Physics, Chemistry, and Mathematics. Not because it was easy. Not because someone forced me. I chose PCM because I genuinely believed that if I could survive one of the most demanding academic paths, many future challenges would become easier to handle. My philosophy was simple: if you learn to face the strongest opponent, every other opponent feels less intimidating. That belief became one of the foundations of my approach toward life.
                </p>
              </div>
              {/* Illustration column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full">
                <DifficultRoadIllustration />
              </div>
            </div>
          </section>

          {/* MOMENT 2 — Section A */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Golden focused light glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-[#fbbf24]/3 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Illustration column - Left */}
              <div className="flex items-center justify-center order-1 w-full">
                <SectionAIllustration />
              </div>
              {/* Text column - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  The Section Everyone Wanted
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  For the first time, I was selected for Section A — the section known throughout the school as the topper's section. The students here were serious. Focused. Competitive. Walking into that classroom felt different. Everyone seemed smarter. More disciplined. More prepared. It was intimidating at first. But it also motivated me. Because being surrounded by capable people forces you to grow.
                </p>
              </div>
            </div>
          </section>

          {/* MOMENT 3 — The Unexpected Result */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Premium gold & purple blend glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-gradient-to-tr from-[#fbbf24]/5 via-[#a855f7]/3 to-transparent blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] drop-shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                  Head Boy
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  I had applied for Sports Captain. That was the position I truly wanted. After rounds of interviews and evaluations, the final results were announced. And something happened that I never expected. The teachers didn't select me as Sports Captain. Instead, they selected me as Head Boy — the highest student leadership position in the school. I was surprised. Excited. Nervous. And honored. Because with that title came something much bigger than authority. Responsibility.
                </p>
              </div>
              
              {/* Head Boy Real Photo Column - Right */}
              <div className="flex flex-col items-center justify-center order-1 md:order-2 w-full max-w-[320px] mx-auto gap-4">
                <div className="w-[200px] h-[200px] shrink-0 overflow-hidden rounded-full border border-[#fbbf24]/30 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                  <img 
                    src="/headboy-photo.jpg" 
                    alt="Head Boy Aryan Chauhan"
                    className="w-full h-full object-cover object-center filter saturate-95 brightness-95" 
                  />
                </div>
                <div className="px-4 py-1.5 border border-[#fbbf24]/30 bg-[#fbbf24]/10 rounded-full font-orbitron font-bold text-xs text-[#fbbf24] tracking-wider animate-[goldPulse_3s_infinite]">
                  HEAD BOY — Selected
                </div>
              </div>
            </div>
          </section>

          {/* MOMENT 4 — Bringing School Back to Life */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Highly saturated purple/gold glow */}
            <div className="absolute inset-0 w-[550px] h-[400px] rounded-full bg-gradient-to-tr from-[#a855f7]/6 to-[#fbbf24]/4 blur-[130px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Illustration column - Left */}
              <div className="flex items-center justify-center order-1 w-full">
                <SchoolYardIllustration />
              </div>
              {/* Text column - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  Bringing School Back to Life
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  One of the first things I noticed was that many activities had disappeared after COVID. Sports Day had stopped. Events had become limited. The energy of student life wasn't the same. I didn't want that to continue. So I started talking to teachers. Convincing them. Planning with them. Explaining why these events mattered. Because school should be more than classrooms and exams — it should create memories. Eventually, many activities returned. Sports Day returned. Students participated again. And watching those things happen felt incredibly rewarding.
                </p>
              </div>
            </div>
          </section>

          {/* MOMENT 5 — The Irony */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Playful gold background glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-[#fbbf24]/2 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white animate-[textShimmer_3s_infinite]">
                  The Irony of Leadership
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  One of the funniest parts of the story was Sports Day itself. I had worked hard to help bring it back. Yet as Head Boy, I wasn't supposed to favor my own house or participate unfairly. Leadership required neutrality. Unfortunately for me, my house team wasn't particularly strong. We struggled throughout the competition. Eventually, the teachers allowed me to participate. I gave it everything I had. And despite all the challenges, we managed to finish in third place. Not first. Not second. But honestly, that wasn't the point. The experience mattered far more than the result.
                </p>
              </div>
              
              {/* Playful Stats Card & Illustration Column - Right */}
              <div className="flex flex-col gap-6 items-center justify-center order-1 md:order-2 w-full max-w-[420px] mx-auto">
                <div 
                  className="w-full bg-[#0d0d1a]/55 border border-[#fbbf24]/30 p-6 rounded-2xl flex flex-col gap-1 text-center shadow-[0_0_20px_rgba(251,191,36,0.15)] relative group overflow-hidden"
                >
                  <span className="font-orbitron font-black text-4xl text-[#fbbf24] drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                    3rd Place 🏅
                  </span>
                  <span className="font-inter text-xs text-slate-400 italic mt-1 uppercase tracking-wide">
                    The experience mattered more than the result.
                  </span>
                </div>
                <SportsDayIllustration />
              </div>
            </div>
          </section>

          {/* MOMENT 6 — Learning Leadership */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Deep purple background glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-[#A855F7]/3 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Illustration column - Left */}
              <div className="flex items-center justify-center order-1 w-full">
                <BridgeIllustration />
              </div>
              
              {/* Text column & Pull Quote - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  Learning Leadership
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  Most people think leadership means giving instructions. Class 11 taught me the opposite. Leadership means listening. Students brought problems. Teachers brought expectations. Both sides wanted solutions. And many times, solving one person's problem created another person's problem. That's when I began understanding something important: Leadership isn't about making everyone happy. It's about making the best possible decision for the larger group. That lesson would stay with me long after school ended.
                </p>
                
                <blockquote className="border-l-2 border-[#A855F7] pl-4 font-inter text-slate-300 italic text-sm md:text-base leading-relaxed mt-4">
                  "Leadership isn't about making everyone happy. It's about making the best possible decision for the larger group."
                </blockquote>
              </div>
            </div>
          </section>

          {/* MOMENT 7 — Fine Arts */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Mixed vibrant gradient glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-gradient-to-tr from-[#ec4899]/3 via-[#3b82f6]/2 to-[#fbbf24]/2 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  Fine Arts — The Other Side
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  Despite choosing PCM, there was another side of me that many people didn't expect. Creativity. I selected Fine Arts as my additional subject. Partly because I enjoyed it. Partly because creativity had always been present inside me. Even before I became interested in design, storytelling, and content creation, there was always a creative side trying to find an outlet. Looking back, Fine Arts was one of the earliest signs of the creative interests that would later shape many of my projects.
                </p>
              </div>
              {/* Illustration column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full">
                <FineArtsIllustration />
              </div>
            </div>
          </section>

          {/* MOMENT 8 — The Number Seven */}
          <section className="scroll-animate-moment w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-6 border-b border-white/5 relative">
            {/* Minimal gold pulsing glow */}
            <div className="absolute inset-0 w-[450px] h-[450px] rounded-full bg-[#fbbf24]/2 blur-[130px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            <div className="max-w-2xl flex flex-col items-center gap-6">
              <h2 className="font-orbitron text-2xl md:text-3xl font-black tracking-wide text-white">
                The Number Seven
              </h2>
              
              {/* Glowing softly large number 7 */}
              <div className="font-orbitron text-8xl font-black text-[#fbbf24] drop-shadow-[0_0_35px_rgba(251,191,36,0.6)] animate-[goldPulseLarge_4s_infinite] select-none my-4">
                7
              </div>
              
              <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed max-w-md">
                At the end of the year, I scored 74%. Not the highest score. Not the lowest score. It turned out to be the seventh-highest result in the class. And somehow, that felt fitting. Because seven had always been my lucky number. A small coincidence. But one that made me smile.
              </p>
              
              {/* Chips row */}
              <div className="flex flex-wrap gap-2.5 mt-2 justify-center">
                {["74% Score", "7th in Class", "Lucky Number: 7"].map((chip) => (
                  <span 
                    key={chip} 
                    className="font-space-mono text-[9px] md:text-xs text-[#fbbf24] border border-[#fbbf24]/20 bg-[#fbbf24]/5 px-3 py-1 rounded-full uppercase tracking-wider font-bold"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* MOMENT 9 — From Student to Leader */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 relative">
            {/* Rich, optimistic golden-purple glow */}
            <div className="absolute inset-0 w-[600px] h-[400px] rounded-full bg-gradient-to-tr from-[#fbbf24]/8 via-[#a855f7]/5 to-transparent blur-[140px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Illustration column - Left */}
              <div className="flex items-center justify-center order-1 w-full">
                <HorizonIllustration />
              </div>
              
              {/* Text Column - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  From Student to Leader
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  Class 11 transformed me from a student into a leader. It taught me responsibility. Teamwork. Decision making. Communication. And the importance of creating opportunities for others. But even bigger challenges were waiting. The next chapter would bring board examinations, entrepreneurship, internships, major life decisions, and the beginning of the path that would eventually lead to AryanVerse. For the first time, the future no longer felt like a distant idea. It was approaching fast.
                </p>
                
                <div className="mt-8 flex flex-col gap-1.5 self-start">
                  <span className="font-space-mono text-[9px] text-[#fbbf24] tracking-[0.25em] uppercase font-bold">
                    Chapter 5
                  </span>
                  <span className="font-orbitron text-xs text-slate-500 uppercase tracking-widest font-black">
                    Scroll to Continue
                  </span>
                </div>
              </div>
            </div>
          </section>
          
          <ChapterCompletionCard
            title="Leadership Chapter Complete"
            lessons={["Responsibility", "Empathy", "Public Speaking"]}
            quote="To lead is to serve, to inspire, and to build pathways for others."
            onNextClick={() => handleNodeClick("chapter-5")}
          />
        </div>

        {/* ==========================================
            CHAPTER 5: THE CROSSROADS
            ========================================== */}
        <div id="chapter-5" className={`w-full flex flex-col ${activeChapterIdx === 4 ? "" : "hidden"}`}>
          <ChapterStats
            age="17–18 Years"
            location="Noida (Class 12)"
            themes="Board exams, freelance coding, creative arts"
            achievement="100/100 Fine Arts"
            mentors="Parents & Self"
          />
          
          {/* TITLE MOMENT: CHAPTER 5 */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
            {/* Cool-to-purple background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/5 to-[#a855f7]/5 blur-[100px] z-[-1] pointer-events-none rounded-full max-w-md mx-auto" />
            
            <div className="flex flex-col items-center gap-4 max-w-2xl">
              <span className="font-space-mono text-xs md:text-sm tracking-[0.3em] text-[#3b82f6] uppercase font-bold">
                Chapter 5
              </span>
              <h1 className="font-orbitron text-5xl md:text-7xl font-black tracking-widest mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-slate-100 to-[#a855f7] drop-shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                The Crossroads
              </h1>
              <p className="font-inter text-xs md:text-sm text-slate-400 max-w-md mt-4 leading-relaxed italic">
                Facing pressure, academic hurdles, and deciding my own creative destiny.
              </p>
            </div>
            <div className="mt-12">
              <Chapter5TitleIllustration />
            </div>
          </section>

          {/* MOMENT 1 — The Race Begins */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Cool clinical blue-grey glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-gradient-to-tr from-[#1e293b]/5 to-[#334155]/3 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  The Race Begins
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  Almost overnight, life became centered around one thing. Marks. Percentages. Competitive exams. IIT. Ranks. Cutoffs. Results. Every conversation somehow found its way back to academics. Somewhere along the way, it felt as though people stopped asking who you wanted to become and only cared about what rank you would achieve. That shift affected me more than I expected. For the first time, I felt disconnected from the environment around me.
                </p>
              </div>
              {/* Illustration column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full">
                <RaceBeginsIllustration />
              </div>
            </div>
          </section>

          {/* MOMENT 2 — The Subject That Betrayed Me */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Split warm (Physics) and cool (Chemistry) glow */}
            <div className="absolute inset-0 w-[550px] h-[380px] rounded-full bg-gradient-to-tr from-[#fbbf24]/2 via-[#06b6d4]/2 to-transparent blur-[130px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Illustration column - Left */}
              <div className="flex items-center justify-center order-1 w-full">
                <PhysicsChemistryIllustration />
              </div>
              {/* Text column - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  The Subject That Betrayed Me
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  If Physics was my strongest ally, Chemistry was my greatest enemy. Physics felt logical. It felt intuitive. It felt like solving puzzles. Chemistry felt different. And throughout Class 12, it remained one of my biggest academic challenges. There were days when I questioned myself. Days when concepts refused to make sense. Days when effort didn't seem to produce results. But I kept going. Because giving up was never an option.
                </p>
              </div>
            </div>
          </section>

          {/* MOMENT 3 — The Sacrifice */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Desaturated, sparse dark slate glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-[#0f172a]/4 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  The Sacrifice
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  Unlike previous years, Class 12 demanded everything. The activities disappeared. The events disappeared. The leadership responsibilities disappeared. The freedom disappeared. Most of my energy went into preparing for the future. Looking back, this is one reason why Class 12 feels less colorful than other chapters. It wasn't a year of experiences. It was a year of preparation. A year of sacrifice. A year spent building foundations for whatever came next.
                </p>
              </div>
              {/* Illustration column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full">
                <SacrificeIllustration />
              </div>
            </div>
          </section>

          {/* MOMENT 4 — The Physics Paper */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Concentrated logic blue glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-[#3b82f6]/5 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Illustration column - Left */}
              <div className="flex items-center justify-center order-1 w-full">
                <PhysicsPaperIllustration />
              </div>
              {/* Text column & Pull Quote - Right */}
              <div className="flex flex-col gap-5 order-2">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  The Infamous Paper — February 2025
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  The first paper was Physics — ironically, the subject I loved most. I walked into the examination hall confident. Prepared. Ready. Then I saw the paper. And suddenly everything changed. The Physics paper that year became infamous. Students across the country walked out shocked. Some were upset. Some were frustrated. Some were close to tears. Meanwhile, our classroom had a completely different reaction. We laughed. Not because the paper was easy. But because it was so unexpected — it wasn't testing memorization. It was testing logic. Reasoning. Problem-solving. Thinking under pressure. Fortunately, those were things I enjoyed.
                </p>
                <blockquote className="border-l-2 border-[#3b82f6] pl-4 font-inter text-slate-300 italic text-base leading-relaxed mt-4 text-center mx-auto max-w-lg">
                  "Sometimes confidence comes not from knowing every answer, but from trusting your ability to figure things out when things go wrong."
                </blockquote>
              </div>
            </div>
          </section>

          {/* MOMENT 5 — The Mathematics Story */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col items-center justify-center text-center px-6 border-b border-white/5 relative">
            {/* Glitchy mystical purple glow */}
            <div className="absolute inset-0 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#a855f7]/3 via-[#6366f1]/2 to-transparent blur-[130px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            <div className="max-w-2xl flex flex-col items-center gap-6">
              <h2 className="font-orbitron text-2xl md:text-3xl font-black tracking-wide text-white">
                The Mathematics Story
              </h2>
              <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed">
                Mathematics became one of the most frustrating parts of my board journey. Not because I was unprepared. Not because the paper was impossible. In fact, quite the opposite. I knew the concepts. I understood the questions. I felt capable of performing well. Yet sometimes life creates situations that cannot be explained by preparation alone. Sometimes things simply don't go according to plan.
              </p>
              
              <div className="font-inter text-lg md:text-xl italic text-[#a855f7] drop-shadow-[0_0_12px_rgba(168,85,247,0.45)] select-none my-3 font-semibold tracking-wide animate-[textShimmer_3s_infinite]">
                "A story I still haven't fully told."
              </div>
              
              <div className="mt-4">
                <MathStoryIllustration />
              </div>
            </div>
          </section>

          {/* MOMENT 6 — The Artist Hidden Inside */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Warmest gold and orange burst glow */}
            <div className="absolute inset-0 w-[550px] h-[380px] rounded-full bg-gradient-to-tr from-[#fbbf24]/6 via-[#f97316]/2 to-transparent blur-[130px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text & Stat Column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  The Artist Hidden Inside
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  Amid Physics, Chemistry, Mathematics, and board pressure, there was one subject that reminded me of a different side of myself. Fine Arts. While many people viewed it as an additional subject, I saw it as something more. A place where creativity survived inside an otherwise heavily academic year. At the end of the year, I scored 100 out of 100 in Fine Arts. A perfect score. And in many ways, that result felt symbolic. Because even during one of the most academically demanding periods of my life, creativity still found a way to exist.
                </p>
                
                {/* Large gold stat card */}
                <div className="mt-4 max-w-[280px] bg-[#0d0d1a]/55 border border-[#fbbf24]/30 p-6 rounded-2xl flex flex-col gap-1 text-center shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                  <span className="font-orbitron font-black text-4xl text-[#fbbf24] drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                    100 / 100
                  </span>
                  <span className="font-inter text-xs text-slate-400 italic mt-1 leading-relaxed">
                    Fine Arts — Creativity survives everything.
                  </span>
                </div>
              </div>
              
              {/* Illustration column - Right */}
              <div className="flex items-center justify-center order-1 md:order-2 w-full">
                <ArtistInsideIllustration />
              </div>
            </div>
          </section>

          {/* MOMENT 7 — The Result */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 border-b border-white/5 relative">
            {/* Purple and gold blend glow */}
            <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-gradient-to-tr from-[#a855f7]/4 via-[#fbbf24]/3 to-transparent blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Text Column - Left */}
              <div className="flex flex-col gap-5 order-2 md:order-1">
                <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wide text-white">
                  The Result
                </h2>
                <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed mt-2">
                  When the board results arrived, I scored 81%. For some people, that number might seem average. For others, it might seem disappointing. For me, it felt honest. Because I knew exactly how much work had gone into earning it. I knew the sacrifices. The struggles. The pressure. The effort nobody else could see. I never measured success purely through percentages. I measured it through growth. And in that sense, Class 12 taught me more than many other years combined.
                </p>
              </div>
              
              {/* Side-by-side stats cards - Right */}
              <div className="grid grid-cols-2 gap-4 order-1 md:order-2 w-full max-w-[420px] mx-auto">
                <div className="bg-[#0d0d1a]/55 border border-[#a855f7]/30 p-6 rounded-2xl flex flex-col gap-2 text-center shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                  <span className="font-orbitron font-black text-4xl text-[#a855f7] drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                    81%
                  </span>
                  <span className="font-space-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    Class 12 Boards
                  </span>
                </div>
                <div className="bg-[#0d0d1a]/55 border border-[#fbbf24]/30 p-6 rounded-2xl flex flex-col gap-2 text-center shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                  <span className="font-orbitron font-black text-4xl text-[#fbbf24] drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
                    100/100
                  </span>
                  <span className="font-space-mono text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    Fine Arts Score
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* MOMENT 8 — The Final Bell */}
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
            {/* Cinematic dark starfield opening glow */}
            <div className="absolute inset-0 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#1e1b4b]/8 via-[#a855f7]/4 to-transparent blur-[140px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            <div className="max-w-3xl flex flex-col items-center gap-6">
              <h2 className="font-orbitron text-2xl md:text-3xl font-black tracking-wide text-white">
                The Final Bell
              </h2>
              <p className="font-inter text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl">
                With 81% in Class 12 and a perfect 100 in Fine Arts, my school journey finally came to an end. The classrooms that had once felt permanent became memories. The teachers who guided me became chapters. The corridors that had seen countless conversations became part of the past. For the first time in my life, there was no next school year waiting. School was over.
              </p>
              
              <div 
                className="font-inter text-xl md:text-2xl italic text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-[#a855f7] select-none my-6 font-bold max-w-xl leading-relaxed text-center opacity-0 animate-[slowFadeIn_2.5s_ease-out_forwards]"
                style={{ animationDelay: "1s" }}
              >
                "The next chapter would no longer be written for me. I would have to write it myself."
              </div>
              
              <div className="mt-4">
                <FinalBellIllustration />
              </div>
              
              {/* College Begins indicator */}
              <div className="mt-12 flex flex-col gap-1.5 items-center">
                <span className="font-space-mono text-[9px] text-[#a855f7] tracking-[0.25em] uppercase font-bold">
                  Chapter 6
                </span>
                <span className="font-orbitron text-xs text-slate-400 uppercase tracking-widest font-black">
                  College Begins
                </span>
              </div>
            </div>
          </section>
          
          <ChapterCompletionCard
            title="Crossroads Complete"
            lessons={["Independence", "Focus", "Creative Integrity"]}
            quote="When paths diverge, the choices we make define the horizons we see."
            onNextClick={() => handleNodeClick("chapter-6-future")}
          />
        </div>

        {/* ==========================================
            CHAPTER 6: THE FUTURE
            ========================================== */}
        <div id="chapter-6-future" className={`w-full flex flex-col ${activeChapterIdx === 5 ? "" : "hidden"}`}>
          <section className="scroll-animate-moment w-full min-h-screen flex flex-col justify-center py-20 px-6 md:px-20 relative">
            <div className="absolute inset-0 w-[550px] h-[380px] rounded-full bg-gradient-to-tr from-[#fbbf24]/5 via-[#a855f7]/3 to-transparent blur-[130px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            <div className="max-w-3xl w-full mx-auto flex flex-col gap-6 text-left">
              <span className="font-space-mono text-xs tracking-[0.3em] text-[#fbbf24] uppercase font-bold">
                Chapter 6 & Beyond
              </span>
              <h1 className="font-orbitron text-4xl md:text-5xl font-black tracking-widest text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] uppercase leading-tight">
                THE STORY CONTINUES...
              </h1>
              
              <div className="h-[1px] bg-white/10 my-2" />
              
              <div className="flex flex-col gap-4">
                <span className="font-space-mono text-[9px] text-slate-500 uppercase tracking-wider font-bold">Current Objectives</span>
                <ul className="list-none flex flex-col gap-3 max-w-md">
                  {[
                    "Complete B.Tech in Computer Science at Bennett University",
                    "Become a Data Scientist studying neural networks",
                    "Finish the book 'Unscripted Love'",
                    "Build the AryanVerse digital ecosystem",
                    "Found and build a stealth technology startup"
                  ].map((obj, i) => (
                    <li key={i} className="font-inter text-sm text-slate-300 flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#fbbf24] mt-2 shrink-0 shadow-[0_0_6px_#fbbf24]" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <blockquote className="border-l-2 border-[#fbbf24] pl-4 font-inter text-slate-400 italic text-sm leading-relaxed mt-6 max-w-xl">
                "Every chapter above is history. Everything below is possibility."
              </blockquote>

              <div className="mt-8 flex items-center gap-2 font-space-mono text-sm text-slate-400">
                <span>Chapter 7: Loading</span>
                <span className="w-1.5 h-4 bg-white cursor-blink" />
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
      
      {/* Modal Overlays */}
      {activeModalFragment && activeModalFragment !== "chapter-6-future" && (
        <MemoryModal 
          fragmentId={activeModalFragment} 
          onClose={() => setActiveModalFragment(null)} 
        />
      )}
      {activeModalFragment === "chapter-6-future" && (
        <FuturePortalModal 
          onClose={() => setActiveModalFragment(null)} 
        />
      )}
    </main>
  );
}
