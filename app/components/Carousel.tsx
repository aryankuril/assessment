"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/anton-ploom.jpg" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/annija-kopstsale.jpg" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/daria-elmakova.jpg" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/margaret-rodchenkova.jpg" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/marta-ozolina.jpg" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/victoria-ananyan.jpg" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/ekaterina-gusarova.jpg" },
];

export default function Scattered3DCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      /* ================= MASTER LAYOUT (FIXED DISTANCES) ================= */
      const layout = images.map((_, i) => {
        if (i === 0) {
          return { x: 0, y: 0, z: 0 };
        }

        const angle = (i / images.length) * Math.PI * 2;

        return {
          x: Math.cos(angle) * vw * 0.9,
          y: Math.sin(angle) * vh * 0.15,
          z: -400 - i * 120,
          rotateX: gsap.utils.random(-12, 12),
          rotateY: gsap.utils.random(-20, 20),
          scale: 0.85,
        };
      });

      /* ================= INITIAL ================= */
      cardsRef.current.forEach((card, i) => {
        gsap.set(card, {
          ...layout[i],
          opacity: i === 0 ? 1 : 0.6,
          zIndex: i === 0 ? 20 : 1,
          force3D: true,
          transformPerspective: 1400,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${images.length * 120}%`,
          scrub: 1,
          pin: true,
        },
      });

      /* ================= LAYOUT ROTATION ================= */
      for (let active = 0; active < images.length - 1; active++) {
        tl.to(
          cardsRef.current,
          {
            x: (i) => layout[(i - active - 1 + images.length) % images.length].x,
            y: (i) => layout[(i - active - 1 + images.length) % images.length].y,
            z: (i) => layout[(i - active - 1 + images.length) % images.length].z,
            rotateX: (i) =>
              layout[(i - active - 1 + images.length) % images.length].rotateX,
            rotateY: (i) =>
              layout[(i - active - 1 + images.length) % images.length].rotateY,
            scale: (i) =>
              (i === active + 1 ? 1 : 0.85),
            opacity: (i) =>
              (i === active + 1 ? 1 : 0.45),
            zIndex: (i) => (i === active + 1 ? 20 : 1),
            duration: 1,
            ease: "power3.inOut",
          },
          active
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center"
      style={{ perspective: "1400px" }}
    >
      {images.map((img, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) cardsRef.current[i] = el;
          }}
          className="absolute w-[220px] sm:w-[260px] md:w-[300px] aspect-square rounded-xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          <Image
            src={img.src}
            alt={`card-${i}`}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
    </section>
  );
}
