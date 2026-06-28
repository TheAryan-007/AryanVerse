"use client";

/**
 * AryanVerse Page Component — Client-Side Core
 * 
 * Manages the state machine: IDLE (space view) -> ZOOMING -> ATMOSPHERE (entry) -> WORLD (inner navigation).
 * Renders the 3D Fiber Canvas alongside responsive screen-space glassmorphism HUD overlays,
 * cinematic blur flashes, and location information modals.
 */

import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as Icons from "lucide-react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import UniverseScene from "../scenes/UniverseScene";
import PlanetBackground from "../components/universe/PlanetBackground";
import { destinations } from "../data/destinations";

// Utility to clean raw markdown characters in chat messages
const formatChatMessage = (text) => {
  if (!text) return "";
  let formatted = text;
  // Convert [text](url) to simple "text (url)" format
  formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");
  // Remove bold double asterisks **
  formatted = formatted.replace(/\*\*/g, "");
  // Remove bullet single asterisks (* ) at starting of lines
  formatted = formatted.replace(/(^|\n)\s*\*\s+/g, "$1- ");
  // Remove single asterisks if any remain
  formatted = formatted.replace(/\*/g, "");
  return formatted;
};

export default function Home() {
  const [transitionState, setTransitionState] = useState("IDLE"); // IDLE | ZOOMING | ATMOSPHERE | WORLD | LEAVING
  const [selectedNode, setSelectedNode] = useState(null); // Active destination structure
  const [overlayActive, setOverlayActive] = useState(false); // Controls CSS transition glows
  const [floodActive, setFloodActive] = useState(false);
  const [floodColor, setFloodColor] = useState("");
  const router = useRouter();

  // Rating & Suggestion Feedback System State
  const [showFeedbackPanel, setShowFeedbackPanel] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [senderName, setSenderName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState(null);

  // Conversational AI (EON) States
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "model",
      text: "Greetings, traveler! 🌌 I am EON, a sleek holographic robotic companion. Ask me anything about Aryan's B.Tech Computer Science studies, skills, projects, or achievements!"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isTyping]);

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      alert("Please select a rating star first.");
      return;
    }

    setIsSubmittingFeedback(true);
    setFeedbackError(null);

    const name = senderName || "Anonymous";
    const feedbackData = {
      rating,
      text: feedbackText,
      name,
      timestamp: new Date().toISOString()
    };

    // Save to local storage as fallback
    try {
      const existing = JSON.parse(localStorage.getItem("aryan_universe_feedback") || "[]");
      existing.push(feedbackData);
      localStorage.setItem("aryan_universe_feedback", JSON.stringify(existing));
    } catch (e) {
      console.error("Local storage error:", e);
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      console.warn("Web3Forms access key is not configured. Feedback saved locally only.");
      setTimeout(() => {
        setIsSubmittingFeedback(false);
        setSubmitted(true);
        setFeedbackText("");
        setSenderName("");
      }, 800);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New Portfolio Feedback Signal",
          from_name: name,
          name: name,
          rating: `${rating} / 5 Stars`,
          message: feedbackText || "(No written feedback provided)"
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFeedbackText("");
        setSenderName("");
      } else {
        console.error("Web3Forms submission failed:", result);
        setFeedbackError("Failed to transmit signal. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setFeedbackError("Connection error. Saved locally instead.");
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const handleSendChat = async (textToSend) => {
    if (!textToSend.trim() || isTyping) return;

    // Clear input
    setChatInput("");

    // Add user message to state
    const newMessages = [...chatMessages, { role: "user", text: textToSend }];
    setChatMessages(newMessages);
    setIsTyping(true);

    try {
      // Keep only last 10 messages for context window stability
      const historyForApi = newMessages.slice(-10).map(msg => ({
        role: msg.role,
        text: msg.text
      }));

      // Remove the last message from history since we send it separately as the active prompt
      historyForApi.pop();

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyForApi
        })
      });

      if (!response.ok) {
        throw new Error("API returned non-200 status");
      }

      const result = await response.json();
      setChatMessages(prev => [...prev, { role: "model", text: result.reply }]);

    } catch (err) {
      console.error("Chatbot transmission error:", err);
      setChatMessages(prev => [
        ...prev, 
        { 
          role: "model", 
          text: "I encountered a sync issue transmitting your query to the universe core. Let me consult local storage...\n\nI can still answer questions about Aryan's **skills**, **projects**, or **contact details**! Feel free to retry." 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Holographic Robot Guide States
  const [robotPhase, setRobotPhase] = useState(null); // null | "LEFT_WELCOME" | "RIGHT_FEEDBACK" | "RETURN_REMINDER"
  const [isReturned, setIsReturned] = useState(false);

  // Detect return from core on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("state") === "WORLD" && params.get("node")) {
        setIsReturned(true);
      }
    }
  }, []);

  // Trigger choreographed robot companion phases
  useEffect(() => {
    if (transitionState === "WORLD") {
      if (typeof window !== "undefined") {
        if (isReturned) {
          const hasShownReturn = sessionStorage.getItem("aryan_robot_shown_return") === "true";
          if (!hasShownReturn) {
            // Return Entry sequence (Right Side)
            const returnTimer = setTimeout(() => {
              setRobotPhase("RETURN_REMINDER");
              sessionStorage.setItem("aryan_robot_shown_return", "true");
              
              const returnCloseTimer = setTimeout(() => {
                setRobotPhase(null);
              }, 6000); // show for 6 seconds

              return () => clearTimeout(returnCloseTimer);
            }, 1500);

            return () => clearTimeout(returnTimer);
          }
        } else {
          const hasShownWelcome = sessionStorage.getItem("aryan_robot_shown_welcome") === "true";
          if (!hasShownWelcome) {
            // First Entry sequence (Skip Left Welcome, just show Feedback reminder on the Right)
            const feedbackTimer = setTimeout(() => {
              setRobotPhase("RIGHT_FEEDBACK");
              sessionStorage.setItem("aryan_robot_shown_welcome", "true");

              const feedbackCloseTimer = setTimeout(() => {
                setRobotPhase(null);
              }, 6000); // show feedback reminder for 6s

              return () => clearTimeout(feedbackCloseTimer);
            }, 3000); // show feedback reminder after 3s

            return () => clearTimeout(feedbackTimer);
          }
        }
      }
    } else {
      setRobotPhase(null);
    }
  }, [transitionState, isReturned]);

  // Reset states on mount to ensure we can return to the page
  useEffect(() => {
    setFloodActive(false);
    setFloodColor("");
    setSelectedNode(null);
  }, []);

  // Prefetch all destination routes once inside the world state for instantaneous transition
  useEffect(() => {
    if (transitionState === "WORLD") {
      destinations.forEach((dest) => {
        router.prefetch(dest.route);
      });
    }
  }, [transitionState, router]);

  // Sync transition state changes with overlay animation triggers
  useEffect(() => {
    if (transitionState === "ZOOMING") {
      setOverlayActive(true);
    }
    if (transitionState === "WORLD") {
      // Fade out entry overlay once inside core world
      const timer = setTimeout(() => setOverlayActive(false), 800);
      return () => clearTimeout(timer);
    }
  }, [transitionState]);

  // Read URL query parameters to restore state on navigation return
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("state") === "WORLD") {
        setTransitionState("WORLD");
        const nodeId = params.get("node");
        if (nodeId) {
          const found = destinations.find(n => n.id === nodeId);
          if (found) setSelectedNode(found);
        }
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  // Sequenced page entrance animation
  useEffect(() => {
    gsap.set(".hero-text", { opacity: 0, y: 35 });
    gsap.set(".hero-button", { opacity: 0, y: 15 });

    gsap.timeline()
      .to(".hero-text", { 
        opacity: 1, 
        y: 0, 
        duration: 1.4, 
        delay: 1.3, 
        ease: "power3.out" 
      })
      .to(".hero-button", { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.5");
  }, []);

  // Reset core back to Space view
  const handleExitWorld = () => {
    setSelectedNode(null);
    setTransitionState("IDLE");
  };

  // Node selection direct navigation with warp zoom and color light flood
  const handleNodeClick = (node) => {
    console.log("page.js Clicked ID:", node.id);
    console.log("page.js Clicked Route:", node.route);
    setSelectedNode(node);
    setTransitionState("LEAVING");
    setFloodColor(node.color);
    setFloodActive(true);

    // Dynamic delay matching camera zoom speed before pushing route
    setTimeout(() => {
      router.push(node.route);
    }, 700);
  };

  // Get dynamic classes for atmospheric transition effects
  const getAtmosphereOverlayClass = () => {
    if (transitionState === "ZOOMING") {
      return "opacity-30 backdrop-blur-[2px] pointer-events-none scale-100";
    }
    if (transitionState === "ATMOSPHERE") {
      return "opacity-100 backdrop-blur-md pointer-events-none scale-110";
    }
    if (overlayActive) {
      return "opacity-40 backdrop-blur-[1px] pointer-events-none scale-100";
    }
    return "opacity-0 backdrop-blur-none pointer-events-none scale-95";
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-brand-bg select-none">
      
      {/* WebGL Background Layer */}
      <PlanetBackground 
        transitionState={transitionState}
        onPlanetClick={() => {
          if (transitionState === "IDLE") {
            setTransitionState("ZOOMING");
          }
        }}
      />

      {/* 3D RENDER CANVAS BACKGROUND LAYER */}
      <div className="absolute inset-0 w-full h-full z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <UniverseScene
            transitionState={transitionState}
            setTransitionState={setTransitionState}
            selectedNode={selectedNode}
            onNodeClick={handleNodeClick}
          />
        </Canvas>
      </div>

      {/* 1. CINEMATIC ATMOSPHERE ENTRY FLASH OVERLAY */}
      <div 
        className={`fixed inset-0 z-40 flex items-center justify-center transition-all duration-[1000ms] ease-out ${getAtmosphereOverlayClass()}`}
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(5, 5, 8, 0.95) 80%)'
        }}
      >
        <div className="flex flex-col items-center">
          <div className="font-orbitron text-xs tracking-[0.4em] text-glow-purple animate-pulse mb-2">
            [ ATMOSPHERIC ENTRY ]
          </div>
          <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-glow-purple to-transparent animate-pulse" />
        </div>
      </div>

      {/* 2. SPACE HUD & HERO STACK (IDLE State) */}
      <div 
        className={`absolute inset-0 z-20 pointer-events-none transition-all duration-700 ease-in-out ${
          transitionState === "IDLE" ? "opacity-100" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Left Side Header: Large Stacked Title and Subtitle */}
        <div className={`absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-sm md:max-w-md lg:max-w-lg flex flex-col items-start gap-4 ${
          transitionState === "IDLE" ? "pointer-events-auto" : "pointer-events-none"
        }`}>
          <div className="hero-text flex flex-col gap-4">
            <h1 className="font-orbitron text-4xl md:text-7xl lg:text-8xl font-black tracking-[0.05em] text-white leading-[0.9] flex flex-col gap-2 md:gap-3 uppercase">
              <span>Aryan</span>
              <span>Verse</span>
            </h1>
            <p className="font-inter font-medium text-slate-400 text-[10px] md:text-xs tracking-[0.3em] uppercase mt-1">
              welcome
            </p>
          </div>
        </div>
        
        {/* Bottom-Center CTA: Small Text Hint */}
        <div className={`absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 ${
          transitionState === "IDLE" ? "pointer-events-auto" : "pointer-events-none"
        }`}>
          <div className="hero-button">
            <button
              onClick={() => {
                if (transitionState === "IDLE") {
                  setTransitionState("ZOOMING");
                }
              }}
              className="font-inter text-[9px] md:text-[10px] tracking-[0.25em] text-slate-400 uppercase bg-transparent border-none outline-none cursor-pointer hover:text-white transition-colors duration-300"
            >
              click planet to enter universe
            </button>
          </div>
        </div>
      </div>

      {/* 3. INNER WORLD NAVIGATION SYSTEM HUD (WORLD or LEAVING State) */}
      <div 
        className={`absolute inset-0 z-30 pointer-events-none transition-all duration-700 ease-in-out ${
          (transitionState === "WORLD" || transitionState === "LEAVING") ? "opacity-100" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Top Nav Bar controls */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center pointer-events-none">
          <div className={`flex items-center gap-3 ${
            (transitionState === "WORLD" || transitionState === "LEAVING") ? "pointer-events-auto" : "pointer-events-none"
          }`}>
            <span className="w-1.5 h-1.5 bg-[#A855F7] rounded-full shadow-[0_0_8px_#A855F7] animate-pulse" />
            <span className="font-orbitron text-[9px] font-bold text-slate-400 tracking-[0.25em] uppercase">
              ARYANVERSE // STELLAR NAVIGATION
            </span>
          </div>
          
          <button 
            onClick={handleExitWorld}
            className={`font-sans text-[9px] font-medium tracking-[0.2em] text-slate-300 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white hover:text-black hover:border-white transition-all duration-300 px-5 py-2 rounded-full cursor-pointer uppercase ${
              (transitionState === "WORLD" || transitionState === "LEAVING") ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            Exit Universe
          </button>
        </div>

        {/* Bottom Quote Frame */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none text-center">
          <span className="font-sans text-[8px] font-medium tracking-[0.3em] text-slate-500 uppercase">
            Every Core is a part of my universe
          </span>
        </div>

        {/* Bottom Right Rating & Feedback System */}
        <div className={`absolute bottom-8 right-8 pointer-events-auto flex flex-col items-end z-50 ${
          (transitionState === "WORLD" || transitionState === "LEAVING") ? "pointer-events-auto" : "pointer-events-none"
        }`}>
          {/* Feedback Form Panel (glowing slide-up) */}
          {showFeedbackPanel && (
            <div className="mb-4 w-76 backdrop-blur-xl bg-slate-950/90 border border-purple-500/30 rounded-2xl p-4.5 shadow-[0_10px_30px_rgba(0,0,0,0.8),_0_0_20px_rgba(168,85,247,0.15)] flex flex-col gap-3 text-left animate-fadeIn">
              <div className="flex justify-between items-center">
                <span className="font-orbitron text-[10px] font-black text-white tracking-widest uppercase">
                  Feedback Core
                </span>
                <button 
                  onClick={() => {
                    setShowFeedbackPanel(false);
                    setSubmitted(false);
                  }}
                  className="text-slate-400 hover:text-white text-xs font-bold focus:outline-none cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {!submitted ? (
                <>
                  <p className="font-sans text-[10px] text-slate-400 leading-normal">
                    Help shape the universe. Rate your experience and leave suggestions!
                  </p>

                  {/* Stars Row */}
                  <div className="flex gap-2 my-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="text-lg transition-all duration-200 cursor-pointer focus:outline-none"
                        style={{
                          color: rating >= star ? "#EAB308" : "#475569",
                          textShadow: rating >= star ? "0 0 10px rgba(234,179,8,0.6)" : "none"
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  <textarea
                    placeholder="Any suggestions or thoughts..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full h-16 p-2 rounded-lg bg-black/50 border border-white/10 text-[10px] text-slate-200 focus:outline-none focus:border-purple-500/60 placeholder-slate-600 resize-none font-space-mono"
                  />

                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full p-2 rounded-lg bg-black/50 border border-white/10 text-[10px] text-slate-200 focus:outline-none focus:border-purple-500/60 placeholder-slate-600 font-space-mono"
                  />

                  {feedbackError && (
                    <p className="font-space-mono text-[8px] text-red-400 text-center animate-pulse mt-1">
                      {feedbackError}
                    </p>
                  )}

                  <button
                    onClick={handleSubmitFeedback}
                    disabled={isSubmittingFeedback}
                    className="w-full py-1.5 bg-gradient-to-r from-purple-700 to-purple-500 text-white font-space-mono text-[9px] font-bold tracking-widest uppercase rounded transition-all duration-300 hover:shadow-[0_0_12px_rgba(168,85,247,0.4)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    {isSubmittingFeedback ? (
                      <>
                        <span className="w-2 h-2 border border-white border-t-transparent rounded-full animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      "Send Signal"
                    )}
                  </button>
                </>
              ) : (
                <div className="py-4 text-center flex flex-col items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-sm font-black animate-bounce">
                    ✓
                  </span>
                  <span className="font-space-mono text-[10px] text-[#10B981] font-bold tracking-wider uppercase">
                    Signal Transmitted
                  </span>
                  <p className="font-sans text-[9px] text-slate-400">
                    Thank you! Your feedback has been saved to the universe core.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Main Action Trigger Button */}
          <button
            onClick={() => setShowFeedbackPanel(!showFeedbackPanel)}
            className="flex items-center gap-2 px-4 py-2 border border-purple-500/20 bg-black/60 hover:bg-black/90 hover:border-purple-500/40 text-slate-300 hover:text-white transition-all duration-300 rounded font-space-mono text-[9px] font-semibold tracking-widest cursor-pointer shadow-md group pointer-events-auto uppercase"
          >
            <Icons.Star className="w-3.5 h-3.5 text-purple-400 group-hover:text-yellow-400 group-hover:rotate-[72deg] transition-all duration-500" />
            Rate & Feedback
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes robot-float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-robot-float {
          animation: robot-float 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
          transform-origin: center;
        }
      `}} />

      {/* Holographic Robot Guide Companion (Right Side - Feedback & Return) */}
      <div 
        className={`fixed bottom-[74px] z-50 flex items-center flex-row-reverse gap-1.5 transition-all duration-700 ease-in-out ${
          (robotPhase === "RIGHT_FEEDBACK" || robotPhase === "RETURN_REMINDER")
            ? "right-6 opacity-100 translate-x-0" 
            : "-right-[300px] opacity-0 translate-x-12 pointer-events-none"
        }`}
      >
        <RobotDroneSVG color="#00E5FF" pointing={robotPhase === "RIGHT_FEEDBACK"} />
        
        {/* Rectangular Speech Bubble (White bg, Black border) */}
        <div className="relative w-[200px] bg-white border-[2.5px] border-black rounded-2xl p-4 shadow-[0_10px_20px_rgba(0,0,0,0.5)] text-left select-none mr-1">
          <span className="font-orbitron text-[8px] font-black text-purple-600 tracking-widest uppercase block mb-0.5">
            GUIDE
          </span>
          <p className="font-space-mono text-[10px] font-black text-slate-950 leading-relaxed">
            {robotPhase === "RIGHT_FEEDBACK" 
              ? "After visiting the site, do not forget to give feedback and rating! 👇" 
              : "Mmhmm, just checking if you remember or not! 👀"}
          </p>
          {/* Arrow pointing to the right (towards robot) */}
          <div className="absolute -right-[9px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-l-[8px] border-l-black border-b-[8px] border-b-transparent" />
          <div className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[6px] border-l-white border-b-[6px] border-b-transparent" />
        </div>
      </div>

      {/* Persistent Holographic AI Chat Companion (Bottom-Left) */}
      {(transitionState === "WORLD" || transitionState === "LEAVING") && (
        <div className="fixed bottom-8 left-8 z-50 flex items-end gap-3 pointer-events-auto">
          {/* Floating Robot Drone Trigger */}
          <button
            onClick={() => setShowChatPanel(!showChatPanel)}
            className="group relative flex items-center justify-center p-2 bg-[#050508]/40 hover:bg-[#06b6d4]/10 border border-[#06b6d4]/20 hover:border-[#06b6d4] rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer"
            title="Chat with EON"
          >
            <div className="absolute inset-0 rounded-full bg-[#06b6d4]/5 animate-ping opacity-75" />
            <RobotDroneSVG color="#00E5FF" pointing={false} className="w-12 h-14 animate-robot-float select-none pointer-events-none" />
            
            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 border border-cyan-500/30 text-[9px] font-space-mono text-cyan-400 font-bold px-2 py-1 rounded-md whitespace-nowrap shadow-md">
              Chat with EON
            </span>
          </button>
          
          {/* Little speech bubble helper if chat is closed and hasn't been opened yet */}
          {!showChatPanel && (
            <div className="hidden sm:block relative bg-slate-950/80 border border-[#06b6d4]/30 rounded-xl p-3 shadow-[0_5px_15px_rgba(0,0,0,0.5)] text-left w-48 mb-1 animate-pulse">
              <span className="font-orbitron text-[8px] font-black text-cyan-400 tracking-widest uppercase block mb-0.5">
                EON System
              </span>
              <p className="font-space-mono text-[9px] text-slate-350 leading-relaxed">
                Click me to ask any questions about Aryan! 🚀
              </p>
              {/* Arrow pointing to the left */}
              <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-r-[5px] border-r-[#06b6d4]/35 border-b-[5px] border-b-transparent" />
            </div>
          )}
        </div>
      )}

      {/* Sliding Glassmorphic Chat Panel */}
      {showChatPanel && (
        <div className="fixed bottom-24 left-8 z-50 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] backdrop-blur-2xl bg-slate-950/90 border border-cyan-500/35 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.85),_0_0_25px_rgba(6,182,212,0.2)] flex flex-col overflow-hidden animate-fadeIn text-left pointer-events-auto">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-cyan-950/20 to-slate-950/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00E5FF]" />
              <span className="font-orbitron text-[10px] font-black text-white tracking-widest uppercase">
                EON Terminal
              </span>
            </div>
            <button
              onClick={() => setShowChatPanel(false)}
              className="text-slate-400 hover:text-white text-xs font-bold focus:outline-none cursor-pointer p-1 rounded hover:bg-white/5 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 scrollbar-thin select-text">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col max-w-[85%] gap-1 ${
                  msg.role === "user" ? "self-end items-end" : "self-start items-start"
                }`}
              >
                {/* Sender label */}
                <span className="font-space-mono text-[7px] text-slate-500 uppercase tracking-widest">
                  {msg.role === "user" ? "User Signal" : "EON Companion"}
                </span>
                {/* Bubble */}
                <div
                  className={`p-3 rounded-xl font-sans text-[10.5px] leading-relaxed select-text ${
                    msg.role === "user"
                      ? "bg-purple-900/30 border border-purple-500/20 text-slate-100 rounded-tr-none shadow-[0_2px_10px_rgba(168,85,247,0.05)]"
                      : "bg-cyan-950/20 border border-cyan-500/20 text-slate-200 rounded-tl-none shadow-[0_2px_10px_rgba(6,182,212,0.05)]"
                  } whitespace-pre-line`}
                >
                  {formatChatMessage(msg.text)}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="self-start flex flex-col items-start gap-1 max-w-[85%]">
                <span className="font-space-mono text-[7px] text-cyan-500 uppercase tracking-widest animate-pulse">
                  EON is scanning...
                </span>
                <div className="bg-cyan-950/20 border border-cyan-500/10 p-3 rounded-xl rounded-tl-none text-slate-400 font-sans text-[10.5px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            
            {/* Scroll Anchor */}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div className="px-4 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto scrollbar-none bg-black/40">
            {[
              { label: "Who is Aryan?", query: "Who is Aryan?" },
              { label: "SkySentry AI", query: "Tell me about SkySentry AI" },
              { label: "Core Skills", query: "What are Aryan's core skills?" },
              { label: "LyfChanger startup", query: "How did he generate ₹84,000 in high school?" },
              { label: "Contact Info", query: "How can I contact Aryan?" }
            ].map((chip, idx) => (
              <button
                key={idx}
                disabled={isTyping}
                onClick={() => handleSendChat(chip.query)}
                className="px-2.5 py-1 bg-[#050508]/60 hover:bg-[#06b6d4]/10 border border-slate-800 hover:border-[#06b6d4]/50 rounded-full text-[9px] font-space-mono text-slate-400 hover:text-cyan-400 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (chatInput.trim() && !isTyping) {
                handleSendChat(chatInput.trim());
              }
            }}
            className="p-3 border-t border-white/10 flex gap-2 bg-[#020204]"
          >
            <input
              type="text"
              placeholder="Query the universe core..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              disabled={isTyping}
              className="flex-1 px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-[10.5px] text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 font-space-mono disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isTyping || !chatInput.trim()}
              className="px-3 bg-gradient-to-r from-cyan-600 to-cyan-500 text-black font-space-mono text-[9px] font-black tracking-wider uppercase rounded-xl transition-all hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* 4. COLOR LIGHT FLOOD TRANSITION OVERLAY */}
      <div 
        className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-700 ease-in-out ${
          floodActive ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: floodColor ? `radial-gradient(circle at center, ${floodColor}33 0%, #050508 80%)` : '#050508'
        }}
      />

    </main>
  );
}

// 3D Holographic Companion Humanoid Robot SVG Component
const RobotDroneSVG = ({ color = "#00E5FF", pointing = false, className = "w-24 h-28 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-robot-float select-none pointer-events-none" }) => (
  <svg viewBox="0 0 100 120" className={className}>
    {/* Hologram rings base under the robot */}
    <ellipse cx="50" cy="100" rx="30" ry="8" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" className="animate-spin-slow" />
    <ellipse cx="50" cy="100" rx="20" ry="5" fill="none" stroke={color} strokeWidth="1" opacity="0.8" />
    <ellipse cx="50" cy="100" rx="10" ry="2.5" fill="rgba(0, 229, 255, 0.2)" />
    
    {/* Light beam coming up from base */}
    <path d="M 30 100 L 40 70 L 60 70 L 70 100 Z" fill="url(#hopoGrad)" opacity="0.15" />
    
    <defs>
      <linearGradient id="hopoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" stopColor={color} />
        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.0" stopColor={color} />
      </linearGradient>
    </defs>

    {/* Body / Torso (glossy white capsule shape) */}
    <rect x="36" y="52" width="28" height="30" rx="14" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="0.5" />
    {/* Chest plate detailing */}
    <rect x="42" y="60" width="16" height="8" rx="4" fill="#E2E8F0" />
    <rect x="44" y="63" width="12" height="2" rx="1" fill="#00E5FF" className="animate-pulse" />

    {/* Head (glossy white round helmet) */}
    <circle cx="50" cy="36" r="20" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="0.5" />
    <path d="M 33 36 A 17 17 0 0 1 67 36 Z" fill="#FFFFFF" />
    
    {/* Visor faceplate (Black glass) */}
    <rect x="36" y="28" width="28" height="15" rx="7.5" fill="#1A1A24" stroke="#475569" strokeWidth="1" />
    
    {/* Visor glowing cyan eyes */}
    <circle cx="44" cy="35" r="3" fill="#00E5FF" className="animate-pulse" />
    <circle cx="56" cy="35" r="3" fill="#00E5FF" className="animate-pulse" />
    {/* Visor cyan smile */}
    <path d="M 47 39 Q 50 41 53 39" fill="none" stroke="#00E5FF" strokeWidth="1" strokeLinecap="round" />

    {/* Left Arm */}
    <path d="M 34 56 C 30 62 28 68 30 74 C 31 77 34 77 35 74 C 34 68 35 62 38 58" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="0.5" />
    
    {/* Right Arm (pointing or normal) */}
    {pointing ? (
      /* Pointing arm - pointing downwards-right or downwards */
      <path d="M 64 56 C 70 60 76 66 82 72 C 84 74 86 72 84 70 C 78 64 72 58 66 54" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="0.5" />
    ) : (
      /* Regular arm */
      <path d="M 66 56 C 70 62 72 68 70 74 C 69 77 66 77 65 74 C 66 68 65 62 62 58" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="0.5" />
    )}
  </svg>
);





