'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#050508] text-white flex flex-col items-center justify-center gap-6 select-none relative overflow-hidden text-center px-6">
        {/* Background radial glow */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,#ef4444_0%,#050508_80%)] pointer-events-none" />

        {/* Cyber Error Panel */}
        <div className="flex flex-col items-center gap-3 z-10">
          <h1 className="font-cinzel text-8xl md:text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-red-300 to-red-800 drop-shadow-[0_0_30px_rgba(239,68,68,0.35)]">
            ERROR
          </h1>
          <h2 className="font-space-mono text-[10px] md:text-xs tracking-[0.4em] text-red-400 uppercase mt-2">
            core containment breach
          </h2>
          <p className="font-inter text-[11px] md:text-xs text-slate-400 max-w-sm mt-2 leading-relaxed">
            A fatal warp stability error occurred inside the system core. 
          </p>
        </div>

        {/* Retry Trigger */}
        <div className="z-10 mt-4">
          <button 
            onClick={() => reset()}
            className="font-space-mono text-[9px] font-bold tracking-[0.2em] text-white border border-red-500/30 bg-red-950/20 backdrop-blur-md hover:bg-red-600 hover:text-white hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 px-6 py-3 rounded-full cursor-pointer uppercase"
          >
            Re-Initialize System
          </button>
        </div>
      </body>
    </html>
  );
}
