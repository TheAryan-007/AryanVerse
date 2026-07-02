import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-screen h-screen bg-[#050508] flex flex-col items-center justify-center gap-6 select-none relative overflow-hidden text-center px-6">
      {/* Background radial glow */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,#a855f7_0%,#050508_80%)] pointer-events-none" />

      {/* Cyber 404 Panel */}
      <div className="flex flex-col items-center gap-3 z-10">
        <h1 className="font-cinzel text-8xl md:text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-300 to-purple-800 drop-shadow-[0_0_30px_rgba(168,85,247,0.35)]">
          404
        </h1>
        <h2 className="font-space-mono text-[10px] md:text-xs tracking-[0.4em] text-[#C084FC] uppercase mt-2">
          coordinates lost in hyperspace
        </h2>
        <p className="font-inter text-[11px] md:text-xs text-slate-400 max-w-sm mt-2 leading-relaxed">
          The node or planetary sector you are searching for does not exist in the AryanVerse database index.
        </p>
      </div>

      {/* Return CTA */}
      <div className="z-10 mt-4">
        <Link 
          href="/"
          className="font-space-mono text-[9px] font-bold tracking-[0.2em] text-white border border-purple-500/30 bg-purple-950/20 backdrop-blur-md hover:bg-purple-600 hover:text-white hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 px-6 py-3 rounded-full uppercase"
        >
          Return to Universe Core
        </Link>
      </div>
    </div>
  );
}
