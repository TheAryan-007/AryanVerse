"use client";

/**
 * About Headquarters Zone Page — AryanVerse
 * 
 * Displays details about Aryan Chauhan: his B.Tech, coding specialties,
 * cinematic interest, and stats. Integrates standard AryanVerse styling,
 * interactive Canvas starfield, GSAP loading timelines, and ScrollTrigger animations.
 */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Film,
  BookOpen,
  Heart,
  Music,
  Compass,
  Award,
  Sparkles,
  Brain,
  ExternalLink,
  FileText
} from "lucide-react";

// Simple procedural Canvas Starfield for backdrop consistency
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

    // Populate stars
    const starsCount = 100;
    const stars = [];
    for (let i = 0; i < starsCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.3 + 0.3,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.04 + 0.01,
        factor: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";

      stars.forEach((star) => {
        // Twinkle animation
        star.alpha += star.speed * star.factor;
        if (star.alpha > 1) {
          star.alpha = 1;
          star.factor = -1;
        } else if (star.alpha < 0.2) {
          star.alpha = 0.2;
          star.factor = 1;
        }

        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
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
      className="absolute inset-0 w-full h-full z-[-2] pointer-events-none opacity-50"
    />
  );
}

// Fallback image component rendering high-fidelity vector holographic cards if missing
function FallbackImage({ src, alt, icon: Icon, title, className }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`relative bg-gradient-to-br from-[#0d0d1a] to-[#15152e] border border-[#7B2FBE]/30 flex flex-col items-center justify-center p-4 rounded-lg overflow-hidden group/fallback ${className}`}>
        {/* Radial glow backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,47,190,0.15),transparent_70%)] pointer-events-none" />
        {/* Futuristic grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_18px] pointer-events-none" />
        
        {/* Shimmer overlay */}
        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover/fallback:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
        
        <Icon className="w-8 h-8 text-[#C084FC] mb-2 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)] group-hover/fallback:scale-110 transition-transform duration-300" />
        <span className="font-orbitron text-[9px] tracking-wider text-[#A855F7] font-semibold text-center uppercase max-w-[110px] truncate px-1">
          {title}
        </span>
        <span className="font-space-mono text-[6px] text-[#94A3B8] uppercase mt-1 tracking-widest">
          HOLO-VERIFIED
        </span>
        
        {/* Cyberpunk corner details */}
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-[#C084FC]/50" />
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-[#C084FC]/50" />
        <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l border-[#C084FC]/50" />
        <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-[#C084FC]/50" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
    />
  );
}

export default function AboutPage() {
  const mainRef = useRef(null);

  const beyondCodingCards = [
    {
      title: "Cinema",
      icon: Film,
      description: "Film buff, storytelling analyst, and camera angle enthusiast."
    },
    {
      title: "Books",
      icon: BookOpen,
      description: "Avid reader, especially high fantasy, sci-fi, and thrillers."
    },
    {
      title: "Writing Dream",
      icon: Heart,
      description: "Penning a debut book 'Unscripted Love' — a journey of emotion."
    },
    {
      title: "Music",
      icon: Music,
      description: "Curator of ambient space-synth playlists and lo-fi beats."
    },
    {
      title: "Sports Icons",
      icon: Compass,
      description: "Inspired by the mindset of legendary athletes like Virat Kohli and Cristiano Ronaldo."
    },
    {
      title: "Entrepreneurship",
      icon: Award,
      description: "Fascinated by startup culture, product management, and building MVP platforms."
    },
    {
      title: "Design Background",
      icon: Sparkles,
      description: "Self-taught visual designer focusing on dark, neon, futuristic aesthetics."
    },
    {
      title: "All-Rounder",
      icon: Brain,
      description: "Believer in hybrid learning — bridging tech, business, and creative writing."
    }
  ];

  const hackathons = [
    {
      title: "Hackaccino 4.0",
      image: "/hackathons/hackaccino.jpg",
      badge: "BUILT ECHOES",
      subtitle: "24-Hour AI Prototype",
      description: "Engineered Echoes, a semantic intelligence engine that processes conversational fragments into structured mind-maps and knowledge hubs.",
      lesson: "Rapid API integration and vector database design."
    },
    {
      title: "SmartBU Hackathon 2025",
      image: "/hackathons/smartbu.jpg",
      badge: "BUILT A REGIONAL JOB PLATFORM",
      subtitle: "University Innovation Node",
      description: "Built a job and internship discovery platform focused on India's regional languages — built on the idea that skill and language shouldn't be a barrier to opportunity.",
      lesson: "Solving for the overlooked — most platforms ignore regional language users entirely."
    }
  ];

  const certificates = [
    {
      title: "Introduction to Python",
      issuer: "Infosys Springboard",
      lesson: "Lessons: Procedural logic, core data structures, and OOP paradigms in Python.",
      link: "/certificates/cert-1.jpg",
      thumbnail: "/certificates/cert-1.jpg"
    },
    {
      title: "Generative AI Studio",
      issuer: "Google Cloud",
      lesson: "Lessons: LLM prompting, parameter tuning, and GenAI applications.",
      link: "/certificates/generative-ai.pdf",
      thumbnail: "/certificates/cert-7.jpg"
    },
    {
      title: "Data Science Internship Selection",
      issuer: "Unessa Foundation (via Internshala)",
      lesson: "Lessons: Machine learning pipelines and real-world data analysis.",
      link: "/certificates/data-science-internship.pdf",
      thumbnail: "/certificates/cert-8.jpg",
      isActive: true
    },
    {
      title: "Machine Learning with MATLAB",
      issuer: "MathWorks Training",
      lesson: "Lessons: Numerical computation, matrix manipulation, and algorithm design.",
      link: "/certificates/cert-6.jpg",
      thumbnail: "/certificates/cert-6.jpg"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial hero landing animations
    const tl = gsap.timeline();
    tl.fromTo(
      ".animate-left-el",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" }
    );
    tl.fromTo(
      ".animate-photo",
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.0, ease: "power2.out" },
      "-=0.6"
    );
    tl.fromTo(
      ".animate-stat-card",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.5"
    );

    // Entrance animations for scroll-triggered sections
    const sections = gsap.utils.toArray(".scroll-animate-section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            scroller: mainRef.current, // Target the scrolling <main> element
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main
      ref={mainRef}
      className="relative w-screen h-screen overflow-y-auto overflow-x-hidden bg-[#050508] text-white flex flex-col items-center justify-start py-20 px-6 select-none scrollbar-thin"
    >
      
      {/* Environmental Backdrop Starfield & Corner Glow */}
      <CanvasStarfield />
      <div 
        className="absolute -bottom-20 -left-20 w-[450px] h-[450px] rounded-full bg-[#7B2FBE]/10 blur-[130px] z-[-1] pointer-events-none" 
        style={{ content: '""' }}
      />
      <div 
        className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-[#3B82F6]/5 blur-[120px] z-[-1] pointer-events-none" 
        style={{ content: '""' }}
      />

      {/* Cyberpunk Navigation Back Button */}
      <Link
        href="/?state=WORLD&node=about"
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/60 hover:border-[#C084FC] hover:text-white transition-all duration-300 rounded font-space-mono text-xs tracking-wider cursor-pointer text-[#94A3B8] shadow-[0_0_15px_rgba(0,0,0,0.5)] group"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span> Back to Universe
      </Link>

      {/* Two Column Page Content Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-8 lg:mt-16">
        
        {/* Left Column: Story Bio & Stats */}
        <div className="flex flex-col items-start text-left gap-5">
          
          <span className="font-space-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#C084FC] animate-left-el opacity-0">
            WHO I AM
          </span>
          
          <h1 className="font-orbitron text-5xl md:text-6xl font-black tracking-wide text-white animate-left-el opacity-0">
            About Me
          </h1>
          
          <h2 className="font-orbitron text-2xl md:text-3xl font-semibold text-white animate-left-el opacity-0">
            I'm <span className="bg-gradient-to-r from-[#7B2FBE] to-[#C084FC] bg-clip-text text-transparent font-bold">Aryan</span>
          </h2>
          
          <div className="font-space-mono text-[9px] md:text-[10px] text-[#C084FC] tracking-[0.1em] font-bold uppercase animate-left-el opacity-0">
            DATA SCIENCE STUDENT • BUILDER • STORYTELLER
          </div>
          
          <p className="font-inter text-sm md:text-base leading-[1.7] text-[#94A3B8] max-w-[500px] animate-left-el opacity-0 mt-2">
            I'm <span className="text-[#C084FC] font-bold">Aryan</span> — a 2nd year B.Tech Computer Science student at Bennett University, specializing in Data Science. I build things that solve real problems, from <span className="text-[#C084FC] font-bold">SkySentry AI</span> to <span className="text-[#C084FC] font-bold">Echoes</span> to this universe you're standing in right now.
            <br /><br />
            But code is only half the story. I'm a cinephile at heart — obsessed with storytelling, films, and the craft of writing. Right now I'm working on a book called <span className="text-[#C084FC] font-bold">Unscripted Love</span>.
            <br /><br />
            What ties it all together is curiosity. Whether it's a line of code or a line of a story, I'm always building, exploring, and pushing past what's comfortable.
          </p>

          {/* 2x2 Stat Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full">
            <div className="animate-stat-card bg-[#0d0d1a]/70 backdrop-blur-sm border border-[rgba(168,85,247,0.3)] rounded-xl p-4 text-center shadow-[0_0_15px_rgba(168,85,247,0.05)] hover:border-[#C084FC]/60 hover:shadow-[0_0_20px_rgba(192,132,252,0.15)] transition-all duration-300">
              <div className="font-orbitron text-2xl font-black text-[#C084FC] drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]">4+</div>
              <div className="font-space-mono text-[9px] text-slate-400 tracking-widest uppercase mt-1.5">PROJECTS</div>
            </div>
            <div className="animate-stat-card bg-[#0d0d1a]/70 backdrop-blur-sm border border-[rgba(168,85,247,0.3)] rounded-xl p-4 text-center shadow-[0_0_15px_rgba(168,85,247,0.05)] hover:border-[#C084FC]/60 hover:shadow-[0_0_20px_rgba(192,132,252,0.15)] transition-all duration-300">
              <div className="font-orbitron text-2xl font-black text-[#C084FC] drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]">4</div>
              <div className="font-space-mono text-[9px] text-slate-400 tracking-widest uppercase mt-1.5">CERTIFICATES</div>
            </div>
            <div className="animate-stat-card bg-[#0d0d1a]/70 backdrop-blur-sm border border-[rgba(168,85,247,0.3)] rounded-xl p-4 text-center shadow-[0_0_15px_rgba(168,85,247,0.05)] hover:border-[#C084FC]/60 hover:shadow-[0_0_20px_rgba(192,132,252,0.15)] transition-all duration-300">
              <div className="font-orbitron text-2xl font-black text-[#C084FC] drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]">2nd</div>
              <div className="font-space-mono text-[9px] text-slate-400 tracking-widest uppercase mt-1.5">YEAR B.TECH</div>
            </div>
            <div className="animate-stat-card bg-[#0d0d1a]/70 backdrop-blur-sm border border-[rgba(168,85,247,0.3)] rounded-xl p-4 text-center shadow-[0_0_15px_rgba(168,85,247,0.05)] hover:border-[#C084FC]/60 hover:shadow-[0_0_20px_rgba(192,132,252,0.15)] transition-all duration-300">
              <div className="font-orbitron text-2xl font-black text-[#C084FC] drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]">∞</div>
              <div className="font-space-mono text-[9px] text-slate-400 tracking-widest uppercase mt-1.5">CURIOSITY</div>
            </div>
          </div>

        </div>

        {/* Right Column: Premium Photo Presentation */}
        <div className="flex items-center justify-center lg:justify-end animate-photo opacity-0">
          <div className="relative rounded-[20px] border border-[rgba(168,85,247,0.4)] shadow-[0_0_35px_rgba(168,85,247,0.2)] max-w-[450px] w-full aspect-[4/5] overflow-hidden group">
            
            <img
              src="/aryan-photo.jpg"
              alt="Aryan Chauhan"
              className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Soft Ambient Inner Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Overlapping Glassmorphic Availability Status Pill */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 shadow-lg">
              <span className="w-2.5 h-2.5 bg-[#22C55E] rounded-full animate-pulse shadow-[0_0_8px_#22C55E]" />
              <span className="font-space-mono text-[9px] font-bold text-white tracking-widest uppercase">
                AVAILABLE FOR WORK
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* SECTION 1: Quote Banner */}
      <section className="scroll-animate-section opacity-0 w-full max-w-5xl py-24 flex flex-col items-center justify-center relative text-center px-4 mt-8">
        {/* Radial glow background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,47,190,0.12),transparent_65%)] pointer-events-none" />
        
        {/* Cyberpunk decoration lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-[#7B2FBE]/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gradient-to-r from-transparent via-[#7B2FBE]/50 to-transparent" />

        <span className="font-space-mono text-xs text-[#7B2FBE] uppercase tracking-[0.3em] mb-4">
          PERSONAL CREDO
        </span>

        <div className="relative">
          {/* Large glowing quote marks */}
          <span className="absolute -top-16 -left-12 font-orbitron text-9xl text-[#7B2FBE]/10 select-none pointer-events-none">
            “
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-black tracking-wide leading-tight text-white max-w-4xl relative z-10 px-6">
            Never afraid to <span className="bg-gradient-to-r from-[#7B2FBE] to-[#C084FC] bg-clip-text text-transparent font-black">take part</span>. Win or lose, I <span className="bg-gradient-to-r from-[#7B2FBE] to-[#C084FC] bg-clip-text text-transparent font-black">show up</span>.
          </h2>
          <span className="absolute -bottom-24 -right-12 font-orbitron text-9xl text-[#7B2FBE]/10 select-none pointer-events-none">
            ”
          </span>
        </div>
      </section>

      {/* SECTION 2: Beyond Coding */}
      <section className="scroll-animate-section opacity-0 w-full max-w-6xl py-16 flex flex-col items-center justify-start gap-10 px-4">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="font-space-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#C084FC]">
            WHO I AM OUTSIDE THE CODE
          </span>
          <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wider text-white">
            BEYOND CODING
          </h2>
          <div className="w-12 h-[2px] bg-[#7B2FBE] mt-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-4">
          {beyondCodingCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group/beyond bg-[#0d0d1a]/80 backdrop-blur-sm border border-[rgba(168,85,247,0.2)] hover:border-[#C084FC]/80 rounded-xl p-5 flex flex-col items-start gap-4 transition-all duration-300 hover:translate-y-[-6px] shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] relative overflow-hidden"
              >
                {/* Subtle card light swipe on hover */}
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-[#C084FC]/5 to-transparent group-hover/beyond:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                
                <div className="p-3 bg-[#7B2FBE]/10 border border-[#7B2FBE]/20 rounded-lg group-hover/beyond:bg-[#7B2FBE]/20 group-hover/beyond:border-[#C084FC]/40 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-[#C084FC] group-hover/beyond:scale-110 transition-transform duration-300" />
                </div>
                
                <div>
                  <h3 className="font-orbitron text-sm font-bold text-white tracking-wide group-hover/beyond:text-[#C084FC] transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="font-inter text-[11px] md:text-xs text-[#94A3B8] leading-[1.6] mt-2 group-hover/beyond:text-[#CBD5E1] transition-colors duration-300">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: Hackathons */}
      <section className="scroll-animate-section opacity-0 w-full max-w-6xl py-16 flex flex-col items-center justify-start gap-10 px-4">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="font-space-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#C084FC]">
            COMPETING & BUILDING
          </span>
          <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wider text-white">
            HACKATHON JOURNEY
          </h2>
          <div className="w-12 h-[2px] bg-[#7B2FBE] mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-4">
          {hackathons.map((hackathon, idx) => (
            <div
              key={idx}
              className="group/hack bg-[#0d0d1a]/85 border border-[rgba(168,85,247,0.2)] hover:border-[#C084FC]/80 rounded-xl overflow-hidden flex flex-col transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_35px_rgba(168,85,247,0.18)]"
            >
              <div className="w-full aspect-[16/10] relative overflow-hidden bg-black/40">
                <FallbackImage
                  src={hackathon.image}
                  alt={hackathon.title}
                  icon={Award}
                  title={hackathon.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/hack:scale-105"
                />
                <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md px-3 py-1.5 border border-[#7B2FBE]/30 rounded font-space-mono text-[8px] font-bold text-[#C084FC] tracking-widest uppercase">
                  {hackathon.badge}
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow gap-3">
                <div>
                  <h3 className="font-orbitron text-base font-bold text-white tracking-wide group-hover/hack:text-[#C084FC] transition-colors duration-300">
                    {hackathon.title}
                  </h3>
                  <span className="font-space-mono text-[10px] text-[#A855F7] tracking-wider block mt-1">
                    {hackathon.subtitle}
                  </span>
                </div>
                
                <p className="font-inter text-xs text-[#94A3B8] leading-[1.6] flex-grow">
                  {hackathon.description}
                </p>
                
                <div className="border-t border-[#7B2FBE]/10 pt-3 mt-1">
                  <span className="font-space-mono text-[9px] text-[#C084FC] uppercase tracking-wider block mb-1">
                    Key Lesson
                  </span>
                  <p className="font-inter text-xs italic text-[#CBD5E1]">
                    {hackathon.lesson}
                  </p>
                </div>

                <div className="flex justify-start mt-3">
                  <a
                    href={hackathon.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-[#C084FC]/60 bg-black/40 hover:bg-[#7B2FBE]/10 text-[10px] font-space-mono tracking-wider uppercase text-[#CBD5E1] hover:text-white rounded transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_0_12px_rgba(168,85,247,0.15)] group/btn"
                  >
                    View Certificate <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8] group-hover/btn:text-[#C084FC] transition-colors duration-200" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: Credentials */}
      <section className="scroll-animate-section opacity-0 w-full max-w-6xl py-16 flex flex-col items-center justify-start gap-10 px-4">
        <div className="text-center flex flex-col items-center gap-2">
          <span className="font-space-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#C084FC]">
            VERIFIED EXPERTISE
          </span>
          <h2 className="font-orbitron text-3xl md:text-4xl font-black tracking-wider text-white">
            CREDENTIALS
          </h2>
          <div className="w-12 h-[2px] bg-[#7B2FBE] mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
          {certificates.map((cert, idx) => (
            <div
              key={idx}
              className="group/cert bg-[#0d0d1a]/85 border border-[rgba(168,85,247,0.2)] hover:border-[#C084FC]/85 rounded-xl p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] relative overflow-hidden"
            >
              {cert.isActive && (
                <div className="absolute top-0 right-0 bg-[#A855F7] text-black font-space-mono text-[7px] font-bold px-3 py-1 uppercase tracking-widest rounded-bl-lg shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                  Active Internship
                </div>
              )}
              
              {/* Left/Top Thumbnail */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-black/40 rounded-lg overflow-hidden flex items-center justify-center relative border border-[#7B2FBE]/10 group-hover/cert:border-[#C084FC]/30 transition-colors duration-300">
                <FallbackImage
                  src={cert.thumbnail}
                  alt={cert.title}
                  icon={cert.isActive ? Brain : FileText}
                  title={cert.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/cert:scale-105"
                />
              </div>

              {/* Right Details */}
              <div className="flex flex-col gap-2 flex-grow text-center sm:text-left">
                <div className="pr-12">
                  <h3 className="font-orbitron text-sm font-bold text-white tracking-wide group-hover/cert:text-[#C084FC] transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <span className="font-space-mono text-[10px] text-[#A855F7]/80 tracking-wider block mt-0.5">
                    {cert.issuer}
                  </span>
                </div>

                <p className="font-inter text-xs italic text-[#CBD5E1]/90 leading-[1.5] mt-1 border-l-2 border-[#7B2FBE]/30 pl-2">
                  {cert.lesson}
                </p>

                <div className="flex justify-center sm:justify-start mt-2">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-[#C084FC]/60 bg-black/40 hover:bg-[#7B2FBE]/10 text-[10px] font-space-mono tracking-wider uppercase text-[#CBD5E1] hover:text-white rounded transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_0_12px_rgba(168,85,247,0.15)] group/btn"
                  >
                    View Certificate <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8] group-hover/btn:text-[#C084FC] transition-colors duration-200" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: Social Links Footer */}
      <section className="scroll-animate-section opacity-0 w-full max-w-5xl py-12 border-t border-[#7B2FBE]/10 flex flex-col items-center justify-center gap-6 mt-16 px-4">
        <span className="font-space-mono text-[10px] text-[#C084FC] tracking-[0.2em] uppercase">
          Connect in Orbit
        </span>
        <div className="flex items-center gap-6">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/aryan-chauhan-4284b32a7"
            target="_blank"
            rel="noopener noreferrer"
            className="group/social p-3 bg-[#0d0d1a] border border-[#0A66C2]/30 hover:border-[#0A66C2] rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(10,102,194,0.5)] hover:translate-y-[-4px]"
            title="LinkedIn"
          >
            <svg className="w-5 h-5 text-[#0A66C2] transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/TheAryan-007"
            target="_blank"
            rel="noopener noreferrer"
            className="group/social p-3 bg-[#0d0d1a] border border-[rgba(255,255,255,0.15)] hover:border-white rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:translate-y-[-4px]"
            title="GitHub"
          >
            <svg className="w-5 h-5 text-[#E6edf3] transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/aryannxnn._.02"
            target="_blank"
            rel="noopener noreferrer"
            className="group/social p-3 bg-[#0d0d1a] border border-[#d6249f]/30 hover:border-[#d6249f] rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(214,36,159,0.5)] hover:translate-y-[-4px]"
            title="Instagram"
          >
            <svg className="w-5 h-5 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="url(#instaGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="instaGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fdf497" />
                  <stop offset="5%" stopColor="#fdf497" />
                  <stop offset="45%" stopColor="#fd5949" />
                  <stop offset="60%" stopColor="#d6249f" />
                  <stop offset="100%" stopColor="#285AEB" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          {/* Gmail */}
          <a
            href="mailto:aryanncr2@gmail.com"
            className="group/social p-3 bg-[#0d0d1a] border border-[#EA4335]/30 hover:border-[#EA4335] rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,67,53,0.5)] hover:translate-y-[-4px]"
            title="Gmail"
          >
            <svg className="w-5 h-5 text-[#EA4335] transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/917827087385"
            target="_blank"
            rel="noopener noreferrer"
            className="group/social p-3 bg-[#0d0d1a] border border-[#25D366]/30 hover:border-[#25D366] rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:translate-y-[-4px]"
            title="WhatsApp"
          >
            <svg className="w-5 h-5 text-[#25D366] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.479 1.968 14.017.94 11.4.94 5.966.94 1.54 5.311 1.536 10.74c-.001 1.67.439 3.3 1.272 4.737L1.819 21.1l5.828-1.528zM17.51 14.51c-.307-.154-1.82-.9-2.1-.998-.28-.1-.485-.154-.689.154-.204.307-.79.998-.968 1.2-.178.204-.356.23-.663.077-1.127-.565-1.967-1.004-2.753-2.353-.207-.355.207-.33.593-1.1.077-.154.038-.288-.019-.41-.057-.122-.485-1.17-.663-1.602-.175-.42-.35-.362-.485-.369h-.415c-.154 0-.395.057-.601.282-.206.225-.785.767-.785 1.87 0 1.1.8 2.167.912 2.321.112.154 1.574 2.404 3.814 3.374 1.24.537 1.889.65 2.56.55.772-.115 1.82-.743 2.078-1.427.257-.684.257-1.274.18-1.393-.077-.12-.28-.175-.588-.33z"/>
            </svg>
          </a>
        </div>
        <p className="font-space-mono text-[9px] text-slate-500 mt-2 uppercase tracking-widest">
          © {new Date().getFullYear()} ARYANVERSE • ALL SYSTEMS OPERATIONAL
        </p>
      </section>

    </main>
  );
}