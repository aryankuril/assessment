'use client';

import React from 'react';
import { VariantConfig } from './LuxuryBottleMesh';

interface ScrollOverlayProps {
  scrollProgress: number;
  activeVariant: VariantConfig;
  onSelectVariant: (variantId: string) => void;
  variants: VariantConfig[];
}

export function ScrollOverlay({
  scrollProgress,
  activeVariant,
  onSelectVariant,
  variants,
}: ScrollOverlayProps) {
  // Determine active stage for indicator pills
  let currentStage = 0;
  if (scrollProgress >= 0.15 && scrollProgress < 0.38) currentStage = 1;
  else if (scrollProgress >= 0.38 && scrollProgress < 0.62) currentStage = 2;
  else if (scrollProgress >= 0.62 && scrollProgress < 0.82) currentStage = 3;
  else if (scrollProgress >= 0.82) currentStage = 4;

  return (
    <div className="relative w-full text-white font-sans pointer-events-none select-none z-20">
      {/* Fixed Progress / Stage Indicator on Top Right */}
      <div className="fixed top-24 right-6 md:right-12 z-40 pointer-events-auto hidden sm:flex flex-col items-end gap-2 text-xs tracking-widest font-mono">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeVariant.accentHex }} />
          <span className="text-zinc-400">STAGE 0{currentStage + 1} / 05</span>
        </div>
        <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress * 100}%`, backgroundColor: activeVariant.accentHex }}
          />
        </div>
      </div>

      {/* SECTION 0: Hero Section (0.0 to 0.15) */}
      <div
        className="h-screen w-full flex flex-col justify-center items-center px-6 text-center transition-opacity duration-500"
        style={{
          opacity: scrollProgress < 0.18 ? 1 - scrollProgress * 5 : 0,
          pointerEvents: scrollProgress < 0.18 ? 'auto' : 'none',
        }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          Flux Theory • Autumn 2026 Collection
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter leading-none max-w-6xl text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 drop-shadow-2xl">
          Many Versions <br className="hidden sm:inline" />
          <span className="italic font-serif font-normal text-zinc-400">Of You</span>
        </h1>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-400 max-w-xl font-light tracking-wide leading-relaxed">
          Elevate your daily ritual with high-potency dermatological actives and French perfume-grade signature aromas.
        </p>

        {/* Scroll Cue */}
        <div className="absolute bottom-10 flex flex-col items-center gap-3 text-zinc-500 text-xs tracking-widest uppercase animate-bounce">
          <span>Scroll To Explore</span>
          <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* SECTION 1: Formula Science (0.15 to 0.38) */}
      <div
        className="h-screen w-full flex items-center px-6 md:px-16 lg:px-24 transition-opacity duration-500"
        style={{
          opacity: scrollProgress >= 0.15 && scrollProgress < 0.38 ? Math.sin(((scrollProgress - 0.15) / 0.23) * Math.PI) : 0,
        }}
      >
        <div className="max-w-xl bg-black/40 md:bg-black/60 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl pointer-events-auto">
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
            01 / ADVANCED SKIN SCIENCE
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mt-2 mb-4 tracking-tight leading-tight">
            Formulated for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              Standard Setters
            </span>
          </h2>
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6">
            Engineered with clinical-grade active ingredients to deeply cleanse, gently exfoliate, and restore the skin’s lipid barrier without dryness.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 font-mono font-bold text-sm">5%</div>
              <div>
                <h4 className="font-semibold text-sm text-white">Niacinamide (Vitamin B3)</h4>
                <p className="text-xs text-zinc-400">Targeted detanning, even tone restoration, and texture refinement.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300 font-mono font-bold text-sm">4X</div>
              <div>
                <h4 className="font-semibold text-sm text-white">Quad Hyaluronic Acid Matrix</h4>
                <p className="text-xs text-zinc-400">Multi-molecular weight hydration locking moisture for 48 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Olfactory Craft (0.38 to 0.62) */}
      <div
        className="h-screen w-full flex items-center justify-end px-6 md:px-16 lg:px-24 transition-opacity duration-500"
        style={{
          opacity: scrollProgress >= 0.38 && scrollProgress < 0.62 ? Math.sin(((scrollProgress - 0.38) / 0.24) * Math.PI) : 0,
        }}
      >
        <div className="max-w-xl bg-black/40 md:bg-black/60 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl pointer-events-auto">
          <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
            02 / OLFACTORY CRAFT
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mt-2 mb-4 tracking-tight leading-tight">
            Perfume-grade <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-400">
              Sensory Architecture
            </span>
          </h2>
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6">
            Hand-crafted in Grasse, France. Complex olfactory pyramids designed to linger gracefully on skin for up to 12 hours.
          </p>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">TOP</span>
              <span className="text-xs font-semibold text-white mt-1 block">Bergamot & Cardamom</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono text-emerald-400 uppercase block">HEART</span>
              <span className="text-xs font-semibold text-white mt-1 block">Spicy Leather & Santal</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">BASE</span>
              <span className="text-xs font-semibold text-white mt-1 block">Earthy Oud & Amber</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Dispenser & Bottle Engineering (0.62 to 0.82) */}
      <div
        className="h-screen w-full flex items-center px-6 md:px-16 lg:px-24 transition-opacity duration-500"
        style={{
          opacity: scrollProgress >= 0.62 && scrollProgress < 0.82 ? Math.sin(((scrollProgress - 0.62) / 0.20) * Math.PI) : 0,
        }}
      >
        <div className="max-w-xl bg-black/40 md:bg-black/60 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl pointer-events-auto">
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">
            03 / PRECISION DISPENSER
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mt-2 mb-4 tracking-tight leading-tight">
            Anodized Titanium <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400">
              Micro-Dosing Pump
            </span>
          </h2>
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6">
            Custom engineered twist-lock pump mechanism dispenses the exact 2.5ml optimal foam volume per stroke with zero waste.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-2xl">🛡️</span>
              <h4 className="font-semibold text-sm text-white mt-2">UV-Glass Filter</h4>
              <p className="text-xs text-zinc-400 mt-1">Blocks 99.8% light degradation to keep active botanicals fresh.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-2xl">♻️</span>
              <h4 className="font-semibold text-sm text-white mt-2">100% Recyclable</h4>
              <p className="text-xs text-zinc-400 mt-1">Sustainably sourced glass & zero BPA anodized metallic cap.</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: Variant Switcher & CTA Landing (0.82 to 1.0) */}
      <div
        className="h-screen w-full flex flex-col justify-end items-center pb-12 sm:pb-16 px-6 text-center transition-opacity duration-500"
        style={{
          opacity: scrollProgress >= 0.82 ? Math.min(1, (scrollProgress - 0.82) * 5.5) : 0,
          pointerEvents: scrollProgress >= 0.82 ? 'auto' : 'none',
        }}
      >
        <div className="max-w-2xl bg-black/80 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl w-full">
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
            CHOOSE YOUR SIGNATURE FORMULA
          </span>
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 mb-2 tracking-tight">
            {activeVariant.name}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light mb-6">
            {activeVariant.description}
          </p>

          {/* Interactive Variant Pill Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {variants.map((v) => {
              const isSelected = v.id === activeVariant.id;
              return (
                <button
                  key={v.id}
                  onClick={() => onSelectVariant(v.id)}
                  className={`px-3 py-2.5 rounded-2xl border text-xs font-semibold tracking-wide transition-all flex flex-col items-center gap-1 ${
                    isSelected
                      ? 'bg-white text-black border-white shadow-lg scale-105'
                      : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/20"
                    style={{ backgroundColor: v.accentHex }}
                  />
                  <span>{v.name}</span>
                </button>
              );
            })}
          </div>

          {/* Buy CTA Action Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-bold text-sm tracking-wider uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2">
              <span>ADD TO BAG — $29.00</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <button className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm tracking-wide transition-all">
              EXPLORE ALL 4 PACK
            </button>
          </div>

          <p className="text-[11px] text-zinc-500 mt-4 tracking-wide">
            ⚡ Free Express Shipping Worldwide • 30-Day Happiness Guarantee • Dermatologically Certified
          </p>
        </div>
      </div>
    </div>
  );
}
