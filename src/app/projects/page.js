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
      {/* Sweep line */}
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
      {/* Target Blips */}
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
      {/* Planet Spherical Body */}
      <circle cx="50" cy="50" r="22" fill="url(#planetBody)" stroke="#111" strokeWidth="1.5" />
      {/* Orbital Rings */}
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

function MovieSystemIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Film Strip Outline frame */}
      <rect x="15" y="25" width="70" height="50" rx="4" stroke="#3B82F6" strokeWidth="2.5" />
      <line x1="25" y1="25" x2="25" y2="75" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="75" y1="25" x2="75" y2="75" stroke="#3B82F6" strokeWidth="1.5" />
      
      {/* Film notches */}
      <rect x="18" y="30" width="4" height="4" rx="0.5" fill="#3B82F6" opacity="0.7" />
      <rect x="18" y="42" width="4" height="4" rx="0.5" fill="#3B82F6" opacity="0.7" />
      <rect x="18" y="54" width="4" height="4" rx="0.5" fill="#3B82F6" opacity="0.7" />
      <rect x="18" y="66" width="4" height="4" rx="0.5" fill="#3B82F6" opacity="0.7" />
      
      <rect x="78" y="30" width="4" height="4" rx="0.5" fill="#3B82F6" opacity="0.7" />
      <rect x="78" y="42" width="4" height="4" rx="0.5" fill="#3B82F6" opacity="0.7" />
      <rect x="78" y="54" width="4" height="4" rx="0.5" fill="#3B82F6" opacity="0.7" />
      <rect x="78" y="66" width="4" height="4" rx="0.5" fill="#3B82F6" opacity="0.7" />

      {/* Play icon in center */}
      <polygon points="42,40 64,50 42,60" fill="#3B82F6" stroke="#93C5FD" strokeWidth="1.5" className="animate-pulse" />
    </svg>
  );
}

function UnscriptedLoveIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Open Book pages */}
      <path d="M 15 65 Q 32 60 50 65 Q 68 60 85 65 L 85 35 Q 68 30 50 35 Q 32 30 15 35 Z" fill="#2d0a0a" stroke="#EF4444" strokeWidth="2.5" />
      <line x1="50" y1="35" x2="50" y2="65" stroke="#EF4444" strokeWidth="2" />
      {/* Floating pages */}
      <rect x="25" y="18" width="14" height="18" rx="1" fill="#111" stroke="#EF4444" strokeWidth="1.5" transform="rotate(-15 32 27)" className="animate-float-soft" />
      {/* Glowing heart/sparkle */}
      <path d="M 68 22 C 66 18 61 18 59 21 C 57 18 52 18 50 22 C 50 25 59 30 59 30 C 59 30 68 25 68 22 Z" fill="#EF4444" className="animate-pulse-soft" />
    </svg>
  );
}

function LyfChangerIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Platform */}
      <line x1="20" y1="80" x2="80" y2="80" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" />
      <polygon points="40,80 50,68 60,80" fill="#EA580C" stroke="#F97316" strokeWidth="1.5" />
      {/* Rocket fuselage */}
      <g className="animate-float-soft">
        {/* Flames */}
        <path d="M 45 70 Q 50 82 55 70 Z" fill="#F97316" className="animate-pulse" />
        {/* Fins */}
        <polygon points="34,64 42,50 42,64" fill="#EA580C" stroke="#F97316" strokeWidth="1.5" />
        <polygon points="66,64 58,50 58,64" fill="#EA580C" stroke="#F97316" strokeWidth="1.5" />
        {/* Body */}
        <rect x="42" y="32" width="16" height="32" rx="3" fill="#111" stroke="#F97316" strokeWidth="2.5" />
        {/* Nose cone */}
        <path d="M 42 33 Q 50 15 58 33 Z" fill="#EA580C" stroke="#F97316" strokeWidth="2" />
        {/* Window */}
        <circle cx="50" cy="44" r="3.5" fill="#FFEDD5" stroke="#F97316" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

function StreetwearBrandIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 20 C 53 20 55 22 55 25 C 55 26 54 28 52 29 L 52 35 L 78 50 C 81 52 82 56 80 59 C 78 62 74 63 71 61 L 62 56 L 62 78 C 62 82 58 85 54 85 L 46 85 C 42 85 38 82 38 78 L 38 56 L 29 61 C 26 63 22 62 20 59 C 18 56 19 52 22 50 L 48 35 L 48 29 C 46 28 45 26 45 25 C 45 22 47 20 50 20 Z" stroke="#E11D48" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      <circle cx="50" cy="50" r="5" fill="#E11D48" className="animate-pulse" />
    </svg>
  );
}

function EchosIcon() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="8" fill="#6366F1" className="animate-pulse-soft" />
      {/* Wave rings */}
      <circle cx="50" cy="50" r="18" stroke="#6366F1" strokeWidth="1.5" className="animate-wave-expand" style={{ animationDelay: "0s" }} />
      <circle cx="50" cy="50" r="28" stroke="#6366F1" strokeWidth="1.2" className="animate-wave-expand" style={{ animationDelay: "0.8s" }} />
      <circle cx="50" cy="50" r="38" stroke="#4F46E5" strokeWidth="1" className="animate-wave-expand" style={{ animationDelay: "1.6s" }} />
    </svg>
  );
}

const projectsData = [
  {
    slug: "skysentry-ai",
    name: "SkySentry AI",
    description: "AI-powered visual verification system designed for aerial surveillance. Built to reduce false alerts by distinguishing drones, birds, aircraft, and other flying objects.",
    tags: ["AI", "Computer Vision", "YOLOv10", "OpenCV"],
    status: "COMPLETED",
    color: "#22C55E",
    glowColor: "rgba(34, 197, 94, 0.15)",
    badgeBg: "bg-green-500/10 text-green-400 border-green-500/20",
    icon: <SkySentryIcon />
  },
  {
    slug: "aryanverse",
    name: "AryanVerse",
    description: "My personal digital universe combining storytelling, projects, skills, journey archives, and interactive experiences into one immersive portfolio.",
    tags: ["Next.js", "React", "Three.js", "Storytelling"],
    status: "IN PROGRESS",
    color: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.15)",
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    icon: <AryanVerseIcon />
  },
  {
    slug: "movie-recommendation",
    name: "Movie Recommendation System",
    description: "Recommendation engine designed to suggest movies based on viewing patterns, ratings, genres, and user preferences.",
    tags: ["Python", "Machine Learning", "Data Science"],
    status: "PLANNED",
    color: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.15)",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: <MovieSystemIcon />
  },
  {
    slug: "unscripted-love",
    name: "Unscripted Love",
    description: "Original novel project exploring relationships, emotions, and the unscripted moments that shape people's lives.",
    tags: ["Writing", "Storytelling", "Creative Project"],
    status: "IN PROGRESS",
    color: "#EF4444",
    glowColor: "rgba(239, 68, 68, 0.15)",
    badgeBg: "bg-red-500/10 text-red-400 border-red-500/20",
    icon: <UnscriptedLoveIcon />
  },
  {
    slug: "lyfchanger",
    name: "LyfChanger",
    description: "A premium startup plan in conceptual phase, designed as a digital-first lifestyle platform combining habit curation with high-end wellness merchandise ecosystems.",
    tags: ["Startup Concept", "Branding", "Product Strategy"],
    status: "PLANNED",
    color: "#F97316",
    glowColor: "rgba(249, 115, 22, 0.15)",
    badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    icon: <LyfChangerIcon />
  },
  {
    slug: "streetwear-brand",
    name: "Custom Streetwear Brand",
    description: "My first real business venture bootstrapped in Class 11. Built organic marketing funnels and a print-on-demand supply chain to generate ₹84,000 in revenue.",
    tags: ["E-Commerce", "Branding", "Organic Reels", "Hustle"],
    status: "COMPLETED",
    color: "#E11D48",
    glowColor: "rgba(225, 29, 72, 0.15)",
    badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    icon: <StreetwearBrandIcon />
  },
  {
    slug: "echos",
    name: "Echos",
    description: "A creative concept focused on ideas, stories, reflections, and experiences that leave a lasting impact.",
    tags: ["Creative Project", "Storytelling", "Ideas"],
    status: "PLANNED",
    color: "#6366F1",
    glowColor: "rgba(99, 102, 241, 0.15)",
    badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    icon: <EchosIcon />
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
                <h2 className="font-orbitron text-lg md:text-xl font-bold uppercase tracking-wider text-white group-hover:text-white transition-colors">
                  {project.name}
                </h2>
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
