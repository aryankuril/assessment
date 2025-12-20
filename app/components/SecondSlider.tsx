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
export default function SecondSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const radius = 520; // distance from center
      const depth = 900;  // z-axis depth
      const total = images.length;
      const step = 360 / total;
      // INITIAL POSITION ON 3D RING
      cardsRef.current.forEach((card, i) => {
        const angle = i * step;
        gsap.set(card, {
          rotateY: angle,
          z: -radius,
          transformOrigin: `50% 50% ${depth}px`,
          scale: i === 0 ? 1 : 0.85,
          opacity: i === 0 ? 1 : 0.45,
        });
      });
      // MAIN TIMELINE
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${total * 120}%`,
          scrub: 1,
          pin: true,
        },
      })
      .to(cardsRef.current, {
        rotateY: `+=${360}`,
        ease: "none",
      })
      .to(
        cardsRef.current,
        {
          opacity: (i) => (i === 0 ? 1 : 0.45),
          scale: (i) => (i === 0 ? 1 : 0.85),
        },
        0
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      {images.map((img, i) => (
        <div
          key={i}
          ref={(el) => {
  if (el) cardsRef.current[i] = el;
}}
          className="absolute w-[240px] md:w-[300px] aspect-square rounded-xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
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