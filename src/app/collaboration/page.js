"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { 
  Globe, 
  Cpu, 
  Database, 
  Sparkles, 
  Layers, 
  User, 
  Compass, 
  BookOpen,
  Mail,
  FileText,
  CheckCircle,
  ArrowRight,
  Calendar,
  Code,
  MessageSquare,
  DollarSign,
  Send,
  Briefcase
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

// ==========================================
// Canvas Particle Engine (Ambient Twinkle Stars)
// ==========================================

function CanvasParticles() {
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

    // Create subtle particles
    const particlesCount = 40;
    const particles = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.0 + 0.3,
        alpha: Math.random() * 0.2 + 0.05,
        speedY: -(Math.random() * 0.12 + 0.05),
        speedX: (Math.random() - 0.5) * 0.05,
        twinkleFactor: Math.random() * 0.008 + 0.002,
        twinkleDir: Math.random() > 0.5 ? 1 : -1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, ";

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        p.alpha += p.twinkleFactor * p.twinkleDir;
        if (p.alpha > 0.35) p.twinkleDir = -1;
        if (p.alpha < 0.05) p.twinkleDir = 1;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
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
      className="absolute inset-0 w-full h-full z-[-1] pointer-events-none opacity-20"
    />
  );
}

// ==========================================
// Scroll Reveal Component (Intersection Observer)
// ==========================================

function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ==========================================
// Main Collaboration Hub Component
// ==========================================

export default function CollaborationHubPage() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
    contactMethod: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [formError, setFormError] = useState(null);
  const [submittedData, setSubmittedData] = useState({
    formattedMessage: "",
    service: "",
    contactMethod: ""
  });
  const [isCopied, setIsCopied] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (activeDropdown && !e.target.closest(".custom-dropdown-container")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [activeDropdown]);

  // Entrance animations for the hero segment
  useEffect(() => {
    gsap.fromTo(
      ".hero-section",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );
  }, []);

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setActiveDropdown(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.service) {
      setFormError("Please select the service you require.");
      return;
    }
    if (!formData.budget) {
      setFormError("Please select a budget range.");
      return;
    }
    if (!formData.timeline) {
      setFormError("Please select a project timeline.");
      return;
    }
    if (!formData.contactMethod) {
      setFormError("Please select your preferred contact method.");
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    const { fullName, email, company, service, budget, timeline, message, contactMethod } = formData;

    const formattedMessage = `Hello Aryan,

My name is ${fullName} (Email: ${email}). I'm interested in starting a project with you.

- Service: ${service}
- Company/Organization: ${company || "None"}
- Budget Range: ${budget}
- Project Timeline: ${timeline}
- Preferred Contact Method: ${contactMethod}

Project Details:
${message}`;

    setSubmittedData({
      formattedMessage,
      service,
      contactMethod
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("SUCCESS");

      setFormData({
        fullName: "",
        email: "",
        company: "",
        service: "",
        budget: "",
        timeline: "",
        message: "",
        contactMethod: ""
      });
    }, 1200);
  };

  const servicesList = [
    "Web Development",
    "Frontend Development",
    "Full Stack Development",
    "UI/UX Design",
    "Portfolio Website",
    "Business Website",
    "Landing Page",
    "n8n Workflow Automation",
    "Esports Management",
    "Graphic Design",
    "Custom Project",
    "Other"
  ];

  const budgetsList = [
    "Under ₹5,000",
    "₹5,000 – ₹10,000",
    "₹10,000 – ₹25,000",
    "₹25,000+",
    "Let's Discuss"
  ];

  const timelinesList = [
    "Under 1 Month",
    "1 – 3 Months",
    "3 – 6 Months",
    "6+ Months",
    "Flexible / Ongoing"
  ];

  // Redefined Items for "Currently Open For" with Strict Accents and Layout Configs
  const openForItems = [
    { 
      num: "01", 
      titleLines: ["PORTFOLIO", "WEBSITES"], 
      desc: "Creating cinematic portfolio experiences that tell stories.", 
      icon: Globe,
      textColor: "text-[#a855f7]", // Purple
      numberColor: "text-[#a855f7]",
      glowColor: "hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)] hover:border-[#a855f7]/30"
    },
    { 
      num: "02", 
      titleLines: ["AI", "PROJECTS"], 
      desc: "Building practical AI tools, automation systems, and intelligent experiences.", 
      icon: Cpu,
      textColor: "text-[#06b6d4]", // Cyan
      numberColor: "text-[#06b6d4]",
      glowColor: "hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] hover:border-[#06b6d4]/30"
    },
    { 
      num: "03", 
      titleLines: ["DATA", "SCIENCE"], 
      desc: "Analyzing databases, mapping vectors, and processing semantic nodes.", 
      icon: Database,
      textColor: "text-[#3b82f6]", // Blue
      numberColor: "text-[#3b82f6]",
      glowColor: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] hover:border-[#3b82f6]/30"
    },
    { 
      num: "04", 
      titleLines: ["STARTUP", "MVPS"], 
      desc: "Developing high-fidelity MVP launches from draft.", 
      icon: Sparkles,
      textColor: "text-[#f97316]", // Orange
      numberColor: "text-[#f97316]",
      glowColor: "hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.15)] hover:border-[#f97316]/30"
    },
    { 
      num: "05", 
      titleLines: ["UI / UX", "DESIGN"], 
      desc: "Structuring minimalist web layouts and clean graphics.", 
      icon: Layers,
      textColor: "text-[#ec4899]", // Pink
      numberColor: "text-[#ec4899]",
      glowColor: "hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.15)] hover:border-[#ec4899]/30"
    },
    { 
      num: "06", 
      titleLines: ["CREATIVE", "COLLABORATION"], 
      desc: "Blending interactive Three.js components with prose.", 
      icon: Compass,
      textColor: "text-[#eab308]", // Gold
      numberColor: "text-[#eab308]",
      glowColor: "hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.15)] hover:border-[#eab308]/30"
    },
    { 
      num: "07", 
      titleLines: ["STUDENT", "PROJECTS"], 
      desc: "Pairing on academic modules and coding hackathon concepts.", 
      icon: BookOpen,
      textColor: "text-[#22c55e]", // Green
      numberColor: "text-[#22c55e]",
      glowColor: "hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.15)] hover:border-[#22c55e]/30"
    }
  ];

  // Why Work With Me Items (3 Columns, Minimal layout)
  const whyWorkItems = [
    {
      title: "Creative Thinking",
      desc: "I don't just build websites. I build experiences that tell stories.",
      icon: Sparkles
    },
    {
      title: "Continuous Learning",
      desc: "Every project is an opportunity to learn something new and improve.",
      icon: BookOpen
    },
    {
      title: "Long-Term Collaboration",
      desc: "I'm interested in building relationships, not just completing projects.",
      icon: User
    }
  ];

  // Process timeline data
  const processSteps = [
    { num: "01", name: "Conversation", desc: "We discuss the idea, goals, and expectations." },
    { num: "02", name: "Planning", desc: "Break the vision into clear milestones." },
    { num: "03", name: "Building", desc: "Design, develop, iterate." },
    { num: "04", name: "Launch", desc: "Deliver, improve, grow." }
  ];

  // Connect routes
  const connects = [
    { label: "GitHub", url: "https://github.com/TheAryan-007", icon: <SiGithub className="w-4 h-4" /> },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/aryan-chauhan-0b05a3386", icon: <FaLinkedin className="w-4 h-4" /> },
    { label: "Instagram", url: "https://www.instagram.com/aryannxnn._.02", icon: <FaInstagram className="w-4 h-4" /> },
    { label: "Email", url: "mailto:aryanncr2@gmail.com", icon: <Mail className="w-4 h-4" /> }
  ];

  return (
    <main className="fixed inset-0 w-screen h-screen overflow-y-auto overflow-x-hidden bg-[#030306] text-white flex flex-col items-center select-text scroll-smooth scrollbar-thin antialiased">
      
      <CanvasParticles />

      {/* Navigation Header */}
      <div className="w-full max-w-5xl px-8 pt-8 flex justify-between items-center relative z-20 shrink-0 pointer-events-auto select-none">
        <Link
          href="/?state=WORLD"
          className="flex items-center gap-2 px-4 py-2 border border-white/5 bg-black/45 hover:border-white/20 hover:text-white transition-all duration-300 rounded-lg font-space-mono text-xs tracking-wider cursor-pointer text-[#94A3B8] shadow-sm group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span> Back to Universe
        </Link>
        <div className="font-space-mono text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] font-bold flex items-center gap-2">
          AryanVerse
        </div>
      </div>

      {/* Main Single Column Layout */}
      <div className="w-full max-w-5xl px-6 flex flex-col items-center relative z-10">
        
        {/* ========================================================
            HERO SECTION (whitespace increased by 20% + cinematic)
           ======================================================== */}
        <section className="hero-section w-full max-w-3xl flex flex-col justify-center items-center text-center min-h-[85vh] pt-24 pb-20 opacity-0 select-none relative">
          
          {/* Subtle glowing radial background mesh */}
          <div className="absolute w-[600px] h-[300px] bg-gradient-to-r from-white/5 to-white/[0.02] blur-[120px] rounded-full top-[15%] left-1/2 -translate-x-1/2 pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col items-center">
            <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[0.25em] text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
              LET'S BUILD
              <br />
              TOGETHER
            </h1>
            
            <p className="text-[#e2e8f0] font-inter font-medium text-sm md:text-base tracking-wide mt-6 italic max-w-xl">
              Ideas become real when the right people build them together.
            </p>
            
            <p className="text-[#94a3b8] font-inter font-medium text-xs md:text-sm leading-relaxed max-w-md mt-6 px-4">
              Whether you're building a startup, designing a new product, creating an AI application, or simply looking for someone who loves building ambitious ideas— I'd love to hear about it.
            </p>

            <button
              onClick={handleScrollToForm}
              className="mt-12 flex items-center gap-2.5 px-8 py-4 bg-slate-100 hover:bg-white text-slate-950 font-space-mono text-xs tracking-wider uppercase font-bold rounded-xl transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Start a Conversation <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ========================================================
            SECTION 2: CURRENTLY OPEN FOR (luxury refined grid)
           ======================================================== */}
        <section className="w-full my-24 flex flex-col gap-12 text-left">
          <ScrollReveal>
            <h2 className="font-orbitron text-base font-extrabold tracking-[0.2em] text-white uppercase border-b border-white/5 pb-3">
              CURRENTLY OPEN FOR
            </h2>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl mx-auto">
            {openForItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <ScrollReveal key={idx} delay={idx * 60}>
                  <div className={`relative w-[290px] h-[320px] bg-[#0c0c16]/20 border border-slate-900/60 rounded-2xl p-7 flex flex-col justify-between group transition-all duration-300 ease-out hover:-translate-y-2.5 hover:bg-[#0c0c16]/50 hover:border-slate-800 ${item.glowColor} overflow-hidden`}>
                    
                    {/* Large Background Number */}
                    <span className={`absolute -top-2 -left-1 font-orbitron font-extrabold text-[120px] leading-none pointer-events-none select-none transition-all duration-300 ${item.numberColor} opacity-[0.04] group-hover:opacity-[0.08]`}>
                      {item.num}
                    </span>

                    {/* Top Row: Icon + Number indicator */}
                    <div className="flex justify-between items-start w-full relative z-10">
                      <div className={`p-2.5 bg-slate-950/80 border border-slate-900 rounded-xl ${item.textColor} transition-colors duration-300`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className={`font-space-mono text-xs font-bold ${item.textColor}`}>
                        {item.num}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mt-8 relative z-10">
                      <h3 className="font-orbitron font-extrabold text-base tracking-[0.08em] uppercase text-slate-200 leading-snug group-hover:text-white transition-colors duration-300">
                        {item.titleLines[0]}
                        {item.titleLines[1] && (
                          <>
                            <br />
                            {item.titleLines[1]}
                          </>
                        )}
                      </h3>
                    </div>

                    {/* Description */}
                    <div className="mt-4 relative z-10 flex-grow">
                      <p className="text-[12.5px] text-slate-350 font-inter font-medium leading-relaxed opacity-80">
                        {item.desc}
                      </p>
                    </div>

                    {/* Availability Tag */}
                    <div className="flex items-center gap-2 mt-auto relative z-10 pt-4">
                      <span className={`w-1.5 h-1.5 rounded-full bg-current ${item.textColor} animate-pulse`} />
                      <span className="font-space-mono text-[9px] tracking-wider uppercase text-slate-400 font-bold">
                        Currently Open
                      </span>
                    </div>

                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            SECTION 3: WHY WORK WITH ME (New minimal section)
           ======================================================== */}
        <section className="w-full my-24 flex flex-col gap-12 text-left">
          <ScrollReveal>
            <h2 className="font-orbitron text-base font-extrabold tracking-[0.2em] text-white uppercase border-b border-white/5 pb-3">
              WHY WORK WITH ME
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {whyWorkItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={idx} delay={idx * 100}>
                  <div className="border border-slate-900/60 bg-[#0c0c16]/10 p-8 md:p-10 rounded-2xl text-left flex flex-col gap-6 hover:border-slate-800 transition-all duration-300 group min-h-[220px]">
                    <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl transition-colors duration-300 w-12 h-12 flex items-center justify-center text-cyan-400 group-hover:text-white">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="font-orbitron font-extrabold text-base text-slate-200 tracking-wider uppercase group-hover:text-white transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-300 font-inter font-medium leading-relaxed opacity-80">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            SECTION 4: HOW WE'LL WORK (process elements refined)
           ======================================================== */}
        <section className="w-full my-24 flex flex-col gap-12 text-left">
          <ScrollReveal>
            <h2 className="font-orbitron text-base font-extrabold tracking-[0.2em] text-white uppercase border-b border-white/5 pb-3">
              HOW WE'LL WORK
            </h2>
          </ScrollReveal>

          <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
            {processSteps.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <div className="relative border border-slate-900/60 bg-[#0c0c16]/10 rounded-2xl text-left flex flex-col md:flex-row md:items-stretch overflow-hidden group hover:border-slate-800 hover:bg-[#0c0c16]/30 transition-all duration-300">
                  
                  {/* Left Column: Number block with custom background color */}
                  <div className={`w-24 shrink-0 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-900/60 bg-slate-950/45 py-6 md:py-0 transition-colors duration-300 ${
                    idx === 0 ? "group-hover:bg-purple-950/10" :
                    idx === 1 ? "group-hover:bg-cyan-950/10" :
                    idx === 2 ? "group-hover:bg-blue-950/10" :
                    "group-hover:bg-green-950/10"
                  }`}>
                    <div className={`font-orbitron text-3xl font-black transition-all duration-300 ${
                      idx === 0 ? "text-[#a855f7] drop-shadow-[0_0_10px_rgba(168,85,247,0.2)]" :
                      idx === 1 ? "text-[#06b6d4] drop-shadow-[0_0_10px_rgba(6,182,212,0.2)]" :
                      idx === 2 ? "text-[#3b82f6] drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]" :
                      "text-[#22c55e] drop-shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                    }`}>
                      {step.num}
                    </div>
                  </div>

                  {/* Right Column: Title & Description */}
                  <div className="flex flex-col gap-2 p-8 md:p-10 justify-center">
                    <h3 className="font-orbitron font-extrabold text-base text-slate-100 uppercase tracking-wider group-hover:text-white transition-colors duration-300">
                      {step.name}
                    </h3>
                    <p className="text-sm text-slate-350 font-inter font-medium leading-relaxed max-w-2xl opacity-90">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 5: CONTACT FORM (redesigned elements)
           ======================================================== */}
        <section ref={formRef} className="w-full max-w-2xl my-24 flex flex-col gap-10 text-left">
          <ScrollReveal>
            <h2 className="font-orbitron text-base font-extrabold tracking-[0.2em] text-white uppercase border-b border-white/5 pb-3">
              LET'S START SOMETHING
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            {submitStatus === "SUCCESS" ? (
              <div className="border border-slate-800/80 bg-[#07070d]/60 backdrop-blur-md rounded-2xl p-8 sm:p-10 flex flex-col items-center gap-6 w-full text-center relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                
                {/* Visual Accent glow */}
                <div className="absolute w-[200px] h-[200px] bg-gradient-to-r from-red-500/5 to-rose-500/5 blur-[50px] rounded-full top-[-10%] left-1/2 -translate-x-1/2 pointer-events-none" />

                <CheckCircle className="w-14 h-14 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)] animate-pulse" />
                
                <div className="flex flex-col gap-2">
                  <h3 className="font-orbitron text-base font-extrabold text-white uppercase tracking-widest animate-pulse">
                    PROPOSAL READY
                  </h3>
                  <p className="text-xs text-slate-400 font-inter max-w-md leading-relaxed">
                    Your project details have been successfully formatted. Please click below to send it or copy the details.
                  </p>
                </div>

                {/* Main Action Block depending on method */}
                <div className="w-full bg-[#030306]/85 border border-slate-900/80 rounded-xl p-6 flex flex-col gap-5 text-left">
                  
                  {/* Summary Header */}
                  <div className="flex flex-col gap-1 border-b border-slate-900 pb-3">
                    <span className="font-space-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">Selected Contact Method</span>
                    <span className="font-orbitron text-xs text-white uppercase tracking-wider font-extrabold flex items-center gap-2">
                      {submittedData.contactMethod === "Email" && <Mail className="w-4 h-4 text-red-500" />}
                      {submittedData.contactMethod === "WhatsApp" && <FaWhatsapp className="w-4 h-4 text-[#25D366]" />}
                      {submittedData.contactMethod === "LinkedIn" && <FaLinkedin className="w-4 h-4 text-[#0A66C2]" />}
                      {submittedData.contactMethod}
                    </span>
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    {submittedData.contactMethod === "Email" && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            const subject = encodeURIComponent(`Project Inquiry: ${submittedData.service}`);
                            const body = encodeURIComponent(submittedData.formattedMessage);
                            window.location.href = `mailto:aryanncr2@gmail.com?subject=${subject}&body=${body}`;
                          }}
                          className="flex-1 h-12 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-space-mono text-xs uppercase tracking-wider font-bold rounded-xl transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Mail className="w-4 h-4" /> Launch Mail App
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const subject = encodeURIComponent(`Project Inquiry: ${submittedData.service}`);
                            const body = encodeURIComponent(submittedData.formattedMessage);
                            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=aryanncr2@gmail.com&su=${subject}&body=${body}`, "_blank");
                          }}
                          className="flex-1 h-12 border border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-200 hover:text-white font-space-mono text-xs uppercase tracking-wider font-bold rounded-xl transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Globe className="w-4 h-4 text-red-400" /> Send via Gmail Web
                        </button>
                      </>
                    )}

                    {submittedData.contactMethod === "WhatsApp" && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            const waText = encodeURIComponent(submittedData.formattedMessage);
                            window.open(`https://wa.me/917827087385?text=${waText}`, "_blank");
                          }}
                          className="flex-1 h-12 bg-[#25D366] hover:bg-[#20ba56] text-black font-space-mono text-xs uppercase tracking-wider font-bold rounded-xl transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <FaWhatsapp className="w-4 h-4" /> Launch WhatsApp
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const waText = encodeURIComponent(submittedData.formattedMessage);
                            window.open(`https://web.whatsapp.com/send?phone=917827087385&text=${waText}`, "_blank");
                          }}
                          className="flex-1 h-12 border border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-200 hover:text-white font-space-mono text-xs uppercase tracking-wider font-bold rounded-xl transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Globe className="w-4 h-4 text-[#25D366]" /> WhatsApp Web
                        </button>
                      </>
                    )}

                    {submittedData.contactMethod === "LinkedIn" && (
                      <button
                        type="button"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(submittedData.formattedMessage);
                            setIsCopied(true);
                            setTimeout(() => setIsCopied(false), 2000);
                          }
                          window.open("https://www.linkedin.com/in/aryan-chauhan-0b05a3386", "_blank");
                        }}
                        className="w-full h-12 bg-[#0A66C2] hover:bg-[#0077b5] text-white font-space-mono text-xs uppercase tracking-wider font-bold rounded-xl transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <FaLinkedin className="w-4 h-4" /> Copy Proposal & Go to LinkedIn
                      </button>
                    )}
                  </div>

                  {/* Copy Proposal details block */}
                  <div className="flex flex-col gap-2 border-t border-slate-900 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-space-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">Proposal Text</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(submittedData.formattedMessage);
                            setIsCopied(true);
                            setTimeout(() => setIsCopied(false), 2000);
                          }
                        }}
                        className="text-[10px] font-space-mono font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      >
                        {isCopied ? "✓ Copied!" : "📋 Copy Message"}
                      </button>
                    </div>
                    <pre className="w-full max-h-36 overflow-y-auto bg-black/60 border border-slate-900 rounded-lg p-4 font-mono text-[11px] leading-relaxed text-slate-350 whitespace-pre-wrap scrollbar-thin select-text">
                      {submittedData.formattedMessage}
                    </pre>
                  </div>

                  {/* Fallback Contact info display */}
                  <div className="border-t border-slate-900 pt-4 flex flex-col gap-2">
                    <span className="font-space-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">Direct Contact</span>
                    <div className="flex flex-col gap-1 text-xs text-slate-400 font-inter">
                      <div>Email: <span className="text-white font-semibold select-all font-mono">aryanncr2@gmail.com</span></div>
                      <div>WhatsApp/Call: <span className="text-white font-semibold select-all font-mono">+91 78270 87385</span></div>
                    </div>
                  </div>

                </div>

                {/* Back button */}
                <button
                  type="button"
                  onClick={() => setSubmitStatus(null)}
                  className="px-6 py-2.5 border border-white/10 hover:border-white/20 bg-slate-950/20 text-slate-400 hover:text-white font-space-mono text-[10px] uppercase tracking-widest rounded-lg transition-all cursor-pointer"
                >
                  ← Start New Proposal
                </button>

              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 w-full pointer-events-auto">
                
                {/* Full Name & Email Address (2 columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="flex flex-col gap-2.5">
                    <label className="font-inter text-xs font-bold uppercase tracking-wider text-slate-400">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">
                        <User className="w-5 h-5" />
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full h-14 bg-[#08080f] border border-slate-800/80 hover:border-slate-700/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 rounded-xl pl-12 pr-6 text-white placeholder-slate-500 focus:outline-none transition-all font-inter font-medium text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="font-inter text-xs font-bold uppercase tracking-wider text-slate-400">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">
                        <Mail className="w-5 h-5" />
                      </span>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        className="w-full h-14 bg-[#08080f] border border-slate-800/80 hover:border-slate-700/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 rounded-xl pl-12 pr-6 text-white placeholder-slate-500 focus:outline-none transition-all font-inter font-medium text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Company / Organization (optional) */}
                <div className="flex flex-col gap-2.5 w-full">
                  <label className="font-inter text-xs font-bold uppercase tracking-wider text-slate-400">
                    Company / Organization <span className="text-slate-600 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">
                      <Briefcase className="w-5 h-5" />
                    </span>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company or organization"
                      className="w-full h-14 bg-[#08080f] border border-slate-800/80 hover:border-slate-700/85 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 rounded-xl pl-12 pr-6 text-white placeholder-slate-500 focus:outline-none transition-all font-inter font-medium text-sm"
                    />
                  </div>
                </div>

                {/* Service Required & Budget Range (2 columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  
                  {/* Service Required */}
                  <div className="flex flex-col gap-2.5 relative custom-dropdown-container">
                    <label className="font-inter text-xs font-bold uppercase tracking-wider text-slate-400">
                      Service Required <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(activeDropdown === "service" ? null : "service")}
                      className={`w-full h-14 bg-[#08080f] border rounded-xl px-5 flex items-center justify-between text-left transition-all ${
                        activeDropdown === "service" 
                          ? "border-red-500 ring-2 ring-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.15)]" 
                          : "border-slate-800/80 hover:border-slate-700/85"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Code className="w-5 h-5 text-red-500" />
                        <span className={`font-inter font-medium text-sm ${formData.service ? "text-white" : "text-slate-500"}`}>
                          {formData.service || "Select a service"}
                        </span>
                      </div>
                      <span className={`text-slate-500 text-[10px] transition-transform duration-350 ${activeDropdown === "service" ? "rotate-180" : ""}`}>
                        ▲
                      </span>
                    </button>
                    
                    {activeDropdown === "service" && (
                      <div className="absolute top-[82px] left-0 z-50 w-full bg-[#08080f] border border-slate-800 rounded-xl shadow-2xl overflow-y-auto max-h-60 scrollbar-thin">
                        {servicesList.map((serviceOption) => (
                          <div
                            key={serviceOption}
                            onClick={() => handleDropdownSelect("service", serviceOption)}
                            className="px-5 py-3 hover:bg-red-500/10 hover:text-red-400 text-slate-300 font-inter text-sm cursor-pointer transition-colors"
                          >
                            {serviceOption}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Budget Range */}
                  <div className="flex flex-col gap-2.5 relative custom-dropdown-container">
                    <label className="font-inter text-xs font-bold uppercase tracking-wider text-slate-400">
                      Budget Range <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(activeDropdown === "budget" ? null : "budget")}
                      className={`w-full h-14 bg-[#08080f] border rounded-xl px-5 flex items-center justify-between text-left transition-all ${
                        activeDropdown === "budget" 
                          ? "border-red-500 ring-2 ring-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.15)]" 
                          : "border-slate-800/80 hover:border-slate-700/85"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 flex items-center justify-center font-bold text-red-500 text-lg">$</span>
                        <span className={`font-inter font-medium text-sm ${formData.budget ? "text-white" : "text-slate-500"}`}>
                          {formData.budget || "Select budget range"}
                        </span>
                      </div>
                      <span className={`text-slate-500 text-[10px] transition-transform duration-350 ${activeDropdown === "budget" ? "rotate-180" : ""}`}>
                        ▲
                      </span>
                    </button>

                    {activeDropdown === "budget" && (
                      <div className="absolute top-[82px] left-0 z-50 w-full bg-[#08080f] border border-slate-805 rounded-xl shadow-2xl overflow-y-auto max-h-60 scrollbar-thin">
                        {budgetsList.map((budgetOption) => (
                          <div
                            key={budgetOption}
                            onClick={() => handleDropdownSelect("budget", budgetOption)}
                            className="px-5 py-3 hover:bg-red-500/10 hover:text-red-400 text-slate-300 font-inter text-sm cursor-pointer transition-colors"
                          >
                            {budgetOption}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Timeline */}
                <div className="flex flex-col gap-2.5 relative custom-dropdown-container w-full">
                  <label className="font-inter text-xs font-bold uppercase tracking-wider text-slate-400">
                    Project Timeline <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(activeDropdown === "timeline" ? null : "timeline")}
                    className={`w-full h-14 bg-[#08080f] border rounded-xl px-5 flex items-center justify-between text-left transition-all ${
                      activeDropdown === "timeline" 
                        ? "border-red-500 ring-2 ring-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.15)]" 
                        : "border-slate-800/80 hover:border-slate-700/85"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-red-500" />
                      <span className={`font-inter font-medium text-sm ${formData.timeline ? "text-white" : "text-slate-500"}`}>
                        {formData.timeline || "Select timeline"}
                      </span>
                    </div>
                    <span className={`text-slate-500 text-[10px] transition-transform duration-350 ${activeDropdown === "timeline" ? "rotate-180" : ""}`}>
                      ▲
                    </span>
                  </button>

                  {activeDropdown === "timeline" && (
                    <div className="absolute top-[82px] left-0 z-50 w-full bg-[#08080f] border border-slate-805 rounded-xl shadow-2xl overflow-y-auto max-h-60 scrollbar-thin">
                      {timelinesList.map((timelineOption) => (
                        <div
                          key={timelineOption}
                          onClick={() => handleDropdownSelect("timeline", timelineOption)}
                          className="px-5 py-3 hover:bg-red-500/10 hover:text-red-400 text-slate-300 font-inter text-sm cursor-pointer transition-colors"
                        >
                          {timelineOption}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Details (textarea) */}
                <div className="flex flex-col gap-2.5 w-full">
                  <label className="font-inter text-xs font-bold uppercase tracking-wider text-slate-400">
                    Project Details <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-5 text-slate-500">
                      <MessageSquare className="w-5 h-5" />
                    </span>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your project goals, required features, reference websites, target audience, and any specific requirements."
                      className="w-full h-44 bg-[#08080f] border border-slate-800/80 hover:border-slate-700/85 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 rounded-xl pl-12 pr-6 py-5 text-white placeholder-slate-500 focus:outline-none transition-all font-inter font-medium text-sm resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Preferred Contact Method */}
                <div className="flex flex-col gap-3 w-full">
                  <label className="font-inter text-xs font-bold uppercase tracking-wider text-slate-400">
                    Preferred Contact Method <span className="text-red-500">*</span>
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                    {/* Email Option */}
                    <button
                      type="button"
                      onClick={() => handleDropdownSelect("contactMethod", "Email")}
                      className={`h-14 rounded-xl px-5 border flex items-center gap-3 transition-all ${
                        formData.contactMethod === "Email"
                          ? "bg-slate-900/60 border-red-500 ring-2 ring-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                          : "bg-[#08080f] border-slate-800/80 hover:border-slate-700/85"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        formData.contactMethod === "Email" ? "border-red-500" : "border-slate-600"
                      }`}>
                        {formData.contactMethod === "Email" && (
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                        )}
                      </div>
                      <Mail className="w-4 h-4 text-slate-350" />
                      <span className="font-inter text-sm font-semibold text-slate-200">Email</span>
                    </button>

                    {/* LinkedIn Option */}
                    <button
                      type="button"
                      onClick={() => handleDropdownSelect("contactMethod", "LinkedIn")}
                      className={`h-14 rounded-xl px-5 border flex items-center gap-3 transition-all ${
                        formData.contactMethod === "LinkedIn"
                          ? "bg-slate-900/60 border-red-500 ring-2 ring-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                          : "bg-[#08080f] border-slate-800/80 hover:border-slate-700/85"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        formData.contactMethod === "LinkedIn" ? "border-red-500" : "border-slate-600"
                      }`}>
                        {formData.contactMethod === "LinkedIn" && (
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                        )}
                      </div>
                      <FaLinkedin className="w-4 h-4 text-[#0A66C2]" />
                      <span className="font-inter text-sm font-semibold text-slate-200">LinkedIn</span>
                    </button>

                    {/* WhatsApp Option */}
                    <button
                      type="button"
                      onClick={() => handleDropdownSelect("contactMethod", "WhatsApp")}
                      className={`h-14 rounded-xl px-5 border flex items-center gap-3 transition-all ${
                        formData.contactMethod === "WhatsApp"
                          ? "bg-slate-900/60 border-red-500 ring-2 ring-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                          : "bg-[#08080f] border-slate-800/80 hover:border-slate-700/85"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        formData.contactMethod === "WhatsApp" ? "border-red-500" : "border-slate-600"
                      }`}>
                        {formData.contactMethod === "WhatsApp" && (
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                        )}
                      </div>
                      <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                      <span className="font-inter text-sm font-semibold text-slate-200">WhatsApp</span>
                    </button>
                  </div>
                </div>

                {/* Inline Error display */}
                {formError && (
                  <div className="text-red-500 text-xs font-semibold font-inter mt-2 text-center">
                    ⚠️ {formError}
                  </div>
                )}

                {/* Submit button */}
                <div className="w-full mt-4 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-space-mono text-xs tracking-widest uppercase font-bold rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(239,68,68,0.25)] hover:shadow-[0_4px_25px_rgba(239,68,68,0.4)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2.5"
                  >
                    {isSubmitting ? (
                      "TRANSMITTING..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> START A PROJECT
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </ScrollReveal>
        </section>

        {/* ========================================================
            SECTION 6: CONNECT (SOCIAL BUTTONS)
           ======================================================== */}
        <section className="w-full max-w-3xl my-24 flex flex-col gap-8 text-center items-center">
          <ScrollReveal>
            <h2 className="font-orbitron text-base font-extrabold tracking-[0.2em] text-white uppercase border-b border-white/5 pb-3 w-64 mx-auto">
              FIND ME HERE
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-wrap gap-4 w-full justify-center pointer-events-auto">
              {connects.map((conn) => (
                <a
                  href={conn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={conn.label}
                  className="flex items-center gap-3 px-6 py-4 border border-slate-900 bg-[#0c0c16]/20 hover:border-slate-800 hover:bg-[#0c0c16]/50 rounded-xl text-slate-300 hover:text-white font-space-mono text-xs tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer"
                >
                  {conn.icon} {conn.label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================
            FINAL QUOTE & SIGNATURE (whitespace & typography pass)
           ======================================================== */}
        <section className="w-full max-w-2xl px-6 mt-28 mb-32 text-center flex flex-col gap-10 select-none">
          <ScrollReveal>
            <blockquote className="font-serif italic text-3xl leading-relaxed text-slate-100 font-light max-w-xl mx-auto">
              "Great things are rarely built alone."
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex flex-col gap-3 max-w-md mx-auto text-slate-300 font-inter font-medium text-sm leading-relaxed">
              <p>Thanks for exploring AryanVerse.</p>
              <p>Every destination you've visited tells the story of where I've been.</p>
              <p>The next chapter hasn't been written yet.</p>
              <p className="text-cyan-400 font-semibold tracking-wide">Maybe we'll build it together.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="font-space-mono text-xs text-slate-500 uppercase tracking-[0.25em] font-bold mt-6">
              — Aryan Chauhan
            </div>
          </ScrollReveal>
        </section>

      </div>

    </main>
  );
}
