'use client';

import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { BottleCanvas } from './BottleCanvas';
import { ScrollOverlay } from './ScrollOverlay';
import { Navbar } from './Navbar';
import { ProductShowcase } from './ProductShowcase';
import { Footer } from './Footer';
import { VariantConfig } from './LuxuryBottleMesh';

const VARIANTS: VariantConfig[] = [
  {
    id: 'lover',
    name: 'The Lover',
    subtitle: 'Glow & Moisture Formula',
    color: 'Amber Gold',
    accentHex: '#f59e0b',
    glowHex: '#d97706',
    description: 'Sensual Santal Fragrance | Deep Cleansing & Brightening Body Wash with Argan Oil & Vitamin B5.',
    notes: 'Bergamot • Santal • Smoked Vanilla',
  },
  {
    id: 'rebel',
    name: 'The Rebel',
    subtitle: 'Exfoliating Acne Formula',
    color: 'Spicy Crimson',
    accentHex: '#ef4444',
    glowHex: '#dc2626',
    description: 'Spicy Leather Fragrance | Controls Body Acne with 2% Salicylic Acid & Tea Tree Extract.',
    notes: 'Pink Pepper • Tuscan Leather • Amber',
  },
  {
    id: 'dreamer',
    name: 'The Dreamer',
    subtitle: 'Deep Hydration Formula',
    color: 'Sapphire Blue',
    accentHex: '#3b82f6',
    glowHex: '#2563eb',
    description: 'Mysterious Bergamot Fragrance | Deep Hydration & Long-Lasting Moisture with Quad Hyaluronic Acid.',
    notes: 'Bergamot • Cardamom • Clean Cotton',
  },
  {
    id: 'sage',
    name: 'The Sage',
    subtitle: 'Deep Cleansing Clay Formula',
    color: 'Emerald Jade',
    accentHex: '#10b981',
    glowHex: '#059669',
    description: 'Earthy Oud Fragrance | Deep Cleansing Body Wash For Clear Skin with Natural Blue French Clay.',
    notes: 'Earthy Oud • Wild Sage • Cedarwood',
  },
];

export default function Task2BottlePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [userSelectedVariantId, setUserSelectedVariantId] = useState<string | null>(null);
  const [useGlbModel, setUseGlbModel] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const stickyContainerRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    lenis.on('scroll', () => {
      if (!stickyContainerRef.current) return;
      const rect = stickyContainerRef.current.getBoundingClientRect();
      const totalScrollableHeight = stickyContainerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollableHeight > 0) {
        const progress = Math.max(0, Math.min(1, -rect.top / totalScrollableHeight));
        setScrollProgress(progress);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Determine dynamic variant skin during scroll transitions
  let currentSkinId = 'lover';
  if (scrollProgress < 0.20) {
    currentSkinId = 'lover'; // Screen 1: Amber
  } else if (scrollProgress >= 0.20 && scrollProgress < 0.45) {
    currentSkinId = 'rebel'; // Screen 2: Red (after right roll)
  } else if (scrollProgress >= 0.45 && scrollProgress < 0.70) {
    currentSkinId = 'dreamer'; // Screen 3: Blue (after left roll)
  } else if (scrollProgress >= 0.70 && scrollProgress < 0.88) {
    currentSkinId = 'sage'; // Screen 4: Green (center zoom roll)
  } else {
    currentSkinId = userSelectedVariantId || 'lover'; // Screen 5: User selection
  }

  const activeVariant = VARIANTS.find((v) => v.id === currentSkinId) || VARIANTS[0];

  const handleAddToCart = (variantName: string) => {
    setCartCount((prev) => prev + 1);
    setToastMessage(`Added "${variantName}" to your bag!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black">
      {/* Navbar */}
      <Navbar
        useGlbModel={useGlbModel}
        onToggleModel={() => setUseGlbModel(!useGlbModel)}
        cartCount={cartCount}
        onOpenCart={() => setToastMessage(`Your bag has ${cartCount} items.`)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-amber-400 text-black font-semibold text-xs py-3 px-6 rounded-2xl shadow-2xl animate-bounce flex items-center gap-2">
          <span>🛍️</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky 3D Bottle Rolling Experience Container */}
      <div
        id="experience"
        ref={stickyContainerRef}
        className="relative w-full h-[500vh]"
      >
        {/* Sticky Viewport Container */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          {/* Background Ambient Glow matching active bottle skin */}
          <div
            className="absolute inset-0 opacity-25 transition-colors duration-700 blur-3xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${activeVariant.glowHex} 0%, transparent 70%)`,
            }}
          />

          {/* R3F Canvas Container */}
          <div className="absolute inset-0 w-full h-full z-10">
            <BottleCanvas
              scrollProgress={scrollProgress}
              activeVariant={activeVariant}
              useGlbModel={useGlbModel}
            />
          </div>

          {/* HTML Overlay Text & Section Transitions */}
          <div className="absolute inset-0 w-full h-full z-20">
            <ScrollOverlay
              scrollProgress={scrollProgress}
              activeVariant={activeVariant}
              onSelectVariant={(id) => setUserSelectedVariantId(id)}
              variants={VARIANTS}
            />
          </div>
        </div>
      </div>

      {/* Post-Scroll Product Showcase */}
      <ProductShowcase
        variants={VARIANTS}
        onAddToCart={(name) => handleAddToCart(name)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
