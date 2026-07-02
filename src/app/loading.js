export default function Loading() {
  return (
    <div className="w-screen h-screen bg-[#050508] flex flex-col items-center justify-center gap-6 select-none relative overflow-hidden">
      {/* Background Starfield fallback layout */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,#1e1b4b_0%,#050508_80%)]" />
      
      {/* Glowing Orbit Spinner */}
      <div className="relative w-24 h-24 flex items-center justify-center z-10">
        <div className="absolute w-24 h-24 rounded-full border border-purple-500/20 border-t-purple-500 border-r-purple-500/40 animate-spin" style={{ animationDuration: "1.5s" }} />
        <div className="absolute w-16 h-16 rounded-full border border-[#00E5FF]/20 border-b-[#00E5FF] border-l-[#00E5FF]/40 animate-spin" style={{ animationDuration: "1s", animationDirection: "reverse" }} />
        <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#fff] animate-pulse" />
      </div>

      {/* Cyber Text */}
      <div className="flex flex-col items-center gap-1.5 z-10">
        <span className="font-space-mono text-[9px] tracking-[0.45em] text-[#C084FC] uppercase animate-pulse">
          initializing universe
        </span>
        <span className="font-sans text-[7.5px] tracking-[0.2em] text-slate-500 uppercase">
          loading holographic assets...
        </span>
      </div>
    </div>
  );
}
