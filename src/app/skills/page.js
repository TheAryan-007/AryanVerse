"use client";

/**
 * Skills District Zone Page — AryanVerse
 * 
 * Displays details of Aryan Chauhan's skillset across 2 rebuilt sections (Chunk 1 of 3):
 * 1. Header (Retained navigation and metadata labels)
 * 2. SECTION 1: Programming Languages (Interactive orbit-like layout / Hybrid responsive grid)
 * 3. SECTION 2: Personal Skills (8 Glassmorphism cards with hover transitions)
 * 
 * Features a canvas background with twinkle stars and slow floating, drifting particles.
 */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaJava, FaLinkedin } from "react-icons/fa";
import { 
  SiPython, 
  SiHtml5, 
  SiCss, 
  SiJavascript, 
  SiCplusplus, 
  SiGit,
  SiPandas,
  SiNumpy,
  SiPlotly,
  SiJupyter,
  SiGooglecolab,
  SiScikitlearn,
  SiGithub,
  SiLeetcode,
  SiOpenai,
  SiKaggle,
  SiCanva,
  SiGoogle,
  SiClaude
} from "react-icons/si";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { VscVscode } from "react-icons/vsc";

// Procedural Canvas Backdrop rendering twinkling stars + slow drifting space particles
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

    // Populate stars & floating particles
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
        speedX: isFloating ? (Math.random() - 0.5) * 0.15 : 0, // Slow horizontal drift
        speedY: isFloating ? -Math.random() * 0.15 - 0.05 : 0,  // Slow upward drift
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        factor: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";

      particles.forEach((p) => {
        // Move floating particles
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        // Twinkle animation
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

export default function SkillsPage() {
  const mainRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);
  const [activeDSTool, setActiveDSTool] = useState(null);
  const [hoveredDSTool, setHoveredDSTool] = useState(null);

  // 7 Programming Languages with brand colors and Simple Icons
  const nodes = [
    {
      id: "java",
      name: "Java",
      level: "Strongest Academic Language",
      desc: "My strongest academic programming language. Used extensively in university coursework, object-oriented programming, and software development concepts.",
      color: "#ED8B00",
      icon: <FaJava className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#ED8B00" }} />
    },
    {
      id: "python",
      name: "Python",
      level: "Comfortable, Actively Learning",
      desc: "Used for AI, automation, data science, machine learning exploration, and problem solving.",
      color: "#3776AB",
      icon: <SiPython className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#3776AB" }} />
    },
    {
      id: "html",
      name: "HTML",
      level: "Foundation",
      desc: "Foundation of web development. Used for creating structure and layouts for web applications.",
      color: "#E34F26",
      icon: <SiHtml5 className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#E34F26" }} />
    },
    {
      id: "css",
      name: "CSS",
      level: "Comfortable",
      desc: "Used to create modern, responsive, and visually appealing user interfaces.",
      color: "#1572B6",
      icon: <SiCss className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#1572B6" }} />
    },
    {
      id: "javascript",
      name: "JavaScript",
      level: "Expanding Knowledge",
      desc: "Currently expanding my knowledge of frontend development and interactive web experiences.",
      color: "#F7DF1E",
      icon: <SiJavascript className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#F7DF1E" }} />
    },
    {
      id: "cpp",
      name: "C++",
      level: "Currently Learning",
      desc: "Exploring data structures, algorithms, and performance-oriented programming concepts.",
      color: "#00599C",
      icon: <SiCplusplus className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#00599C" }} />
    },
    {
      id: "git",
      name: "Git & GitHub",
      level: "Daily Use",
      desc: "Version control, project collaboration, and code management.",
      color: "#F05032",
      icon: <SiGit className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#F05032" }} />
    }
  ];

  // 8 Personal Skills
  const personalSkills = [
    { title: "Leadership", desc: "Served as Head Boy during Class 11." },
    { title: "Teamwork", desc: "Worked with teams during hackathons, projects, and internships." },
    { title: "Problem Solving", desc: "Enjoy breaking down complex problems into practical solutions." },
    { title: "Communication", desc: "Experience in content writing, social media management, presentations, and teamwork." },
    { title: "Creativity", desc: "Background in graphic design, storytelling, and visual communication." },
    { title: "Adaptability", desc: "Comfortable learning new tools, technologies, and skills whenever required." },
    { title: "Curiosity", desc: "Constantly exploring new ideas, technologies, books, films, and experiences." },
    { title: "Discipline", desc: "Inspired by athletes like Cristiano Ronaldo and Virat Kohli who emphasize consistency and self-improvement." }
  ];

  // Data Science Toolkit
  const dsTools = [
    {
      id: "pandas",
      name: "Pandas",
      level: "Data Cleaning & Analysis",
      desc: "Used for data cleaning, manipulation, and analysis.",
      color: "#150458",
      icon: <SiPandas className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#150458" }} />
    },
    {
      id: "numpy",
      name: "NumPy",
      level: "Numerical Computing",
      desc: "Used for numerical computing and efficient array operations.",
      color: "#4D77CF",
      icon: <SiNumpy className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#4D77CF" }} />
    },
    {
      id: "matplotlib",
      name: "Matplotlib",
      level: "Data Visualization",
      desc: "Used for data visualization and understanding patterns.",
      color: "#3B82F6",
      icon: <SiPlotly className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#3B82F6" }} />
    },
    {
      id: "jupyter",
      name: "Jupyter Notebook",
      level: "Preferred Environment",
      desc: "My preferred environment for experimenting with data science workflows.",
      color: "#F37626",
      icon: <SiJupyter className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#F37626" }} />
    },
    {
      id: "googlecolab",
      name: "Google Colab",
      level: "Cloud Experimentation",
      desc: "Used for cloud-based experimentation and machine learning projects.",
      color: "#F9AB00",
      icon: <SiGooglecolab className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#F9AB00" }} />
    },
    {
      id: "scikitlearn",
      name: "Scikit-learn",
      level: "Machine Learning",
      desc: "Building and evaluating machine learning models.",
      color: "#F7931E",
      icon: <SiScikitlearn className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#F7931E" }} />
    },
    {
      id: "excel",
      name: "Excel",
      level: "Data Organization",
      desc: "Used for quick data organization and analysis.",
      color: "#107C41",
      icon: <PiMicrosoftExcelLogo className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#107C41" }} />
    }
  ];

  // Daily Workflow Platforms
  const platforms = [
    {
      name: "VS Code",
      purpose: "Primary development environment.",
      color: "#007ACC",
      icon: <VscVscode className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#007ACC" }} />
    },
    {
      name: "GitHub",
      purpose: "Project hosting and version control.",
      color: "#ffffff",
      icon: <SiGithub className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#ffffff" }} />
    },
    {
      name: "LeetCode",
      purpose: "Problem solving and algorithm practice.",
      color: "#FFA116",
      icon: <SiLeetcode className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#FFA116" }} />
    },
    {
      name: "ChatGPT",
      purpose: "AI-assisted development and learning.",
      color: "#10A37F",
      icon: <SiOpenai className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#10A37F" }} />
    },
    {
      name: "Kaggle",
      purpose: "Data science competitions and datasets.",
      color: "#20BEFF",
      icon: <SiKaggle className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#20BEFF" }} />
    },
    {
      name: "LinkedIn",
      purpose: "Professional networking and personal branding.",
      color: "#0A66C2",
      icon: <FaLinkedin className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#0A66C2" }} />
    },
    {
      name: "Canva",
      purpose: "Design and visual content creation.",
      color: "#00C4CC",
      icon: <SiCanva className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#00C4CC" }} />
    },
    {
      name: "Google Colab",
      purpose: "Cloud-based coding and experimentation.",
      color: "#F9AB00",
      icon: <SiGooglecolab className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#F9AB00" }} />
    },
    {
      name: "Google Skills",
      purpose: "Platform for Google certifications, badges, and learning.",
      color: "#4285F4",
      icon: <SiGoogle className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#4285F4" }} />
    },
    {
      name: "Claude",
      purpose: "Advanced AI research, writing, and coding assistant.",
      color: "#CC9B7A",
      icon: <SiClaude className="w-10 h-10 transition-transform duration-300 drop-shadow-[0_0_10px_currentColor] brightness-125" style={{ color: "#CC9B7A" }} />
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade and slide up sections
    gsap.utils.toArray(".scroll-animate-section").forEach((section) => {
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
            scroller: mainRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Staggered fade in for Data Science Toolkit rows
    gsap.fromTo(
      ".scroll-animate-ds-row",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".scroll-animate-ds-section",
          scroller: mainRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleNodeInteract = (node) => {
    setActiveNode(node);
  };

  return (
    <main
      ref={mainRef}
      className="relative w-screen h-screen overflow-y-auto overflow-x-hidden bg-[#050508] text-white flex flex-col items-center justify-start py-20 px-6 select-none scrollbar-thin"
    >
      {/* Environmental Backdrop Starfield & Corner Glow */}
      <CanvasStarfield />
      <div 
        className="absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full bg-[#3B82F6]/10 blur-[130px] z-[-1] pointer-events-none" 
        style={{ content: '""' }}
      />
      <div 
        className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#A855F7]/5 blur-[120px] z-[-1] pointer-events-none" 
        style={{ content: '""' }}
      />

      {/* SECTION 1: Header */}
      <Link
        href="/?state=WORLD&node=skills"
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 border border-white/10 bg-black/60 hover:border-[#3B82F6] hover:text-white transition-all duration-300 rounded font-space-mono text-xs tracking-wider cursor-pointer text-[#94A3B8] shadow-[0_0_15px_rgba(0,0,0,0.5)] group"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span> Back to Universe
      </Link>

      <div className="text-center flex flex-col items-center gap-2 mt-8 md:mt-12 w-full max-w-4xl scroll-animate-section">
        <h1 className="font-orbitron text-4xl md:text-6xl font-black tracking-wider text-white mt-4 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)] flex justify-center gap-6 md:gap-10">
          <span 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer hover:text-[#3B82F6] transition-colors duration-300"
          >
            Skills
          </span>
          <span 
            onClick={() => document.getElementById('experience-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="cursor-pointer hover:text-[#A855F7] transition-colors duration-300"
          >
            Experience
          </span>
        </h1>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/60 to-transparent mt-8" />
      </div>

      {/* Main Grid Container for sections */}
      <div className="w-full max-w-4xl flex flex-col gap-24 mt-16 pb-24 z-10">
        
        {/* SECTION 1 — Programming Languages */}
        <section className="scroll-animate-section flex flex-col items-center w-full">
          <div className="text-center md:text-left md:self-start mb-10">
            <h2 className="font-orbitron text-2xl md:text-3xl font-black tracking-wider text-white">
              Programming Languages
            </h2>
            <p className="font-inter text-xs md:text-sm text-slate-400 italic mt-1.5">
              The languages I've used to transform ideas into software.
            </p>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-8 mt-4">
            
            {/* Desktop Orbit Ring Layout (Hidden on Mobile) */}
            <div className="hidden md:flex relative w-[540px] h-[540px] shrink-0 items-center justify-center">
              {/* Radial Guide Ring lines */}
              <div className="absolute w-[456px] h-[456px] rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-[#A855F7]/10 pointer-events-none animate-[spin_100s_linear_infinite]" />
              
              {/* Center Core: Developer Engine */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-[#050508]/90 border border-[#A855F7]/30 flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(168,85,247,0.2)] z-10 transition-all duration-300 group overflow-hidden"
              >
                {/* Glow ring backdrop overlay */}
                <div className="absolute inset-0 bg-[#A855F7]/5 blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {activeNode ? (
                  <div className="flex flex-col items-center p-3 z-10 transition-all duration-300 scale-105">
                    <span 
                      className="font-orbitron font-black text-base tracking-widest uppercase transition-colors duration-300"
                      style={{ color: activeNode.color }}
                    >
                      {activeNode.name}
                    </span>
                    <span className="font-space-mono text-[8px] text-slate-400 mt-2 uppercase tracking-widest">
                      TELEMETRY READY
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center p-3 z-10 gap-2">
                    <span 
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="font-orbitron font-black text-sm tracking-widest text-[#A855F7] hover:text-white hover:scale-110 transition-all cursor-pointer"
                    >
                      SKILLS
                    </span>
                    <div className="w-8 h-[1px] bg-[#A855F7]/30" />
                    <span 
                      onClick={() => document.getElementById('experience-section')?.scrollIntoView({ behavior: 'smooth' })}
                      className="font-orbitron font-black text-sm tracking-widest text-[#A855F7] hover:text-white hover:scale-110 transition-all cursor-pointer"
                    >
                      EXPERIENCE
                    </span>
                  </div>
                )}
              </div>

              {/* Orbiting Language Nodes */}
              {nodes.map((node, idx) => {
                const angle = (idx / 7) * Math.PI * 2 - Math.PI / 2;
                const x = Math.cos(angle) * 228;
                const y = Math.sin(angle) * 228;
                
                const isNodeActive = activeNode?.id === node.id;
                
                return (
                  <div
                    key={node.id}
                    className="absolute flex flex-col items-center justify-center group cursor-pointer transition-all duration-300"
                    style={{
                      left: `calc(50% + ${x}px - 40px)`,
                      top: `calc(50% + ${y}px - 44px)`,
                      width: "80px",
                    }}
                    onMouseEnter={() => setActiveNode(node)}
                    onMouseLeave={() => setActiveNode(null)}
                    onClick={() => handleNodeInteract(node)}
                  >
                    {/* Node Brand Icon block */}
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center border transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] relative"
                      style={{
                        backgroundColor: isNodeActive ? node.color + "15" : "#0d0d1a",
                        borderColor: isNodeActive ? node.color : node.color + "25",
                        boxShadow: isNodeActive ? `0 0 20px ${node.color}40` : "none",
                        transform: isNodeActive ? "scale(1.12)" : "scale(1.0)"
                      }}
                    >
                      {node.icon}
                    </div>
                    {/* Tiny language label */}
                    <span className="font-space-mono text-[11px] font-bold text-white mt-2.5 tracking-wider text-center group-hover:text-white transition-colors duration-200 uppercase">
                      {node.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Responsive Grid Layout (Mobile/Tablet View) */}
            <div className="grid md:hidden grid-cols-2 gap-4 w-full">
              {/* Banner Core placeholder */}
              <div className="col-span-2 bg-[#0d0d1a]/60 border border-[#A855F7]/30 rounded-xl p-4 flex flex-row justify-center gap-6 items-center text-center shadow-lg backdrop-blur-sm">
                <span 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="font-orbitron font-black text-sm tracking-widest text-[#A855F7] hover:text-white cursor-pointer transition-colors"
                >
                  SKILLS
                </span>
                <span 
                  onClick={() => document.getElementById('experience-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-orbitron font-black text-sm tracking-widest text-[#A855F7] hover:text-white cursor-pointer transition-colors"
                >
                  EXPERIENCE
                </span>
              </div>

              {nodes.map((node) => {
                const isNodeActive = activeNode?.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => handleNodeInteract(node)}
                    className="bg-[#0d0d1a]/55 border rounded-xl p-4.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 backdrop-blur-sm"
                    style={{
                      borderColor: isNodeActive ? node.color : "rgba(255,255,255,0.05)",
                      boxShadow: isNodeActive ? `0 0 15px ${node.color}30` : "none",
                      transform: isNodeActive ? "scale(1.03)" : "scale(1.0)"
                    }}
                  >
                    <div 
                      className="w-14 h-14 rounded-lg flex items-center justify-center border transition-all duration-300"
                      style={{
                        backgroundColor: isNodeActive ? node.color + "15" : "#0d0d1a",
                        borderColor: isNodeActive ? node.color : node.color + "25",
                      }}
                    >
                      {node.icon}
                    </div>
                    <span className="font-orbitron font-bold text-sm text-white mt-2.5">{node.name}</span>
                    <span className="font-space-mono text-[8px] text-slate-400 mt-1">{node.level}</span>
                  </div>
                );
              })}
            </div>

            {/* Dedicated Telemetry Detail Block */}
            <div className="w-full max-w-2xl min-h-[105px] bg-[#0d0d1a]/60 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex flex-col justify-center shadow-inner relative overflow-hidden transition-all duration-300 mt-4">
              <div 
                className="absolute top-0 left-0 w-2 h-full transition-colors duration-300" 
                style={{ backgroundColor: activeNode ? activeNode.color : "rgba(168,85,247,0.2)" }}
              />
              
              {activeNode ? (
                <div className="flex flex-col gap-1 pl-2">
                  <div className="flex justify-between items-center">
                    <span className="font-orbitron font-bold text-sm tracking-wide text-white">
                      {activeNode.name}
                    </span>
                    <span 
                      className="font-space-mono text-[8px] uppercase tracking-wider px-2 py-0.5 rounded border" 
                      style={{ 
                        borderColor: activeNode.color + "40", 
                        color: activeNode.color, 
                        backgroundColor: activeNode.color + "15" 
                      }}
                    >
                      {activeNode.level}
                    </span>
                  </div>
                  <p className="font-inter text-xs md:text-sm text-slate-300 leading-relaxed mt-2.5">
                    {activeNode.desc}
                  </p>
                </div>
              ) : (
                <div className="text-center font-inter text-xs text-slate-500 italic">
                  Hover or click any system node to inspect telemetry.
                </div>
              )}
            </div>

          </div>
        </section>

        {/* SECTION 2 — Personal Skills */}
        <section className="scroll-animate-section flex flex-col items-start w-full">
          <div className="mb-8">
            <h2 className="font-orbitron text-2xl md:text-3xl font-black tracking-wider text-white">
              Personal Skills
            </h2>
            <p className="font-inter text-xs md:text-sm text-slate-400 italic mt-1.5">
              Skills beyond code that shape how I work and grow.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 w-full mt-4">
            {personalSkills.map((skill, idx) => (
              <div
                key={idx}
                className="bg-[#0d0d1a]/55 backdrop-blur-md border border-white/5 hover:border-[#3B82F6]/60 rounded-xl p-5 flex flex-col gap-2.5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_6px_25px_rgba(59,130,246,0.15)] cursor-default"
              >
                <span className="font-orbitron font-bold text-xs md:text-sm tracking-wide text-[#3B82F6] uppercase">
                  {skill.title}
                </span>
                <p className="font-inter text-[11px] md:text-xs text-slate-300 leading-relaxed mt-1">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3 — Data Science Toolkit */}
        <section className="flex flex-col items-start w-full scroll-animate-ds-section">
          <div className="text-center md:text-left md:self-start mb-10 scroll-animate-section">
            <h2 className="font-orbitron text-2xl md:text-3xl font-black tracking-wider text-white">
              Data Science Toolkit
            </h2>
            <p className="font-inter text-xs md:text-sm text-slate-400 italic mt-1.5">
              The tools helping me understand data and build intelligent systems.
            </p>
          </div>

          <div className="flex flex-col w-full gap-4 mt-4">
            {dsTools.map((node) => {
              const isHovered = hoveredDSTool === node.id;
              return (
                <div
                  key={node.id}
                  className="scroll-animate-ds-row bg-[#0d0d1a]/55 backdrop-blur-md border rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all duration-300 cursor-default w-full"
                  style={{
                    borderColor: isHovered ? node.color + "60" : "rgba(255, 255, 255, 0.05)",
                    boxShadow: isHovered ? `0 6px 25px ${node.color}15` : "none",
                    transform: isHovered ? "translateY(-6px)" : "none"
                  }}
                  onMouseEnter={() => setHoveredDSTool(node.id)}
                  onMouseLeave={() => setHoveredDSTool(null)}
                >
                  {/* Left side: Icon container and Tool Name */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center border transition-all duration-300 shadow-sm"
                      style={{
                        backgroundColor: "#050508",
                        borderColor: node.color + "25",
                      }}
                    >
                      {node.icon}
                    </div>
                    <span className="font-orbitron font-bold text-base md:text-lg tracking-wider text-white">
                      {node.name}
                    </span>
                  </div>

                  {/* Right side: Description */}
                  <div className="flex-1 md:text-left text-slate-400 font-inter text-xs md:text-sm leading-relaxed md:pl-6">
                    {node.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4 — Daily Workflow */}
        <section className="scroll-animate-section flex flex-col items-start w-full">
          <div className="mb-8">
            <h2 className="font-orbitron text-2xl md:text-3xl font-black tracking-wider text-white">
              Daily Workflow
            </h2>
            <p className="font-inter text-xs md:text-sm text-slate-400 italic mt-1.5">
              The platforms that power my learning and development.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 w-full mt-4">
            {platforms.map((platform, idx) => (
              <div
                key={idx}
                className="bg-[#0d0d1a]/55 backdrop-blur-md border border-white/5 hover:border-[#3B82F6]/60 rounded-xl p-5 flex flex-col gap-3.5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_6px_25px_rgba(59,130,246,0.15)] cursor-default"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center border transition-all duration-300"
                    style={{
                      backgroundColor: "#050508",
                      borderColor: platform.color + "25",
                    }}
                  >
                    {platform.icon}
                  </div>
                  <span className="font-orbitron font-bold text-xs md:text-sm tracking-wide text-white uppercase">
                    {platform.name}
                  </span>
                </div>
                <p className="font-inter text-[11px] md:text-xs text-slate-400 leading-relaxed">
                  {platform.purpose}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5 — Current Mission (Internship) */}
        <section id="experience-section" className="scroll-animate-section flex flex-col items-start w-full mt-8">
          <div className="mb-8">
            <h2 className="font-orbitron text-2xl md:text-3xl font-black tracking-wider text-white">
              Current Mission
            </h2>
          </div>

          <div className="relative w-full bg-[#0d0d1a]/70 backdrop-blur-md border border-[#4ade80]/30 rounded-2xl p-6 md:p-8 hover:border-[#4ade80]/60 hover:shadow-[0_0_30px_rgba(74,222,128,0.15)] transition-all duration-500 flex flex-col gap-5 overflow-hidden group">
            {/* Top Right Active Badge */}
            <div className="absolute top-6 right-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#4ade80]/30 bg-[#4ade80]/10 text-[#4ade80] font-space-mono text-[9px] font-bold tracking-wider uppercase animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] inline-block animate-ping" />
              ACTIVE
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-space-mono text-xs text-[#4ade80] tracking-wider uppercase">
                Since June 2026
              </span>
              <h3 className="font-orbitron font-black text-2xl md:text-3xl text-white tracking-wide mt-1">
                Unessa Foundation
              </h3>
              <span className="font-inter font-medium text-slate-300 text-sm md:text-base">
                Data Science Intern
              </span>
            </div>

            <p className="font-inter text-slate-400 text-xs md:text-sm leading-relaxed max-w-2xl">
              Currently working as a Data Science Intern, gaining exposure to practical applications of data analysis, machine learning, and real-world problem solving.
            </p>

            {/* Skills gained badges */}
            <div className="flex flex-wrap gap-2 mt-2">
              {["Data Analysis", "Real-World Problem Solving", "Industry Exposure"].map((tag) => (
                <span 
                  key={tag}
                  className="font-space-mono text-[9px] md:text-xs text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Button */}
            <div className="mt-4">
              <a 
                href="/certificates/unessa-internship.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#4ade80]/30 hover:border-[#4ade80] bg-black/40 hover:bg-[#4ade80]/10 hover:text-white transition-all duration-300 rounded font-space-mono text-xs tracking-wider cursor-pointer text-slate-300 shadow-md group"
              >
                View Selection Certificate <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 6 — Experience Archive */}
        <section className="scroll-animate-section flex flex-col items-start w-full">
          <div className="mb-8">
            <h2 className="font-orbitron text-2xl md:text-3xl font-black tracking-wider text-white">
              Experience Archive
            </h2>
            <p className="font-inter text-xs md:text-sm text-slate-400 italic mt-1.5">
              Where I've applied what I've learned.
            </p>
          </div>

          <div className="relative w-full bg-[#0d0d1a]/55 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 hover:border-[#A855F7]/30 hover:shadow-[0_6px_25px_rgba(168,85,247,0.1)] transition-all duration-300 flex flex-col gap-4 overflow-hidden pl-8">
            {/* Timeline left border line */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#A855F7]" />
            
            <div className="flex flex-col gap-1">
              <h3 className="font-orbitron font-bold text-lg md:text-xl text-white tracking-wide">
                Graphic Design Intern, Social Media Management
              </h3>
              <span className="font-space-mono text-xs text-slate-400 mt-1">
                DAWN Foundation &bull; Approximately 3 months after completing Class 12
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <span className="font-orbitron text-[10px] tracking-wider text-[#A855F7] uppercase font-bold">
                Responsibilities
              </span>
              <ul className="list-disc pl-5 font-inter text-slate-400 text-xs md:text-sm leading-relaxed flex flex-col gap-1.5">
                <li>Magazine design</li>
                <li>Social media management</li>
                <li>Content writing</li>
                <li>Visual branding</li>
              </ul>
            </div>

            <div className="border-t border-white/5 pt-4 mt-2">
              <span className="font-orbitron text-[10px] tracking-wider text-slate-400 uppercase font-bold block mb-1.5">
                Lessons Learned
              </span>
              <p className="font-inter text-xs md:text-sm text-slate-300 italic leading-relaxed">
                "Design thinking, communication, storytelling, and professional collaboration."
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7 — Founder Mindset (Entrepreneurial Journey) */}
        <section className="scroll-animate-section flex flex-col items-start w-full relative">
          {/* Section-specific orange/amber gradient glow behind this section only */}
          <div className="absolute inset-0 w-[500px] h-[350px] rounded-full bg-gradient-to-tr from-[#fb923c]/10 to-[#f59e0b]/5 blur-[120px] z-[-1] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="mb-8">
            <h2 className="font-orbitron text-2xl md:text-3xl font-black tracking-wider text-white">
              Founder Mindset
            </h2>
          </div>

          <div className="relative w-full bg-[#0d0d1a]/60 backdrop-blur-md border border-orange-500/20 hover:border-orange-500/40 hover:shadow-[0_6px_30px_rgba(251,146,60,0.15)] rounded-2xl p-6 md:p-8 transition-all duration-300 flex flex-col md:flex-row gap-6 md:gap-8 overflow-hidden items-start md:items-center">
            {/* Orange Glow backdrop */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#fb923c]/5 blur-[40px] z-[-1] pointer-events-none rounded-full" />
            
            {/* Stat Callout */}
            <div className="flex flex-col shrink-0 gap-1 md:text-center">
              <span className="font-space-mono text-[10px] text-orange-400 tracking-widest uppercase">
                REVENUE GENERATED
              </span>
              <span className="font-orbitron font-black text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#fb923c] to-[#f59e0b] drop-shadow-[0_0_15px_rgba(251,146,60,0.3)]">
                ₹84,000
              </span>
              <span className="font-space-mono text-[8px] text-slate-500 uppercase tracking-wider mt-1">
                Class 11 Venture
              </span>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <p className="font-inter text-slate-300 text-xs md:text-sm leading-relaxed">
                During Class 11, I started my own small business and generated approximately ₹84,000 in revenue. Although I eventually stopped due to academic commitments, the experience taught me valuable lessons about building from scratch, marketing, customer understanding, execution, and risk taking.
              </p>

              {/* Lessons badges */}
              <div className="flex flex-wrap gap-2 mt-1">
                {["Building From Scratch", "Marketing", "Customer Understanding", "Execution", "Risk Taking"].map((badge) => (
                  <span 
                    key={badge}
                    className="font-space-mono text-[9px] md:text-xs text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full uppercase tracking-wide"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 — Leadership & Responsibility */}
        <section className="scroll-animate-section flex flex-col items-start w-full">
          <div className="mb-8">
            <h2 className="font-orbitron text-2xl md:text-3xl font-black tracking-wider text-white">
              Leadership & Responsibility
            </h2>
            <p className="font-inter text-xs md:text-sm text-slate-400 italic mt-1.5">
              Display this as a leadership milestone.
            </p>
          </div>

          <div className="relative w-full bg-[#0d0d1a]/55 backdrop-blur-md border border-white/5 hover:border-[#3B82F6]/40 hover:shadow-[0_6px_25px_rgba(59,130,246,0.1)] rounded-2xl p-6 md:p-8 transition-all duration-300 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
            {/* Image container */}
            <div className="w-[150px] h-[150px] shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-md">
              <img 
                src="/headboy-photo.jpg" 
                alt="Head Boy Aryan Chauhan"
                className="w-full h-full object-cover object-center filter saturate-90 brightness-95" 
              />
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col gap-1">
                <h3 className="font-orbitron font-bold text-lg md:text-xl text-white tracking-wide">
                  Head Boy
                </h3>
                <span className="font-space-mono text-xs text-slate-400">
                  Class 11 Milestone
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-orbitron text-[10px] tracking-wider text-[#3B82F6] uppercase font-bold">
                  Responsibilities
                </span>
                <ul className="list-disc pl-5 font-inter text-slate-400 text-xs md:text-sm leading-relaxed flex flex-col gap-1">
                  <li>Representing students</li>
                  <li>Organizing activities</li>
                  <li>Managing responsibilities</li>
                  <li>Acting as a bridge between students and school administration</li>
                </ul>
              </div>

              <div className="border-t border-white/5 pt-3.5">
                <p className="font-inter text-xs md:text-sm text-slate-300 italic leading-relaxed">
                  Lessons Learned: Leadership, accountability, public speaking, and confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

    </main>
  );
}
