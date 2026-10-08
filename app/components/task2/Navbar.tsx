'use client';

import React, { useState } from 'react';

interface NavbarProps {
  useGlbModel: boolean;
  onToggleModel: () => void;
  cartCount: number;
  onOpenCart?: () => void;
}

export function Navbar({ useGlbModel, onToggleModel, cartCount, onOpenCart }: NavbarProps) {
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 transition-all duration-300 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-200 p-[1px] transition-transform duration-500 group-hover:rotate-180">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
            </div>
            <span className="font-extrabold tracking-widest text-lg sm:text-xl text-white uppercase font-sans">
              FLUX <span className="font-serif italic font-normal text-amber-400">THEORY</span>
            </span>
          </a>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest text-zinc-400 font-mono uppercase">
          <a href="#experience" className="hover:text-white transition-colors">3D Experience</a>
          <a href="#collection" className="hover:text-white transition-colors">Collection</a>
          <a href="#formula" className="hover:text-white transition-colors">Science</a>
          <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Model Toggle Pill */}
          <button
            onClick={onToggleModel}
            title="Toggle between GLB asset and Procedural bottle render"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-[11px] font-mono text-zinc-300 transition-all"
          >
            <span className={`w-2 h-2 rounded-full ${useGlbModel ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span>MODEL: {useGlbModel ? 'GLB' : 'PROCEDURAL'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="p-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-300 transition-all"
            title="Ambient soundscape"
          >
            {isAudioMuted ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-zinc-200 transition-all font-semibold text-xs tracking-wider uppercase shadow-lg active:scale-95"
          >
            <span>BAG</span>
            <span className="w-4 h-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-mono">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
