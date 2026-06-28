"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ExternalLink, 
  Globe, 
  Code, 
  Lock, 
  FileText,
  Shield,
  Activity,
  Layers,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { SiGithub } from "react-icons/si";

// ==========================================
// Highly Detailed Projects Case Studies Database
// ==========================================

const projectsDetails = {
  "skysentry-ai": {
    name: "SkySentry AI",
    tagline: "AI-Powered Computer Vision for False Alert Reduction in Aerial Surveillance.",
    description: "An intelligent visual verification engine optimized to classify flying objects and eliminate ambient noise in security feeds.",
    status: "COMPLETED",
    color: "#22C55E",
    timeline: "2026 Hackachino 4.0",
    role: "Lead Machine Learning Engineer",
    context: "Research Project at Bennett University",
    tags: ["Computer Vision", "YOLOv10", "PyTorch", "OpenCV"],
    overview: "SkySentry AI was designed to solve a critical limitation in modern automated aerial defense: traditional radar and motion detection feeds trigger massive volumes of false alarms. Security systems frequently misclassify birds, clouds, tree shadows, and ambient noise as threats, causing operator alert fatigue. This project establishes an intelligent visual verification layer that operates alongside existing radar infrastructure, verifying radar-flagged targets using state-of-the-art computer vision models.",
    challenge: "Developing a visual verification pipeline that processes real-time low-altitude video streams with near-zero latency while maintaining high precision. Small drones have an extremely low radar cross-section, making them hard to distinguish from birds in varying weather conditions. Standard heavy object detection architectures fail to run on consumer-grade edge devices at the necessary frame rate of over 45 frames per second.",
    solution: "We trained and deployed YOLOv10, a state-of-the-art object detector that eliminates non-maximum suppression latency during inference. The model was trained on a custom dataset containing over 12,000 annotated aerial frames of UAVs, aircraft, birds, and weather artifacts. To guarantee stable target retention, we integrated an OpenCV-based tracking algorithm. This combination filters out environmental disturbances, maintaining a validated target lock even if the object is briefly obscured.",
    howWeMadeIt: "The visual verification system was constructed using a Java Spring Boot backend for the core APIs, communicating via REST and WebSockets for real-time dashboard updates. The Python AI module runs YOLOv10 and OpenCV for frame preprocessing, keeping inference times under 15ms on an NVIDIA RTX GPU. Detections are logged in a MySQL database containing details like target type, confidence score, time, camera location, and a snapshot. The frontend is built with HTML, CSS, and vanilla JS, styled with a high-fidelity cyber-defense look, featuring real-time radar panels and threat tables.",
    theme: {
      bg: "bg-[#050C0A]",
      text: "text-[#ECE5DA]",
      subtext: "text-emerald-300/60",
      border: "border-emerald-950/60",
      cardBg: "bg-[#0A1A17]/85",
      badge: "bg-emerald-950/40 text-emerald-400 border-emerald-800/30",
      titleFont: "font-serif font-black tracking-tight",
      bodyFont: "font-sans text-[#D4CBBF] text-[15px] leading-relaxed font-light",
      accentColor: "#22C55E",
      isDark: true
    },
    techStack: [
      { name: "YOLOv10 AI Model", desc: "Real-time object detector optimized for zero NMS latency during inference." },
      { name: "OpenCV Pipeline", desc: "Handles video feed streaming, frame preprocessing, and tracking." },
      { name: "PyTorch Framework", desc: "Used for hyperparameter tuning, model training, and performance validation." },
      { name: "Python Scripts", desc: "Inference wrappers, dataset annotation converters, and benchmark logs." }
    ],
    gallery: [
      {
        title: "Detection Interface Mockup",
        desc: "YOLOv10 model overlay classifying an incoming drone with high confidence and tracking indices.",
        type: "vector",
        render: () => (
          <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden rounded-xl border border-green-500/20 font-space-mono text-green-400">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div className="absolute top-4 left-4 text-[9px] uppercase tracking-wider text-green-500/60">CAMERA STREAM // LINK ACTIVE</div>
            <div className="w-3/4 h-2/3 border border-green-500/30 rounded relative flex items-center justify-center bg-black/40">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-green-500/10 flex items-center justify-center animate-pulse">
                  <div className="w-32 h-32 rounded-full border border-green-500/10" />
                </div>
              </div>
              <div className="absolute top-10 left-16 border-2 border-green-500 w-28 h-20">
                <span className="absolute -top-5 left-0 bg-green-500 text-black text-[8px] px-1 py-0.5 font-bold">DRONE: 94.2%</span>
                <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white" />
                <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white" />
              </div>
              <span className="text-[10px] text-green-500/40 uppercase">VISUAL VERIFICATION LAYER</span>
            </div>
            <div className="mt-4 text-[9px] text-center max-w-sm">TARGET LOCK ACQUIRED // 48.7 FPS // SECURE FEED</div>
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
    color: "#F59E0B",
    timeline: "2025 Semester 1",
    role: "Transcoding & Bit Manipulation Engineer",
    context: "Cybersecurity Development at Bennett University",
    tags: ["Audio Steganography", "Least Significant Bit", "Python Flask", "FFmpeg"],
    overview: "Echoes Within is an advanced steganography application designed to facilitate covert digital communication. The system allows users to securely embed secret text messages within standard audio files without producing noticeable distortion. Unlike encryption, which translates text into unreadable strings and invites investigation, steganography conceals the presence of the data, transmitting hidden signals invisibly.",
    challenge: "Audio compression formats like MP3 compress files lossily, making bit-level modifications unstable. While WAV files preserve PCM sample arrays, converting compressed MP3s to WAV streams and modifying bits without altering audio quality or introducing noise remains a complex challenge. The system also requires a clean, robust delimiter to signal the exact termination of the message.",
    solution: "We constructed a Flask backend integrated with PyDub and FFmpeg. When an MP3 is uploaded, it is automatically transcoded into a WAV file. The steganography engine converts the text message into binary, replacing the least significant bit of each audio sample with a message bit. A custom binary terminating signature is appended to signal the end of the text. The decoder reverses this process, reading bits and reconstructing the text until the terminator sequence is resolved.",
    howWeMadeIt: "The project was built by team Devil Coders using Next.js and TypeScript on the frontend to provide a premium cybersecurity dashboard styled with soft green glows and typewriter reveal effects. The backend is a Python Flask server. Savyam Shukla led the core LSB manipulation scripts; Aryan Chauhan designed the transcoding backend using PyDub and FFmpeg; Harsh managed frontend navigation; Zaman handled the file upload routing; and Shaurya set up error handling and decrypted message reveals.",
    theme: {
      bg: "bg-[#030303]",
      text: "text-[#F4EFE6]",
      subtext: "text-[#FFC80A]",
      border: "border-[#1A1A1C]",
      cardBg: "bg-[#0C0C0D]/90 backdrop-blur-md",
      badge: "bg-amber-950/40 text-[#FFC80A] border-amber-800/20",
      titleFont: "font-serif font-black tracking-tight",
      bodyFont: "font-sans text-[#E4E4E7] text-[15px] leading-relaxed font-light",
      accentColor: "#FFC80A",
      isDark: true
    },
    techStack: [
      { name: "Python Flask", desc: "Coordinates file upload endpoints, transcoding requests, and steganography functions." },
      { name: "PyDub & FFmpeg", desc: "Transcodes incoming audio files and writes uncompressed WAV audio buffers." },
      { name: "Bitwise Modifiers", desc: "Modifies the least significant bits of audio PCM samples sequentially." },
      { name: "Next.js & TypeScript", desc: "A clean dashboard interface with typewriter-reveal animations for decrypted messages." }
    ],
    gallery: [
      {
        title: "Echos App Interface & Concept Mockup",
        desc: "Interactive view of Echos application flow showing the Encoder, Encoding Complete, Decoder, and Decoded Message screens using advanced Least Significant Bit steganography.",
        type: "image",
        url: "/echos-showcase.jpg",
        aspect: "aspect-[16/10]"
      },
      {
        title: "Team Structure & Role Allocations",
        desc: "Role division: Savyam Shukla (LSB logic), Aryan Chauhan (FFmpeg backend transcoding), Harsh (UI routing), Zaman (Encode uploads), Shaurya (Decode reveal).",
        type: "vector",
        render: () => (
          <div className="w-full h-full bg-[#050D0A] flex flex-col items-center justify-center p-6 relative rounded-xl border border-amber-500/20 font-space-mono text-amber-600">
            <div className="absolute top-4 left-4 text-[8px] uppercase tracking-wider text-amber-500/50">SYS-TEAM // DEVIL CODERS</div>
            <div className="w-full grid grid-cols-2 gap-3 mt-4 text-[9px]">
              <div className="border border-amber-100 p-2 rounded bg-white">
                <span className="block font-bold">Savyam Shukla</span>
                <span className="text-[7.5px] text-slate-500">Core LSB Logic</span>
              </div>
              <div className="border border-amber-100 p-2 rounded bg-white">
                <span className="block font-bold text-amber-650">Aryan Chauhan</span>
                <span className="text-[7.5px] text-amber-800">Transcoding Backend</span>
              </div>
              <div className="border border-amber-100 p-2 rounded bg-white">
                <span className="block font-bold">Harsh</span>
                <span className="text-[7.5px] text-slate-500">Frontend Navigation</span>
              </div>
              <div className="border border-amber-100 p-2 rounded bg-white">
                <span className="block font-bold">Zaman & Shaurya</span>
                <span className="text-[7.5px] text-slate-500">Backend Routes</span>
              </div>
            </div>
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
    timeline: "2025 September SIH",
    role: "Backend Architect & Localization Lead",
    context: "Smart India Hackathon Internal Rounds",
    tags: ["Recommendation Engine", "Algorithms", "Multilingual", "Database"],
    overview: "Intern-Ease was designed by team Hack Houdini for the Smart India Hackathon internal rounds. The platform serves as a modern internship search portal under the PM Internship Scheme, matching student profiles to listings based on location, academic specializations, and skills using a custom point-based ranking algorithm.",
    challenge: "Students often struggle to filter through thousands of internship listings to find relevant placements near them. Moreover, regional language barriers prevent candidates from rural areas from easily understanding national scheme listings.",
    solution: "We created a localized student portal supporting 5 languages: English, Hindi, Bangla, Tamil, and Telugu. On the backend, we engineered a point-based recommendation algorithm that ranks internships based on proximity coordinates and qualification profiles, returning a relevant opportunities feed.",
    howWeMadeIt: "The system was built during the hackathon using Python and Flask for the recommendation engine. The student frontend was developed by Nandini Mishra and Samriddhi Vishnoi. The backend matching algorithms and multi-lingual route logic were built by Prithul Jaiswal, Savyam Shukla, and Aryan Chauhan. Krishna Chaitanya managed the database schema and query connections. The team collaborated to structure these ideas into a real-world prototype.",
    theme: {
      bg: "bg-[#030712]",
      text: "text-[#F1F5F9]",
      subtext: "text-[#93C5FD]",
      border: "border-[#1E293B]/60",
      cardBg: "bg-[#0B1528]/85 backdrop-blur-md",
      badge: "bg-blue-950/60 text-blue-300 border-blue-800/30",
      titleFont: "font-serif font-black tracking-tight",
      bodyFont: "font-sans text-[#CBD5E1] text-[15px] leading-relaxed font-light",
      accentColor: "#3B82F6",
      isDark: true
    },
    techStack: [
      { name: "Backend Routes", desc: "Constructed Python Flask endpoints to evaluate user profiles and match locations." },
      { name: "Localization Engine", desc: "Integrated interface assets localized into Hindi, Bangla, Tamil, and Telugu." },
      { name: "Point Scoring Logic", desc: "Custom script matching qualification tags and distance calculations." },
      { name: "Database Schema", desc: "SQLite database connections handled by Krishna Chaitanya for query execution." }
    ],
    gallery: [
      {
        title: "Hack Houdini Team Structure",
        desc: "Frontend: Nandini Mishra, Samriddhi Vishnoi. Backend: Prithul Jaiswal, Savyam Shukla, Aryan Chauhan. Database: Krishna Chaitanya.",
        type: "vector",
        render: () => (
          <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 relative rounded-xl border border-blue-500/20 font-space-mono text-blue-400">
            <div className="absolute top-4 left-4 text-[8px] uppercase tracking-wider text-blue-400/50">HACK HOUDINI TEAM</div>
            <div className="w-5/6 flex flex-col gap-2 mt-4 text-[9px]">
              <div className="border border-blue-900/40 p-2 rounded flex justify-between bg-black/40">
                <span>Frontend UI</span>
                <span className="text-blue-400/80">Nandini & Samriddhi</span>
              </div>
              <div className="border border-blue-900/40 p-2 rounded flex justify-between bg-black/40">
                <span>Backend Systems</span>
                <span className="text-blue-400/80">Prithul, Savyam, Aryan</span>
              </div>
              <div className="border border-blue-900/40 p-2 rounded flex justify-between bg-black/40">
                <span>Database Relations</span>
                <span className="text-blue-400/80">Krishna Chaitanya</span>
              </div>
            </div>
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
    color: "#F97316",
    timeline: "2026 Semester 2",
    role: "Game Loop & Optimization Developer",
    context: "Mobile Game Project",
    tags: ["Java", "Android Studio", "SurfaceView", "Trigonometry"],
    overview: "Bubble Blast is a high-speed 2D arcade game built specifically for the Android OS. The player directs a bottom-aligned cannon by dragging on the screen. The physics engine uses trigonometric coordinates to direct ammunition towards target bubbles descending from the top of the canvas.",
    challenge: "Rendering hundreds of moving entities (bubbles, custom ammunition, trail smoke, and shards) on standard mobile devices without dropping frames or triggering execution spikes.",
    solution: "We established a dedicated game loop thread that draws directly onto an Android SurfaceView canvas. By implementing pre-allocated objects in memory pools, we avoided garbage collector latency. Projectile vectors are calculated in real time using trigonometric functions, supporting standard Bullets, Grenades with explosive splash damage, Missiles with trail particles, and an expanding shockwave Pulsar.",
    howWeMadeIt: "The project was written in Java in Android Studio using modular class design (game engine, collision detectors, weapon classes, particle handlers, and game objects). Collision is resolved using high-efficiency Euclidean distance calculations, allowing the system to run smoothly at 60 FPS even with 400+ active elements on screen. Sound effects, health tracking, and increasing difficulty over time are integrated.",
    theme: {
      bg: "bg-[#0B0806]",
      text: "text-[#ECE5DA]",
      subtext: "text-[#E2A87C]",
      border: "border-[#3B2314]/50",
      cardBg: "bg-[#1A1410]/80 backdrop-blur-md",
      badge: "bg-orange-950/50 text-orange-300 border-orange-800/30",
      titleFont: "font-serif font-black tracking-tight",
      bodyFont: "font-sans text-[#E5DCD3] text-[15px] leading-relaxed font-light",
      accentColor: "#F97316",
      isDark: true
    },
    techStack: [
      { name: "Android SurfaceView", desc: "Coordinates low-level drawing buffers directly to screen canvases." },
      { name: "Game Loop Thread", desc: "Coordinates frame rates and physics ticks independently of UI threads." },
      { name: "Euclidean Calculations", desc: "Determines coordinates for overlaps, projectile hits, and explosion boundaries." },
      { name: "Particle Shards", desc: "Custom vectors representing trailing smoke and circular shockwave outlines." }
    ],
    gallery: [
      {
        title: "Bubble Blast Gameplay Showcase",
        desc: "Screenshot of the Bubble Blast Android interface showing aim assist rendering vectors, bubble grid layout, level metrics, and weapon selections.",
        type: "image",
        url: "/bubble-blast-showcase.jpg",
        aspect: "aspect-[2/3]"
      }
    ],
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
    timeline: "2026 Summer Break May",
    role: "Creator & Architect",
    context: "Personal Creative Hub",
    tags: ["Next.js 16", "Three.js", "GSAP", "Tailwind CSS"],
    overview: "AryanVerse is an immersive digital space designed to showcase projects, skills, and timeline landmarks in a solar-system style galaxy. Visitors travel through planetary chambers, experiencing interactive WebGL environments combined with high-contrast text views.",
    challenge: "Integrating WebGL scenes with traditional Next.js routes can cause memory leaks and slow transitions. Standard animation libraries struggle to coordinate Three.js cameras with DOM scrolling.",
    solution: "We designed a unified state controller that links the Three.js canvas with Next.js page state. Transitioning between routes triggers a GSAP timeline that interpolates the 3D camera coordinates, zooming into a chosen planet and displaying case details as the camera arrives.",
    howWeMadeIt: "The landing universe scene is built using React Three Fiber and Three.js running inside Next.js. We developed custom shaders for planetary atmospheres and wrote GSAP transition paths that interpolate WebGL camera parameters and link them to Next.js page mounts.",
    theme: {
      bg: "bg-[#0D031A]",
      text: "text-[#F5EEFD]",
      subtext: "text-[#C084FC]",
      border: "border-[#3B1D5F]/50",
      cardBg: "bg-[#1E0D36]/80 backdrop-blur-md",
      badge: "bg-purple-950/50 text-purple-300 border-purple-800/30",
      titleFont: "font-serif italic font-bold tracking-tight",
      bodyFont: "font-sans text-[#ECE5FA] text-[15px] leading-relaxed font-light",
      accentColor: "#A855F7",
      isDark: true
    },
    techStack: [
      { name: "Next.js App Router", desc: "Coordinates routing parameters and static page generations." },
      { name: "Three.js WebGL", desc: "Coordinates planetary coordinate spaces, meshes, and shader lighting." },
      { name: "GSAP Timelines", desc: "Coordinates smooth camera transitions and text fade-in sequences." },
      { name: "Tailwind Styling", desc: "Coordinates responsive grid cards and clean glassmorphism indicators." }
    ],
    gallery: [
      {
        title: "AryanVerse Universe Map",
        desc: "Interactive universe entry portal showing the central planetary node (Welcome chamber) and surrounding celestial orbit grids.",
        type: "image",
        url: "/aryanverse-showcase.png",
        aspect: "aspect-[1005/472]"
      },
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
    color: "#059669",
    timeline: "2025 (Planned)",
    role: "Founder & Strategic Director",
    context: "Conceptual Startup Plan",
    tags: ["Product Curation", "Branding Strategy", "Lifestyle Tech"],
    overview: "LyfChanger is a youth-driven lifestyle brand concept designed to support personal self-improvement. The model bridges a dedicated mindfulness tracking application with premium physical merchandise, helping students, creators, and entrepreneurs establish healthy habits.",
    challenge: "Formulating a distinct value proposition in the self-improvement space, and structuring custom manufacturing pipelines for organic textiles.",
    solution: "The startup plan relies on limited-run custom merchandise drops paired with digital application challenges. The application acts as a portal, where users complete habit challenges that correspond with their physical wellness gear.",
    howWeMadeIt: "The platform is designed around a dual physical-digital ecosystem. The branding and visual identity focus on high-aesthetic minimalist designs. We structured the startup plan around drop models, e-commerce networks, and a community hub, serving as a blueprint for a modern creator-focused lifestyle brand.",
    theme: {
      bg: "bg-[#F0FDF4]",
      text: "text-[#155E75]",
      subtext: "text-[#0891B2]",
      border: "border-[#CCFBF1]/70",
      cardBg: "bg-white",
      badge: "bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]",
      titleFont: "font-serif font-black tracking-tight",
      bodyFont: "font-sans text-[#155E75] text-[15px] leading-relaxed",
      accentColor: "#059669",
      isDark: false
    },
    techStack: [
      { name: "Brand Curation", desc: "Designing premium visual outlines and color guidelines for physical items." },
      { name: "Supply Chain Strategy", desc: "Structuring relation maps for organic cotton mills and sustainable containers." },
      { name: "Ecosystem Design", desc: "Modeling a platform connecting physical clothing assets with digital analytics." }
    ],
    gallery: []
  },
  "cafe-marketing": {
    name: "Local Cafe Web & Marketing Service",
    tagline: "Web Development and Brand Placement in Greater Noida.",
    description: "An unnamed business venture managing digital assets for local Greater Noida restaurants, directing junior developers.",
    status: "COMPLETED",
    color: "#FF8F00",
    timeline: "2024",
    role: "Founder & Team Leader",
    context: "High School Business Venture",
    tags: ["Project Management", "Web Dev", "Marketing Retainers"],
    overview: "This business was a local web design and marketing service started during Class 11. Our team pitched local cafes in Greater Noida, establishing custom web pages and managing social media accounts.",
    challenge: "Securing contracts, delivering clean websites under tight high school schedules, and leading a team of junior developers.",
    solution: "I managed client contracts and coordinated operations, assigning development pipelines to junior developers. We designed responsive promotional templates and established content schedules for client Instagram pages, building early experience in project management.",
    howWeMadeIt: "The landing pages were built using HTML, CSS, and basic JavaScript. I set up organic campaign calendars on Instagram to drive traffic to the cafes. By organizing features among junior developers, I practiced team leadership, delegation, and sales negotiation.",
    theme: {
      bg: "bg-[#FAF9F5]",
      text: "text-stone-900",
      subtext: "text-stone-500",
      border: "border-stone-250/70",
      cardBg: "bg-white",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      titleFont: "font-serif font-bold tracking-tight",
      bodyFont: "font-sans text-stone-700 text-[15px] leading-relaxed",
      accentColor: "#FF8F00",
      isDark: false
    },
    techStack: [
      { name: "Project Management", desc: "Coordinating schedules, client reviews, and milestones for junior developers." },
      { name: "Web Development", desc: "Responsive layouts built using HTML and CSS for restaurant pages." },
      { name: "Brand Marketing", desc: "Setting up organic campaign calendars and targeting local Greater Noida students." }
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
    timeline: "2024",
    role: "Author and Creative Writer",
    context: "Personal Novel Project",
    tags: ["Creative Writing", "Novel Outline", "Storytelling", "Editorial"],
    overview: "Unscripted Love is a contemporary novel exploring the emotional balance between ambition and the unplanned nature of human connections. The writing prioritizes realistic dialogues, character growth, and vulnerable internal monologues.",
    challenge: "Structuring character growth arcs that maintain pacing while preserving character depth in an interactive online presentation format.",
    solution: "I designed a chapter outline that maps character shifts to the Hero's Journey schema. To present the novel online, I created an editorial layout focusing on serif typography, wide margins, and clean reading cards.",
    howWeMadeIt: "The novel is drafted and edited in Google Docs, using version histories to track character drafts. We mapped external events to internal psychological shifts using the Hero's Journey schema, exporting selected snippets to web editorial layouts.",
    theme: {
      bg: "bg-[#1E0808]",
      text: "text-[#F5EFEB]",
      subtext: "text-[#C2A99B]",
      border: "border-[#4C1C1C]/50",
      cardBg: "bg-[#2D0F0F]/80 backdrop-blur-md",
      badge: "bg-red-950/50 text-red-300 border-red-800/30",
      titleFont: "font-serif italic font-black tracking-tight",
      bodyFont: "font-serif text-[#ECE5DA] text-[15px] leading-loose",
      accentColor: "#EF4444",
      isDark: true
    },
    techStack: [
      { name: "Creative Writing", desc: "Character development, narrative pacing, and deep thematic structure." },
      { name: "Manuscript Tools", desc: "Draft tracking, editing loops, and version control." },
      { name: "Web Editorial", desc: "Formatting prose for online readability with high-contrast serif layouts." }
    ],
    gallery: [
      {
        title: "Official Book Cover Mockup",
        desc: "3D representation of the physical book cover design for Unscripted Love featuring luxury gold frames, author branding, and release schedule.",
        type: "vector",
        render: () => (
          <div className="w-full h-full bg-[#150505] flex flex-col items-center justify-center p-6 relative rounded-xl border border-red-950/40 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            {/* 3D Book Cover Container */}
            <div className="relative w-44 h-64 shadow-[0_15px_35px_rgba(0,0,0,0.7)] rounded-r-md overflow-hidden bg-gradient-to-r from-[#200508] via-[#4D0A14] to-[#36060C] border-y border-r border-[#6B1824]/30 flex flex-col justify-between p-5 text-center group cursor-pointer transition-transform duration-300 hover:scale-[1.03]">
              
              {/* Spine highlight */}
              <div className="absolute top-0 left-0 w-3.5 h-full bg-gradient-to-r from-black/50 via-white/10 to-transparent border-r border-black/35" />
              
              {/* Double Gold Borders */}
              <div className="absolute inset-1.5 border border-[#D4AF37]/30 rounded pointer-events-none" />
              <div className="absolute inset-2 border-2 border-[#D4AF37]/10 rounded pointer-events-none" />

              {/* Cover Headers */}
              <div className="flex flex-col gap-2 mt-4 relative z-10">
                <span className="font-sans text-[7.5px] uppercase tracking-[0.25em] text-[#D4AF37]/80 font-bold">A Contemporary Novel</span>
                <h3 className="font-serif italic text-2xl font-black text-[#F5EFEB] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  Unscripted Love
                </h3>
              </div>

              {/* Cover Footer & Release Date */}
              <div className="flex flex-col gap-2 mb-3 relative z-10">
                <div className="w-8 h-[1px] bg-[#D4AF37]/30 mx-auto" />
                <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#C2A99B] font-semibold">Aryan Chauhan</span>
                
                <div className="mt-4 px-2 py-1 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded backdrop-blur-xs">
                  <span className="block font-sans text-[7px] uppercase tracking-wider text-[#D4AF37]/80 font-bold">COMING</span>
                  <span className="block font-sans text-[8.5px] font-black text-white tracking-widest uppercase mt-0.5">12 SEP 2027</span>
                </div>
              </div>

            </div>
          </div>
        )
      },
      {
        title: "Novel Manuscript Outline",
        desc: "Chapter structures and thematic notes representing emotional tone changes.",
        type: "vector",
        render: () => (
          <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 relative rounded-xl border border-red-500/20 font-space-mono text-red-400">
            <div className="absolute top-4 left-4 text-[8px] uppercase tracking-wider text-red-500/50">BOOK LOG</div>
            <div className="w-5/6 flex flex-col gap-2 mt-4 text-[9px]">
              <div className="border border-red-500/30 p-2 rounded flex justify-between bg-black/40">
                <span>Chapter 1: The Intersection</span>
                <span className="text-red-500/60">Introduction</span>
              </div>
              <div className="border border-red-500/30 p-2 rounded flex justify-between bg-black/40">
                <span>Chapter 2: Scripted Lies</span>
                <span className="text-red-500/60">Rising Tension</span>
              </div>
              <div className="border border-red-500/30 p-2 rounded flex justify-between bg-black/40 animate-pulse">
                <span>Chapter 3: The Unscripted Choice</span>
                <span className="text-white bg-red-600 px-1.5 py-0.5 text-[7px] rounded">WRITING</span>
              </div>
            </div>
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
      
      {/* 1. Header Navigation - Wide Spacing */}
      <div className="w-full max-w-7xl px-8 md:px-12 pt-10 pb-6 flex justify-between items-center relative z-20">
        <Link
          href="/projects"
          className={`flex items-center gap-2 px-5 py-2.5 border ${
            theme.isDark 
              ? "border-white/10 bg-black/60 text-slate-300 hover:text-white hover:border-[#ECE5DA]" 
              : "border-slate-200/80 bg-white/90 text-slate-600 hover:text-slate-900 hover:border-slate-350"
          } hover:shadow-xs transition-all duration-300 rounded-xl font-space-mono text-xs tracking-wider cursor-pointer group`}
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-200 text-[13px]">←</span> Back to Lab
        </Link>
        <div className={`flex items-center gap-2 font-space-mono text-[9px] uppercase tracking-[0.2em] ${theme.isDark ? "text-slate-500" : "text-slate-400"} font-bold`}>
          <span className={`w-1.5 h-1.5 rounded-full ${theme.isDark ? "bg-slate-700" : "bg-slate-300"}`} />
          Case Study // {slug}
        </div>
      </div>

      {/* 2. Hero Section - Full Page Split Grid */}
      <div className="w-full max-w-7xl px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-6 relative z-10">
        
        {/* Left Side: Title and Tags */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-[9px] font-space-mono tracking-wider font-extrabold uppercase border ${theme.badge}`}>
              {project.status}
            </span>
            <span className={`text-[10px] ${theme.isDark ? "text-slate-500" : "text-slate-400"} font-space-mono`}>{project.timeline}</span>
          </div>

          <h1 className={`${theme.titleFont} text-5xl sm:text-6xl md:text-7xl font-bold ${theme.isDark ? "text-white" : "text-[#1F2022]"} tracking-tight leading-none`}>
            {project.name}
          </h1>

          <p className={`font-sans text-lg md:text-xl ${theme.isDark ? "text-[#D4CBBF] border-emerald-950/60" : "text-slate-650 border-slate-200"} font-medium leading-relaxed max-w-2xl border-l-4 pl-5 py-1 italic`}>
            {project.tagline}
          </p>

          {/* Quick Metrics grid */}
          <div className={`grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4 border-t ${theme.isDark ? "border-white/10" : "border-slate-200"} pt-6`}>
            <div>
              <span className={`block font-space-mono text-[8px] ${theme.isDark ? "text-slate-500" : "text-slate-400"} uppercase tracking-widest font-black mb-1`}>ROLE</span>
              <span className={`font-sans text-sm font-semibold ${theme.isDark ? "text-slate-300" : "text-slate-700"}`}>{project.role}</span>
            </div>
            <div>
              <span className={`block font-space-mono text-[8px] ${theme.isDark ? "text-slate-500" : "text-slate-400"} uppercase tracking-widest font-black mb-1`}>CONTEXT</span>
              <span className={`font-sans text-sm font-semibold ${theme.isDark ? "text-slate-300" : "text-slate-700"} truncate block`}>{project.context}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className={`block font-space-mono text-[8px] ${theme.isDark ? "text-slate-500" : "text-slate-400"} uppercase tracking-widest font-black mb-1`}>TECH STACK</span>
              <div className="flex flex-wrap gap-1 mt-0.5">
                {project.tags.slice(0, 2).map((t) => (
                  <span key={t} className={`px-2 py-0.5 rounded ${theme.isDark ? "bg-[#0c2420] text-emerald-305 border-emerald-950/40" : "bg-slate-100 text-slate-600 border-slate-200/40"} font-space-mono text-[8px] border`}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Massive Graphics Preview */}
        <div className="lg:col-span-5 w-full flex items-center justify-center">
          {project.gallery && project.gallery.length > 0 && currentSlide ? (
            <div className={`w-full rounded-2xl border ${theme.isDark ? "border-white/5 bg-black/60 shadow-[0_10px_40px_rgba(0,0,0,0.5)]" : "border-slate-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]"} p-3 flex flex-col gap-3`}>
              <div className={`w-full ${currentSlide.aspect || "aspect-[4/3]"} rounded-xl overflow-hidden relative bg-slate-950 border border-slate-100/50 flex items-center justify-center`}>
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
                <p className={`text-xs ${theme.isDark ? "text-slate-400" : "text-slate-500"} leading-relaxed`}>{currentSlide.desc}</p>
              </div>
            </div>
          ) : (
            <div className={`w-full aspect-[4/3] rounded-2xl relative overflow-hidden border ${theme.isDark ? "border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.5)]" : "border-slate-200/80 shadow-[0_10px_40px_rgba(0,0,0,0.03)]"} flex items-center justify-center`}>
              <div 
                className="absolute inset-0 opacity-40 blur-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${project.color}35, transparent 75%)`
                }}
              />
              <div className={`absolute inset-0 ${theme.isDark ? "bg-gradient-to-tr from-neutral-950 via-transparent to-neutral-900" : "bg-gradient-to-tr from-slate-100 via-transparent to-slate-50"} opacity-80`} />
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              <div 
                className="w-24 h-24 rounded-full filter blur-xl opacity-30 animate-pulse"
                style={{ backgroundColor: project.color }}
              />
              <div className={`absolute bottom-4 right-4 ${theme.isDark ? "bg-black/90 border-white/5" : "bg-white/90 border-slate-200/60"} px-3 py-1 rounded-md border shadow-xs flex items-center gap-2`}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                <span className={`font-space-mono text-[9px] ${theme.isDark ? "text-slate-400" : "text-slate-500"} font-bold uppercase tracking-wider`}>{project.role}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Case Study Content - Wide Columns */}
      <div className="w-full max-w-7xl px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 relative z-10">
        
        {/* Left Columns: Core Case Details */}
        <div className="lg:col-span-8 flex flex-col gap-10 text-left">
          
          {/* Overview */}
          <div className="flex flex-col gap-4 border-t border-slate-200/50 pt-8">
            <h2 className="font-serif text-3xl font-bold tracking-tight">Overview</h2>
            <p className={`${theme.bodyFont} text-[16px] font-medium leading-relaxed`}>
              {project.overview}
            </p>
          </div>

          {/* Challenge */}
          <div className="flex flex-col gap-4 border-t border-slate-200/50 pt-8">
            <h2 className="font-serif text-3xl font-bold tracking-tight">The Challenge</h2>
            <p className={`${theme.bodyFont} text-[16px] font-medium leading-relaxed`}>
              {project.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="flex flex-col gap-4 border-t border-slate-200/50 pt-8">
            <h2 className="font-serif text-3xl font-bold tracking-tight">The Solution</h2>
            <p className={`${theme.bodyFont} text-[16px] font-medium leading-relaxed`}>
              {project.solution}
            </p>
          </div>

          {/* How We Made It */}
          {project.howWeMadeIt && (
            <div className="flex flex-col gap-4 border-t border-slate-200/50 pt-8">
              <h2 className="font-serif text-3xl font-bold tracking-tight">Development & Implementation</h2>
              <p className={`${theme.bodyFont} text-[16px] font-medium leading-relaxed`}>
                {project.howWeMadeIt}
              </p>
            </div>
          )}

          {/* Gallery selector if there are multiple slides */}
          {project.gallery && project.gallery.length > 1 && (
            <div className="flex flex-col gap-4 border-t border-slate-200/50 pt-8">
              <h2 className="font-serif text-2xl font-bold tracking-tight">Gallery Selectors</h2>
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
        </div>

        {/* Right Columns: Tech Stack & Resources Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-8 text-left border-t lg:border-t-0 lg:border-l border-slate-200/50 pt-8 lg:pt-0 lg:pl-8">
          
          {/* Tech stack section */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-2xl font-bold tracking-tight">System Composition</h3>
            <div className="flex flex-col gap-3 w-full">
              {project.techStack.map((tech) => (
                <div 
                  key={tech.name} 
                  className={`${theme.cardBg} border ${theme.isDark ? "border-white/5 hover:border-white/10" : "border-slate-200 hover:border-slate-300"} p-4 rounded-xl flex flex-col gap-1 transition-all duration-300 shadow-xs`}
                >
                  <span className={`font-sans font-bold text-xs ${theme.isDark ? "text-white" : "text-[#1F2022]"} uppercase tracking-wide`}>{tech.name}</span>
                  <p className={`text-[11px] ${theme.isDark ? "text-slate-400" : "text-slate-500"} leading-relaxed font-sans`}>{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resources index section */}
          <div className="flex flex-col gap-4 border-t border-slate-200/50 pt-6">
            <h3 className="font-serif text-2xl font-bold tracking-tight">Resource Index</h3>
            <div className="flex flex-col gap-3 w-full">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 border ${
                    theme.isDark 
                      ? "border-white/10 bg-black/60 text-slate-300 hover:text-white hover:border-[#ECE5DA]" 
                      : "border-slate-200 bg-white hover:border-slate-800 text-slate-700 hover:text-slate-900"
                  } rounded-xl transition-all duration-300 shadow-xs font-space-mono text-xs tracking-wider`}
                >
                  <SiGithub className="w-4 h-4 text-slate-500" /> GitHub Repository
                </a>
              ) : (
                <button 
                  disabled
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 border ${
                    theme.isDark 
                      ? "border-white/5 bg-black/40 text-slate-600" 
                      : "border-slate-200 bg-slate-50 text-slate-400"
                  } rounded-xl font-space-mono text-xs tracking-wider cursor-not-allowed opacity-75 group relative`}
                >
                  <Lock className={`w-3.5 h-3.5 ${theme.isDark ? "text-slate-700" : "text-slate-300"}`} /> Repository Unavailable
                </button>
              )}

              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 border ${
                    theme.isDark 
                      ? "border-white/10 bg-black/60 text-slate-300 hover:text-white hover:border-[#ECE5DA]" 
                      : "border-slate-200 bg-white hover:border-slate-800 text-slate-700 hover:text-slate-900"
                  } rounded-xl transition-all duration-300 shadow-xs font-space-mono text-xs tracking-wider`}
                >
                  <Globe className="w-4 h-4 text-slate-500" /> Live Prototype <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              ) : (
                <button 
                  disabled
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 border ${
                    theme.isDark 
                      ? "border-white/5 bg-black/40 text-slate-600" 
                      : "border-slate-200 bg-slate-50 text-slate-400"
                  } rounded-xl font-space-mono text-xs tracking-wider cursor-not-allowed opacity-75`}
                >
                  <Globe className={`w-3.5 h-3.5 ${theme.isDark ? "text-slate-700" : "text-slate-300"}`} /> Live Demo Unavailable
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

    </main>
  );
}
