'use client';

import React, { useState } from 'react';
import { VariantConfig } from './LuxuryBottleMesh';

interface ProductShowcaseProps {
  variants: VariantConfig[];
  onAddToCart: (variantName: string) => void;
}

export function ProductShowcase({ variants, onAddToCart }: ProductShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'fragrance' | 'sustainability'>('ingredients');

  return (
    <section id="collection" className="relative w-full bg-zinc-950 text-white py-24 px-6 md:px-12 lg:px-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              THE FULL SPECTRUM
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight mt-2">
              Explore All <span className="font-serif italic font-normal text-zinc-400">4 Formulations</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md font-light">
            Each formula is specifically crafted targeting distinct skin needs with dedicated active botanical profiles and long-lasting luxury fragrances.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {variants.map((v) => (
            <div
              key={v.id}
              className="group relative rounded-3xl bg-zinc-900/60 border border-white/10 p-6 flex flex-col justify-between hover:border-white/25 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
            >
              {/* Top Accent Gradient Glow */}
              <div
                className="absolute top-0 left-0 w-full h-1 opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: v.accentHex }}
              />

              <div>
                {/* Bottle Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
                    250 ML / 8.4 FL OZ
                  </span>
                  <span
                    className="w-3 h-3 rounded-full border border-black/20"
                    style={{ backgroundColor: v.accentHex }}
                  />
                </div>

                {/* Simulated 3D Visual Bottle Representation */}
                <div className="relative h-64 w-full my-4 flex items-center justify-center rounded-2xl bg-gradient-to-b from-white/5 to-transparent overflow-hidden">
                  <div
                    className="w-24 h-48 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ backgroundColor: v.glowHex }}
                  />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-10 h-6 rounded-t-lg bg-zinc-700 border border-white/20" />
                    <div className="w-6 h-4 bg-amber-400 border border-amber-300" />
                    <div
                      className="w-20 h-36 rounded-2xl border border-white/20 shadow-2xl flex flex-col justify-between p-2 text-center"
                      style={{ backgroundColor: '#121215' }}
                    >
                      <span className="text-[8px] font-bold text-white tracking-widest uppercase mt-2">
                        FLUX THEORY
                      </span>
                      <span
                        className="text-[9px] font-extrabold uppercase"
                        style={{ color: v.accentHex }}
                      >
                        {v.name}
                      </span>
                      <span className="text-[7px] text-zinc-500 mb-2">250 ML</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">{v.name}</h3>
                <p className="text-xs text-amber-400/90 font-medium my-1">{v.subtitle}</p>
                <p className="text-xs text-zinc-400 font-light leading-relaxed my-3">{v.description}</p>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-500 line-through mr-2">$35</span>
                  <span className="text-lg font-bold text-white">$29</span>
                </div>
                <button
                  onClick={() => onAddToCart(v.name)}
                  className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 active:scale-95 transition-all"
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Science & Formulation Deep Dive Tabs */}
        <div id="formula" className="rounded-3xl bg-zinc-900/40 border border-white/10 p-8 md:p-12 mb-28">
          <div className="flex flex-wrap gap-4 border-b border-white/10 pb-6 mb-8">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                activeTab === 'ingredients'
                  ? 'bg-amber-400 text-black font-bold'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              01 Active Ingredients
            </button>
            <button
              onClick={() => setActiveTab('fragrance')}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                activeTab === 'fragrance'
                  ? 'bg-amber-400 text-black font-bold'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              02 French Perfumery
            </button>
            <button
              onClick={() => setActiveTab('sustainability')}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                activeTab === 'sustainability'
                  ? 'bg-amber-400 text-black font-bold'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              03 Eco Engineering
            </button>
          </div>

          {activeTab === 'ingredients' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">5% Niacinamide</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Refines pore texture, repairs hyperpigmentation from sun damage, and strengthens lipid barrier resilience.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Quad Hyaluronic Acid</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Four distinct molecular weights penetrate deep epidermal layers to ensure 48-hour continuous hydration.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Salicylic Acid (BHA)</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Unclogs hair follicles and gently exfoliates dead skin cells, preventing body breakouts.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'fragrance' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Grasse Distillation</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Derived from essential oils harvested in the perfumery capital of France, formulated without synthetic phthalates.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Slow-Release Micro-Capsules</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Fragrance molecules bind to skin lipids, releasing subtle aroma notes with body movement throughout the day.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Genderless Aromatics</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Sophisticated balance of smoky woods, fresh citrus top notes, and velvet amber base tones.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'sustainability' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Heavy UV Glass</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Infinitely recyclable flint glass coated with protective dark UV coating to maximize botanical stability.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Zero-Waste Dispenser</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  High-efficiency mechanical pump delivers exact dosages down to the final drop without residue.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Carbon Neutral Shipping</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  100% biodegradable FSC certified packaging boxes with vegetable ink printing.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Customer Reviews */}
        <div id="reviews" className="mb-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
                VERIFIED EXPERIENCE
              </span>
              <h2 className="text-3xl font-bold uppercase mt-1">What Standard Setters Say</h2>
            </div>
            <div className="flex items-center gap-1 text-amber-400 font-bold text-lg">
              <span>★ 4.98 / 5.0</span>
              <span className="text-xs text-zinc-500 font-normal ml-2">(1,420+ Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10">
              <div className="flex items-center gap-1 text-amber-400 text-xs mb-3">★★★★★</div>
              <p className="text-sm text-zinc-300 italic mb-4">
                "The bottle scroll experience on the site got me curious, but the actual body wash is insanely good. The fragrance stays on skin all day."
              </p>
              <span className="text-xs font-semibold text-white block">— Julian V., Tokyo</span>
              <span className="text-[10px] text-zinc-500">Verified Buyer • The Lover</span>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10">
              <div className="flex items-center gap-1 text-amber-400 text-xs mb-3">★★★★★</div>
              <p className="text-sm text-zinc-300 italic mb-4">
                "Pure luxury. Feels like taking a shower in a 5-star hotel in Paris. The 5% Niacinamide cleared up my back tanning in two weeks."
              </p>
              <span className="text-xs font-semibold text-white block">— Elena R., London</span>
              <span className="text-[10px] text-zinc-500">Verified Buyer • The Rebel</span>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10">
              <div className="flex items-center gap-1 text-amber-400 text-xs mb-3">★★★★★</div>
              <p className="text-sm text-zinc-300 italic mb-4">
                "The 3D bottle interactive scroll is artistically stunning, and the product lives up to the aesthetic. The pump design is flawless."
              </p>
              <span className="text-xs font-semibold text-white block">— Marcus K., New York</span>
              <span className="text-[10px] text-zinc-500">Verified Buyer • The Sage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
