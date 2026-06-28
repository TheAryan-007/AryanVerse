"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ==========================================
// Custom SVG Icons with Animation hooks
// ==========================================

function SkySentryIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" stroke="#22C55E" strokeWidth="2" opacity="0.3" />
      <circle cx="50" cy="50" r="25" stroke="#22C55E" strokeWidth="1.5" opacity="0.2" />
      <circle cx="50" cy="50" r="10" stroke="#22C55E" strokeWidth="1.5" opacity="0.2" />
      <line x1="50" y1="10" x2="50" y2="90" stroke="#22C55E" strokeWidth="1.2" opacity="0.3" />
      <line x1="10" y1="50" x2="90" y2="50" stroke="#22C55E" strokeWidth="1.2" opacity="0.3" />
      <line 
        x1="50" 
        y1="50" 
        x2="78" 
        y2="22" 
        stroke="#22C55E" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        className="animate-spin-slow" 
        style={{ transformOrigin: "50px 50px" }} 
      />
      <circle cx="72" cy="32" r="3" fill="#22C55E" className="animate-pulse" />
      <circle cx="32" cy="68" r="2" fill="#22C55E" opacity="0.5" />
    </svg>
  );
}

function AryanVerseIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="planetBody" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7E22CE" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="22" fill="url(#planetBody)" stroke="#111" strokeWidth="1.5" />
      <ellipse 
        cx="50" 
        cy="50" 
        rx="38" 
        ry="10" 
        stroke="#A855F7" 
        strokeWidth="3.5" 
        transform="rotate(-15 50 50)" 
        opacity="0.85" 
        strokeDasharray="90 30"
        className="animate-spin-slow"
        style={{ transformOrigin: "50px 50px" }}
      />
      <ellipse 
        cx="50" 
        cy="50" 
        rx="42" 
        ry="12" 
        stroke="#E9D5FF" 
        strokeWidth="1.2" 
        transform="rotate(-15 50 50)" 
        opacity="0.5" 
      />
    </svg>
  );
}

function InternEaseIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="22" width="56" height="56" rx="6" stroke="#3B82F6" strokeWidth="2.5" />
      <line x1="32" y1="36" x2="68" y2="36" stroke="#3B82F6" strokeWidth="2" />
      <line x1="32" y1="48" x2="58" y2="48" stroke="#3B82F6" strokeWidth="2" />
      <line x1="32" y1="60" x2="50" y2="60" stroke="#3B82F6" strokeWidth="2" />
      <circle cx="65" cy="58" r="7" stroke="#10B981" strokeWidth="2" />
      <path d="M 65 65 L 65 72" stroke="#10B981" strokeWidth="2" />
    </svg>
  );
}

function EchoesWithinIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="45" width="30" height="25" rx="3" stroke="#F59E0B" strokeWidth="2.5" />
      <path d="M 42 45 C 42 30 58 30 58 45" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="15" y1="50" x2="15" y2="60" stroke="#F59E0B" strokeWidth="1.5" opacity="0.3" />
      <line x1="25" y1="40" x2="25" y2="70" stroke="#F59E0B" strokeWidth="1.5" opacity="0.4" />
      <line x1="75" y1="40" x2="75" y2="70" stroke="#F59E0B" strokeWidth="1.5" opacity="0.4" />
      <line x1="85" y1="50" x2="85" y2="60" stroke="#F59E0B" strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

function BubbleBlastIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="82" r="10" fill="#F97316" />
      <line x1="50" y1="82" x2="50" y2="58" stroke="#F97316" strokeWidth="5" strokeLinecap="round" />
      <circle cx="35" cy="30" r="7" stroke="#F59E0B" strokeWidth="2" className="animate-pulse" />
      <circle cx="65" cy="25" r="9" stroke="#3B82F6" strokeWidth="2" className="animate-bounce" style={{ animationDuration: "3s" }} />
      <circle cx="50" cy="45" r="5" stroke="#10B981" strokeWidth="1.5" />
    </svg>
  );
}

function UnscriptedLoveIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 15 65 Q 32 60 50 65 Q 68 60 85 65 L 85 35 Q 68 30 50 35 Q 32 30 15 35 Z" fill="#2d0a0a" stroke="#EF4444" strokeWidth="2.5" />
      <line x1="50" y1="35" x2="50" y2="65" stroke="#EF4444" strokeWidth="2" />
      <rect x="25" y="18" width="14" height="18" rx="1" fill="#111" stroke="#EF4444" strokeWidth="1.5" transform="rotate(-15 32 27)" className="animate-float-soft" />
      <path d="M 68 22 C 66 18 61 18 59 21 C 57 18 52 18 50 22 C 50 25 59 30 59 30 C 59 30 68 25 68 22 Z" fill="#EF4444" className="animate-pulse-soft" />
    </svg>
  );
}

function LyfChangerIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="80" x2="80" y2="80" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" />
      <polygon points="40,80 50,68 60,80" fill="#047857" stroke="#059669" strokeWidth="1.5" />
      <g className="animate-float-soft">
        <path d="M 45 70 Q 50 82 55 70 Z" fill="#059669" className="animate-pulse" />
        <polygon points="34,64 42,50 42,64" fill="#047857" stroke="#059669" strokeWidth="1.5" />
        <polygon points="66,64 58,50 58,64" fill="#047857" stroke="#059669" strokeWidth="1.5" />
        <rect x="42" y="32" width="16" height="32" rx="3" fill="#111" stroke="#059669" strokeWidth="2.5" />
        <path d="M 42 33 Q 50 15 58 33 Z" fill="#047857" stroke="#059669" strokeWidth="2" />
        <circle cx="50" cy="44" r="3.5" fill="#DCFCE7" stroke="#059669" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

function CafeMarketingIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30 40 L 70 40 L 65 70 C 64 75 60 78 55 78 L 45 78 C 40 78 36 75 35 70 Z" stroke="#FF8F00" strokeWidth="2.5" />
      <path d="M 70 46 C 76 46 76 58 70 58" stroke="#FF8F00" strokeWidth="2" />
      <path d="M 40 32 Q 44 24 40 18" stroke="#FF8F00" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 50 32 Q 54 24 50 18" stroke="#FF8F00" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 60 32 Q 64 24 60 18" stroke="#FF8F00" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const projectsData = [
  {
    slug: "skysentry-ai",
    name: "SkySentry AI",
    timeline: "2026 Hackachino 4.0",
    description: "Visual Verification Layer for Intelligent Aerial Surveillance. Integrates with radar and camera feeds to classify threats (Drones, Birds, Aircraft) using YOLOv10 and OpenCV.",
    tags: ["AI", "Computer Vision", "YOLOv10", "Spring Boot"],
    status: "COMPLETED",
    color: "#22C55E",
    glowColor: "rgba(34, 197, 94, 0.15)",
    badgeBg: "bg-green-500/10 text-green-400 border-green-500/20",
    icon: <SkySentryIcon />
  },
  {
    slug: "bubble-blast",
    name: "Bubble Blast",
    timeline: "2026 Semester 2",
    description: "A polished 2D Android arcade shooter built in Java using SurfaceView and a custom game loop thread. Optimized for 400+ active objects with modular classes.",
    tags: ["Android Studio", "Java", "Game Loop", "Trigonometry"],
    status: "COMPLETED",
    color: "#F97316",
    glowColor: "rgba(249, 115, 22, 0.15)",
    badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    icon: <BubbleBlastIcon />
  },
  {
    slug: "aryanverse",
    name: "AryanVerse",
    timeline: "2026 Summer Break May",
    description: "My personal digital universe combining storytelling, projects, skills, and journey archives into an interactive WebGL solar system digital map.",
    tags: ["Next.js", "Three.js", "GSAP", "WebGL"],
    status: "IN PROGRESS",
    color: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.15)",
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    icon: <AryanVerseIcon />
  },
  {
    slug: "intern-ease",
    name: "Intern-Ease",
    timeline: "2025 September SIH",
    description: "AI-powered internship recommendation engine built for the PM Internship Scheme, matching student parameters with ideal opportunities. Developed for the SIH internal rounds.",
    tags: ["Recommendation Engine", "Algorithms", "Database", "Collaboration"],
    status: "COMPLETED",
    color: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.15)",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: <InternEaseIcon />
  },
  {
    slug: "echoes-within",
    name: "Echoes Within",
    timeline: "2025 Semester 1",
    description: "A premium Audio Steganography cybersecurity product enabling secure hiding and extraction of secret text inside audio using the LSB (Least Significant Bit) algorithm.",
    tags: ["Next.js", "Python", "Flask", "Cybersecurity"],
    status: "COMPLETED",
    color: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.15)",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    icon: <EchoesWithinIcon />
  },
  {
    slug: "lyfchanger",
    name: "LyfChanger",
    timeline: "2025 Planned",
    description: "A youth-driven lifestyle and creator brand concept designed to create an ecosystem for young people to express themselves, grow, and build meaningful lives.",
    tags: ["Startup Concept", "Branding Strategy", "Community"],
    status: "PLANNED",
    color: "#059669",
    glowColor: "rgba(5, 150, 105, 0.15)",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: <LyfChangerIcon />
  },
  {
    slug: "cafe-marketing",
    name: "Local Cafe Web & Marketing Service",
    timeline: "2024",
    description: "An unnamed business venture managing digital assets for local Greater Noida restaurants. Led a team of juniors to create custom websites and run social campaigns.",
    tags: ["Leadership", "Web Dev", "Marketing", "Hustle"],
    status: "COMPLETED",
    color: "#FF8F00",
    glowColor: "rgba(255, 143, 0, 0.15)",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    icon: <CafeMarketingIcon />
  },
  {
    slug: "unscripted-love",
    name: "Unscripted Love",
    timeline: "2024",
    description: "Original literary contemporary novel outline following character growth, vulnerable dialogues, and internal monologues through the Hero's Journey.",
    tags: ["Creative Writing", "Novel", "Storytelling"],
    status: "IN PROGRESS",
    color: "#EF4444",
    glowColor: "rgba(239, 68, 68, 0.15)",
    badgeBg: "bg-red-500/10 text-red-400 border-red-500/20",
    icon: <UnscriptedLoveIcon />
  }
];

export default function ProjectsLabPage() {
  return (
    <main className="relative w-screen h-screen overflow-y-auto overflow-x-hidden bg-[#050508] text-white select-none pb-20 scrollbar-thin">
      
      {/* Top-Left Back Button */}
      <div className="absolute top-8 left-8 z-30 pointer-events-auto">
        <Link
          href="/?state=WORLD"
          className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/60 hover:border-purple-500/40 hover:text-white transition-all duration-300 rounded font-space-mono text-xs tracking-wider cursor-pointer text-[#94A3B8] shadow-md group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span> Back to Universe
        </Link>
      </div>

      {styleBlock()}

      {/* Main Centered Content Container */}
      <div className="max-w-4xl mx-auto w-full px-6 py-24 flex flex-col gap-14 mt-10">
        
        {/* Page Header */}
        <div className="flex flex-col gap-3 text-left">
          <h1 className="font-orbitron text-4xl md:text-5xl font-black tracking-widest text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            PROJECTS LAB
          </h1>
          <p className="text-slate-400 font-sans text-sm md:text-base max-w-xl leading-relaxed">
            Ideas turned into experiments. Concepts turning into real-world impact.
          </p>
          <div className="h-[2px] w-24 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 mt-2 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
        </div>

        {/* Vertical Cards Showcase */}
        <div className="flex flex-col gap-6 w-full">
          {projectsData.map((project) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              className="group relative w-full rounded-2xl bg-slate-950/40 border border-slate-900/60 hover:border-slate-800/80 p-5 md:p-6 flex flex-col md:flex-row items-center gap-6 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-950/70"
            >
              {/* Subtle dynamic glow backing */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl z-[-1]"
                style={{
                  background: `radial-gradient(circle at 10% 50%, ${project.glowColor}, transparent 55%)`
                }}
              />

              {/* LEFT: Large 3D-Style Icon */}
              <div 
                className="w-24 h-24 shrink-0 rounded-2xl bg-black/55 border border-slate-900 flex items-center justify-center p-3 relative overflow-hidden transition-transform duration-300"
                style={{
                  filter: `drop-shadow(0 0 10px ${project.color}35)`
                }}
              >
                <div 
                  className="absolute inset-0 opacity-10 blur-md transition-opacity duration-300 group-hover:opacity-20" 
                  style={{ backgroundColor: project.color }} 
                />
                <div className="w-full h-full relative z-10 transition-transform duration-300 group-hover:scale-105">
                  {project.icon}
                </div>
              </div>

              {/* CENTER: Project Details */}
              <div className="flex flex-col gap-2 text-left flex-1 w-full">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-orbitron text-lg md:text-xl font-bold uppercase tracking-wider text-white group-hover:text-white transition-colors">
                    {project.name}
                  </h2>
                  <span className="text-[9px] text-[#A855F7] font-space-mono bg-purple-950/20 px-2 py-0.5 rounded border border-purple-900/30 uppercase tracking-widest font-black">
                    {project.timeline}
                  </span>
                </div>
                <p className="text-slate-400 font-sans text-sm leading-relaxed max-w-2xl">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-0.5 rounded-md bg-slate-950/70 border border-slate-900 text-slate-500 font-space-mono text-[9px] tracking-wider uppercase font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT: Status Badge and Arrow */}
              <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 w-full md:w-auto mt-4 md:mt-0 border-t border-slate-900/60 md:border-t-0 pt-4 md:pt-0">
                <span 
                  className={`px-3 py-1.5 rounded-full border text-[8.5px] font-space-mono tracking-[0.15em] font-black uppercase flex items-center gap-1.5 ${project.badgeBg}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: project.color }} />
                  {project.status}
                </span>

                <div 
                  className="w-10 h-10 rounded-full bg-slate-950/60 border border-slate-900 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-slate-800 transition-all duration-300 group-hover:translate-x-1 shadow-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}

function styleBlock() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .animate-spin-slow {
        animation: spin-slow 15s linear infinite;
      }
      
      @keyframes float-soft {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      .animate-float-soft {
        animation: float-soft 3.5s ease-in-out infinite;
      }
      
      @keyframes pulse-soft {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 0.95; transform: scale(1.08); }
      }
      .animate-pulse-soft {
        animation: pulse-soft 3s ease-in-out infinite;
      }
      
      @keyframes wave-expand {
        0% { transform: scale(0.6); opacity: 0; }
        30% { opacity: 0.8; }
        100% { transform: scale(1.3); opacity: 0; }
      }
      .animate-wave-expand {
        animation: wave-expand 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
      }
    ` }} />
  );
}
