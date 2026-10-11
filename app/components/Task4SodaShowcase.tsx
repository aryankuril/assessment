'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './Task4SodaShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const flavors = [
  { name: 'Lemon Lime', color: '#b9e947', shade: '#80bd21', fruit: 'Lime', price: '$35.99' },
  { name: 'Orange Cream', color: '#ffad3d', shade: '#e66a1d', fruit: 'Orange', price: '$35.99' },
  { name: 'Strawberry', color: '#f17a9b', shade: '#d83e6c', fruit: 'Berry', price: '$35.99' },
  { name: 'Black Cherry', color: '#9f4864', shade: '#732d49', fruit: 'Cherry', price: '$35.99' },
  { name: 'Ginger Peach', color: '#e8b273', shade: '#bd7044', fruit: 'Peach', price: '$35.99' },
];

function CanArt({ flavor, className = '' }: { flavor: (typeof flavors)[number]; className?: string }) {
  const id = useId().replaceAll(':', '');
  const metalId = `canMetal-${id}`;
  const bodyId = `canBody-${id}`;
  const shadowId = `canShadow-${id}`;
  return (
    <svg className={className} viewBox="0 0 180 330" role="img" aria-label={`${flavor.name} Fizzy soda can`}>
      <defs>
        <linearGradient id={metalId} x1="0" x2="1"><stop stopColor="#8e8a86"/><stop offset=".12" stopColor="#faf4e8"/><stop offset=".28" stopColor="#b9b2aa"/><stop offset=".53" stopColor="#f6eee2"/><stop offset=".8" stopColor="#aaa39c"/><stop offset="1" stopColor="#f5eee4"/></linearGradient>
        <linearGradient id={bodyId} x1="0" x2="1"><stop stopColor={flavor.shade}/><stop offset=".2" stopColor={flavor.color}/><stop offset=".49" stopColor={flavor.shade}/><stop offset=".72" stopColor={flavor.color}/><stop offset="1" stopColor={flavor.shade}/></linearGradient>
        <filter id={shadowId} x="-40%" y="-15%" width="180%" height="150%"><feDropShadow dx="0" dy="13" stdDeviation="9" floodColor="#321628" floodOpacity=".32"/></filter>
      </defs>
      <g filter={`url(#${shadowId})`}>
        <ellipse cx="90" cy="36" rx="48" ry="10" fill="#5b5551"/>
        <path d="M42 36 Q43 24 54 22H126Q137 24 138 36L148 286Q148 301 135 304H45Q32 301 32 286Z" fill={`url(#${bodyId})`} stroke="#51243b" strokeWidth="2"/>
        <path d="M42 39H138L141 57H39Z" fill={flavor.shade} opacity=".55"/>
        <path d="M39 279H141L138 294Q136 301 127 302H53Q42 300 40 294Z" fill={flavor.shade} opacity=".55"/>
        <path d="M43 35Q90 27 137 35" fill="none" stroke="#f1d9b9" strokeWidth="3" opacity=".8"/>
        <ellipse cx="90" cy="30" rx="38" ry="6" fill={`url(#${metalId})`}/>
        <ellipse cx="90" cy="29" rx="12" ry="2.2" fill="#686562"/>
        <ellipse cx="90" cy="300" rx="43" ry="5" fill={`url(#${metalId})`}/>
        <path d="M48 73Q90 59 132 73" fill="none" stroke="#ffffff" strokeOpacity=".3" strokeWidth="2"/>
        <text x="90" y="123" textAnchor="middle" fill="#fff5dc" fontSize="47" fontWeight="900" letterSpacing="-3" fontFamily="Arial, sans-serif">fizzi</text>
        <path d="M56 132Q89 123 124 132" fill="none" stroke="#f5e8ce" strokeWidth="1" opacity=".8"/>
        <text x="90" y="157" textAnchor="middle" fill="#fff4da" fontSize="8" fontWeight="700" letterSpacing="2" fontFamily="Arial, sans-serif">SODA PERFECTED</text>
        <circle cx="90" cy="203" r="24" fill="#f7e9ca" stroke="#e4ca9c" strokeWidth="2"/>
        <text x="90" y="201" textAnchor="middle" fill={flavor.shade} fontSize="7" fontWeight="800" letterSpacing="1" fontFamily="Arial, sans-serif">REAL</text>
        <text x="90" y="211" textAnchor="middle" fill={flavor.shade} fontSize="7" fontWeight="800" letterSpacing="1" fontFamily="Arial, sans-serif">FRUIT</text>
        <text x="90" y="255" textAnchor="middle" fill="#fff4da" fontSize="9" fontWeight="700" letterSpacing="1.5" fontFamily="Arial, sans-serif">{flavor.fruit.toUpperCase()}</text>
        <text x="90" y="267" textAnchor="middle" fill="#fff4da" fontSize="6" letterSpacing="1" fontFamily="Arial, sans-serif">12 FL OZ · 355 ML</text>
      </g>
    </svg>
  );
}

function ArtworkCard({ src, alt }: { src: string; alt: string }) {
  const isPortrait = src.includes('try-flavors');
  return <div className={`task4-artwork-card${isPortrait ? ' is-portrait' : ''}`}><Image src={src} alt={alt} fill sizes="(max-width: 700px) 34vw, 24vw"/></div>;
}

function FlavorSlide({ flavor, active, onPrevious, onNext }: {
  flavor: (typeof flavors)[number];
  active: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}) {
  const style = { '--flavor': flavor.color, '--flavor-shade': flavor.shade } as CSSProperties;
  return (
    <article className={`task4-slider-card${active ? ' is-zoom-card' : ''}`} style={style}>
      <div className="task4-slider-blob"/>
      <h2>Choose Your Flavor</h2>
      <CanArt key={flavor.name} flavor={flavor} className="task4-slider-can task4-can-changing"/>
      <p>{flavor.name}</p>
      <small>12 cans · {flavor.price}</small>
      {active && <>
        <button className="task4-slider-arrow task4-slider-prev" onClick={onPrevious} aria-label="Previous flavor">‹</button>
        <button className="task4-slider-arrow task4-slider-next" onClick={onNext} aria-label="Next flavor">›</button>
      </>}
    </article>
  );
}

export default function Task4SodaShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [flavorIndex, setFlavorIndex] = useState(3);
  const activeFlavor = flavors[flavorIndex];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const track = section.querySelector<HTMLElement>('.task4-card-grid');
      const columns = gsap.utils.toArray<HTMLElement>('.task4-card-column');
      const cards = gsap.utils.toArray<HTMLElement>('.task4-grid-card');
      const focusTile = section.querySelector<HTMLElement>('.task4-zoom-card');
      const focusArtwork = focusTile?.querySelector<HTMLElement>('.task4-artwork-card');
      const focusCard = focusTile?.querySelector<HTMLElement>('.task4-active-flavor .task4-slider-card');
      const followingTile = focusTile?.nextElementSibling as HTMLElement | null;
      if (!track || !focusCard || !focusTile || cards.length < 10 || columns.length !== 3) return;

      gsap.set(track, { xPercent: -50, y: 0 });
      gsap.set(columns, { y: 0 });
      gsap.set(cards, { scale: 1, autoAlpha: .88, transformOrigin: '50% 50%' });
      gsap.set(columns[1], { zIndex: 'auto' });
      if (focusArtwork) gsap.set(focusArtwork, { autoAlpha: 1 });
      const controls = focusCard.querySelectorAll('.task4-slider-arrow');
      gsap.set(focusCard, { xPercent: -50, yPercent: -50, scale: 1, autoAlpha: 0, pointerEvents: 'none', transformOrigin: '50% 50%' });
      gsap.set(controls, { autoAlpha: 0, y: 16 });

      const slideStep = () => cards[0].offsetHeight + parseFloat(getComputedStyle(columns[0]).rowGap || '0');
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 3.6, 1900)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(columns[0], { y: () => slideStep(), duration: .52, ease: 'power2.inOut' }, .16);
      timeline.to(columns[1], { y: () => -slideStep(), duration: .52, ease: 'power2.inOut' }, .16);
      timeline.to(columns[2], { y: () => slideStep(), duration: .52, ease: 'power2.inOut' }, .16);
      timeline.to(columns[1], { zIndex: 10, duration: .01 }, .64);
      timeline.to(focusTile, { autoAlpha: 1, duration: .08, ease: 'none' }, .64);
      if (followingTile) timeline.to(followingTile, { autoAlpha: 0, duration: .06, ease: 'none' }, 1.04);
      if (focusArtwork) timeline.to(focusArtwork, { autoAlpha: 0, duration: .12, ease: 'none' }, .64);
      timeline.to(focusCard, { autoAlpha: 1, pointerEvents: 'auto', duration: .13, ease: 'power2.out' }, .64);
      timeline.to(focusCard, { width: () => section.clientWidth, height: () => section.clientHeight, borderRadius: 0, duration: .31, ease: 'power2.inOut' }, .72);
      timeline.to(controls, { autoAlpha: 1, y: 0, stagger: .035, duration: .12, ease: 'power2.out' }, .89);
    }, section);
    return () => ctx.revert();
  }, []);

  const cycleFlavor = (direction: number) => setFlavorIndex((current) => (current + direction + flavors.length) % flavors.length);

  return (
    <main className="task4-page">
      <section className="task4-stage" ref={sectionRef} aria-label="Fizzi flavor slider">
        <div className="task4-card-grid-window">
          <div className="task4-card-grid">
            <div className="task4-card-column">
              <div className="task4-grid-card"><ArtworkCard src="/task4/try-flavors.webp" alt="Try all five Fizzy flavors"/></div>
              <div className="task4-grid-card"><ArtworkCard src="/task4/live-gutsy.webp" alt="Fizzy Live Gutsy campaign"/></div>
              <div className="task4-grid-card"><ArtworkCard src="/task4/try-flavors.webp" alt="Try all five Fizzy flavors"/></div>
              <div className="task4-grid-card"><ArtworkCard src="/task4/live-gutsy.webp" alt="Fizzy Live Gutsy campaign"/></div>
              <div className="task4-grid-card"><ArtworkCard src="/task4/choose-flavor.webp" alt="Choose a Fizzy flavor"/></div>
              <div className="task4-grid-card"><ArtworkCard src="/task4/try-flavors.webp" alt="Try all five Fizzy flavors"/></div>
            </div>
            <div className="task4-card-column">
              <div className="task4-grid-card"><ArtworkCard src="/task4/choose-flavor.webp" alt="Choose Your Flavor selector"/></div>
              <div className="task4-grid-card"><ArtworkCard src="/task4/live-gutsy.webp" alt="Fizzy Live Gutsy campaign"/></div>
              <div className="task4-grid-card task4-zoom-card"><ArtworkCard src="/task4/choose-flavor.webp" alt="Choose a Fizzy flavor"/><div className="task4-active-flavor"><FlavorSlide flavor={activeFlavor} active onPrevious={() => cycleFlavor(-1)} onNext={() => cycleFlavor(1)}/></div></div>
              <div className="task4-grid-card"><ArtworkCard src="/task4/choose-flavor.webp" alt="Choose a Fizzy flavor"/></div>
            </div>
            <div className="task4-card-column">
              <div className="task4-grid-card"><ArtworkCard src="/task4/live-gutsy.webp" alt="Fizzy Live Gutsy campaign"/></div>
              <div className="task4-grid-card"><ArtworkCard src="/task4/choose-flavor.webp" alt="Choose a Fizzy flavor"/></div>
              <div className="task4-grid-card"><ArtworkCard src="/task4/live-gutsy.webp" alt="Fizzy soda flavor campaign"/></div>
              <div className="task4-grid-card"><ArtworkCard src="/task4/try-flavors.webp" alt="Try all five Fizzy flavors"/></div>
              <div className="task4-grid-card"><ArtworkCard src="/task4/choose-flavor.webp" alt="Choose a Fizzy flavor"/></div>
              <div className="task4-grid-card"><ArtworkCard src="/task4/live-gutsy.webp" alt="Fizzy soda flavor campaign"/></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
