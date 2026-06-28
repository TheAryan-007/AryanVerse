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
// Projects Case Studies Database (8 Projects)
// ==========================================

const projectsDetails = {
  "skysentry-ai": {
    name: "SkySentry AI",
    tagline: "AI-Powered Computer Vision for False Alert Reduction in Aerial Surveillance.",
    description: "An intelligent visual verification engine optimized to classify flying objects and eliminate ambient noise in security feeds.",
    status: "COMPLETED",
    color: "#22C55E",
    timeline: "Jan 2026 - Mar 2026",
    role: "Lead ML Engineer",
    context: "Research Project // Bennett University",
    tags: ["Computer Vision", "YOLOv10", "PyTorch", "OpenCV"],
    overview: "SkySentry AI was born out of a critical gap in automated security: traditional motion detection cameras cannot distinguish between a high-threat drone, a harmless bird, or moving tree shadows. This project presents a full-stack computer vision pipeline designed to filter out environmental noise in real-time aerial feeds, focusing alerts only on actual objects of interest.",
    challenge: "Surveillance feeds are filled with 'false positives'—rapidly shifting clouds, bird migrations, or lens flares. Standard object detection models like YOLOv5 are often too heavy for edge deployment or suffer from high latency, making them impractical for split-second security verification. The challenge was maintaining a near-zero false-positive rate while operating at >45 FPS on standard hardware.",
    solution: "We implemented YOLOv10, a state-of-the-art detector that removes non-maximum suppression (NMS) latency by design. We trained it on a custom dataset containing over 12,000 annotated frames of low-altitude UAVs, birds, commercial planes, and background noise. We then overlaid an OpenCV Kalman filter tracking algorithm. This ensures that even if an object is temporarily blocked by a tree branch or cloud, the system holds its tracking lock and doesn't fire a duplicate alert.",
    theme: {
      bg: "bg-[#F4F4F6]",
      text: "text-slate-900",
      subtext: "text-slate-500",
      border: "border-slate-300/60",
      cardBg: "bg-white",
      badge: "bg-green-50 text-green-700 border-green-200",
      titleFont: "font-sans font-black tracking-tight",
      bodyFont: "font-sans font-medium text-slate-750 leading-relaxed",
      accentColor: "#22C55E",
      isDark: false
    },
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
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-green-500/10 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border border-green-500/10" />
                </div>
              </div>
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
      }
    ],
    github: "https://github.com/TheAryan-007/SkySentry-AI",
    demo: null,
    docs: "https://github.com/TheAryan-007/SkySentry-AI/blob/main/README.md"
  },
  "echoes-within": {
    name: "Echoes Within",
    tagline: "Invisible Communication Through Audio Steganography.",
    description: "A premium cybersecurity web product enabling secure hiding and extraction of secret text inside audio files using the LSB algorithm.",
    status: "COMPLETED",
    color: "#10B981",
    timeline: "Class Project // Batch 18",
    role: "Conversion Engine & Bit Planner",
    context: "Cybersecurity Lab // Bennett University",
    tags: ["Audio Steganography", "Least Significant Bit", "Python Flask", "FFmpeg"],
    overview: "Echoes Within is an advanced Audio Steganography application designed as a professional cybersecurity product. The system embeds secret, binary-converted text strings directly inside the least significant bits of audio samples. This approach hides the very existence of the message itself, making it highly secure for covert, attention-free digital communication.",
    challenge: "Audio formats like MP3 compress frames lossily, destroying bit-level steganography structures. The challenge was supporting MP3 uploads, automatically converting them to uncompressed WAV streams without data loss, and implementing a highly optimized LSB algorithm that appends a clean ###END### delimiter without altering sound fidelity.",
    solution: "We engineered a Flask backend integrated with PyDub and FFmpeg. When an MP3 is uploaded, it is converted into a standard 16-bit PCM WAV. The steganography logic iterates through the raw audio bytes, replacing the last bit of each sample with a binary message bit. During decoding, it extracts LSBs and reconstructs the original string, stopping immediately when the ###END### delimiter is parsed.",
    theme: {
      bg: "bg-[#040A08]",
      text: "text-[#ECE5DA]",
      subtext: "text-emerald-300/60",
      border: "border-emerald-950/60",
      cardBg: "bg-[#061411]",
      badge: "bg-emerald-950/50 text-emerald-400 border-emerald-800/30",
      titleFont: "font-mono font-bold tracking-wider uppercase",
      bodyFont: "font-sans text-[#D4CBBF] font-light leading-relaxed",
      accentColor: "#10B981",
      isDark: true
    },
    techStack: [
      { name: "Python Flask", desc: "Core backend server handling file uploads, processing routes, and stego execution." },
      { name: "PyDub & FFmpeg", desc: "Used to decode MP3 bitstreams, resample rate markers, and write PCM WAV containers." },
      { name: "Least Significant Bit", desc: "Algorithmic bitwise modification of raw audio sample indices." },
      { name: "TypeScript & React", desc: "Premium cybersecurity style frontend with soundwave animations and copy widgets." }
    ],
    gallery: [
      {
        title: "Team Structure & Role Allocations",
        desc: "Role division: Savyam Shukla (Lead, LSB logic), Aryan Chauhan (MP3/WAV FFmpeg backend), Harsh (UI routing), Zaman (Encode uploads), Shaurya (Decode reveal).",
        type: "vector",
        render: () => (
          <div className="w-full h-full bg-[#050D0A] flex flex-col items-center justify-center p-6 relative rounded-xl border border-emerald-500/20 font-space-mono text-emerald-400">
            <div className="absolute top-4 left-4 text-[8px] uppercase tracking-wider text-emerald-400/50">SYS-TEAM // ROLES</div>
            <div className="w-full grid grid-cols-2 gap-3 mt-4 text-[9px]">
              <div className="border border-emerald-950 p-2 rounded bg-black/40">
                <span className="block font-bold">Savyam Shukla</span>
                <span className="text-[7.5px] text-slate-500">Core LSB Logic</span>
              </div>
              <div className="border border-emerald-950 p-2 rounded bg-black/40">
                <span className="block font-bold text-white">Aryan Chauhan</span>
                <span className="text-[7.5px] text-emerald-400">MP3 to WAV Conversion</span>
              </div>
              <div className="border border-emerald-950 p-2 rounded bg-black/40">
                <span className="block font-bold">Harsh</span>
                <span className="text-[7.5px] text-slate-500">Frontend Routing</span>
              </div>
              <div className="border border-emerald-950 p-2 rounded bg-black/40">
                <span className="block font-bold">Zaman & Shaurya</span>
                <span className="text-[7.5px] text-slate-500">Encode/Decode Routes</span>
              </div>
            </div>
            <div className="mt-4 text-[8px] text-emerald-500/50">DEVIL CODERS // BATCH 18</div>
          </div>
        )
      }
    ],
    github: null,
    demo: null,
    docs: null
  },
  "intern-ease": {
    name: "Intern-Ease",
    tagline: "AI-Based Internship Recommendation Engine for PM Internship Scheme.",
    description: "An intelligent, multilingual matching engine developed for the SIH internal rounds, pairing students with local opportunities.",
    status: "COMPLETED",
    color: "#3B82F6",
    timeline: "Aug 2024",
    role: "Backend Architect & Localization Lead",
    context: "Smart India Hackathon // Internal Rounds",
    tags: ["Recommendation Engine", "Algorithms", "Multilingual", "Database"],
    overview: "Intern-Ease was created by team Hack Houdini during the Smart India Hackathon (SIH) internal rounds. It is an intelligent web prototype designed to recommend the most suitable internship opportunities under the PM Internship Scheme by matching student profiles, preferences, and geolocations.",
    challenge: "Navigating thousands of national listings is overwhelming for students. Furthermore, language barriers often lock out qualified candidates from diverse regional backgrounds. The system needed to process criteria instantly and support regional languages.",
    solution: "We implemented a point-based recommendation algorithm that ranks internships based on proximity coordinates and qualification profiles. We built a localized frontend supporting 5 major languages: English, Hindi, Bangla, Tamil, and Telugu, powered by modular backend localization parameters.",
    theme: {
      bg: "bg-[#FAF5EC]",
      text: "text-[#2B231D]",
      subtext: "text-stone-500",
      border: "border-stone-250/70",
      cardBg: "bg-white",
      badge: "bg-blue-50 text-blue-700 border-blue-200",
      titleFont: "font-serif font-black tracking-tight",
      bodyFont: "font-sans text-stone-700 leading-relaxed",
      accentColor: "#3B82F6",
      isDark: false
    },
    techStack: [
      { name: "Backend Architecture", desc: "Constructing Flask routes to parse coordinates and calculate matching points." },
      { name: "Localization engine", desc: "Mapping UI assets to English, Hindi, Bangla, Tamil, and Telugu." },
      { name: "Point Matching System", desc: "A customizable scoring script weighing profile tags, degrees, and radius." },
      { name: "Database Integration", desc: "SQLite setup handled by Krishna Chaitanya for query execution." }
    ],
    gallery: [
      {
        title: "Hack Houdini Team Structure",
        desc: "Frontend: Nandini Mishra, Samriddhi Vishnoi. Backend Architecture: Prithul Jaiswal, Savyam Shukla, Aryan Chauhan. Database Management: Krishna Chaitanya.",
        type: "vector",
        render: () => (
          <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 relative rounded-xl border border-blue-500/20 font-space-mono text-blue-400">
            <div className="absolute top-4 left-4 text-[8px] uppercase tracking-wider text-blue-400/50">HACK HOUDINI STRUCTURE</div>
            <div className="w-5/6 flex flex-col gap-2 mt-4 text-[9px]">
              <div className="border border-blue-900/40 p-2 rounded flex justify-between bg-black/40">
                <span>Frontend Developers</span>
                <span className="text-blue-400/80">Nandini & Samriddhi</span>
              </div>
              <div className="border border-blue-900/40 p-2 rounded flex justify-between bg-black/40">
                <span>Backend Architects</span>
                <span className="text-blue-400/80">Prithul, Savyam, Aryan</span>
              </div>
              <div className="border border-blue-900/40 p-2 rounded flex justify-between bg-black/40">
                <span>Database Manager</span>
                <span className="text-blue-400/80">Krishna Chaitanya</span>
              </div>
            </div>
            <div className="mt-4 text-[8px] text-slate-500 text-center">Smart India Hackathon Internal Rounds</div>
          </div>
        )
      }
    ],
    github: null,
    demo: null,
    docs: null
  },
  "bubble-blast": {
    name: "Bubble Blast",
    tagline: "High-Performance 2D Android Arcade Shooter.",
    description: "A fast-paced mobile game built in Java using SurfaceView and a custom game loop thread, featuring trigonometric physics and particle systems.",
    status: "COMPLETED",
    color: "#E11D48",
    timeline: "Nov 2025 - Dec 2025",
    role: "Game Loop & Optimization Developer",
    context: "Mobile Game Project",
    tags: ["Java", "Android Studio", "SurfaceView", "Trigonometry"],
    overview: "Bubble Blast is a custom-built 2D Android arcade shooter designed for high-performance 60 FPS gameplay. The player controls a cannon at the bottom of the screen, aiming and firing projectiles to pop descending colored bubbles. It includes a custom particle physics engine and Euclidean boundary calculations.",
    challenge: "Standard Android Views undergo layout passes that limit frame rate and trigger massive garbage collection spikes. Managing 400+ concurrent game objects (bubbles, multiple projectiles, trail smoke, and explosion shards) on Android mobile devices required optimized resource loops.",
    solution: "We structured a dedicated Game Loop thread writing directly to an Android SurfaceView canvas. To avoid memory fragmentation, we utilized optimized pre-allocated ArrayList collections. Trigonometric calculations (`atan2`, `sin`, `cos`) drive the shooting vector, supporting fast Bullets, Grenades (250px damage radius), Missiles (450px splash damage with smoke trails), and a fullscreen Pulsar shockwave.",
    theme: {
      bg: "bg-[#FAF8F5]",
      text: "text-stone-900",
      subtext: "text-stone-500",
      border: "border-stone-250/70",
      cardBg: "bg-white",
      badge: "bg-rose-50 text-rose-700 border-rose-200",
      titleFont: "font-sans font-black tracking-wider uppercase",
      bodyFont: "font-sans text-stone-700 leading-relaxed",
      accentColor: "#E11D48",
      isDark: false
    },
    techStack: [
      { name: "Android SurfaceView", desc: "Enables low-level pixel drawing directly to screen buffers outside standard UI layouts." },
      { name: "Game Loop Thread", desc: "Synchronized frame updates matching physics calculations at constant tick rates." },
      { name: "Euclidean Collision", desc: "High-performance coordinate calculations determining overlapping bounding shells." },
      { name: "Particle Systems", desc: "Custom-drawn vector points representing trailing smoke and circular blast shockwaves." }
    ],
    gallery: [],
    github: null,
    demo: null,
    docs: null
  },
  "aryanverse": {
    name: "AryanVerse",
    tagline: "Custom Immersive WebGL Sandbox Portfolio & Cybernetic Repository.",
    description: "An online personal universe merging interactive 3D solar maps, retro-futuristic chambers, and high-readability prose.",
    status: "IN PROGRESS",
    color: "#A855F7",
    timeline: "May 2026 - Present",
    role: "Creator & Architect",
    context: "Personal Creative Hub",
    tags: ["Next.js 16", "Three.js", "GSAP", "Tailwind CSS"],
    overview: "AryanVerse is not a standard developer website. It is designed to be a digital exhibit of the mind, where visitors enter a solar-system style galaxy containing glowing planetary chambers. Each chamber represents a core facet of my identity: my writings, developer logs, journey landmarks, and portfolio items. It combines rich design, dynamic physics, and high contrast reading states.",
    challenge: "Combining a canvas-based 3D scene (Three.js) with DOM elements can lead to memory leaks, slow page transitions, and disjointed states. Standard animations fail to sync when moving from WebGL coordinate spaces to standard screen space. Additionally, ensuring smooth performance on mobile browsers required strict geometry optimization.",
    solution: "I designed a state controller that acts as a single source of truth for both the Three.js canvas and the Next.js routing state. Transitioning between pages triggers a GSAP timeline that smoothly interpolates the 3D camera coordinates, zooms into a target planet, and fades in the text cards at the exact millisecond the camera reaches its destination. All 3D planetary spheres share a single geometry buffer to save GPU cycles.",
    theme: {
      bg: "bg-white",
      text: "text-zinc-900",
      subtext: "text-zinc-500",
      border: "border-zinc-200",
      cardBg: "bg-zinc-50",
      badge: "bg-purple-50 text-purple-700 border-purple-200",
      titleFont: "font-serif italic font-bold tracking-tight",
      bodyFont: "font-sans text-zinc-700 leading-relaxed",
      accentColor: "#A855F7",
      isDark: false
    },
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
  "lyfchanger": {
    name: "LyfChanger",
    tagline: "A Premium Habit Curation and Curated Wellness Merchandise Concept.",
    description: "An upcoming lifestyle ecosystem focused on bridging modern habit tracking with highly custom, premium organic wellness merchandise.",
    status: "PLANNED",
    color: "#F97316",
    timeline: "Q4 2026 (Concept)",
    role: "Founder & Strategic Director",
    context: "Conceptual Startup Plan",
    tags: ["Product Curation", "Branding Strategy", "Lifestyle Tech"],
    overview: "LyfChanger is a future startup plan currently in its conceptual design phase. The goal is to build a premium, digital-first wellness ecosystem. Rather than just offering generic habits or products, LyfChanger aims to curate physical lifestyle merchandise (such as custom organic hoodies, smart water flasks, and sensory tools) that synchronize with a dedicated mindfulness tracking application.",
    challenge: "Formulating a viable value proposition that stands out in the crowded wellness market, while structuring a lean manufacturing supply chain for premium custom materials.",
    solution: "The startup model focuses on high-ticket, limited-run custom merchandise drops promoted through high-aesthetic cinematic storytelling on social media. The digital application acts as an exclusive membership gateway, where users receive custom habit-building challenges that pair with their physical wellness gear.",
    theme: {
      bg: "bg-[#091A17]",
      text: "text-[#ECE5DA]",
      subtext: "text-emerald-350/60",
      border: "border-emerald-950/50",
      cardBg: "bg-[#0C2420]",
      badge: "bg-emerald-950/40 text-emerald-400 border-emerald-800/30",
      titleFont: "font-serif italic font-bold tracking-wide",
      bodyFont: "font-sans text-[#D4CBBF] font-light leading-relaxed",
      accentColor: "#F97316",
      isDark: true
    },
    techStack: [
      { name: "Brand Curation", desc: "Designing premium visual identities and unique aesthetic guidelines for lifestyle products." },
      { name: "Supply Chain Strategy", desc: "Structuring manufacturer relations for organic cotton fabrics and sustainable smart hardware." },
      { name: "Ecosystem Design", desc: "Modeling a dual-channel ecosystem connecting physical wellness assets with digital behavioral analytics." }
    ],
    gallery: []
  },
  "cafe-marketing": {
    name: "Local Cafe Web & Marketing Service",
    tagline: "Web Development and Brand Placement in Greater Noida.",
    description: "An unnamed business venture managing digital assets for local Greater Noida restaurants, directing junior developers.",
    status: "COMPLETED",
    color: "#FF8F00",
    timeline: "Jul 2023 - Feb 2024",
    role: "Founder & Team Leader",
    context: "High School Business Venture",
    tags: ["Project Management", "Web Dev", "Marketing Retainers"],
    overview: "This business was a local web design and digital marketing service bootstrapped in Class 11. Our team visited local Greater Noida restaurants and cafes to pitch web contracts, helping establish responsive, modern websites and managing social channels.",
    challenge: "Delivering clean, custom responsive websites and high-engagement content for local businesses under high school schedules, while directing a team of junior developers.",
    solution: "I managed client contracts and coordinated operations, assigning development pipelines to talented junior developers. We designed responsive promotional templates and established organic content schedules for client Instagram pages, building valuable early leadership and sales experience.",
    theme: {
      bg: "bg-[#FAF9F5]",
      text: "text-stone-900",
      subtext: "text-stone-500",
      border: "border-stone-250/70",
      cardBg: "bg-white",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      titleFont: "font-sans font-black tracking-tight",
      bodyFont: "font-sans text-stone-700 leading-relaxed",
      accentColor: "#FF8F00",
      isDark: false
    },
    techStack: [
      { name: "Project Management", desc: "Coordinating schedules, client reviews, and milestones for junior developers." },
      { name: "Web Development", desc: "HTML, CSS, and basic JavaScript layouts built for local business landing pages." },
      { name: "Local Brand Marketing", desc: "Setting up organic campaign calendars and targeting local Greater Noida students." }
    ],
    gallery: [],
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
    timeline: "Dec 2025 - Present",
    role: "Author / Creative Writer",
    context: "Personal Novel Project",
    tags: ["Creative Writing", "Novel Outline", "Storytelling", "Editorial"],
    overview: "Unscripted Love is my debut creative writing project. Written as a contemporary novel, it captures the emotional friction between high-pressure ambitions and the unexpected, chaotic nature of human relationships. The book focuses on realistic dialogues, vulnerable internal monologues, and character growth.",
    challenge: "Structuring a compelling narrative arc that maintains reader momentum while ensuring character depth isn't sacrificed for plot speed. Traditional writing tools lack formatting adaptability for dynamic, multi-modal web presentations.",
    solution: "I developed a detailed chapter outline mapping external events to internal psychological shifts using the Hero's Journey schema. To present the novel digitally, I designed an editorial layout focusing on serif typography, wide margins, and CSS-driven reading cards to let readers experience snippets of the manuscript in a distraction-free space.",
    theme: {
      bg: "bg-[#FDFBF7]",
      text: "text-slate-800",
      subtext: "text-slate-500",
      border: "border-slate-200/80",
      cardBg: "bg-white",
      badge: "bg-red-50 text-red-700 border-red-200",
      titleFont: "font-serif italic font-black tracking-tight",
      bodyFont: "font-serif text-slate-800 leading-loose",
      accentColor: "#EF4444",
      isDark: false
    },
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

  const theme = project.theme;
  const currentSlide = project.gallery && project.gallery.length > 0 ? project.gallery[activeSlide] : null;

  return (
    <main className={`fixed inset-0 z-40 ${theme.bg} ${theme.text} overflow-y-auto w-screen h-screen flex flex-col items-center justify-start select-text selection:bg-purple-100 antialiased pb-24`}>
      
      {/* 1. Sticky/Fixed Top Navigation */}
      <div className="w-full max-w-4xl px-6 pt-10 pb-4 flex justify-between items-center relative z-20">
        <Link
          href="/projects"
          className={`flex items-center gap-2 px-4 py-2 border ${
            theme.isDark 
              ? "border-white/10 bg-black/60 text-slate-300 hover:text-white hover:border-emerald-800/40" 
              : "border-slate-200/80 bg-white/90 text-slate-600 hover:text-slate-900 hover:border-slate-350"
          } hover:shadow-xs transition-all duration-300 rounded-lg font-space-mono text-xs tracking-wider cursor-pointer group`}
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200 text-[13px]">←</span> Back to Lab
        </Link>
        <div className={`flex items-center gap-2 font-space-mono text-[9px] uppercase tracking-[0.2em] ${theme.isDark ? "text-slate-500" : "text-slate-400"} font-bold`}>
          <span className={`w-1.5 h-1.5 rounded-full ${theme.isDark ? "bg-slate-700" : "bg-slate-300"}`} />
          CASE STUDY // {slug}
        </div>
      </div>

      {/* 2. Main Centered Editorial Layout */}
      <div className="w-full max-w-3xl px-6 flex flex-col gap-10 mt-6 relative z-10">
        
        {/* HERO HEADER */}
        <div className="flex flex-col gap-4 text-left">
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-space-mono tracking-wider font-extrabold uppercase border ${theme.badge}`}>
              {project.status}
            </span>
            <span className={`text-[10px] ${theme.isDark ? "text-slate-500" : "text-slate-400"} font-space-mono`}>{project.timeline}</span>
          </div>

          <h1 className={`${theme.titleFont} text-4xl sm:text-5xl md:text-6xl ${theme.isDark ? "text-white" : "text-slate-900"} tracking-tight leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.02)]`}>
            {project.name}
          </h1>

          <p className={`font-sans text-base md:text-lg ${theme.isDark ? "text-emerald-300/70 border-emerald-950" : "text-slate-600 border-slate-200"} font-medium leading-relaxed max-w-2xl border-l-2 pl-4 py-1 italic`}>
            {project.tagline}
          </p>
        </div>

        {/* HERO ABSTRACT GRADIENT BLOCK */}
        <div className={`w-full aspect-[21/9] rounded-2xl relative overflow-hidden border ${theme.isDark ? "border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.5)]" : "border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"} flex items-center justify-center`}>
          <div 
            className="absolute inset-0 opacity-40 blur-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${project.color}35, transparent 75%)`
            }}
          />
          <div className={`absolute inset-0 ${theme.isDark ? "bg-gradient-to-tr from-neutral-950 via-transparent to-neutral-900" : "bg-gradient-to-tr from-slate-100 via-transparent to-slate-50"} opacity-80`} />
          
          {/* Abstract mesh lines */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Glowing central sphere representation */}
          <div 
            className="w-24 h-24 rounded-full filter blur-xl opacity-30 animate-pulse"
            style={{ backgroundColor: project.color }}
          />

          {/* Project Details Badge */}
          <div className={`absolute bottom-4 right-4 ${theme.isDark ? "bg-black/90 border-white/5" : "bg-white/90 border-slate-200/60"} px-3 py-1 rounded-md border shadow-xs flex items-center gap-2`}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
            <span className={`font-space-mono text-[9px] ${theme.isDark ? "text-slate-400" : "text-slate-500"} font-bold uppercase tracking-wider`}>{project.role}</span>
          </div>
        </div>

        {/* METADATA SUMMARY BAR */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 border-y ${theme.isDark ? "border-white/10" : "border-slate-200"} py-6 w-full`}>
          <div>
            <span className={`block font-space-mono text-[9px] ${theme.isDark ? "text-slate-500" : "text-slate-400"} uppercase tracking-widest font-black mb-1`}>TIMELINE</span>
            <span className={`font-sans text-sm font-semibold ${theme.isDark ? "text-slate-300" : "text-slate-700"}`}>{project.timeline}</span>
          </div>
          <div>
            <span className={`block font-space-mono text-[9px] ${theme.isDark ? "text-slate-500" : "text-slate-400"} uppercase tracking-widest font-black mb-1`}>ROLE</span>
            <span className={`font-sans text-sm font-semibold ${theme.isDark ? "text-slate-300" : "text-slate-700"}`}>{project.role}</span>
          </div>
          <div>
            <span className={`block font-space-mono text-[9px] ${theme.isDark ? "text-slate-500" : "text-slate-400"} uppercase tracking-widest font-black mb-1`}>CONTEXT</span>
            <span className={`font-sans text-sm font-semibold ${theme.isDark ? "text-slate-300" : "text-slate-700"} truncate block`}>{project.context}</span>
          </div>
          <div>
            <span className={`block font-space-mono text-[9px] ${theme.isDark ? "text-slate-500" : "text-slate-400"} uppercase tracking-widest font-black mb-1`}>TECH STACK</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {project.tags.slice(0, 2).map((t) => (
                <span key={t} className={`px-1.5 py-0.5 rounded ${theme.isDark ? "bg-[#0c2420] text-emerald-305 border-emerald-950/40" : "bg-slate-100 text-slate-600 border-slate-200/40"} font-space-mono text-[8px] border`}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* EDITORIAL NARRATIVE PROSE */}
        <article className="flex flex-col gap-8 text-left">
          
          {/* Overview */}
          <div className="flex flex-col gap-3">
            <h2 className={`font-sans font-bold text-xs uppercase tracking-[0.2em] ${theme.isDark ? "text-slate-500" : "text-slate-400"} flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
              01 / OVERVIEW
            </h2>
            <p className={`${theme.bodyFont} text-lg antialiased`}>
              {project.overview}
            </p>
          </div>

          {/* Challenge */}
          <div className="flex flex-col gap-3">
            <h2 className={`font-sans font-bold text-xs uppercase tracking-[0.2em] ${theme.isDark ? "text-slate-500" : "text-slate-400"} flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
              02 / THE CHALLENGE
            </h2>
            <p className={`${theme.bodyFont} text-lg antialiased`}>
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="flex flex-col gap-3">
            <h2 className={`font-sans font-bold text-xs uppercase tracking-[0.2em] ${theme.isDark ? "text-slate-500" : "text-slate-400"} flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
              03 / THE SOLUTION
            </h2>
            <p className={`${theme.bodyFont} text-lg antialiased`}>
              {project.solution}
            </p>
          </div>

        </article>

        {/* SCREENSHOT / EVIDENCE GALLERY SHOWCASE */}
        {project.gallery && project.gallery.length > 0 && currentSlide && (
          <div className={`flex flex-col gap-4 border-t ${theme.isDark ? "border-white/10" : "border-slate-200"} pt-10 mt-2`}>
            <div className="flex flex-col text-left gap-1">
              <h2 className={`font-sans font-bold text-xs uppercase tracking-[0.2em] ${theme.isDark ? "text-slate-500" : "text-slate-400"} flex items-center gap-2`}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                04 / GALLERY & METRICS
              </h2>
              <p className={`text-xs ${theme.isDark ? "text-slate-500" : "text-slate-550"} font-sans`}>Click on the tabs below to switch viewports.</p>
            </div>

            {/* Gallery viewport Frame */}
            <div className={`w-full rounded-2xl border ${theme.isDark ? "border-white/5 bg-black/60 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" : "border-slate-200 bg-white shadow-[0_4px_30px_rgba(0,0,0,0.02)]"} p-3 flex flex-col gap-3`}>
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
                <h3 className={`font-sans font-bold text-sm ${theme.isDark ? "text-white" : "text-slate-900"}`}>{currentSlide.title}</h3>
                <p className={`text-xs ${theme.isDark ? "text-slate-400" : "text-slate-500"} leading-relaxed max-w-2xl`}>{currentSlide.desc}</p>
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
                      ? theme.isDark ? "bg-[#ECE5DA] text-black border-[#ECE5DA]" : "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : theme.isDark ? "bg-black/60 text-slate-400 border-white/5 hover:border-white/20" : "bg-white text-slate-500 border-slate-200 hover:border-slate-350 hover:text-slate-700"
                  }`}
                >
                  {slide.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* DETAILED TECH STACK CARDS */}
        <div className={`flex flex-col gap-6 border-t ${theme.isDark ? "border-white/10" : "border-slate-200"} pt-10`}>
          <h2 className={`font-sans font-bold text-xs uppercase tracking-[0.2em] ${theme.isDark ? "text-slate-500" : "text-slate-400"} text-left flex items-center gap-2`}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
            05 / SYSTEM COMPOSITION
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {project.techStack.map((tech) => (
              <div 
                key={tech.name} 
                className={`${theme.cardBg} border ${theme.isDark ? "border-white/5 hover:border-white/15" : "border-slate-200 hover:border-slate-350"} p-5 rounded-xl text-left flex flex-col gap-2 transition-all duration-300 shadow-xs hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-sans font-bold text-sm ${theme.isDark ? "text-white" : "text-slate-800"} uppercase tracking-wide`}>{tech.name}</span>
                  <Code className={`w-3.5 h-3.5 ${theme.isDark ? "text-slate-700" : "text-slate-300"}`} />
                </div>
                <p className={`text-xs ${theme.isDark ? "text-slate-400" : "text-slate-500"} leading-relaxed font-sans font-medium`}>{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PREMIUM ACTION LINKS SECTION */}
        <div className={`flex flex-col gap-6 border-t ${theme.isDark ? "border-white/10" : "border-slate-200"} pt-10`}>
          <h2 className={`font-sans font-bold text-xs uppercase tracking-[0.2em] ${theme.isDark ? "text-slate-500" : "text-slate-400"} text-left flex items-center gap-2`}>
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
                className={`inline-flex items-center gap-2 px-5 py-3 border ${
                  theme.isDark 
                    ? "border-white/10 bg-black/60 text-slate-300 hover:text-white hover:border-[#ECE5DA]" 
                    : "border-slate-200 bg-white hover:border-slate-800 text-slate-700 hover:text-slate-900"
                } rounded-xl transition-all duration-300 shadow-xs hover:shadow-md font-space-mono text-xs tracking-wider`}
              >
                <SiGithub className="w-4 h-4 text-slate-500" /> GitHub Repository
              </a>
            ) : (
              <button 
                disabled
                className={`inline-flex items-center gap-2 px-5 py-3 border ${
                  theme.isDark 
                    ? "border-white/5 bg-black/40 text-slate-600" 
                    : "border-slate-200 bg-slate-50 text-slate-400"
                } rounded-xl font-space-mono text-xs tracking-wider cursor-not-allowed opacity-70 group relative`}
              >
                <Lock className={`w-3.5 h-3.5 ${theme.isDark ? "text-slate-700" : "text-slate-300"}`} /> GitHub Repo 
                <span className="ml-1 px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-500 text-[8px] font-black tracking-widest uppercase">SOON</span>
              </button>
            )}

            {/* Live Demo Link */}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-3 border ${
                  theme.isDark 
                    ? "border-white/10 bg-black/60 text-slate-300 hover:text-white hover:border-[#ECE5DA]" 
                    : "border-slate-200 bg-white hover:border-slate-800 text-slate-700 hover:text-slate-900"
                } rounded-xl transition-all duration-300 shadow-xs hover:shadow-md font-space-mono text-xs tracking-wider`}
              >
                <Globe className="w-4 h-4 text-slate-500" /> Live Prototype <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            ) : (
              <button 
                disabled
                className={`inline-flex items-center gap-2 px-5 py-3 border ${
                  theme.isDark 
                    ? "border-white/5 bg-black/40 text-slate-600" 
                    : "border-slate-200 bg-slate-50 text-slate-400"
                } rounded-xl font-space-mono text-xs tracking-wider cursor-not-allowed opacity-70 group`}
              >
                <Globe className={`w-3.5 h-3.5 ${theme.isDark ? "text-slate-700" : "text-slate-300"}`} /> Live Demo 
                <span className="ml-1 px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-500 text-[8px] font-black tracking-widest uppercase">SOON</span>
              </button>
            )}

            {/* Technical Documentation Link */}
            {project.docs ? (
              <a
                href={project.docs}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-3 border ${
                  theme.isDark 
                    ? "border-white/10 bg-black/60 text-slate-300 hover:text-white hover:border-[#ECE5DA]" 
                    : "border-slate-200 bg-white hover:border-slate-800 text-slate-700 hover:text-slate-900"
                } rounded-xl transition-all duration-300 shadow-xs hover:shadow-md font-space-mono text-xs tracking-wider`}
              >
                <FileText className="w-4 h-4 text-slate-500" /> Documentation <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            ) : (
              <button 
                disabled
                className={`inline-flex items-center gap-2 px-5 py-3 border ${
                  theme.isDark 
                    ? "border-white/5 bg-black/40 text-slate-600" 
                    : "border-slate-200 bg-slate-50 text-slate-400"
                } rounded-xl font-space-mono text-xs tracking-wider cursor-not-allowed opacity-70 group`}
              >
                <FileText className={`w-3.5 h-3.5 ${theme.isDark ? "text-slate-700" : "text-slate-300"}`} /> Technical Docs 
                <span className="ml-1 px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-500 text-[8px] font-black tracking-widest uppercase">SOON</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
