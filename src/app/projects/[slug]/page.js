"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ExternalLink, 
  Globe, 
  BookOpen, 
  Code, 
  Sparkles, 
  Calendar, 
  Briefcase, 
  User, 
  Layers, 
  CheckCircle,
  Clock,
  Lock,
  FileText
} from "lucide-react";
import { SiGithub } from "react-icons/si";

// ==========================================
// Projects Case Studies Database
// ==========================================

const projectsDetails = {
  "skysentry-ai": {
    name: "SkySentry AI",
    tagline: "AI-Powered Computer Vision for False Alert Reduction in Aerial Surveillance.",
    description: "An intelligent visual verification engine optimized to classify flying objects and eliminate ambient noise in security feeds.",
    status: "COMPLETED",
    color: "#22C55E",
    bgAccent: "bg-green-500/5",
    borderAccent: "border-green-200",
    textAccent: "text-green-600",
    timeline: "Jan 2026 - Mar 2026",
    role: "Lead ML Engineer",
    context: "Research Project / Bennett University",
    tags: ["Computer Vision", "YOLOv10", "PyTorch", "OpenCV"],
    overview: "SkySentry AI was born out of a critical gap in automated security: traditional motion detection cameras cannot distinguish between a high-threat drone, a harmless bird, or moving tree shadows. This project presents a full-stack computer vision pipeline designed to filter out environmental noise in real-time aerial feeds, focusing alerts only on actual objects of interest.",
    challenge: "Surveillance feeds are filled with 'false positives'—rapidly shifting clouds, bird migrations, or lens flares. Standard object detection models like YOLOv5 are often too heavy for edge deployment or suffer from high latency, making them impractical for split-second security verification. The challenge was maintaining a near-zero false-positive rate while operating at >45 FPS on standard hardware.",
    solution: "We implemented YOLOv10, a state-of-the-art detector that removes non-maximum suppression (NMS) latency by design. We trained it on a custom dataset containing over 12,000 annotated frames of low-altitude UAVs, birds, commercial planes, and background noise. We then overlaid an OpenCV Kalman filter tracking algorithm. This ensures that even if an object is temporarily blocked by a tree branch or cloud, the system holds its tracking lock and doesn't fire a duplicate alert.",
    techStack: [
      { name: "YOLOv10", desc: "Real-time single-stage object detector using NMS-free training." },
      { name: "OpenCV", desc: "For video streaming pipeline, frame preprocessing, and multi-object tracking." },
      { name: "PyTorch", desc: "Core framework for training, custom anchor tuning, and optimization." },
      { name: "Python", desc: "Glue language for data preprocessing and inference scripts." }
    ],
    gallery: [
      {
        title: "Detection Interface Mockup",
        desc: "Visual representation of the YOLOv10 bounding box overlay classifying a DJI Mavic drone with 94.2% confidence.",
        type: "vector",
        render: () => (
          <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden rounded-xl border border-green-500/20 font-space-mono text-green-400">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div className="absolute top-4 left-4 text-[9px] uppercase tracking-wider text-green-500/60">SYS-CAMERA: FEED_01 // SECURE</div>
            <div className="w-3/4 h-2/3 border border-green-500/30 rounded relative flex items-center justify-center bg-black/40">
              {/* Radar grid */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-green-500/10 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-green-500/10" />
                </div>
              </div>
              {/* Target Bounding Box */}
              <div className="absolute top-10 left-16 border-2 border-green-500 w-28 h-20 animate-pulse">
                <span className="absolute -top-5 left-0 bg-green-500 text-black text-[8px] px-1 py-0.5 font-bold">UAV: 94.2%</span>
                <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white" />
                <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white" />
              </div>
              <span className="text-[10px] text-green-500/40 uppercase">AERIAL GRID VIEW</span>
            </div>
            <div className="mt-4 text-[9px] text-center max-w-sm">TARGET LOCK ACQUIRED // 48.7 FPS // ENTRANCE ZONE 03</div>
          </div>
        )
      },
      {
        title: "Training Performance Curve",
        desc: "Epoch progression indicating the reduction in bounding box loss and classification error over 80 training epochs.",
        type: "vector",
        render: () => (
          <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 relative rounded-xl border border-slate-800 font-space-mono text-slate-400">
            <div className="absolute top-4 left-4 text-[8px] uppercase tracking-wider text-slate-500">TRAINING METRICS // LOG</div>
            {/* Chart */}
            <div className="w-5/6 h-1/2 border-b border-l border-slate-800 relative mt-4 flex items-end">
              <svg className="w-full h-full" viewBox="0 0 100 50">
                {/* Loss Curve */}
                <path d="M 0,5 Q 30,35 100,45" fill="none" stroke="#22C55E" strokeWidth="2" />
                {/* Accuracy Curve */}
                <path d="M 0,45 Q 40,10 100,8" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
              </svg>
              <div className="absolute top-2 right-2 flex flex-col gap-1 text-[7px]">
                <div className="flex items-center gap-1"><span className="w-2 h-1 bg-green-500" /> LOSS</div>
                <div className="flex items-center gap-1"><span className="w-2 h-1 bg-blue-500" /> mAP@0.5</div>
              </div>
            </div>
            <div className="flex justify-between w-5/6 text-[8px] text-slate-500 mt-1">
              <span>Epoch 0</span>
              <span>Epoch 40</span>
              <span>Epoch 80</span>
            </div>
            <p className="text-[9px] text-slate-500 text-center mt-3">Final Validation mAP@0.5: 96.8% // Box Loss: 0.042</p>
          </div>
        )
      }
    ],
    github: "https://github.com/TheAryan-007/SkySentry-AI",
    demo: null,
    docs: "https://github.com/TheAryan-007/SkySentry-AI/blob/main/README.md"
  },
  "aryanverse": {
    name: "AryanVerse",
    tagline: "Custom Immersive WebGL Sandbox Portfolio & Cybernetic Repository.",
    description: "An online personal universe merging interactive 3D solar maps, retro-futuristic chambers, and high-readability prose.",
    status: "IN PROGRESS",
    color: "#A855F7",
    bgAccent: "bg-purple-50/40",
    borderAccent: "border-purple-200",
    textAccent: "text-purple-600",
    timeline: "May 2026 - Present",
    role: "Creator & Architect",
    context: "Personal Creative Hub",
    tags: ["Next.js 16", "Three.js", "GSAP", "Tailwind CSS"],
    overview: "AryanVerse is not a standard developer website. It is designed to be a digital exhibit of the mind, where visitors enter a solar-system style galaxy containing glowing planetary chambers. Each chamber represents a core facet of my identity: my writings, developer logs, journey landmarks, and portfolio items. It combines rich design, dynamic physics, and high contrast reading states.",
    challenge: "Combining a canvas-based 3D scene (Three.js) with DOM elements can lead to memory leaks, slow page transitions, and disjointed states. Standard animations fail to sync when moving from WebGL coordinate spaces to standard screen space. Additionally, ensuring smooth performance on mobile browsers required strict geometry optimization.",
    solution: "I designed a state controller that acts as a single source of truth for both the Three.js canvas and the Next.js routing state. Transitioning between pages triggers a GSAP timeline that smoothly interpolates the 3D camera coordinates, zooms into a target planet, and fades in the text cards at the exact millisecond the camera reaches its destination. All 3D planetary spheres share a single geometry buffer to save GPU cycles.",
    techStack: [
      { name: "Next.js", desc: "App Router structure for routing, static page generation, and search optimization." },
      { name: "Three.js", desc: "For WebGL scene compilation, shaders, mesh texturing, and camera paths." },
      { name: "GSAP", desc: "Core animation engine used for complex camera transitions and UI timing sequences." },
      { name: "Tailwind CSS", desc: "For responsive grid layouts, glassmorphism filters, and typographic hierarchy." }
    ],
    gallery: [
      {
        title: "Hand Mockup Overlay",
        desc: "Stylized image representing the Creator Hand asset positioning the planetary chambers in the universe.",
        type: "image",
        url: "/creator_hand.png"
      },
      {
        title: "Archive Space Layout",
        desc: "Holographic wireframe mock representing the Museum Exhibition Hall style grid for Journey Archive.",
        type: "image",
        url: "/creators_room_bg.png"
      }
    ],
    github: "https://github.com/TheAryan-007/AryanVerse",
    demo: "https://aryanverse.vercel.app",
    docs: null
  },
  "movie-recommendation": {
    name: "Movie Recommendation System",
    tagline: "Collaborative and Content-Based Filtering Movie Engine.",
    description: "A machine learning system analyzing rating distributions and movie descriptive metadata to provide tailored viewing suggestions.",
    status: "PLANNED",
    color: "#3B82F6",
    bgAccent: "bg-blue-50/40",
    borderAccent: "border-blue-200",
    textAccent: "text-blue-600",
    timeline: "Q3 2026 (Planned)",
    role: "ML Developer",
    context: "Academic Portfolio Piece",
    tags: ["Machine Learning", "Python", "Scikit-Learn", "Pandas"],
    overview: "Designed to explore recommender architectures, this system blends multiple modeling approaches to solve the accuracy limits of standalone filters. By combining metadata text representations with raw user voting distributions, the project creates a stable, hybrid suggestion feed.",
    challenge: "The cold-start problem (suggesting movies to new users with zero history) and sparsity (most users only rate a tiny fraction of a massive database) cause traditional recommendation models to break or suggest only generic blockbusters.",
    solution: "The planned design uses content-based filtering (TF-IDF on summaries and genres) to build an initial user profile during onboarding. Once the user begins rating movies, a Collaborative Filtering engine using Singular Value Decomposition (SVD) dynamically recalculates similarity weights to surface niche recommendations, resolving both sparsity and cold-start hurdles.",
    techStack: [
      { name: "Python", desc: "Primary environment for data parsing, vector creation, and modeling." },
      { name: "Scikit-Learn", desc: "Used for TF-IDF vectorization, cosine similarity metrics, and SVD modeling." },
      { name: "Pandas & NumPy", desc: "For loading, cleaning, and indexing the 45,000-movie dataset." },
      { name: "Streamlit", desc: "To construct a quick, responsive dashboard mockup for testing predictions." }
    ],
    gallery: [
      {
        title: "Recommendation Matrix Flowchart",
        desc: "Process diagram showing how content-based similarity lists are merged with collaborative user-user matrices.",
        type: "vector",
        render: () => (
          <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 relative rounded-xl border border-blue-500/20 font-space-mono text-blue-400">
            <div className="absolute top-4 left-4 text-[8px] uppercase tracking-wider text-blue-400/50">MODEL FLOW ARCS</div>
            <div className="flex gap-4 items-center justify-center w-full mt-4">
              <div className="border border-blue-500/30 p-2.5 rounded text-center text-[9px] w-24 bg-black">
                <span>USER INPUT</span>
                <span className="block text-[7px] text-slate-500 mt-1">Movie Ratings</span>
              </div>
              <span className="text-[12px]">→</span>
              <div className="flex flex-col gap-2">
                <div className="border border-blue-500/30 p-1.5 rounded text-center text-[8px] bg-slate-900">TF-IDF Vectorizer</div>
                <div className="border border-blue-500/30 p-1.5 rounded text-center text-[8px] bg-slate-900">SVD Collaborative</div>
              </div>
              <span className="text-[12px]">→</span>
              <div className="border border-blue-500/30 p-2.5 rounded text-center text-[9px] w-24 bg-black">
                <span>HYBRID LIST</span>
                <span className="block text-[7px] text-slate-500 mt-1">Top-10 Scores</span>
              </div>
            </div>
            <div className="mt-6 text-[9px] text-slate-500 text-center">Calculates cosine similarity in under 12ms.</div>
          </div>
        )
      }
    ],
    github: null,
    demo: null,
    docs: null
  },
  "unscripted-love": {
    name: "Unscripted Love",
    tagline: "A Contemporary Novel Exploring the Unplanned Choices of Life and Love.",
    description: "An original literary project following two individuals whose lives collide in a series of spontaneous, unscripted moments.",
    status: "IN PROGRESS",
    color: "#EF4444",
    bgAccent: "bg-red-50/40",
    borderAccent: "border-red-200",
    textAccent: "text-red-600",
    timeline: "Dec 2025 - Present",
    role: "Author / Creative Writer",
    context: "Personal Novel Project",
    tags: ["Creative Writing", "Novel Outline", "Storytelling", "Editorial"],
    overview: "Unscripted Love is my debut creative writing project. Written as a contemporary novel, it captures the emotional friction between high-pressure ambitions and the unexpected, chaotic nature of human relationships. The book focuses on realistic dialogues, vulnerable internal monologues, and character growth.",
    challenge: "Structuring a compelling narrative arc that maintains reader momentum while ensuring character depth isn't sacrificed for plot speed. Traditional writing tools lack formatting adaptability for dynamic, multi-modal web presentations.",
    solution: "I developed a detailed chapter outline mapping external events to internal psychological shifts using the Hero's Journey schema. To present the novel digitally, I designed an editorial layout focusing on serif typography, wide margins, and CSS-driven reading cards to let readers experience snippets of the manuscript in a distraction-free space.",
    techStack: [
      { name: "Creative Writing", desc: "Character development, narrative pacing, and deep thematic structure." },
      { name: "Google Docs", desc: "Draft tracking, editing loops, and manuscript version control." },
      { name: "Web Editorial", desc: "Tailoring prose for online readability with high-contrast serif layouts." }
    ],
    gallery: [
      {
        title: "Novel Manuscript Outline",
        desc: "Chapter structure and thematic colors indicating the emotional tone and narrative markers.",
        type: "vector",
        render: () => (
          <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 relative rounded-xl border border-red-500/20 font-space-mono text-red-400">
            <div className="absolute top-4 left-4 text-[8px] uppercase tracking-wider text-red-500/50">BOOK SYSTEM LOG</div>
            <div className="w-5/6 flex flex-col gap-2 mt-4 text-[9px]">
              <div className="border border-red-500/30 p-2 rounded flex justify-between bg-black/40">
                <span>Ch 1: The Intersection</span>
                <span className="text-red-500/60">Introduction // 3,400 words</span>
              </div>
              <div className="border border-red-500/30 p-2 rounded flex justify-between bg-black/40">
                <span>Ch 2: Scripted Lies</span>
                <span className="text-red-500/60">Rising Tension // 4,100 words</span>
              </div>
              <div className="border border-red-500/30 p-2 rounded flex justify-between bg-black/40 animate-pulse">
                <span>Ch 3: The Unscripted Choice</span>
                <span className="text-white bg-red-600 px-1.5 py-0.5 text-[7px] rounded">WRITING NOW</span>
              </div>
            </div>
            <div className="mt-4 text-[8px] text-slate-500 text-center">Total planned length: 12 Chapters // 45,000 words.</div>
          </div>
        )
      }
    ],
    github: null,
    demo: null,
    docs: null
  },
  "lyfchanger": {
    name: "LyfChanger",
    tagline: "E-Commerce, Branding, and Marketing Bootstrapping Experience in Class 11.",
    description: "My first real business venture, generating revenue while testing brand placement, logistics, and sales cycles.",
    status: "COMPLETED",
    color: "#F97316",
    bgAccent: "bg-orange-50/40",
    borderAccent: "border-orange-200",
    textAccent: "text-orange-600",
    timeline: "Jul 2023 - Feb 2024",
    role: "Founder / Hustler",
    context: "Independent Business Venture",
    tags: ["Entrepreneurship", "Digital Marketing", "Logistics", "Branding"],
    overview: "Launched during high school (Class 11), LyfChanger was my entry point into entrepreneurship. The business model centered on custom print-on-demand streetwear apparel and providing organic social media marketing consultancies for local brands. It taught me key concepts in product positioning, price elasticity, and cash-flow management.",
    challenge: "Having zero upfront capital to order inventory and no industry connections meant I had to figure out print supply chains and shipping logistics while balancing schoolwork.",
    solution: "I integrated a print-on-demand drop-shipping supplier network directly to a social media store page, removing the need for upfront warehousing costs. I ran organic reels campaigns on Instagram to acquire customers, generating approximately ₹84,000 in total sales with zero ad spend. I personally managed order entry, courier tracking, and customer support loops.",
    techStack: [
      { name: "Organic Marketing", desc: "Viral short-form video creation and targeted hashtags to drive storefront clicks." },
      { name: "Drop-shipping API", desc: "Connecting client orders directly to manufacturing partners for fulfillment." },
      { name: "Financial Tracking", desc: "Managing profit margins, shipping fees, returns, and net cash flows." }
    ],
    gallery: [
      {
        title: "Entrepreneurship Certificate",
        desc: "Credential verifying project completion, business logic validation, and financial milestone achievements.",
        type: "image",
        url: "/certificates/cert-1.jpg"
      },
      {
        title: "Matlab Performance Modeling",
        desc: "Certificate showing study of data structures and modeling, applied to inventory forecasts.",
        type: "image",
        url: "/certificates/cert-6.jpg"
      }
    ],
    github: null,
    demo: null,
    docs: null
  },
  "echos": {
    name: "Echos",
    tagline: "Semantic Intelligence Engine for Personal Notes and Mind Mapping.",
    description: "A digital knowledge system that organizes fragmented thoughts into structured relational semantic hubs.",
    status: "PLANNED",
    color: "#6366F1",
    bgAccent: "bg-indigo-50/40",
    borderAccent: "border-indigo-200",
    textAccent: "text-indigo-600",
    timeline: "Q4 2026 (Planned)",
    role: "Lead Creator",
    context: "Hackaccino 4.0 Prototype Idea",
    tags: ["Vector Databases", "Semantic Search", "Next.js", "AI APIs"],
    overview: "Echos is a concept designed to bridge the gap between note-taking and knowledge graph discovery. Instead of sorting files into manual folders, Echos reads short textual ideas, embeds them using machine learning models, and maps links between them based on conceptual overlap, creating an automatic wiki of your thoughts.",
    challenge: "Parsing messy, unformatted human language in real-time and clustering it without producing massive, confusing node clusters that are hard to navigate.",
    solution: "The model will pass inputs through a text embedding model (e.g. OpenAI text-embedding-3-small) to project text into a high-dimensional vector space. Nodes are grouped using density-based spatial clustering (DBSCAN). The frontend maps these clusters as interactive, floating constellation stars using a Canvas-based coordinate layout.",
    techStack: [
      { name: "Vector Database", desc: "To store high-dimensional text vectors and perform rapid cosine distance checks." },
      { name: "Next.js App Router", desc: "For Server Actions handling background embedding calls." },
      { name: "D3 Force Graph", desc: "To render dynamic, physics-based connection layouts on the client browser." }
    ],
    gallery: [
      {
        title: "Hackaccino Hackathon Backdrop",
        desc: "Certificate representing my development roots during the Hackaccino 4.0 hackathon.",
        type: "image",
        url: "/hackathons/hackaccino.jpg"
      }
    ],
    github: null,
    demo: null,
    docs: null
  }
};

// ==========================================
// Main React component for dynamic rendering
// ==========================================

export default function ProjectDetailPage({ params }) {
  const { slug } = use(params);
  const project = projectsDetails[slug];

  const [activeSlide, setActiveSlide] = useState(0);

  // If project slug is invalid, render page-not-found details
  if (!project) {
    return (
      <div className="fixed inset-0 z-40 bg-[#FAF9F6] text-slate-800 flex flex-col items-center justify-center p-6 select-none font-sans">
        <h1 className="font-orbitron text-3xl font-black text-slate-900 tracking-wider mb-2">PROJECT NOT FOUND</h1>
        <p className="text-slate-500 text-sm mb-6 max-w-md text-center">
          The project route <span className="font-mono bg-slate-100 px-1 py-0.5 rounded text-red-600">{slug}</span> does not exist in our systems.
        </p>
        <Link 
          href="/projects"
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all duration-300 font-space-mono text-xs tracking-wider"
        >
          ← Back to Projects Lab
        </Link>
      </div>
    );
  }

  const currentSlide = project.gallery ? project.gallery[activeSlide] : null;

  return (
    <main className="fixed inset-0 z-40 bg-[#FAF9F6] text-slate-900 overflow-y-auto w-screen h-screen flex flex-col items-center justify-start select-text selection:bg-purple-100 antialiased pb-24">
      
      {/* 1. Sticky/Fixed Top Navigation */}
      <div className="w-full max-w-4xl px-6 pt-10 pb-4 flex justify-between items-center relative z-20">
        <Link
          href="/projects"
          className="flex items-center gap-2 px-4 py-2 border border-slate-200/80 bg-[#FAF9F6]/90 backdrop-blur-sm text-slate-600 hover:text-slate-900 hover:border-slate-400 hover:shadow-sm transition-all duration-300 rounded-lg font-space-mono text-xs tracking-wider cursor-pointer group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200 text-[13px]">←</span> Back to Lab
        </Link>
        <div className="flex items-center gap-2 font-space-mono text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          CASE STUDY // {slug}
        </div>
      </div>

      {/* 2. Main Centered Editorial Layout */}
      <div className="w-full max-w-3xl px-6 flex flex-col gap-10 mt-6 relative z-10">
        
        {/* HERO HEADER */}
        <div className="flex flex-col gap-4 text-left">
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-space-mono tracking-wider font-extrabold uppercase border ${
              project.status === "COMPLETED" 
                ? "bg-green-50 text-green-700 border-green-200" 
                : project.status === "IN PROGRESS"
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}>
              {project.status}
            </span>
            <span className="text-[10px] text-slate-400 font-space-mono">{project.timeline}</span>
          </div>

          <h1 className="font-serif italic font-black text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
            {project.name}
          </h1>

          <p className="font-sans text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl border-l-2 border-slate-200 pl-4 py-1 italic">
            {project.tagline}
          </p>
        </div>

        {/* HERO ABSTRACT GRADIENT BLOCK */}
        <div className="w-full aspect-[21/9] rounded-2xl relative overflow-hidden border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex items-center justify-center">
          <div 
            className="absolute inset-0 opacity-40 blur-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${project.color}35, transparent 75%)`
            }}
          />
          <div className="absolute inset-0 bg-linear-to-tr from-slate-100 via-transparent to-slate-50 opacity-80" />
          
          {/* Abstract mesh lines */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Glowing central sphere representation */}
          <div 
            className="w-24 h-24 rounded-full filter blur-xl opacity-30 animate-pulse"
            style={{ backgroundColor: project.color }}
          />

          {/* Project Details Badge */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-md border border-slate-200/60 shadow-xs flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
            <span className="font-space-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">{project.role}</span>
          </div>
        </div>

        {/* METADATA SUMMARY BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-slate-200 py-6 w-full">
          <div>
            <span className="block font-space-mono text-[9px] text-slate-400 uppercase tracking-widest font-black mb-1">TIMELINE</span>
            <span className="font-sans text-sm font-semibold text-slate-700">{project.timeline}</span>
          </div>
          <div>
            <span className="block font-space-mono text-[9px] text-slate-400 uppercase tracking-widest font-black mb-1">ROLE</span>
            <span className="font-sans text-sm font-semibold text-slate-700">{project.role}</span>
          </div>
          <div>
            <span className="block font-space-mono text-[9px] text-slate-400 uppercase tracking-widest font-black mb-1">CONTEXT</span>
            <span className="font-sans text-sm font-semibold text-slate-700 truncate block">{project.context}</span>
          </div>
          <div>
            <span className="block font-space-mono text-[9px] text-slate-400 uppercase tracking-widest font-black mb-1">TECH STACK</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {project.tags.slice(0, 2).map((t) => (
                <span key={t} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-space-mono text-[8px] border border-slate-200/40">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* EDITORIAL NARRATIVE PROSE */}
        <article className="flex flex-col gap-8 text-left">
          
          {/* Overview */}
          <div className="flex flex-col gap-3">
            <h2 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
              01 / OVERVIEW
            </h2>
            <p className="font-serif text-lg leading-relaxed text-slate-800 antialiased">
              {project.overview}
            </p>
          </div>

          {/* Challenge */}
          <div className="flex flex-col gap-3">
            <h2 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
              02 / THE CHALLENGE
            </h2>
            <p className="font-serif text-lg leading-relaxed text-slate-800 antialiased">
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="flex flex-col gap-3">
            <h2 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
              03 / THE SOLUTION
            </h2>
            <p className="font-serif text-lg leading-relaxed text-slate-800 antialiased">
              {project.solution}
            </p>
          </div>

        </article>

        {/* SCREENSHOT / EVIDENCE GALLERY SHOWCASE */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-slate-200 pt-10 mt-2">
            <div className="flex flex-col text-left gap-1">
              <h2 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                04 / GALLERY & METRICS
              </h2>
              <p className="text-xs text-slate-500 font-sans">Click on the tabs below to switch viewports.</p>
            </div>

            {/* Gallery viewport Frame */}
            <div className="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col gap-3">
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden relative bg-slate-900 border border-slate-100/50 flex items-center justify-center">
                {currentSlide.type === "image" ? (
                  <img
                    src={currentSlide.url}
                    alt={currentSlide.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                ) : (
                  currentSlide.render()
                )}
              </div>
              <div className="px-2 py-1 text-left flex flex-col gap-1">
                <h3 className="font-sans font-bold text-sm text-slate-900">{currentSlide.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{currentSlide.desc}</p>
              </div>
            </div>

            {/* Thumbnail Tabs */}
            <div className="flex flex-wrap gap-2">
              {project.gallery.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`px-3 py-1.5 text-[10px] font-space-mono uppercase tracking-wider rounded-md border transition-all duration-300 ${
                    activeSlide === idx
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-350 hover:text-slate-700"
                  }`}
                >
                  {slide.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* DETAILED TECH STACK CARDS */}
        <div className="flex flex-col gap-6 border-t border-slate-200 pt-10">
          <h2 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-slate-400 text-left flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
            05 / SYSTEM COMPOSITION
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {project.techStack.map((tech) => (
              <div 
                key={tech.name} 
                className="bg-white border border-slate-200 hover:border-slate-350 p-5 rounded-xl text-left flex flex-col gap-2 transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-sm text-slate-800 uppercase tracking-wide">{tech.name}</span>
                  <Code className="w-3.5 h-3.5 text-slate-300" />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PREMIUM ACTION LINKS SECTION */}
        <div className="flex flex-col gap-6 border-t border-slate-200 pt-10">
          <h2 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-slate-400 text-left flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
            06 / RESOURCE INDEX
          </h2>

          <div className="flex flex-wrap gap-4 w-full justify-start">
            {/* GitHub Repository Link */}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 bg-white hover:border-slate-800 text-slate-700 hover:text-slate-900 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md font-space-mono text-xs tracking-wider"
              >
                <SiGithub className="w-4 h-4 text-slate-500" /> GitHub Repository
              </a>
            ) : (
              <button 
                disabled
                className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 bg-slate-50 text-slate-400 rounded-xl font-space-mono text-xs tracking-wider cursor-not-allowed opacity-70 group relative"
              >
                <Lock className="w-3.5 h-3.5 text-slate-300" /> GitHub Repo 
                <span className="ml-1 px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-500 text-[8px] font-black tracking-widest uppercase">SOON</span>
              </button>
            )}

            {/* Live Demo Link */}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 bg-white hover:border-slate-800 text-slate-700 hover:text-slate-900 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md font-space-mono text-xs tracking-wider"
              >
                <Globe className="w-4 h-4 text-slate-500" /> Live Prototype <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            ) : (
              <button 
                disabled
                className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 bg-slate-50 text-slate-400 rounded-xl font-space-mono text-xs tracking-wider cursor-not-allowed opacity-70 group"
              >
                <Globe className="w-3.5 h-3.5 text-slate-300" /> Live Demo 
                <span className="ml-1 px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-500 text-[8px] font-black tracking-widest uppercase">SOON</span>
              </button>
            )}

            {/* Technical Documentation Link */}
            {project.docs ? (
              <a
                href={project.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 bg-white hover:border-slate-800 text-slate-700 hover:text-slate-900 rounded-xl transition-all duration-300 shadow-xs hover:shadow-md font-space-mono text-xs tracking-wider"
              >
                <FileText className="w-4 h-4 text-slate-500" /> Documentation <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            ) : (
              <button 
                disabled
                className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 bg-slate-50 text-slate-400 rounded-xl font-space-mono text-xs tracking-wider cursor-not-allowed opacity-70 group"
              >
                <FileText className="w-3.5 h-3.5 text-slate-300" /> Technical Docs 
                <span className="ml-1 px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-500 text-[8px] font-black tracking-widest uppercase">SOON</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
