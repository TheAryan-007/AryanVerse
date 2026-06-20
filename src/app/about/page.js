"use client";

/**
 * About Headquarters Zone Page — AryanVerse
 * 
 * Displays details about Aryan Chauhan: his B.Tech, coding specialties,
 * cinematic interest, and stats. Integrates standard AryanVerse styling,
 * interactive Canvas starfield, and GSAP loading timelines.
 */

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

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

export default function AboutPage() {
  useEffect(() => {
    const tl = gsap.timeline();

    // Fade and slide left column contents
    tl.fromTo(
      ".animate-left-el",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" }
    );

    // Scale and fade image container
    tl.fromTo(
      ".animate-photo",
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.0, ease: "power2.out" },
      "-=0.6"
    );

    // Stagger in stat cards
    tl.fromTo(
      ".animate-stat-card",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.5"
    );
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-y-auto overflow-x-hidden bg-[#050508] text-white flex flex-col items-center justify-start py-20 px-6 select-none scrollbar-thin">
      
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
              <div className="font-orbitron text-2xl font-black text-[#C084FC] drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]">6</div>
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
    </main>
  );
}