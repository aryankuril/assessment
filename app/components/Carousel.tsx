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
    const worldRef = useRef<HTMLDivElement>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      /* ========= ENTRY DIRECTIONS (ORDERED) ========= */
      const entryDirections = [
        { x: vw * 0.7, y: 0 },   // RIGHT
        { x: 0, y: -vh * 0.6 },  // TOP
        { x: -vw * 0.7, y: 0 },  // LEFT
        { x: 0, y: vh * 0.6 },   // BOTTOM
      ];

      /* ========= BACKGROUND SCATTER ========= */
      const backgroundScatter = [
        { x: vw * 0.45, y: -vh * 0.35 },
        { x: -vw * 0.45, y: -vh * 0.35 },
        { x: vw * 0.45, y: vh * 0.35 },
        { x: -vw * 0.45, y: vh * 0.35 },
      ];

      const layout = images.map((_, i) => ({
        ...backgroundScatter[i % backgroundScatter.length],
        z: -300 - i * 120,
        rotateX: gsap.utils.random(-15, 15),
        rotateY: gsap.utils.random(-25, 25),
        scale: 0.85,
      }));

      /* ========= INITIAL STATE ========= */
      cardsRef.current.forEach((card, i) => {
        gsap.set(card, {
          ...layout[i],
          opacity: i === 0 ? 1 : 0.4,
          zIndex: i === 0 ? 20 : 1,
          force3D: true,
          transformPerspective: 1400,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=5 top",
          end: `+=${images.length * 120}%`,
          scrub: 1,
          pin: true,
        },
      });


      gsap.set(cardsRef.current[0], {
  x: 0,
  y: 0,
  z: 0,
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  opacity: 1,
  zIndex: 30,
});


      /* ========= MAIN SEQUENCE ========= */
      for (let active = 0; active < images.length - 1; active++) {
        const entry = entryDirections[active % entryDirections.length];

        tl.to(
          cardsRef.current,
          {
            x: (i) =>
              i === active + 1
                ? 0
                : layout[(i - active - 1 + images.length) % images.length].x,

            y: (i) =>
              i === active + 1
                ? 0
                : layout[(i - active - 1 + images.length) % images.length].y,

            z: (i) =>
              i === active + 1
                ? 0
                : layout[(i - active - 1 + images.length) % images.length].z,

            rotateX: (i) => (i === active + 1 ? 0 : layout[i].rotateX),
            rotateY: (i) => (i === active + 1 ? 0 : layout[i].rotateY),

            scale: (i) => (i === active + 1 ? 1 : 0.85),
            opacity: (i) => (i === active + 1 ? 1 : 0.35),
            zIndex: (i) => (i === active + 1 ? 20 : 1),

            ease: "power3.inOut",
            duration: 0.4,
          },
          active
        );

        /* ========= ENTRY MOTION ========= */
        tl.fromTo(
          cardsRef.current[active + 1],
          {
            x: entry.x,
            y: entry.y,
            z: 400,
            rotateX: -25,
            rotateY: 25,
            scale: 0.7,
            opacity: 0,
             duration: 0.4,
             
          },
          {
            x: 0,
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            opacity: 1,
            ease: "power4.out",
            duration: 1,
          },
          active
        );






        
        
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
<section id="task45"
  ref={sectionRef}
  className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center lg:-mt-20"
  style={{ perspective: "1400px" }}
>
     {/* <h1 className=" text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center pb-30">
        Task 3
      </h1> */}
  <div
    ref={worldRef}
    className="absolute inset-0 flex items-center justify-center"
    style={{
      transformStyle: "preserve-3d",
    }}
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
  </div>
</section>

  );
}
