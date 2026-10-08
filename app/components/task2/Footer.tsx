'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-20 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <span className="font-extrabold tracking-widest text-2xl text-white uppercase">
              FLUX <span className="font-serif italic font-normal text-amber-400">THEORY</span>
            </span>
            <p className="mt-4 text-xs text-zinc-400 max-w-sm leading-relaxed font-light">
              Crafted for those who refuse to settle. Dermatologically advanced luxury skin rituals infused with French perfumery.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <input
                type="email"
                placeholder="Enter email for private drops..."
                className="px-4 py-2.5 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 w-64"
              />
              <button className="px-5 py-2.5 rounded-full bg-amber-400 text-black font-semibold text-xs tracking-wider uppercase hover:bg-amber-300 transition-all">
                JOIN
              </button>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h5 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-4">COLLECTION</h5>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">The Lover (Sensual Santal)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">The Rebel (Spicy Leather)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">The Dreamer (Bergamot)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">The Sage (Earthy Oud)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Transformation Trio Set</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h5 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-4">PHILOSOPHY</h5>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Active Science</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Grasse Fragrance Craft</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainable Glass</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Clinical Trials</a></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h5 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-4">SUPPORT</h5>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Track Shipment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Concierge</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-xs font-mono gap-4">
          <p>© 2026 FLUX THEORY INC. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="#" className="hover:text-zinc-300">PRIVACY POLICY</a>
            <a href="#" className="hover:text-zinc-300">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-zinc-300">ACCESSIBILITY</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
