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

      /* ================= SCATTER POSITIONS ================= */
      const scatterPositions = [
        { x: vw * 0.6, y: 0 },          // right
        { x: -vw * 0.6, y: 0 },         // left
        { x: 0, y: -vh * 0.5 },         // top
        { x: 0, y: vh * 0.5 },          // bottom
        { x: vw * 0.45, y: -vh * 0.35 }, // right-top
        { x: -vw * 0.45, y: -vh * 0.35 },// left-top
        { x: vw * 0.45, y: vh * 0.35 },  // right-bottom
        { x: -vw * 0.45, y: vh * 0.35 }, // left-bottom
      ];

      const layout = images.map((_, i) => {
        const pos = scatterPositions[i % scatterPositions.length];
        return {
          x: pos.x,
          y: pos.y,
          z: -300 - i * 120,
          rotateX: gsap.utils.random(-15, 15),
          rotateY: gsap.utils.random(-25, 25),
          scale: 0.85,
        };
      });

      /* ================= INITIAL ================= */
      cardsRef.current.forEach((card, i) => {
        gsap.set(card, {
          ...layout[i],
          opacity: i === 0 ? 1 : 0.5,
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

      /* ================= DIRECTIONAL ROTATION ================= */
      for (let active = 0; active < images.length - 1; active++) {
        const from = layout[active];

        const dirX = gsap.utils.clamp(-1, 1, from.x / vw);
        const dirY = gsap.utils.clamp(-1, 1, from.y / vh);

        tl.to(
          cardsRef.current,
          {
            x: (i) =>
              i === active + 1
                ? 0
                : layout[(i - active - 1 + images.length) % images.length].x +
                  dirX * 120,

            y: (i) =>
              i === active + 1
                ? 0
                : layout[(i - active - 1 + images.length) % images.length].y +
                  dirY * 120,

            z: (i) =>
              i === active + 1
                ? 0
                : layout[(i - active - 1 + images.length) % images.length].z,

            rotateX: (i) =>
              i === active + 1 ? 0 : from.rotateX,
            rotateY: (i) =>
              i === active + 1 ? 0 : from.rotateY,

            scale: (i) => (i === active + 1 ? 1 : 0.85),
            opacity: (i) => (i === active + 1 ? 1 : 0.4),
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
